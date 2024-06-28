"use client"
import React from 'react'
import Bottom from '@/services/homepage/Bottom'
import { AiFillTwitterCircle } from "react-icons/ai";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function Footer() {
  const router = useRouter();
  return (
    <div className='bg-gray-200'>
<section>
    {/* This DIV will be handling the social media icons */}
    <div className='py-6 xl:py-6 2xl:py-6 flex justify-between'>
  <ul className='flex ml-16 xl:ml-0 2xl:ml-0 mt-4 xl:mt-0 2xl:mt-0 xl:px-10 2xl:px-10'>
    <li className='mr-4'><AiFillTwitterCircle size="30px"/></li>
    <li className='mr-4'><FaInstagram size="30px"/></li>
    <li className='mr-4'><FaFacebook size="28px"/></li>
  </ul>
  
  <div className='flex flex-col md:flex-row xl:flex-row 2xl:flex-row gap-6 xl:gap-0 2xl:gap-0'>
    <div className="mr-20 xl:ml-8 xl:mr-8 2xl:ml-8 2xl:mr-8">
    <Bottom 
      title="Resources"
      opt1="FAQ"
      opt2="Wiki"
      opt3=""
    />
    </div>
    <div className="mr-10 xl:ml-8 xl:mr-8 2xl:ml-8 2xl:mr-8"> {/* Add margin between each Bottom component */}
      <Bottom 
        title="Legal"
        opt1="Privacy Policy"
        opt2="Terms of Service"
        opt3=""
      />
    </div>
    <div className="mr-10 xl:ml-8 xl:mr-8 2xl:ml-8 2xl:mr-8"> {/* Add margin between each Bottom component */}
      <Bottom 
        title="Company"
        opt1="Contact"
        opt2="Email"
        opt3="Discord"
      />
    </div>
  </div>
</div>
<div className='flex items-center justify-center gap-2 md:gap-4 p-2 '>
    {/* This is the section for download images */}
    <img src="/appstore.svg" alt="appstore" onClick={()=>router.push("/503")}/>
    <img src="/googleplay.svg" alt="appstore" onClick={()=>router.push("/503")}/>
  </div>
<h1 className='text-center text-xs mt-6 mb-2 xl:mt-0 2xl:mt-0'>
   &copy; 2024 Scail. All rights reserved.
  </h1>
  <div className='mt-6'>
    <img src="/footer.png" alt="footer" />
  </div>

</section>
    </div>
  )
}
