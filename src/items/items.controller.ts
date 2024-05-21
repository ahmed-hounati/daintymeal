import { Body, Controller, Delete, Get, Param, Patch, Post, Query, ValidationPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    async findAll(@Query('lang') lang: string) {
        const language = lang || 'en';
        return this.itemsService.findAll(language);
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto)
    }


    @Patch(':id')
    update(@Param('id') id: string, @Body(ValidationPipe) updateItemDto: UpdateItemDto) {
        return this.itemsService.update(id, updateItemDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.itemsService.delete(id)
    }

}
