import { Controller } from '@nestjs/common';
import { AntifraudService } from './antifraud.service';
import { EventPattern, Payload } from '@nestjs/microservices';
import { Transaction } from './dto/transactionDto';;

@Controller()
export class AntifraudController {
  constructor(private readonly antifraudService: AntifraudService) { }

  @EventPattern('transaction_created')
  async handleUserCreated(@Payload() data: Transaction) {
    return {value: this.antifraudService.processedTransaction(data)}
  }

}
