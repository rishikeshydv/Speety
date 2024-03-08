"use client"
import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import Typist from "react-typist-component";
import { useRouter } from "next/navigation";

export default function Sec1() {
  const router = useRouter();
  const loginDirect = () => {
      router.push("/auth/login")
  }

  return (
    <div>
      <section>
        {/* Logo and Get Started Button */}
        <div className="flex flex-row justify-between mt-10 mb-10 mr-9">
          <img
            src="/speety_logo.png"
            alt="Speety Logo"
            width={250}
            height={130}
            className="ml-14"
          />
          <button className="bg-black hover:bg-gray-900 text-white py-1 px-9 rounded-2xl h-20 flex items-center space-x-2 text-2xl font-poppins" onClick={loginDirect}>
            <span>Get started</span>
            &nbsp; &nbsp; &nbsp;
            <AiOutlineDoubleRight />
          </button>
        </div>

        {/* Rolling text, slogan, and get started button */}
        <div className="flex flex-col justify-center items-center py-">
  <button className="py-1 px-4 border border-blue-200 border-opacity-20 text-blue-500 bg-blue-50 text-2xl mb-10">
    <Typist>Introducing safety enhanced brokerage ...</Typist>
  </button>
  
  {/* "Selling fast" */}
  <div className="text-9xl font-bold flex items-center mb-10">
    <span>Selling fast,</span>
  </div>

  {/* "Buying smart" with gradient text */}
  <h1 className="text-9xl font-bold flex items-center mb-10">
    <span>buying</span>
    &nbsp;
    <span className="text-transparent bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text">
      smart
    </span>
    <img
      src="/home.png"
      width={120}
      height={60}
      className="mb-5 ml-5"
      alt="Home"
    />
  </h1>

  {/* Buttons for Buy, Sell, Rent */}
  <h1 className="text-black-500 text-3xl flex items-center mt-5  mb-10">
    <button className="py-1 px-4 border border-blue-200 border-opacity-20  bg-violet-100 rounded-xl">
      Buy
    </button>
    , &nbsp;
    <button className="py-1 px-4 border border-blue-200 border-opacity-20  bg-blue-100 rounded-xl">
      Sell
    </button>{" "}
    &nbsp; &amp; &nbsp;
    <button className="py-1 px-4 border border-blue-200 border-opacity-20  bg-pink-100 rounded-xl">
      Rent
    </button>{" "}
    &nbsp; with &nbsp;
    <button className="py-1 px-2 border border-blue-200 border-opacity-20  bg-gray-200 rounded-xl">
      Speety
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
  <button className="bg-black hover:bg-gray-900 text-white py-1 px-9 rounded-2xl h-20 flex items-center space-x-2 text-2xl font-poppins mb-5" onClick={loginDirect}>
    <span>Get started</span>
    &nbsp; &nbsp; &nbsp;
    <AiOutlineDoubleRight />
  </button>

  {/* No Credit Card Required */}
  <h2 className="text-gray-500 mb-10">(No Credit Card Required)</h2>
</div>

      </section>
    </div>
  );
}
