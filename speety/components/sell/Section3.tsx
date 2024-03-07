import React from 'react'
import { FaCheckToSlot } from "react-icons/fa6";
export default function Section3() {
  return (
    <div>
            <div>
        <section className='py-52'> 
            <h1 className='text-9xl font-bold text-center px-96'>Sell your home <button className='bg-blue-300 rounded-3xl px-10 py-6'>yourself</button></h1>
            <div className='flex items-center justify-center mt-20'><button className='text-white bg-black rounded-2xl px-10 h-24 w-80 text-3xl font-bold uppercase'>Post for sale</button></div>
            <div className='flex'><div className=' mt-20 ml-40'><h3 className='text-5xl font-bold'>Why sell <button className='text-gray-500 bg-yellow-300 rounded-2xl h-16 w-64'>yourself?</button></h3>
            <ul className='text-2xl'>
                <li className='flex py-4'><FaCheckToSlot /> &nbsp;  &nbsp; Avoid paying a listing agent commission</li>
                <li className='flex py-4'><FaCheckToSlot />&nbsp;  &nbsp;Advertise your listing for free on Zillow</li>
                <li className='flex py-4'><FaCheckToSlot />&nbsp;  &nbsp;Flexibility and control from start to finish</li>
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
    </div>
  )
}
