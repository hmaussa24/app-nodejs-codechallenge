export class TransactionResponse{
    id: number
    accountExternalIdDebit: string ;
    accountExternalIdCredit: string;
    tranferTypeId: number;
    value: number;
    status: Status;
}

export enum Status{
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}