import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Categorie } from './category.schema';

export enum Status {
    ACTIVE = "ACTIVE",
    INACTIVE = "INACTIVE",
    BANNED = "BANNED"
}

export interface Statics {
    contRatings: number;
    countSaves: number;
    countOrders: number;
    countPlats: number;
    countComments: number;
}

export interface Image {
    public_id: string;
    url: string;
    secure_url: string;
    format: string;
}

export interface Translations {
    en: string;
    fr: string;
    ar: string;
}

export interface Address {
    en: string;
    fr: string;
    ar: string;
}

export interface RestoInterface {
    _id: string;
    name: Translations;
    address: Address;
    categories: Categorie[];
    image: Image[];
    status: Status;
    rating: number;
    workingTime: string;
    valid: boolean;
    statics: Statics;
}

export type RestoDocument = HydratedDocument<Resto>;

@Schema()
export class Resto {
    @Prop({ type: Object })
    name: Translations;

    @Prop({ type: [{ type: Object }], required: true })
    categories: Categorie[];

    @Prop({ type: Object })
    address: Address;

    @Prop()
    image: Image[];

    @Prop({ type: String, enum: Object.values(Status) })
    status: Status;

    @Prop({ default: Date.now })
    created_at: Date;

    @Prop({ default: true })
    valid: boolean;

    @Prop()
    workingTime: string;

    @Prop({ type: Object })
    statics: Statics;

    @Prop({ default: 0 })
    rating: number;
}

export const RestoSchema = SchemaFactory.createForClass(Resto);