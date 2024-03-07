import React from 'react'
import poppins from "@/font/font";

export default function Header() {
  return (
    <div className={poppins.className}>
        <div className='flex items-center justify-center'>
            <img src="/speety_logo.png" alt="logo"/>
        </div>
        <div className='w-screen h-20 bg-gray-400'>
            <ul className='font-bold flex items-center justify-center'>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5'><a href='#'>BUY</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='#'>RENT</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='#'>SELL</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='#'>AGENT</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='#'>HELP</a></li>
            </ul>
        </div>
    </div>
  )
}
