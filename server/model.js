import mongoose from "mongoose";

const blogTextSchema = mongoose.Schema(
{
    title:String,
    author:String,
    content:String,
},{
    timestamps:true,
})
export const TextBlog=mongoose.model('textblog',blogTextSchema)