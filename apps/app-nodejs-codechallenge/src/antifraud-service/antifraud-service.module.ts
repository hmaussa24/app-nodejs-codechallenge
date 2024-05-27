import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigModule, ConfigService } from '@nestjs/config';
import enviromentConfig from './config/enviroment.config';
import { KAFKA_NAME_SERVICE } from '../constants/kafka.constants';
import { AntifraudService } from './antifraud-service.service';

@Module({
  imports: [
    ConfigModule.forFeature(enviromentConfig),
    ClientsModule.registerAsync([
      {
        name: KAFKA_NAME_SERVICE,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>(
                'KAFKA_CLIENT_ID',
                'app-gateway'
              ),
              retry:{
                retries: 8,
                initialRetryTime: 3000
              },
              brokers: configService
                .get<string>('KAFKA_BROKERS', 'kafka:29092')
                .split(','),
            },
            consumer: {
              groupId: configService.get<string>(
                'KAFKA_CONSUMER_GROUP_ID',
                'kafka-microservices'
              ),
            },
          },
        }),
      },
    ]),
  ],
  controllers: [],
  providers: [AntifraudService],
  exports: [AntifraudService],
})
export class AntifraudServiceModule {}
