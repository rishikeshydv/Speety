"use client"
import React from 'react'
import Typist from "react-typist-component";
export default function Section1() {
  return (
    <div>
      <img src="/wide3.jpg" alt="alt" className='aspect-video object-cover object-center w-full xl:h-[500px] 2xl:h-[1000px]'/>
        <section className=' flex flex-col items-center justify-center absolute xl:left-1/4 xl:bottom-1/4 2xl:left-1/3 2xl:bottom-1/3'>
        
  {/* "Selling fast" */}
  <div className="xl:text-7xl 2xl:text-9xl tracking-tighter font-bold flex items-center">
    <span className='text-[#16302B]'>Selling your home</span>
  </div>

  {/* "Buying smart" with gradient text */}
  <h1 className="xl:text-7xl 2xl:text-9xl tracking-tighter font-bold flex items-center mb-10">
    <span className='text-[#16302B]'>with</span>
    &nbsp;
    <span className="text-transparent bg-gradient-to-r from-[#90A955] to-[#397367] bg-clip-text">
      confidence
    </span>
    <img
      src="/sell_house.png"
      width={120}
      height={60}
      className="mb-5 ml-5"
      alt="Home"
    />
  </h1>
        <button className="py-1 px-4 border font-semibold tracking-tighter border-blue-200 border-opacity-20 text-[#16302B] text-md xl:text-md 2xl:text-xl mb-10">
    <Typist>Scail is making it simpler to sell your home and move forward.</Typist>
  </button>
        </section>
    </div>
  )
}
