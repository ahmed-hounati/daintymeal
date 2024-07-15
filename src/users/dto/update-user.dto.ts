import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly image: string;
 }