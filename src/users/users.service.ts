import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { wishlistsService } from '../wishlists/wishlists.service';
import { Wishlist } from 'src/schema/wishlist.schema';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,
        private wishlistService: wishlistsService
    ) { }

    async create(createUserDto: CreateUserDto): Promise<User> {
    const { fr, en, ar, ...rest } = createUserDto;

    const userCode = await this.generateUserCode();

    const user = new this.userModel({
        ...rest,
        user_code: userCode,
        fr: { ...fr },
        en: { ...en },
        ar: { ...ar },
    });

    const savedUser = await user.save();
    
    // Create wishlist for the user
    await this.wishlistService.create(savedUser.user_code);

    return savedUser;
}

private async generateUserCode(): Promise<string> {
    const users = await this.userModel.find().sort({ user_code: -1 }).limit(1).exec();
    const lastUserCode = users.length ? users[0].user_code : 'usr_000';
    const newCodeNumber = parseInt(lastUserCode.split('_')[1]) + 1;
    return `usr_${newCodeNumber.toString().padStart(3, '0')}`;
}

    async findAll(): Promise<User[]> {
        return this.userModel.find().exec();
    }

    async findOne(id: string): Promise<User> {
        return this.userModel.findById(id).exec();
    }

    async update(id: string, updateUserDto: any): Promise<User> {
        return this.userModel.findByIdAndUpdate(id, updateUserDto, { new: true }).exec();
    }
}