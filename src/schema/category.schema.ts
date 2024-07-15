import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CategorieDocument = Categorie & Document;

class Translation {
  @Prop({ type: String })
  name: string;
}

@Schema()
class Translations {
  @Prop({ type: Translation, _id: false })
  ar: Translation;

  @Prop({ type: Translation, _id: false })
  fr: Translation;
}

export const TranslationsSchema = SchemaFactory.createForClass(Translations);

@Schema()
export class Categorie {
  toObject(): any {
      throw new Error('Method not implemented.');
  }
  @Prop({ unique: true, required: true })
  category_code: string;

  @Prop({ unique: true, required: true })
  name: string;

  @Prop({ required: true })
  image: string;

  @Prop({ type: TranslationsSchema, _id: false, required: true })
  translation: Translations;
}

export const CategorieSchema = SchemaFactory.createForClass(Categorie);
