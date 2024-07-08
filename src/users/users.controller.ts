import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '../schema/user.schema';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    @Post()
    async create(@Body() createUserDto: any): Promise<User> {
        return this.usersService.create(createUserDto);
    }

    @Get()
    async findAll(): Promise<User[]> {
        return this.usersService.findAll();
    }

    @Get(':user_code')
    async findOne(@Param('user_code') user_code: string): Promise<User> {
        return this.usersService.findOne(user_code);
    }

    @Put(':user_code')
    async update(@Param('user_code') user_code: string, @Body() updateUserDto: any): Promise<User> {
        return this.usersService.update(user_code, updateUserDto);
    }

    @Post(':user_code/avatar')
    async updateImage(@Param('user_code') user_code: string, @Body('imageUrl') imageUrl: string) {
        return this.usersService.updateImage(user_code, imageUrl); 
    }


}
