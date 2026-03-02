import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogModule } from './blog/blog.module';
import * as dotenv from 'dotenv';
dotenv.config();
@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL), // MongoDB connection string in .env
    BlogModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
