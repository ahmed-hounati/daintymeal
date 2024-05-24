import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { FiltersService } from './filters.service';
import { AddFilterNameDto, CreateFilterDto } from './dto/create-filter.dto';
import { Filter } from 'src/schema/filter.schema';

@Controller('filters')
export class FiltersController {
    constructor(private readonly filterService: FiltersService) { }

    @Post()
    async create(@Body() createFilterDto: CreateFilterDto): Promise<Filter> {
        return this.filterService.create(createFilterDto);
    }

    @Get()
    async findAll(): Promise<Filter[]> {
        return this.filterService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Filter> {
        return this.filterService.findOne(id);
    }
    @Post('add-names')
    async addFilterName(@Body() addFilterNameDto: AddFilterNameDto): Promise<Filter> {
        return this.filterService.addFilterName(addFilterNameDto);
    }
}
