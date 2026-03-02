import Image from "next/image";
import home from '../../public/notebook.png'
import Link from "next/link";

export default function Home() {
  return (
    <>
    <div className="">
      <div className="center">
        <h1 className="my-5">Welcome to BLOG DEMO mon ma nguon mo</h1>
      </div>

      <div className="center ">
        <Image className="rounded-xl" src={home} alt="" height={300} priority></Image>
      </div>
      <div className="center">
        <Link href="/blog">
          <button className="lazy-btn">Get start</button>
        </Link>
      </div>
    </div>

    <hr className="mt-[4rem] mx-24"/>

    <section>
      <h1 className="text-center my-[3rem]">Optimize your blog writing progress</h1>
    <div className="flex flex-wrap ">
      <div className="w-[33%] p-4">
        <div className="h-[15rem] text-center border-2 rounded-xl hover:border-rose-600 p-4">
          <b><h2>Building the Web, One Post at a Time</h2></b>
          <p>Dive into our collection of articles covering everything from responsive design to API integration.</p>
        </div>
      </div>
      <div className="w-[33%] p-4">
        <div className="h-[15rem] text-center border-2 rounded-xl hover:border-rose-600 p-4">
          <b><h2>Express Yourself: Blog and Diary in One Place</h2></b>
          <p>A platform designed for writers and dreamers to document their journeys and inspire others.</p>
        </div>
      </div>
      <div className="w-[33%] p-4">
        <div className="h-[15rem] text-center border-2 rounded-xl hover:border-rose-600 p-4">
          <b><h2>Write Your Story, Share Your Journey.</h2></b>
          <p>A unique space for both public expression and private reflection, tailored for every writer.</p>
        </div>
      </div>
    </div>
    </section>
    </>
  );
}
