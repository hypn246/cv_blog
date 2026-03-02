import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BlogService } from './blog.service';
import { BlogController } from './blog.controller';
import { Textblog, BlogSchema } from './blog.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Textblog.name, schema: BlogSchema }]),
    ],
    controllers: [BlogController],
    providers: [BlogService],
})
export class BlogModule { }