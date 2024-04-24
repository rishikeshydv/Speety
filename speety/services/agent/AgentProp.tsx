"use client";
import React, { useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { AiFillPhone } from "react-icons/ai";
import { useRouter } from 'next/navigation';

interface Agent{
  photoUrl:string; 
  name:string;
  stars:number;
  phone:string;
  reviewCount:number;
  company: string;
  license: string;
  email: string;

}


const AgentProp:React.FC<Agent> = ({photoUrl,name,stars,phone,reviewCount,company,license,email}) => {
  const router = useRouter();
  return (
    <div className='border-2 shadow-md rounded-2xl h-80 w-96 bg-gray-200 p-6' onClick={()=>router.push(`/agent/profile/${email}`)}>
      <div className='px-6'><img src={photoUrl} alt="houseVideo" className='rounded-2xl' width={60} height={60}/></div> 
        <p className='text-2xl font-bold mt-2 ml-4'>{name}</p>
        <div className='flex ml-2'><AiFillPhone className='h-8 w-8' /><p className='text-xl mt-1'> {phone}</p></div>
        <p className='ml-2'><Rating name="read-only" value={stars} readOnly /></p>
        <p className='text-xl ml-2 font-semibold'>{reviewCount} Reviews</p>
        <p className='ml-2'>{company}</p>
        <p className='ml-2' >Agent License #: {license}</p>
    </div>
  )
}

export default AgentProp;