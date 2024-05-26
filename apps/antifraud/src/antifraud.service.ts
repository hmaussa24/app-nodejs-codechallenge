import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { Client, ClientKafka, ClientProxy, Transport } from '@nestjs/microservices';
import { Prisma } from '@prisma/client';
import { Staus, Transaction } from './dto/transactionDto';

@Injectable()
export class AntifraudService  implements OnModuleInit{

  @Client({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'antifraud',
        brokers: ['localhost:9092'],
      },
      consumer: {
        groupId: 'transaction-consumer',
        sessionTimeout: 30000,
        rebalanceTimeout: 60000,
        heartbeatInterval: 10000,
      }
    }
  })
  client: ClientKafka;

  async onModuleInit() {
    await this.client.connect();
  }

  processedTransaction(transactionToProcessed: Transaction){
    const transactionProcessed = this.validateAntiFraurd(transactionToProcessed);
    this.client.emit('transaction_processed', {value: transactionProcessed})
    .subscribe({
      next: (value) => console.log(`Transaccion ${transactionProcessed.id} procesada`, transactionProcessed),
      error: (error) => console.log('Error al procesar la transaccion: ', error),
      complete: () => console.log('Transaccion procesada correctamente'),
  });
     return transactionProcessed;
  }

  validateAntiFraurd(transaction: Transaction){
    transaction.status = transaction.value > 1000 ? Staus.rejected : Staus.approved; 
    return transaction;
  }
}
