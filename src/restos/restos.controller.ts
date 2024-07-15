import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { RestosService } from './restos.service';
import { CreateRestoDto } from './dto/create-resto.dto';
import { UpdateRestoDto } from './dto/update-resto.dto';
import { Plat } from 'src/schema/plat.schema';

@Controller('restos')
export class RestosController {
    constructor(private readonly restosService: RestosService) { }


    @Get('search')
    async searchItems(@Query() searchItemDto: CreateRestoDto): Promise<any[]> {
        return this.restosService.searchItems(searchItemDto);
    }

    @Get()
    async findAll() {
        return this.restosService.findAll();
    }

    @Get('popular')
    async findPopularRestos() {
        return this.restosService.findPopularRestos();
    }

    @Get(':resto_code')
    findOneByCode(@Param('resto_code') resto_code: string) {
        return this.restosService.findOneByCode(resto_code);
    }
    
    @Get(':resto_code/plats')
    getPlatsByRestoCode(@Param('resto_code') resto_code: string): Promise<Plat[]> {
        return this.restosService.getPlatsByRestoCode(resto_code);
    }

    @Post()
    create(@Body(ValidationPipe) createRestoDto: CreateRestoDto) {
        return this.restosService.create(createRestoDto)
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateRestoDto: UpdateRestoDto) {
        return this.restosService.update(id, updateRestoDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.restosService.delete(id)
    }

}
