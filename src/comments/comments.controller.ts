import { Controller, Post, Get, Body, NotFoundException, Param } from '@nestjs/common';
import { CommentService } from './comments.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { Comment } from 'src/schema/comment.schema';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @Get()
  async findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }
  @Get('resto/:resto_code')
  async getCommentsByRestoCode(@Param('resto_code') resto_code: string): Promise<Comment[]> {
    const comments = await this.commentService.findCommentsByRestoCode(resto_code);
    if (!comments || comments.length === 0) {
      throw new NotFoundException('No comments found for this restaurant');
    }
    return comments;
  }
}
