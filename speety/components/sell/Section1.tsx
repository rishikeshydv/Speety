"use client"
import React from 'react'
import Typist from "react-typist-component";
export default function Section1() {
  return (
    <div>
      <img src="/wide3.jpg" alt="alt" className='aspect-video object-cover object-center w-full xl:h-[500px] 2xl:h-[1000px]'/>
        <section className=' flex flex-col items-center justify-center absolute left-20 bottom-2/3 xl:left-1/4 xl:bottom-1/4 2xl:left-1/3 2xl:bottom-1/3'>
        
  {/* "Selling fast" */}
  <div className="text-2xl xl:text-7xl 2xl:text-9xl tracking-tighter font-bold flex items-center">
    <span className='text-[#16302B]'>Selling your home</span>
  </div>

  {/* "Buying smart" with gradient text */}
  <h1 className="text-2xl xl:text-7xl 2xl:text-9xl tracking-tighter font-bold flex items-center xl:mb-10 2xl:mb-10">
    <span className='text-[#16302B]'>with</span>
    &nbsp;
    <span className="text-transparent bg-gradient-to-r from-[#90A955] to-[#397367] bg-clip-text">
      confidence
    </span>
    <img
      src="/sell_house.png"
      className=" ml-1 xl:ml-5 2xl:ml-5 w-8 h-8 xl:w-[100px] xl:h-[90px] 2xl:w-[100px] 2xl:h-[90px]"
      alt="Home"
    />
  </h1>
        <button className="py-1 px-4 border font-semibold tracking-tighter border-blue-200 border-opacity-20 text-[#16302B] text-[6px] xl:text-[16px] 2xl:text-[16px] mb-10">
    <Typist>Scail is making it simpler to sell your home and move forward.</Typist>
  </button>
        </section>
    </div>
  )
}
