import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  create(@Body() createTransaction: Prisma.TransactionCreateInput){
     return this.appService.createTransaction(createTransaction);
  }

  @Get(':id')
  findTransaction(@Param('id') id: string){
    return this.appService.getTransaction(+id);
  }
}
