import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { PlatService } from './plats.service';
import { Plat } from '../schema/plat.schema';
import { CreatePlatDto } from './dto/create-plat.dto';

@Controller('plats')
export class PlatController {
    constructor(private readonly platService: PlatService) { }

    @Post()
    async create(@Body() createPlatDto: CreatePlatDto): Promise<Plat> {
        return this.platService.create(createPlatDto);
    }

    @Get()
    async findAll(): Promise<Plat[]> {
        return this.platService.findAll();
    }

    @Get('search')
    async searchItems(@Query() searchItemDto: CreatePlatDto): Promise<Plat[]> {
        return this.platService.searchItems(searchItemDto);
    }
}
