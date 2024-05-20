import { Module } from '@nestjs/common';
import { RestosService } from './restos.service';
import { RestosController } from './restos.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Resto, RestoSchema } from './resto.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Resto.name, schema: RestoSchema }])],
  providers: [RestosService],
  controllers: [RestosController]
})
export class RestosModule { }