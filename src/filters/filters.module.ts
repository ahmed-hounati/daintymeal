import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { FiltersService } from './filters.service';
import { FiltersController } from './filters.controller';
import { Filter, FilterSchema } from 'src/schema/filter.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: Filter.name, schema: FilterSchema }])],
  controllers: [FiltersController ],
  providers: [FiltersService],
  exports: [FiltersService]
})
export class FilterModule {}
