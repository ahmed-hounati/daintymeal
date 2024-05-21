import { Body, Controller, Delete, Get, Param, Patch, Post, ValidationPipe } from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    findAll() {
        return this.itemsService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.itemsService.findOne(id);
    }

    @Post()
    create(@Body(ValidationPipe) createItemDto: CreateItemDto) {
        return this.itemsService.create(createItemDto)
    }

    @Delete(':id')
    delete(@Param('id') id: string) {
        return this.itemsService.delete(id)
    }

}