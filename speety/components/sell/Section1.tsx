"use client"
import React from 'react'
import Typist from "react-typist-component";
export default function Section1() {
  return (
    <div>
        <section className='py-52 flex flex-col items-center justify-center'>
        
  {/* "Selling fast" */}
  <div className="text-9xl font-bold flex items-center mb-10">
    <span>Selling your home</span>
  </div>

  {/* "Buying smart" with gradient text */}
  <h1 className="text-9xl font-bold flex items-center mb-10">
    <span>with</span>
    &nbsp;
    <span className="text-transparent bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text">
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
        <button className="py-1 px-4 border border-blue-200 border-opacity-20 text-blue-500 bg-blue-50 text-2xl mb-10">
    <Typist>Zillow is making it simpler to sell your home and move forward.</Typist>
  </button>
        </section>
    </div>
  )
}
