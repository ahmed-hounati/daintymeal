import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type CategorieDocument = Document & Categorie;

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
  @Prop({ unique: true })
  name: string;

  @Prop()
  image: string;

  @Prop({ type: TranslationsSchema, _id: false })
  translation: Translations;
}

export const CategorieSchema = SchemaFactory.createForClass(Categorie);
