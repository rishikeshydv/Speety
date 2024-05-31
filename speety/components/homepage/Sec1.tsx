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
      <img src="/homepage1.jpg" alt="home-bg" className="aspect-video object-cover object-center w-full"/>
      <section className="absolute inset-0 ">
        {/* Logo and Get Started Button */}
        <div className="flex flex-row justify-between mt-10 mb-10 mr-9">
          <img
            src="/speety_logo.png"
            alt="Speety Logo"
            width={160}
            height={100}
            className="ml-14 "
          />
          <button className="bg-black hover:bg-gray-900 text-white px-4 rounded-2xl h-14 flex items-center space-x-2 text-lg font-poppins" onClick={loginDirect}>
            <span>Get started</span>
            &nbsp; 
            <AiOutlineDoubleRight />
          </button>
        </div>

        {/* Rolling text, slogan, and get started button */}
        <div className="flex flex-col justify-center items-center py-">
  <button className="py-1 px-4 border border-blue-200 border-opacity-20 text-[#84A07C] text-lg font-semibold tracking-tighter mb-10">
    <Typist>Introducing safety enhanced brokerage ...</Typist>
  </button>
  
  {/* "Selling fast" */}
  <div className="text-8xl font-bold flex items-center mb-10">
    <span className="text-[#16302B]">Selling fast,</span>
  </div>
  
  {/* "Buying smart" with gradient text */}
  <h1 className="text-8xl font-bold flex items-center mb-10">
    <span className="text-[#16302B]">buying</span>
    &nbsp;
    <span className="text-transparent bg-gradient-to-r from-[#90A955] to-[#397367] bg-clip-text">
      smart
    </span>
    &nbsp;
    <img
      src="/home.png"
      width={100}
      height={60}
      className="ml-5"
      alt="Home"
    />
  </h1>

  {/* Buttons for Buy, Sell, Rent */}
  <h1 className="text-black-500 text-xl flex items-center mt-5  mb-10">
    <button className="py-1 px-2 border  border-opacity-20 font-semibold tracking-tighter bg-gradient-to-r from-[#90A955] to-[#397367] rounded-xl">
      Buy
    </button>
    &nbsp;, &nbsp;
    <button className="py-1 px-2 border border-opacity-20  bg-gradient-to-r from-[#90A955] to-[#397367] rounded-xl font-semibold tracking-tighter">
      Sell
    </button>{" "}
    &nbsp; &amp; &nbsp;
    <button className="py-1 px-2 border border-opacity-20  bg-gradient-to-r from-[#90A955] to-[#397367] rounded-xl font-semibold tracking-tighter">
      Rent
    </button>{" "}
    &nbsp; with &nbsp;
    <button className="py-1 px-2 bg-gradient-to-r from-[#90A955] to-[#397367] border border-opacity-20  rounded-xl font-semibold tracking-tighter">
      scail.it
    </button>
    <img
      src="/sparkle.png"
      width={30}
      height={20}
      className="mb-5 ml-5"
      alt="Sparkle"
    />
  </h1>
  
  {/* Get started button */}
  <Button className="bg-black hover:bg-gray-900 text-white px-4 rounded-2xl h-14 flex items-center text-xl font-poppins mb-5" onClick={loginDirect}>
    <span>Get started</span>
    &nbsp; 
    <AiOutlineDoubleRight />
  </Button>

  {/* No Credit Card Required */}
  <h2 className="text-white mb-10">(No Credit Card Required)</h2>
</div>

      </section>
    </div>
  );
}
