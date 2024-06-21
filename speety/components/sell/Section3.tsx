import React from 'react'
import { FaCheckToSlot } from "react-icons/fa6";
export default function Section3() {
  return (
    <div>
            <div>
              <img src="/faqHome.jpg" alt="alt" />
        <section className='py-20 absolute inset-0 top-[84%] xl:top-[210%] 2xl:top-[210%]'> 
            <h1 className='text-2xl xl:text-7xl 2xl:text-9xl font-bold text-center px-20 xl:px-96 2xl:px-96 tracking-tighter text-[#16302B]'>Sell your home <button className='bg-blue-300 rounded-3xl px-3 xl:px-10 xl:py-6 2xl:px-10 2xl:py-6 tracking-tighter'>yourself</button></h1>
            <div className='flex items-center justify-center mt-4 xl:mt-14 2xl:mt-14'><button className='text-white bg-black rounded-2xl px-3 xl:px-10 2xl:px-10 xl:h-16 xl:w-60 2xl:h-16 2xl:w-60 text-xs xl:text-xl 2xl:text-xl font-bold uppercase'><a href="/post">Post for sale</a></button></div>
            <div className='flex'>
              <div className='mt-6 ml-6 xl:mt-20 xl:ml-40 2xl:mt-20 2xl:ml-40'>
                <h3 className='xl:text-3xl 2xl:text-3xl font-bold text-[#16302B]'>
                  Why sell 
                  <button className='text-gray-500 bg-yellow-300 rounded-2xl px-1 xl:px-0 2xl:px-0 xl:h-12 xl:w-44 2xl:h-12 2xl:w-44'>yourself?
                  </button>
                  </h3>
            <ul className='text-[8px] xl:text-lg 2xl:text-lg'>
                <li className='flex xl:py-1 2xl:py-1 mt-1'><FaCheckToSlot /> &nbsp;  &nbsp; Avoid paying a listing agent commission</li>
                <li className='flex xl:py-1 2xl:py-1'><FaCheckToSlot />&nbsp;  &nbsp;Advertise your listing for free on Zillow</li>
                <li className='flex xl:py-1 2xl:py-1'><FaCheckToSlot />&nbsp;  &nbsp;Flexibility and control from start to finish</li>
            </ul>
            </div>
            {/* <div className='flex items-center justify-end'>
            <img
                src="/sellSolo.png"
                alt="Home"
                style={{ width: "300px" }}
                className='ml-16 mt-8'
      
    />
    </div> */}
    </div>
        </section>
    </div>
    </div>
  )
}
