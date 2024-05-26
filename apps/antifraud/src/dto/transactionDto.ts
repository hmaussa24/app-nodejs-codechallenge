export class Transaction{
    id: number
    accountExternalIdDebit: string ;
    accountExternalIdCredit: string;
    tranferTypeId: number;
    value: number;
    status: Staus;
}

export enum Staus{
    pending = "pending",
    approved = "approved",
    rejected = "rejected"
}