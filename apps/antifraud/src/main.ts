import { NestFactory } from '@nestjs/core';
import { AntifraudModule } from './antifraud.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AntifraudModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:29092'],
      },
      consumer:{
        groupId: 'transaction-consumer',
        sessionTimeout: 30000,  // 30 segundos
        rebalanceTimeout: 60000,  // 60 segundos
        heartbeatInterval: 10000,  // 10 segundos
      }
    }
  });
  await app.listen();
}
bootstrap();