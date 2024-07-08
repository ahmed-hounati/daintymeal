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

    @Get('two')
    async findTwoPlats(): Promise<Plat[]> {
        return this.platService.findTwoPlats();
    }

    @Get('search')
    async searchItems(@Query() searchItemDto: CreatePlatDto): Promise<Plat[]> {
        return this.platService.searchItems(searchItemDto);
    }
    @Get('trending')
    async findTrendingPlats() {
        return this.platService.findTrendingPlats();
    }

    @Get('most-sales')
    async findMostSalesPlats() {
        return this.platService.findMostSalesPlats();
    }
    @Get('filter')
    async findPlatsByCategory(@Query('category') category: string): Promise<Plat[]> {
        return this.platService.findPlatsByCategory(category);
    }
}
