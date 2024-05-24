import { Controller, Post, Query, Body, Get, Param } from '@nestjs/common';
import { CreateAddressDto } from './dto/create-address.dto';
import { CreateAddressesDto } from './dto/create-addresses.dto';
import { AddressService } from './address.service';


@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) { }

  @Post('one')
  async create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressService.create(createAddressDto);
  }

  @Post('many')
  async createMany(@Body() createAddressesDto: CreateAddressesDto) {
    return this.addressService.createMany(createAddressesDto.addresses);
  }

  @Get()
  async findByLanguage(@Query('lang') lang: string) {
    const language = lang;
    console.log(language);
    return this.addressService.findByLanguage(language);
  }

}
