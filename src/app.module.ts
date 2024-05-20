import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { CategorieModule } from './categories/categories.module';

@Module({
    imports: [
      MongooseModule.forRoot('mongodb+srv://mohamadtalemsi:FzuJnCis9uXPeMNP@nestproject.7qpvmqh.mongodb.net/daintymeal_nestJS?retryWrites=true&w=majority&appName=NestProject'), 
      CategorieModule,
    ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
