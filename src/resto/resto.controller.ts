import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { RestosService } from './resto.service';
import { CreateRestoDto } from './dto/create-resto.dto';


@Controller('restos')
export class RestosController {
    constructor(private readonly restosService: RestosService) { }
    @Get()
    async findAll(@Query('lang') lang: string) {
        const language = lang || 'en';
        return this.restosService.findAll(language);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.restosService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createRestoDto: CreateRestoDto) {
        console.log('====================================');
        console.log(createRestoDto);
        console.log('====================================');
        return this.restosService.create(createRestoDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.restosService.delete(id)
    }

}