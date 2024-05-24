import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from 'src/schema/transaction.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Item } from 'src/schema/item.schema';
import { Model } from 'mongoose';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
        @InjectModel(Item.name) private readonly itemModel: Model<Item>,
      ) {}
    
      async buyItems(createPaymentDto: CreatePaymentDto): Promise<Transaction> {
        const transaction_code = `trans_${uuidv4()}`;
    
        const foodList = await Promise.all(
          createPaymentDto.food_list.map(async (foodItem) => {
            const item = await this.itemModel.findOne({ item_code: foodItem.item_code }).exec();
            if (!item) {
              throw new NotFoundException(`Item with code ${foodItem.item_code} not found`);
            }
            return {
              item_code: foodItem.item_code,
              item_name: item.name,
              item_price: item.item_price,
              quantity: foodItem.quantity,
              currency: item.currency,
              discount: item.discount,
            };
          })
        );
    
        const createdTransaction = new this.transactionModel({
          transaction_code,
          user_code: createPaymentDto.user_code,
          food_list: foodList,
          total_amount_HT: createPaymentDto.total_amount_HT,
          tva_amount: createPaymentDto.tva_amount,
          total_amount_TTC: createPaymentDto.total_amount_TTC,
          currency: createPaymentDto.currency,
          method_payment: createPaymentDto.method_payment,
          type_service: 'daintymeal',
          added_date: new Date(),
          status: 'A',
        });
    
        return createdTransaction.save();
      }
    
      async getHistoricTransactions(user_code: string): Promise<Transaction[]> {
        return this.transactionModel.find({ user_code }).select('-food_list').exec();
      }
      
      async getDetailTransaction(transaction_code: string): Promise<Transaction> {
        const transaction = await this.transactionModel.findOne({ transaction_code }).exec();
        if (!transaction) {
          throw new NotFoundException('Transaction not found');
        }
        return transaction;
      }
}
function uuidv4() {
    throw new Error('Function not implemented.');
}

