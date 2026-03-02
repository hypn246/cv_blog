"use client"
import Card from '@/components/Card';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'

interface Blog {
  _id: string;
  createdAt: string;
  title: string;
  author: string;
  content: string;
}
const server=process.env.NEXT_PUBLIC_SERVER||'http://localhost:5000'
const Blog = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  useEffect(()=>{
    // axios.get('http://localhost:5000/blog')
    // .then((res)=>setBlogs(res.data.data))
    // .catch((err)=>console.log(err))
    let isFetching = false;
    const fetching =async()=>{
      if (isFetching) return; // Prevent multiple calls
      isFetching = true;
      try{
        const resp= await fetch(`${server}/blog`,{
          method:'GET',
        })
        if(!resp){
         throw new Error('Response error')
        }
        const result=await resp.json()
        if (result && result.data)
          setBlogs(result.data)
        else 
          throw new Error('Data error')
      } catch (err) {
        console.error("Error while fetching...", err)
      }
    }
    fetching()
  },[])
  return (
    <>
    <div className='center'>
    <Link href="/blog/upload">
      <button className='lazy-btn2'>Upload</button>
    </Link>
    </div>
    <div id='inject' className='wrapper w-[90vw] m-auto'>
      {
        blogs.map(
          (blog,index)=>{
            return(
              <div className="card-wrapper py-4 px-1" key={index}>
              <Link href={`/blog/${blog._id}`} className="">
                <Card
                  title={blog.title} 
                  author={blog.author}
                  time={blog.createdAt}/>
              </Link>
              </div>
            )
          }
        )}
    </div>
    </>
  )
}

export default Blog