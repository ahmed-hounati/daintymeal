import { MongooseOptionsFactory } from '@nestjs/mongoose';

export class MongooseConfigService implements MongooseOptionsFactory {
  createMongooseOptions(): Record<string, any> {
    return {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
  }
}
