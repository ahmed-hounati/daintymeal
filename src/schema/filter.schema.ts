import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { generateFilterCode } from 'src/utils/generate-filter-code';

export type FilterDocument = Filter & Document;


@Schema()
export class Filter {
  @Prop({ unique: true, default: generateFilterCode })
  filter_code: string;

  @Prop()
  icone_default: string;

  @Prop({ type: [{ name: String }], _id: false })
  ar: { name: string }[];

  @Prop({ type: [{ name: String }], _id: false })
  fr: { name: string }[];

  @Prop({ type: [{ name: String }], _id: false })
  en: { name: string }[];

  @Prop()
  type_service: string;

  @Prop()
  status: string;

  @Prop()
  added_date: string;
}

export const FilterSchema = SchemaFactory.createForClass(Filter);

FilterSchema.pre<FilterDocument>('save', async function (next) {
  if (this.isNew) {
    let filterCode: string;
    let filterExists: FilterDocument | null;
    const model = this.constructor as Model<FilterDocument>;
    do {
      filterCode = generateFilterCode();
      filterExists = await model.findOne({ filter_code: filterCode }).exec();
    } while (filterExists);
    this.filter_code = filterCode;
  }
  next();
});
