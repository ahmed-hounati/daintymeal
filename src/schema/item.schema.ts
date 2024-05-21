import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum Status {
    active = "ACTIVE",
    inactive = "INACTIVE",
    banned = "BANNED"
}

export interface ItemInterface {
    _id: string;
    name: string;
    category: string;
    image: string;
    status: Status;
    created_at: Date;
    valid: boolean;
}

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
    @Prop()
    name: string;

    @Prop()
    category: string;

    @Prop()
    image: string;

    @Prop({ enum: Status })
    status: Status;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop()
    valid: boolean;
}
export const ItemSchema = SchemaFactory.createForClass(Item);