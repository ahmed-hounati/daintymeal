import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
class SocialMedia {
    @Prop()
    instagram: string;

    @Prop()
    facebook: string;
}

const SocialMediaSchema = SchemaFactory.createForClass(SocialMedia);


@Schema()
class Address {
    @Prop()
    address: string;

    @Prop()
    city: string;

    @Prop()
    country: string;
}

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    user_code: string;

    @Prop()
    email: string;

    @Prop()
    avatar: string;

    @Prop()
    fullname: string;

    @Prop()
    gender: string;

    @Prop()
    birthdate: string;


    @Prop()
    status: string;

    @Prop()
    gsm: string;

    @Prop()
    language_default: string;

    @Prop()
    fr: Address;

    @Prop()
    en: Address;

    @Prop()
    ar: Address;

    @Prop()
    added_date: Date;

    @Prop()
    type_service: string;


    @Prop({ type: SocialMediaSchema })
    social_media: SocialMedia;
}

export const UserSchema = SchemaFactory.createForClass(User);

