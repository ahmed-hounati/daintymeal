import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Categorie } from './category.schema';
import { Address } from './address.schema';

import { AddFilterNameDto } from 'src/filters/dto/create-filter.dto';

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
export interface RestoInterface {
    _id: string;
    ar: string;
    fr:string;
    en:string;
    address: Address;
    categorie: Categorie[];
    image: string[];
    status: Status;
    rating: number;
    workingTime: string;
    valid: boolean;
    statics: Statics;
    filter: AddFilterNameDto[];
}

export type RestoDocument = HydratedDocument<Resto>;

@Schema()
export class Resto {
    @Prop({ type: { name: String }, _id: false })
    ar: { name: string };
  
    @Prop({ type: { name: String }, _id: false })
    fr: { name: string };
  
    @Prop({ type: { name: String }, _id: false })
    en: { name: string };
    
    @Prop({ type: [{ type: Object }], required: true })
    categories: Categorie[];

    @Prop({ type: [{ type: Object }], required: true })
    address: Address;

    @Prop()
    image: string[];

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


    @Prop({ type: [{ ar: { name: String }, fr: { name: String }, en: { name: String } }], _id: false  })
    filterNames: AddFilterNameDto[];


}

export const RestoSchema = SchemaFactory.createForClass(Resto);

export { AddFilterNameDto };
