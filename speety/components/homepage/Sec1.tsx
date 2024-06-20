"use client"
import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Typist from "react-typist-component";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
export default function Sec1() {
  const router = useRouter();
  const loginDirect = () => {
      router.push("/auth/login")
  }

  return (
    <div>
      <img src="/homepage1.jpg" alt="home-bg" className="aspect-video object-cover object-center w-screen"/>
      <section className="absolute inset-0 ">
        {/* Logo and Get Started Button */}
        <div className="flex flex-row justify-between mt-2 xl:mt-10 xl:mb-10 xl:mr-9 2xl:mt-10 2xl:mb-10 2xl:mr-9">
          <img
            src="/speety_logo.png"
            alt="Speety Logo"
            className="ml-4 xl:ml-14 2xl:ml-14 h-5 w-10 xl:h-[80px] xl:w-[160px] 2xl:h-[80px] 2xl:w-[160px]"
          />
          <button className="bg-black hover:bg-gray-900 text-white px-2 xl:px-4 2xl:px-4 rounded-2xl xl:h-14 2xl:h-14 flex items-center space-x-2 text-[8px] xl:text-lg 2xl:text-lg" onClick={loginDirect}>
            <span>Get started</span>
            &nbsp; 
            <AiOutlineDoubleRight />
          </button>
        </div>

        {/* Rolling text, slogan, and get started button */}
        <div className="flex flex-col justify-center items-center mt-6 xl:mt-0 2xl:mt-0">
  <button className="py-1 px-4 border border-blue-200 border-opacity-20 text-[#84A07C] text-xs xl:text-lg 2xl:text-lg font-semibold tracking-tighter xl:mb-10 2xl:mb-10">
    <Typist>Introducing safety enhanced brokerage ...</Typist>
  </button>
  
  {/* "Selling fast" */}
  <div className="xl:text-8xl 2xl:text-8xl font-bold flex items-center xl:mb-10 2xl:mb-10"> 
    <span className="text-[#16302B]">Selling fast,</span>
  </div>
  
  {/* "Buying smart" with gradient text */}
  <h1 className="xl:text-8xl 2xl:text-8xl font-bold flex items-center xl:mb-10 2xl:mb-10">
    <span className="text-[#16302B]">buying</span>
    &nbsp;
    <span className="text-transparent bg-gradient-to-r from-[#90A955] to-[#397367] bg-clip-text">
      smart
    </span>
    &nbsp;
    <img
      src="/home.png"
      className="ml-1 xl:ml-5 2xl:ml-5 w-5 h-5 xl:w-[100px] xl:h-[90px] 2xl:w-[100px] 2xl:h-[90px]"
      alt="Home"
    />
  </h1>

  {/* Buttons for Buy, Sell, Rent */}
  <h1 className="text-black-500 text-[8px] xl:text-xl 2xl:text-xl flex items-center xl:mt-5 2xl:mt-5  xl:mb-10 2xl:mb-10"> 
    <button className="px-1 xl:py-1 xl:px-2 2xl:py-1 2xl:px-2 border  border-opacity-20 font-semibold tracking-tighter bg-gradient-to-r from-[#90A955] to-[#397367] rounded-md xl:rounded-xl 2xl:rounded-xl">
      Buy
    </button>
    &nbsp;, &nbsp;
    <button className="px-1 xl:py-1 xl:px-2 2xl:py-1 2xl:px-2 border border-opacity-20  bg-gradient-to-r from-[#90A955] to-[#397367] rounded-md xl:rounded-xl font-semibold tracking-tighter">
      Sell
    </button>{" "}
    &nbsp; &amp; &nbsp;
    <button className="px-1 xl:py-1 xl:px-2 2xl:py-1 2xl:px-2 border border-opacity-20  bg-gradient-to-r from-[#90A955] to-[#397367] rounded-md xl:rounded-xl font-semibold tracking-tighter">
      Rent
    </button>{" "}
    &nbsp; with &nbsp;
    <button className="px-1 xl:py-1 xl:px-2 2xl:py-1 2xl:px-2 bg-gradient-to-r from-[#90A955] to-[#397367] border border-opacity-20  rounded-md xl:rounded-xl font-semibold tracking-tighter">
      scail.it
    </button>
    <img
      src="/sparkle.png"
      width={30}
      height={20}
      className="xl:mb-5 2xl:mb-5 ml-5"
      alt="Sparkle"
    />
  </h1>
  
  {/* Get started button */}
  <Button className="bg-black hover:bg-gray-900 text-white px-2 xl:px-4 2xl:px-4 rounded-2xl h-4 xl:h-14 2xl:h-14 flex items-center text-[7px] xl:text-xl 2xl:text-xl  font-poppins xl:mb-5 2xl:mb-5" onClick={loginDirect}> 
    <span>Get started</span>
    &nbsp; 
    <AiOutlineDoubleRight />
  </Button>

  {/* No Credit Card Required */}
  <h2 className="text-white text-[6px] xl:text-[16px] 2xl:text-[16px] xl:mb-10 2xl:mb-10">(No Credit Card Required)</h2>
</div>

      </section>
    </div>
  );
}
