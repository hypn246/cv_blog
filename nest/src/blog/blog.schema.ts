import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BlogDocument = Textblog & Document;

@Schema({ timestamps: true })
export class Textblog{
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  author: string;

  @Prop({ required: true })
  content: string;
}

export const BlogSchema = SchemaFactory.createForClass(Textblog);