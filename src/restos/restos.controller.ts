import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { RestosService } from './restos.service';
import { CreateRestoDto } from './dto/create-resto.dto';
import { UpdateRestoDto } from './dto/update-resto.dto';

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
