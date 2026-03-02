"use client"
import axios from 'axios'
import Link from 'next/link'
import React, { useState } from 'react'

const Upload = () => {
  const [title, setTitle]=useState(String)
  const [author, setAuthor]=useState(String)
  const [content, setContent]=useState(String)

  const body=new FormData
  body.append('title', title)
  body.append('author', author)
  body.append('content', content)
  
  const newOne=async()=>{
    await axios.post('http://localhost:5000/blog/upload', body, {
        headers: {
            'Content-Type': 'application/json' // Specify the content type
        }
      })
      .then((res:any)=>{
        window.location.href='/blog'
        console.log(res.headers)
      })  
      .catch((err:any)=>console.log(err))
  }
  if(!content)
    console.log(`Hình như trong lòng anh đã không còn hình bóng ai ngoài em đâu. Hằng đêm anh nằm thao thức suy tư chẳng nhớ ai ngoài em đâu. Vậy nên không cần nói nữa yêu mà đòi nói trong vài ba câu. Cứ cố quá đâm ra lại hâm uhm đau hết cả đầu. Đợi chờ em trước nhà từ sáng đến trưa chiều tối mắc màn đây luôn (á a a à). Ngược nắng hay là ngược gió miễn anh thấy em tươi vui không buồn. Chỉ cần có thấy thế thôi mây xanh chan hoà. Thấy thế thôi vui hơn có quà Và bước kế tiếp anh lại gần hơn chút đó nha.
Rồi ngày ấy cuối cùng đã tìm đến ta nào đâu hay hay. Anh sẽ không để vụt mất đi cơ duyên ông trời trao tay. Còn đắn đo băn khoăn gì nữa tiếp cận em ngay. Cố gắng sao không để em nghi ngờ dù một giây lúc này.Được đứng bên em anh hạnh phúc tim loạn nhịp tung bay. Chắc chắn anh thề anh sẽ không bao giờ quên ngày hôm nay. Chính em chính em tương tư mình em thôi. Mãi theo sau mình em thôi. Mãi si mê mình em thôi. Mãi yêu thương mình em.

Vậy thì anh xin chết vì người anh thương. Có biết bao nhiêu điều còn đang vấn vương. Dành cho em dành hết ân tình anh mang một đời. Đừng làm trái tim anh đau.`)
  return (
    <>
    <Link href="/blog">
      <button className='lazy-btn'>← Back</button>
    </Link>
    <div className='center flex-col'>
      <h1>Upload a blog</h1>
      <div className='w-[80%] form'>
      <div>
        <label htmlFor="">Title</label>
        <input type="text" required onChange={(e:any)=>setTitle(e.target.value)} />
        <label htmlFor="">Author</label>
        <input type="text" required  onChange={(e:any)=>setAuthor(e.target.value)} />
        <label htmlFor="">Content</label>
        <textarea className='h-fit' rows={10} required onChange={(e:any)=>{
          setContent(e.target.value)
        }}/>
      </div>
      <div>
            <button onClick={(e)=>{
              e.preventDefault();
              newOne();
            }} className='lazy-btn2'>Submit</button>
      </div>
      </div>
    </div>
    </>
  )
}

export default Upload