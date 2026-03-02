import express from "express";
import {TextBlog } from "./model.js";
import fs from 'fs'
//npm i react-router-dom
const router =express.Router();

//get all
router.get('/',async(req,res)=>{
    try{
        const blog =await TextBlog.find().sort({timestamps:1})
        return res.status(200).json({
            amout:blog.length,
            data:blog
        })
    }catch(err){
        response.status(500).send({message:err.message})
    }
})

//get 1
router.get('/:id',async(req,res)=>{
    try{
        const blog =await TextBlog.findById(req.params.id)
        return res.status(200).json(blog)
    }catch(err){
        res.status(500).send({message:err.message})
    }
})
router.post('/upload', async(req, res) => {
    try {
        const {title, author, content}=req.body
        if(!title||!author||!content){
            console.log('empty param')
            return
        }
        TextBlog.create({
            title,
            author,
            content
        })
        console.log('successed created')
        return res.status(200).redirect('/blog')
    }catch (err) {
        console.log(err.message);
        return res.status(500).send({message:err.message});
    }
});
//edit
router.put('/:id', async(req, res)=>{
    try {
        const {id}=req.params;
        if(!req)
            console.log("invalid id")
        else
            console.log(id)
        console.log(req.body)
        const result=await TextBlog.findByIdAndUpdate(id,req.body,{ new: true, runValidators: true })
        if(result==undefined){
            console.log('No blog id founded')
            return res.status(404).json({message:'no blog like that'})
        }
        console.log('Success updated')
        return res.status(200).json({message:"updated blog"})
    }catch(err){
        console.log('Error occurred')
        return res.status(500).send({message:err.message})
    }
})
//del 1
router.delete('/:id',async(req,res)=>{
    try {
        const {id}=req.params;
        // const result=await Blogs.findByIdAndDelete(req.params.id, req.body)
        const nest=await TextBlog.findOne({_id:`${id}`})
        const result=await TextBlog.deleteOne({_id:`${id}`})
        if(result===undefined){
            return res.status(404).json({message:'no blog like that'})
        }
        if (!nest)
            return console.log('Image not found');
        fs.unlink(nest.thumbnail, (err)=>{
            if(err){
                console.error(`${err}`);
                return;
            }
            console.log(`File ${nest.thumbnail} has been successfully removed.`);
        })
        
        return res.status(200).json({message:"Deleted blog"})

    }catch(err){
        res.status(500).send({message:err.message})
    }
})

export default router;