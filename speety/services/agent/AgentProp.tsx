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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden relative" onClick={()=>router.push(`/agent/profile/${email}`)}>
    <div className="absolute top-4 right-4 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold">
      #{license}
    </div>
    <img
      src={photoUrl}
      alt={name}
      width={200}
      height={200}
      className="w-full h-48 object-cover"
    />
    <div className="p-4 bg-[#E6EFE9] hover:bg-slate-200">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">{name}</h3>
        <div className="flex items-center">
        <p className='ml-2'><Rating name="read-only" value={stars} readOnly /></p>
        </div>
      </div>
      <p className="text-gray-500 dark:text-gray-400">Phone: {phone}</p>
      <p className="text-gray-500 dark:text-gray-400">Broker: {company}</p>
      <p className="text-gray-700 dark:text-gray-300 font-semibold">✍️ {reviewCount} Reviews</p>
    </div>
  </div>
  )
}

export default AgentProp;