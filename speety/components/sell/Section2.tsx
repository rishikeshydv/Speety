"use client"

import React from 'react'
import { FaCheckToSlot } from "react-icons/fa6";

export default function Section2() {
  return (
    <div className='bg-gray-200'>
        <section className='xl:py-20 2xl:py-80'>
            <h1 className='xl:text-7xl 2xl:text-9xl font-bold text-center px-96 tracking-tighter text-[#16302B]'>Sell traditionally with an <button className='bg-red-400 rounded-3xl px-4 py-6 tracking-tighter'>agent</button></h1>
            <div className='flex items-center justify-center mt-20 tracking-tighter'><button className='text-[#16302B] bg-white rounded-2xl px-10 h-16 w-80 text-3xl font-bold uppercase tracking-tighter'><a href="/agent">Find an agent</a></button></div>
            <div className='flex'>
              <div className=' mt-10 ml-40'>
            <h3 className='text-3xl font-bold text-[#16302B]'>Why sell with</h3>
            <button className='text-gray-500 bg-green-300 rounded-2xl h-12 w-36 text-3xl font-bold'>agents?</button>
 
            <ul className='text-lg mt-4'>
                <li className='flex py-1'><FaCheckToSlot /> &nbsp;  &nbsp; Potential for bidding wars</li>
                <li className='flex py-1'><FaCheckToSlot />&nbsp;  &nbsp;Access to local market expertise</li>
                <li className='flex py-1'><FaCheckToSlot />&nbsp;  &nbsp;Get help negotiating and reviewing offers</li>
                <li className='flex py-1'><FaCheckToSlot />&nbsp;  &nbsp;Navigate with a dedicated guide</li>
            </ul>
            </div>
            <div className='flex items-center justify-end'>
            <img
                src="/sell_right.png"
                className="ml-20 mt-6"
                alt="Home"
                style={{ width: "500px" }}
      
    />
    </div>
    </div>
        </section>
    </div>
  )
}
