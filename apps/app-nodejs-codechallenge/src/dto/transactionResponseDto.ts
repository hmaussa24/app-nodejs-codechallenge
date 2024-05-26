import {Status} from './transactionDto'
export class TransaccionResponseDto {
    transactionExternalId: string;
    transactionType: {
        name: string
    }
    transactionStatus: {
        name: Status
    }
    value: number
    createdAt: Date

    constructor(
        transactionExternalId: string,
        transactionType: { name: string },
        transactionStatus: { name: Status },
        value: number,
        createdAt: Date
    ) {
        this.transactionExternalId = transactionExternalId;
        this.transactionType = transactionType;
        this.transactionStatus = transactionStatus;
        this.value = value;
        this.createdAt = createdAt;
    }
}

export enum TransactionType{
    credit = 1,
    debit = 2
}