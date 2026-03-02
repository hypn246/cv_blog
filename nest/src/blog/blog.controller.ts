import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Res,
    HttpStatus,
    NotFoundException,
} from '@nestjs/common';
import { Response } from 'express';
import { BlogService } from './blog.service';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Controller('blog')
export class BlogController {
    constructor(private readonly blogService: BlogService) { }

    @Get()
    async getAllBlogs() {
        const blogs = await this.blogService.getAllBlogs();
        return { amount: blogs.length, data: blogs };
    }

    @Get(':id')
    async getBlogById(@Param('id') id: string) {
        const blog = await this.blogService.getBlogById(id);
        if (!blog) throw new NotFoundException('Blog not found');
        return blog;
    }

    @Post('/upload')
    async createBlog(@Body() createBlogDto: CreateBlogDto) {
        const blog = await this.blogService.createBlog(createBlogDto);
        return { message: 'Blog created successfully', blog };
    }

    @Put(':id')
    async updateBlog(
        @Param('id') id: string,
        @Body() updateBlogDto: UpdateBlogDto,
    ) {
        const blog = await this.blogService.updateBlog(id, updateBlogDto);
        return { message: 'Blog updated successfully', blog };
    }

    @Delete(':id')
    async deleteBlog(@Param('id') id: string) {
        await this.blogService.deleteBlog(id);
        return { message: 'Blog deleted successfully' };
    }
}
