import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Interface } from 'readline';



export interface Name {
    en: string;
    fr: string;
    ar: string;
}

enum Status {
    active = "ACTIVE",
    inactive = "INACTIVE",
    banned = "BANNED"
}

export interface Image {
    public_id: string;
    url: string;
    secure_url: string;
    format: string;
}

export interface Statics {
    contRatings: number;
    countSaves: number;
    countOrders: number;
}

export interface Category {
    name: string
}

export interface ItemInterface {
    _id: string;
    name: Name;
    category: Category;
    image: Image;
    status: Status;
    statics: Statics;
    created_at: Date;
    valid: boolean;
}

export type ItemDocument = HydratedDocument<Item>;

@Schema()
export class Item {
    @Prop({type: Object})
    name: Name;

    @Prop({type: Object})
    category: Category;

    @Prop()
    image: Image[];

    @Prop({ type: Object })
    statics: Statics;

    @Prop({ enum: Status })
    status: Status;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop()
    valid: boolean;
}
export const ItemSchema = SchemaFactory.createForClass(Item);
