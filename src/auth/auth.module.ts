import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User, UserSchema } from 'src/schema/user.schema';
import { JwtStrategy } from './jwt.strategy';
import { KeycloakModule } from '../keycloak/keycloak.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CloudinaryService } from 'src/cloudinary.service';

@Module({
  imports: [
    ConfigModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string | number>('JWT_EXPIRES'),
        },
      }),
    }),
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    KeycloakModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, CloudinaryService],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}