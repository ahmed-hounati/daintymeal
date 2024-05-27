import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Filter, FilterDocument } from 'src/schema/filter.schema';
import { AddFilterNameDto, CreateFilterDto } from './dto/create-filter.dto';
import { DeleteFilterNameDto } from './dto/delete-filter-name.dto';

@Injectable()
export class FiltersService {
    constructor(@InjectModel(Filter.name) private filterModel: Model<FilterDocument>) { }

    async create(createFilterDto: CreateFilterDto): Promise<Filter> {
        const createdFilter = new this.filterModel(createFilterDto);
        return createdFilter.save();
    }

    async findAll(): Promise<Filter[]> {
        return this.filterModel.find().exec();
    }

    async findOne(id: string): Promise<Filter> {
        const filter = await this.filterModel.findById(id).exec();
        if (!filter) {
            throw new NotFoundException('Filter not found');
        }
        return filter;
    }

    async addFilterName(addFilterNameDto: AddFilterNameDto): Promise<Filter> {
      const { filterNames } = addFilterNameDto;
      const filter = await this.filterModel.findOne().exec();
      
      if (!filter) {
          throw new NotFoundException('Filter not found');
      }

      for (const filterName of filterNames) {
          const { language, name } = filterName;

          const existingFilter = await this.filterModel.findOne({ [`${language}.name`]: name }).exec();

          if (existingFilter) {
              console.log(`Filter with name '${name}' in language '${language}' already exists. Skipping insertion.`);
              continue;
          }

          if (!filter[language]) {
              filter[language] = [];
          }
          filter[language].push({ name });
      }
  
      return filter.save();
  }

      async deleteFilterName(deleteFilterNameDto: DeleteFilterNameDto): Promise<Filter> {
        const { filter_code, filterNames } = deleteFilterNameDto;

        const filter = await this.filterModel.findOne({ filter_code }).exec();
        
        if (!filter) {
          throw new NotFoundException('Filter not found');
        }
    
        for (const filterName of filterNames) {
          const { language, name } = filterName;
          if (filter[language]) {
            filter[language] = filter[language].filter(item => item.name !== name);
          }
        }
    
        return filter.save();
    }
}
