"use client"
import React from 'react'
import Typist from "react-typist-component";
export default function Section1() {
  return (
    <div>
      <img src="/wide3.jpg" alt="alt" className='aspect-video object-cover object-center w-full' style={{height:650}}/>
        <section className=' flex flex-col items-center justify-center absolute left-1/4 bottom-1/4'>
        
  {/* "Selling fast" */}
  <div className="text-7xl tracking-tighter font-bold flex items-center">
    <span className='text-[#16302B]'>Selling your home</span>
  </div>

  {/* "Buying smart" with gradient text */}
  <h1 className="text-7xl tracking-tighter font-bold flex items-center mb-10">
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
        <button className="py-1 px-4 border font-semibold tracking-tighter border-blue-200 border-opacity-20 text-[#16302B] text-md mb-10">
    <Typist>Scail is making it simpler to sell your home and move forward.</Typist>
  </button>
        </section>
    </div>
  )
}
