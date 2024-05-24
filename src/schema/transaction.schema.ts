import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema()
export class Transaction extends Document {
  @Prop({ required: true })
  transaction_code: string;

  @Prop({ required: true })
  user_code: string;

  @Prop({ type: Array, required: true })
  food_list: {
    item_code: string;
    item_name: string;
    item_price: number;
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

  @Prop({ required: true })
  type_service: string;

  @Prop({ default: 'A' })
  status: string;

  @Prop({ default: Date.now })
  added_date: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
