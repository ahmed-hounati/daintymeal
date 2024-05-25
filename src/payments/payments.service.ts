import { Injectable, NotFoundException } from '@nestjs/common';
import { Transaction } from 'src/schema/transaction.schema';
import { CreatePaymentDto } from './dto/create-payment.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Plat } from 'src/schema/plat.schema';

@Injectable()
export class PaymentsService {
    constructor(
        @InjectModel(Transaction.name) private readonly transactionModel: Model<Transaction>,
        @InjectModel(Plat.name) private readonly platModel: Model<Plat>,
    ) { }

    async buyItems(createPaymentDto: CreatePaymentDto): Promise<Transaction> {
        const { user_code, food_list, currency, method_payment } = createPaymentDto;
        let totalAmountHT = 0;
        const tvaRate = 0.20;
        const foodListWithDetails = await Promise.all(
            food_list.map(async (foodItem) => {
                const item = await this.platModel.findOne({ plat_code: foodItem.plat_code });
                if (!item) {
                    throw new NotFoundException(`Item with code ${foodItem.plat_code} not found`);
                }
                const itemPrice = item.plat_price;
                const discount = item.discount || 0;
                const priceAfterDiscount = itemPrice - discount;
                const totalPrice = priceAfterDiscount * foodItem.quantity;
                totalAmountHT += totalPrice;
    
                return {
                    plat_code: foodItem.plat_code,
                    plat_name: item.name,
                    plat_price: item.plat_price,
                    quantity: foodItem.quantity,
                    currency: item.currency,
                    discount: discount,
                };
            }),
        );
    
        const tvaAmount = totalAmountHT * tvaRate;
        const totalAmountTTC = totalAmountHT + tvaAmount;
    

        const lastTransaction = await this.transactionModel.findOne({}, {}, { sort: { 'added_date': -1 } });
        let transactionCodeNumber = 1;
        if (lastTransaction) {
            const lastTransactionCode = lastTransaction.transaction_code;
            const lastTransactionCodeNumber = parseInt(lastTransactionCode.split('_')[1]);
            transactionCodeNumber = lastTransactionCodeNumber + 1;
        }
        const transactionCode = `trans_${String(transactionCodeNumber).padStart(3, '0')}`;
    
        const newTransaction = new this.transactionModel({
            transaction_code:transactionCode,
            user_code,
            food_list: foodListWithDetails,
            total_amount_HT: totalAmountHT,
            tva_amount: tvaAmount,
            total_amount_TTC: totalAmountTTC,
            currency,
            method_payment,
            added_date: new Date(),
        });
    
        return newTransaction.save();
    }

    async getHistoricTransactions(user_code: string): Promise<Transaction[]> {
        return this.transactionModel.find({ user_code }).select('-food_list -__v -_id').exec();
    }

    async getDetailTransaction(transaction_code: string): Promise<Transaction> {
        const transaction = await this.transactionModel.findOne({ transaction_code }).select('-__v -_id').exec();
        if (!transaction) {
            throw new NotFoundException('Transaction not found');
        }
        return transaction;
    }
}
function uuidv4() {
    throw new Error('Function not implemented.');
}

