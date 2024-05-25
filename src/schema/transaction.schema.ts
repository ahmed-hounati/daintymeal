import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model, Schema as MongooseSchema } from 'mongoose';
export type TransactionDocument = Transaction & Document;
@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  transaction_code: string;

  @Prop({ required: true })
  user_code: string;

  @Prop({ type: Array, required: true })
  food_list: {
    plat_code: string;
    plat_name: string;
    plat_price: number;
    quantity: number;
    currency: string;
    discount: number;
  }[];

  @Prop({ required: true })
  total_amount_HT: number;

  @Prop({ required: true })
  tva_amount: number;

  @Prop({ required: true })
  total_amount_TTC: number;

  @Prop({ required: true })
  currency: string;

  @Prop({ required: true })
  method_payment: string;

  @Prop({ default: 'transaction' })
  type_service: string;

  @Prop({ default: 'A' })
  status: string;

  @Prop({ default: Date.now })
  added_date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

// TransactionSchema.pre<TransactionDocument>('save', async function (next) {
//   if (this.isNew) {
//     let transactionCode: string;
//     let transactionExists: TransactionDocument | null;
//     const model = this.constructor as Model<TransactionDocument>;
//     do {
//       transactionCode = generateFilterCode();
//       transactionExists = await model.findOne({ transaction_code: transactionCode }).exec();
//     } while (transactionExists);
//     this.transaction_code = transactionCode;
//   }
//   next();
// });