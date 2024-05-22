import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategorieModule } from './categories/categories.module';
import { CommentModule } from './comments/comments.module';
import { ItemsModule } from './items/items.module';
import { RestosModule } from './restos/restos.module';
import { ReviewplatsController } from './reviewplats/reviewplats.controller';
import { ReviewplatsModule } from './reviewplats/reviewplats.module';

@Module({
  imports: [
    ConfigModule.forRoot({
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
    ItemsModule,
    RestosModule,
    ReviewplatsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
