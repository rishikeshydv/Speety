"use client"

import React from 'react'
import { FaCheckToSlot } from "react-icons/fa6";

export default function Section2() {
  return (
    <div className='bg-gray-200'>
        <section className='py-10 xl:py-20 2xl:py-80'>
            <h1 className='text-2xl md:text-5xl xl:text-7xl 2xl:text-9xl font-bold text-center px-16 xl:px-96 2xl:px-96 tracking-tighter text-[#16302B]'>Sell traditionally with an <button className='bg-[#397367] rounded-3xl px-2 md:px-4 md:py-4 2xl:px-4 2xl:py-4 tracking-tighter text-white'>agent</button></h1>
            <div className='flex items-center justify-center mt-6 xl:mt-20 2xl:mt-20 tracking-tighter'><button className='bg-white rounded-2xl px-2 md:px-10 2xl:px-10 md:h-16 md:w-80 2xl:h-16 2xl:w-80 text-md md:text-2xl xl:text-3xl 2xl:text-3xl font-bold uppercase tracking-tighter text-[#397367]'><a href="/agent">Find an agent</a></button></div>
            <div className='flex 2xl:items-center 2xl:justify-center'>
              <div className=' mt-10 px-10 xl:px-0 2xl:px-0 xl:ml-40 2xl:ml-40'>
            <h3 className='md:text-xl xl:text-3xl 2xl:text-3xl font-bold text-[#16302B]'>Why sell with</h3> 
            <button className='text-white bg-[#397367] rounded-2xl px-2 xl:px-0 2xl:px-0 xl:h-12 xl:w-36 2xl:h-12 2xl:w-36 md:text-xl xl:text-3xl 2xl:text-3xl font-bold'>agents?</button>
 
            <ul className='text-[8px] md:text-[14px] xl:text-lg 2xl:text-lg xl:mt-4 2xl:mt-4'>
                <li className='flex py-1'><FaCheckToSlot /> &nbsp;  &nbsp; Potential for bidding wars</li>
                <li className='flex py-1'><FaCheckToSlot />&nbsp;  &nbsp;Access to local market expertise</li>
                <li className='flex py-1'><FaCheckToSlot />&nbsp;  &nbsp;Get help negotiating and reviewing offers</li>
                <li className='flex py-1'><FaCheckToSlot />&nbsp;  &nbsp;Navigate with a dedicated guide</li>
            </ul>
            </div>
            <div className='flex items-center justify-end'>
            <img
                src="/svgs/9.png"
                className="xl:ml-20 mt-6 md:w-[350px] xl:w-[500px] 2xl:w-[500px]"
                alt="Home"
    />
    </div>
    </div>
        </section>
    </div>
  )
}
