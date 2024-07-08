import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { User, UserSchema } from '../schema/user.schema';

import { PlatModule } from 'src/plats/plats.module';
import { CloudinaryService } from 'src/cloudinary.service';

@Module({
    imports: [MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]), PlatModule],
    providers: [UsersService , CloudinaryService],
    controllers: [UsersController],
    exports: [MongooseModule]
})
export class UsersModule { }
