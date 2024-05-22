import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Address, AddressSchema } from '../schema/address.schema';
import { AddressService } from './address.service';
import { AddressController } from './address.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }])
  ],
  providers: [AddressService],
  controllers: [AddressController],
  exports: [AddressService]
})
export class AddressModule { }
