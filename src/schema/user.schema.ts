import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Address, AddressSchema } from './address.schema';  // Adjust the path as needed
import { Wishlist, WishlistItemSchema } from './wishlist.schema';  // Adjust the path as needed

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

    @Prop({ type: AddressSchema })
    fr: Address;

    @Prop({ type: AddressSchema })
    en: Address;

    @Prop({ type: AddressSchema })
    ar: Address;

    @Prop()
    status: string;

    @Prop()
    gsm: string;

    @Prop()
    language_default: string;

    @Prop()
    added_date: Date;

    @Prop()
    type_service: string;

    @Prop({ type: WishlistItemSchema })
    wishlist: Wishlist;

    @Prop({ type: SocialMediaSchema })
    social_media: SocialMedia;
}

export const UserSchema = SchemaFactory.createForClass(User);

