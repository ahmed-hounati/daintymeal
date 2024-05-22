import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Interface } from 'readline';
import { Categorie } from './category.schema';



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


export interface Statics {
    contRatings: number;
    countSaves: number;
    countOrders: number;
}


export interface ItemInterface {
    _id: string;
    name: Name;
    categories: Categorie;
    image: string[];
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

    @Prop({ type: [{ type: Object }], required: true })
    categorie: Categorie;

    @Prop()
    image: string[];

    @Prop({ type: Object })
    statics: Statics;

    @Prop({ enum: Status })
    status: Status;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop()
    valid: boolean;

    @Prop({ default: 0 })
    rating: number;
}
export const ItemSchema = SchemaFactory.createForClass(Item);
