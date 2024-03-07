"use client"

import React from 'react'
import { FaCheckToSlot } from "react-icons/fa6";

export default function Section2() {
  return (
    <div className='bg-gray-200'>
        <section className='py-52'>
            <h1 className='text-9xl font-bold text-center px-96'>Sell traditionally with an <button className='bg-red-400 rounded-3xl px-10 py-6'>agent</button></h1>
            <div className='flex items-center justify-center mt-20'><button className='text-gray-500 bg-white rounded-2xl px-10 h-24 w-80 text-3xl font-bold uppercase'>Find an agent</button></div>
            <div className='flex'><div className=' mt-20 ml-40'><h3 className='text-5xl font-bold'>Why sell with <button className='text-gray-500 bg-green-300 rounded-2xl h-16 w-56'>agents?</button></h3>
            <ul className='text-2xl'>
                <li className='flex py-4'><FaCheckToSlot /> &nbsp;  &nbsp; Potential for bidding wars</li>
                <li className='flex py-4'><FaCheckToSlot />&nbsp;  &nbsp;Access to local market expertise</li>
                <li className='flex py-4'><FaCheckToSlot />&nbsp;  &nbsp;Get help negotiating and reviewing offers</li>
                <li className='flex py-4'><FaCheckToSlot />&nbsp;  &nbsp;Navigate with a dedicated guide</li>
            </ul>
            </div>
            <div className='flex items-center justify-end'>
            <img
                src="/sell_right.png"
                className="px-96 ml-80 h-fit w-fit"
                alt="Home"
      
    />
    </div>
    </div>
        </section>
    </div>
  )
}
