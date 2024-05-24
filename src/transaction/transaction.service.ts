import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class TransactionService {
  constructor(private readonly databaseservice: DatabaseService) {}

  async create(createTransactionDto: Prisma.TransactionCreateInput) {
    return this.databaseservice.transaction.create({data: createTransactionDto})
  }

  async findAll() {
    return this.databaseservice.transaction.findMany({})
  }

  async findOne(id: number) {
    return this.databaseservice.transaction.findUnique({
      where: {
        id,
      }
    })
  }

  async update(id: number, updateTransactionDto: Prisma.TransactionUpdateInput) {
    return this.databaseservice.transaction.update({
      where: {
        id,
      },
      data: updateTransactionDto
    })
  }

  remove(id: number) {
    return `This action removes a #${id} transaction`;
  }
}
