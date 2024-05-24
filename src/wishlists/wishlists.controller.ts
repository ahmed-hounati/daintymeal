import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { wishlistsService } from './wishlists.service'; // Update import
import { Wishlist } from '../schema/wishlist.schema'; // Update import

@Controller('wishlists') 
export class WishlistsController {
    constructor(private readonly wishlistsService: wishlistsService) { }

    @Post()
    async create(@Body() createWishlistDto: any): Promise<Wishlist> { 
        return this.wishlistsService.create(createWishlistDto);
    }

    @Get()
    async findAll(): Promise<Wishlist[]> { 
        return this.wishlistsService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<Wishlist> {
        return this.wishlistsService.findOne(id);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() updateWishlistDto: any): Promise<Wishlist> {
        return this.wishlistsService.update(id, updateWishlistDto);
    }
}
