import { Injectable, NotFoundException, OnModuleInit } from '@nestjs/common';
import { DatabaseService } from 'apps/app-nodejs-codechallenge/src/database/database.service';
import { Prisma } from '@prisma/client';
import { AntifraudService } from './antifraud-service/antifraud-service.service';
import { KAFKA_TOPIC_CREATED, KAFKA_TOPIC_PROCESSED } from './constants/kafka.constants';
import { Status, TransactionResponse } from './dto/transactionDto';
import { TransaccionResponseDto, TransactionType } from './dto/transactionResponseDto';
import { error } from 'console';

@Injectable()
export class AppService implements OnModuleInit {

  constructor(private readonly dataBaseService: DatabaseService, private readonly antifraudService: AntifraudService) { }


  async onModuleInit() {
    await this.antifraudService.consumeMessages(KAFKA_TOPIC_PROCESSED, this.update.bind(this));
  }


  async createTransaction(createTansaction: Prisma.TransactionCreateInput) {
    const findTransaction = await this.dataBaseService.transaction.findFirst({
      where:{
        OR: [{
          accountExternalIdCredit: createTansaction.accountExternalIdCredit
        },{
          accountExternalIdDebit: createTansaction.accountExternalIdDebit
        }]
      }
    })
    if(findTransaction){
      throw new NotFoundException(`Transaction with accountExternalIdCredit or accountExternalIdDebit exist`);
    }
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

  async getTransaction(id: number): Promise<TransaccionResponseDto>{
    const transaction = await this.dataBaseService.transaction.findUnique({
      where: {
        id,
      }
    })
    if (!transaction) {
      throw new NotFoundException(`Transaction with id ${id} not found`);
    }
    return new TransaccionResponseDto(transaction.id.toString(), {name: TransactionType[transaction.tranferTypeId]}, {name: Status[transaction.status]}, transaction.value, transaction.createdAt);
  }
}