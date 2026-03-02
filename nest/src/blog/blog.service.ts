import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Textblog, BlogDocument } from './blog.schema';
import { CreateBlogDto, UpdateBlogDto } from './dto/blog.dto';

@Injectable()
export class BlogService {
  constructor(@InjectModel(Textblog.name) private blogModel: Model<BlogDocument>) { }

  async getAllBlogs(): Promise<Textblog[]> {
    return this.blogModel.find().sort({ createdAt: 1 }).exec();
  }

  async getBlogById(id: string): Promise<Textblog> {
    const blog = await this.blogModel.findById(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }

  async createBlog(createBlogDto: CreateBlogDto): Promise<Textblog> {
    const newBlog = new this.blogModel(createBlogDto);
    return newBlog.save();
  }

  async updateBlog(id: string, updateBlogDto: UpdateBlogDto): Promise<Textblog> {
    const updatedBlog = await this.blogModel
      .findByIdAndUpdate(id, updateBlogDto, { new: true, runValidators: true })
      .exec();
    if (!updatedBlog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return updatedBlog;
  }

  async deleteBlog(id: string): Promise<Textblog> {
    const blog = await this.blogModel.findByIdAndDelete(id).exec();
    if (!blog) {
      throw new NotFoundException(`Blog with ID ${id} not found`);
    }
    return blog;
  }
}
