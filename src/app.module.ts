import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategorieModule } from './categories/categories.module';
import { CommentModule } from './comments/comments.module';
import { RestosModule } from './restos/restos.module';
import { ReviewplatsModule } from './reviewplats/reviewplats.module';
import { FilterModule } from './filters/filters.module';
import { AddressModule } from './address/address.module';
import { UsersService } from './users/users.service';
import { UsersController } from './users/users.controller';
import { UsersModule } from './users/users.module';
;
import { PaymentsModule } from './payments/payments.module';
import { PlatModule } from './plats/plats.module';
import { MenusService } from './menus/menus.service';
import { MenusModule } from './menus/menus.module';
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';
import { KeycloakModule } from './keycloak/keycloak.module';
import { JwtService } from '@nestjs/jwt';
import { CloudinaryService } from './cloudinary.service';
import { WatchlistModule } from './watchlist/watchlist.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
    CategorieModule,
    CommentModule,
    RestosModule,
    ReviewplatsModule,
    AddressModule,
    FilterModule,
    AddressModule,
    UsersModule,
    WatchlistModule,
    PaymentsModule,
    PlatModule,
    MenusModule,
    AuthModule,
    KeycloakModule,
    WatchlistModule,
  ],
  controllers: [AppController, UsersController , AuthController],
  providers: [AppService, UsersService, MenusService, AuthService,JwtService ,CloudinaryService],
})
export class AppModule { }
