import { Injectable } from '@nestjs/common';
import { Kafka } from 'kafkajs';
import { KAFKA_GRUOUP_ID } from '../constants/kafka.constants';
import { TransactionResponse } from '../dto/transactionDto';

@Injectable()
export class AntifraudService {
    private kafka;

    constructor() {
        this.kafka = new Kafka({
            brokers: [process.env.KAFKA_BROKER], retry: {
                initialRetryTime: 1000, retries: 8
            }
        });
    }

    async sendTransactions(topic: string, message: string) {
        const producer = this.kafka.producer();
        await producer.connect();
        await producer.send({
            topic, messages: [{value: message}],
        });
        await producer.disconnect();
    }

    async consumeMessages(topic: string, messageHandler: (message: TransactionResponse) => Promise<void>) {
        try {
            const consumer = this.kafka.consumer({groupId: KAFKA_GRUOUP_ID});
            await consumer.connect();
            await consumer.subscribe({topic, fromBeginning: true});

            await consumer.run({
                eachBatch: async ({batch, resolveOffset, heartbeat, isRunning, isStale}) => {
                    for (let message of batch.messages) {
                        try {
                            await messageHandler(JSON.parse(message.value.toString()));
                            resolveOffset(message.offset);
                            await heartbeat();
                        } catch (error) {
                            console.error(`Error processing message: ${error} at ${message}`);
                        }
                    }
                }, eachBatchAutoResolve: false
            });
        } catch (error) {
            console.error(`Error consuming messages: ${error}`);
        }
    }
}