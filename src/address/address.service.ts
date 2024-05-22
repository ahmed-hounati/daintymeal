import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Address, AddressDocument } from '../schema/address.schema';
import { CreateAddressDto } from './dto/create-address.dto';

@Injectable()
export class AddressService {
  constructor(@InjectModel(Address.name) private addressModel: Model<AddressDocument>) { }

  async create(createAddressDto: CreateAddressDto): Promise<Address> {
    const createdAddress = new this.addressModel(createAddressDto);
    return createdAddress.save();
  }

  async createMany(createAddressesDto: CreateAddressDto[]): Promise<Address[]> {
    return this.addressModel.insertMany(createAddressesDto);
  }

  async findAll(): Promise<Address[]> {
    return this.addressModel.find().exec();
  }

  async findByLanguage(language: string): Promise<any[]> {
    const addresses = await this.addressModel.find().exec();

    return addresses.map((address) => {

      const translations = address.translations[language];


      return {

        street: translations?.street || address.street,
        city: translations?.city || address.city,
        state: translations?.state || address.state,
        country: translations?.country || address.country,
      };
    }).filter((address) => address !== null); // Filter out addresses with no translation for the language
  }





}
