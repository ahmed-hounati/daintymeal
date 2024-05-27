import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto } from './dto/create-payment.dto';

@Controller('payments')
export class PaymentsController {
    constructor(private readonly paymentsService: PaymentsService) {}

  @Post('buyItems')
  async buyItems(@Body() createPaymentDto: CreatePaymentDto) {
    return this.paymentsService.buyItems(createPaymentDto);
  }

  @Get('getHistoricTransactions/:user_code')
  async getHistoricTransactions(@Param('user_code') user_code: string) {
    return this.paymentsService.getHistoricTransactions(user_code);
  }

  @Get('getDetailTransaction/:transaction_code')
  async getDetailTransaction(@Param('transaction_code') transaction_code: string) {
    return this.paymentsService.getDetailTransaction(transaction_code);
  }
}
