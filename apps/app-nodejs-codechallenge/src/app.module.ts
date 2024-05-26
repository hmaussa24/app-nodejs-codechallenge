import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AntifraudServiceModule } from './antifraud-service/antifraud-service.module';
import { DatabaseModule } from 'apps/app-nodejs-codechallenge/src/database/database.module';

@Module({
  imports: [DatabaseModule, AntifraudServiceModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
