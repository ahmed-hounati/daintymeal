import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from '../schema/user.schema';
import { CreateUserDto } from './dto/create-user.dto';
import { CloudinaryService } from 'src/cloudinary.service';

@Injectable()
export class UsersService {
    constructor(
        @InjectModel(User.name) private userModel: Model<UserDocument>,

        private cloudinaryService: CloudinaryService,
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

    async findOne(user_code: string): Promise<User> {
        return this.userModel.findOne({ user_code }).exec();
    }

    async update(user_code: string, updateUserDto: any): Promise<User> {
        return this.userModel.findByIdAndUpdate(user_code, updateUserDto, { new: true }).exec();
    }

    async updateImage(userCode: string, imageUrl: string): Promise<User> {
        const image_secureUrl = await this.cloudinaryService.uploadImage(imageUrl, 'Profile');
        return this.userModel.findOneAndUpdate(
            { user_code: userCode },
            { $set: { avatar: image_secureUrl.secure_url } }, 
            { new: true }
        ).exec();
    }
}