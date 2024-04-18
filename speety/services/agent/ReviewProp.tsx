import React, { useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { AiFillPhone } from "react-icons/ai";

interface Review{
name:string;
stars:number;
comment:string;
date:string;

}

import Image from 'next/image';

const ReviewProp:React.FC<Review> = ({name,stars,comment,date}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
    <div className="flex items-center gap-2">
      <img src="/seller.png" alt="" className="w-16 h-16"/>
      <div className="font-semibold text-xl">{name}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400"> <Rating name="read-only" value={stars} readOnly /></div>
    </div>
    <p className="text-lg text-black dark:text-gray-400">{comment}</p>
    <p className="text-sm text-gray-500 dark:text-gray-400">{date}</p>
  </div>
  )
}

export default ReviewProp;