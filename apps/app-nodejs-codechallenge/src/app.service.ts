import { Injectable, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from 'apps/app-nodejs-codechallenge/src/database/database.service';
import { Prisma } from '@prisma/client';
import { AntifraudService } from './antifraud-service/antifraud-service.service';
import { KAFKA_TOPIC_CREATED, KAFKA_TOPIC_PROCESSED } from './constants/kafka.constants';
import { Status, TransactionResponse } from './dto/transactionDto';
import { TransaccionResponseDto, TransactionType } from './dto/transactionResponseDto';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(private readonly dataBaseService: DatabaseService, private readonly antifraudService: AntifraudService) { }


  async onModuleInit() {
    await this.antifraudService.consumeMessages(KAFKA_TOPIC_PROCESSED, this.update.bind(this));
  }


  async createTransaction(createTansaction: Prisma.TransactionCreateInput) {
    const transaction = await this.dataBaseService.transaction.create({ data: createTansaction })
    await this.antifraudService.sendTransactions(KAFKA_TOPIC_CREATED, JSON.stringify(transaction));
    return transaction;
  }


  async update(transaction: TransactionResponse): Promise<void> {
    await this.dataBaseService.transaction.update({
      where: {
        id: transaction.id
      },
      data: {
        status: transaction.status
      }
    })

  }

  async getTransaction(id: number){
    const transaction = await this.dataBaseService.transaction.findUnique({
      where: {
        id,
      }
    })
    return new TransaccionResponseDto(transaction.id.toString(), {name: TransactionType[transaction.tranferTypeId]}, {name: Status[transaction.status]}, transaction.value, transaction.createdAt);
  }
}