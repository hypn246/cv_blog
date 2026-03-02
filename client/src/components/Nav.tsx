'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import menu from '../../public/icons8-hamburger-menu-50.png'
const Nav = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  return (
    <nav className='mx-10 flex items-center'>
      <Link href='/' className='logo center'>
        <h1>BLOG</h1>
      </Link>
      <ul className='center nav-big'>
        <li><Link href="/">Home</Link></li>
        <li><Link href="/blog">Blog</Link></li>
        <li><Link href="http://localhost:5000/blog">Server API</Link></li>
      </ul>
      <ul className='flex flex-col nav-hide'>
        <Image onClick={toggleDropdown}className='cursor-pointer' src={menu} alt=""/>
        <span id="drop" className='relative'>
          <ul className={`absolute z-50 top-0 right-0 bg-sky-700 text-black ${isDropdownOpen ? 'block' : 'hidden'}`}>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/blog">Blog</Link></li>
            <li><Link href="http://localhost:5000/blog">Server API</Link></li>
          </ul>
        </span>
      </ul>
    </nav>
  )
}

export default Nav