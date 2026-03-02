"use client"
import axios from 'axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
interface Detail {
  title: string;
  author: string;
  content: string;
}
const server=process.env.NEXT_PUBLIC_SERVER||'http://localhost:5000'
const Detail = () => {
  //get method
  const {id}=useParams()
  const [detail, setDetail] = useState<Detail | null>(null);
  //put method
  const [title, setTitle]=useState(undefined)
  const [author, setAuthor]=useState(undefined)
  const [content, setContent]=useState(undefined)
  
  const body = new FormData();
  body.append('title', title || '');
  body.append('author', author || '');
  body.append('content', content || '');

  /// put data
  const update=()=>{
    const update_body={title, author, content}
      axios({
        method:'put',
        url:`${server}/blog/${id}`, 
        data:update_body
      })
        .then(()=>{
          window.location.href=`/blog/${id}`
        })
        .catch((err)=>console.log(err))
    }
    //del blog
    const Del=async(e:any)=>{
      e.preventDefault()
      if(confirm("Do you wanna delete this blog?")){
        try {
          await axios({
            method: 'delete',
            url:`${server}/blog/${id}`,
          })
        } catch (error) {
          console.log(error)
        } finally{
          window.location.href='/blog'
        }
      }
    }
    //edit blog
    const edit=(e:any)=>{
      e.preventDefault()
      const hid=document.getElementById('hidden')
      if(hid)
        hid.style.display="block"
      const in4=document.getElementById('info')
      if(in4)
        in4.style.display="none"
    }

    //cancel edit
    const cancel=(e:any)=>{
      e.preventDefault()
      const hid=document.getElementById('hidden')
      if(hid)
        hid.style.display="block"
      const in4=document.getElementById('info')
      if(in4)
        in4.style.display="none"
    }
    //init fetch api
  useEffect(()=>{
    const fetching=async()=>{
      const resp= await axios(`${server}/blog/${id}`)
      try {
        if(!resp || !resp.data)
          throw new Error('Fetching error')
        else{
          setDetail(resp.data)
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetching()
  },[id])
  return (
  <>
  <div className='w-full flex justify-between'>
    <Link href="/blog" className='m-4 p-3'> ← Return</Link>
    <div>
      <button className="lazy-btn2" onClick={edit}>Edit</button>
      <button className="lazy-btn" onClick={Del}>Delete</button>
    </div>
  </div>

  <section className='center'>
    <div id='info' className='w-[80%] flex-col center text-center'>
    {detail ? 
    (<>
      <h1>{detail.title}</h1>
      <p>by: {detail.author}</p>
      <br />
      <p style={{ whiteSpace: 'pre-wrap' }} id='content'>{detail.content}</p>
      <p className='mt-10'>（￣︶￣）↗　</p>
    </>):(
      <p>Hold on ~</p>)}
    </div>
  </section>

  <div id='hidden' className='hidden'>
    <div className='center flex-col'>
      <h1>Edit a blog</h1>
      <div className='w-[80%] form'>
      <div>
        <label htmlFor="">Title</label>
        <input type="text" required 
          onLoad={(e:any)=>setTitle(e.target.defaultValue)}
          onChange={(e:any)=>setTitle(e.target.value)} 
          defaultValue={detail?.title}/>
        <label htmlFor="">Author</label>
        <input type="text" required  
          onLoad={(e:any)=>setAuthor(e.target.defaultValue)}
          onChange={(e:any)=>setAuthor(e.target.value)} 
          defaultValue={detail?.author}/>
        <label htmlFor="">Content</label>
        <input type='text'
          onLoad={(e:any)=>setContent(e.target.defaultValue)}
          onChange={(e:any)=>setContent(e.target.value)} 
          value={detail?.content}/>
      </div>
      </div>
      <div className='flex'>
        <Link href={'/blog'} onClick={(e)=>{
          e.preventDefault()
          update()
        }} className='lazy-btn2'>Submit</Link>

        <button id='cancel' className='lazy-btn' onClick={cancel}>Cancel</button>
      </div>
    </div>
  </div>
  </>
  )
}

export default Detail