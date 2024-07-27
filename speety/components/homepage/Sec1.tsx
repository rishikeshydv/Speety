"use client"
import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Typist from "react-typist-component";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { GrCaretNext } from "react-icons/gr";
import { IoCallSharp } from "react-icons/io5";
import { IoDocumentText } from "react-icons/io5";
export default function Sec1() {
  const router = useRouter();
  const loginDirect = () => {
      router.push("/auth/login")
  }

  return (
    <div>
      <section>
        {/* Text */}
        {/* Logo and Get Started Button */}
        {/* <div className="flex flex-row justify-between mt-2 xl:mt-10 xl:mb-10 xl:mr-4 2xl:mt-10 2xl:mb-10 2xl:mr-6">
          <img
            src="/speety_logo.png"
            alt="Speety Logo"
            className="ml-4 xl:ml-14 2xl:ml-14 h-10 w-16 xl:h-[80px] xl:w-[160px] 2xl:h-[80px] 2xl:w-[160px]"
          />
          <div className="flex gap-3 px-1">
          <button 
          className="bg-[#397367] hover:bg-gray-900 text-white  xl:px-4 2xl:px-4  xl:h-12 2xl:h-14 items-center space-x-2 text-[8px] xl:text-[14px] 2xl:text-[14px] inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]"
          onClick={loginDirect}>
            <span>Get started</span>
            <GrCaretNext />
          </button>
          <button className="bg-[#397367] hover:bg-gray-900 text-white  xl:px-4 2xl:px-4  xl:h-12 2xl:h-14 items-center space-x-2 text-[8px] xl:text-[14px] 2xl:text-[14px] inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]" onClick={()=>router.push("/contact")}>
            <span>Support</span>
            <IoCallSharp className="xl:w-4 md:h-4"/>
          </button>
          <button className="hidden md:block bg-[#397367] hover:bg-gray-900 text-white  xl:px-4 2xl:px-4  xl:h-12 2xl:h-14 items-center space-x-2 text-[8px] xl:text-[14px] 2xl:text-[14px] md:inline-flex justify-center whitespace-nowrap rounded-lg px-3.5 py-2.5 text-sm font-medium shadow focus:outline-none focus:ring focus:ring-slate-500/50 focus-visible:outline-none focus-visible:ring focus-visible:ring-slate-500/50 relative before:absolute before:inset-0 before:rounded-[inherit] before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white/.5)_50%,transparent_75%,transparent_100%)] dark:before:bg-[linear-gradient(45deg,transparent_25%,theme(colors.white)_50%,transparent_75%,transparent_100%)] before:bg-[length:250%_250%,100%_100%] before:bg-[position:200%_0,0_0] before:bg-no-repeat before:[transition:background-position_0s_ease] hover:before:bg-[position:-100%_0,0_0] hover:before:duration-[1500ms]" onClick={()=>router.push("/docs")}>
            <span>Documentation</span>
            <IoDocumentText className="xl:w-4 md:h-4"/>
          </button>
          </div>
        </div> */}

<div className="flex items-center justify-center mt-10">
        {/* Rolling text, slogan, and get started button */}
        <div className="flex flex-col justify-center items-center px-6 md:px-16 mt-6 xl:mt-0 2xl:mt-0">
  <button className="text-[#508991] py-1 px-4 border border-blue-200 border-opacity-20 text-xs md:text-lg font-semibold tracking-tighter xl:mb-10 2xl:mb-10">
    <Typist>Introducing safety enhanced brokerage ...</Typist>
  </button>
  
  {/* "Selling fast" */}
  <div className="text-gray-400 text-xl md:text-5xl xl:text-8xl 2xl:text-8xl font-bold flex items-center md:mb-2"> 
    <span className="">Selling fast,</span>
  </div>
  
  {/* "Buying smart" with gradient text */}
  <h1 className="text-gray-400 text-xl md:text-5xl xl:text-8xl 2xl:text-8xl font-bold flex items-center xl:mb-10 2xl:mb-10">
    <span className="">buying</span>
    &nbsp;
    <span className="font-extrabold tracking-tight text-[#004346] h-[calc(theme(fontSize.xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] xl:h-[calc(theme(fontSize.7xl)*theme(lineHeight.tight))] 2xl:h-[calc(theme(fontSize.7xl)*theme(lineHeight.tight))] overflow-hidden mb-0.5">
    <ul className="animate-text-slide-3">
        <li>smart</li>
        <li>wise</li>
        <li>sound</li>
        <li aria-hidden="true">smart</li>
    </ul>
    </span>
    &nbsp;
  </h1>

  {/* Buttons for Buy, Sell, Rent */}
  <h1 className="text-black-500 text-[8px] md:text-lg xl:text-xl 2xl:text-xl flex items-center md:mt-5 md:mb-8 xl:mb-10 2xl:mb-10"> 
    <button className="px-1 xl:py-1 xl:px-2 2xl:py-1 2xl:px-2 border  border-opacity-20 font-semibold tracking-tighter rounded-md xl:rounded-xl 2xl:rounded-xl">
      Buy
    </button>
    &nbsp;, &nbsp;
    <button className="px-1 xl:py-1 xl:px-2 2xl:py-1 2xl:px-2 border border-opacity-20 rounded-md xl:rounded-xl font-semibold tracking-tighter">
      Sell
    </button>{" "}
    &nbsp; &amp; &nbsp;
    <button className="px-1 xl:py-1 xl:px-2 2xl:py-1 2xl:px-2 border border-opacity-20 rounded-md xl:rounded-xl font-semibold tracking-tighter">
      Rent
    </button>{" "}
    &nbsp; with &nbsp;
    <button className="bg-gradient-to-r from-[#90A955] to-[#397367] text-transparent bg-clip-text animate-gradient px-1 xl:py-1 xl:px-2 2xl:py-1 2xl:px-2 border border-opacity-20 rounded-md xl:rounded-xl font-semibold tracking-tighter">
      scail.it
    </button>
    <img
      src="/sparkle.png"
      width={30}
      height={20}
      className="xl:mb-5 2xl:mb-5 ml-2 xl:ml-5 2xl:ml-5 h-3 w-3 xl:w-[30px] xl:h-[20px] 2xl:w-[30px] 2xl:h-[20px]"
      alt="Sparkle"
    />
  </h1>
  
  {/* Get started button */}
  <button className="bg-[#397367] hover:bg-gray-900 font-medium text-white px-2 py-1 md:px-4 rounded-[5px] md:rounded-lg md:h-12 2xl:h-14 flex items-center space-x-2 text-[12px] md:text-lg 2xl:text-lg mb-4 md:mb-10" onClick={loginDirect}>
            <span>Get started</span>
            <GrCaretNext  className="font-medium"/>
          </button>
          
        </div>


        {/* Video */}
        <div className="px-6 md:px-16">
        <video className="md:w-[600px] h-auto overflow-hidden [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.300/.48)_80%,_theme(colors.green.500)_86%,_theme(colors.green.300)_90%,_theme(colors.green.500)_94%,_theme(colors.green.600/.48))_border-box] rounded-2xl border-4 border-transparent animate-border" autoPlay muted playsInline>
          <source 
          src="https://firebasestorage.googleapis.com/v0/b/speety-2175.appspot.com/o/frontend-vids%2F1.mp4?alt=media&token=544c6031-7927-4982-ba30-57a4f39f095d"
          />
        </video>
        </div>
</div>
      </section>
    </div>
  );
}
