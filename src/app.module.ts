import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { RestosModule } from './restos/restos.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://ahmedhounati:DCBNKDl6UpGeRL70@nestjs.rfuifir.mongodb.net/Daintymail?retryWrites=true&w=majority&appName=nestjs'),
    ItemsModule,
    RestosModule
  ],
})
export class AppModule { }