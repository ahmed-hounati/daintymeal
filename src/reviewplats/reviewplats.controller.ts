import { Body, Controller, Get, Post } from '@nestjs/common';
import { ReviewplatsService } from './reviewplats.service';
import { Reviewplat } from 'src/schema/reviewplat.schema';
import { CreateReviewplatDto } from './dto/create-reviewplat.dto';

@Controller('reviewplats')
export class ReviewplatsController {
    constructor(private readonly reviewplatService: ReviewplatsService) {}

  @Post()
  async create(@Body() createReviewplatDto: CreateReviewplatDto): Promise<Reviewplat> {
    return this.reviewplatService.create(createReviewplatDto);
  }

  @Get()
  async findAll(): Promise<Reviewplat[]> {
    return this.reviewplatService.findAll();
  }
}
