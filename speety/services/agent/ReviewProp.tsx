import React, { useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { AiFillPhone } from "react-icons/ai";

interface Review{
name:string;
stars:number;
comment:string;
date:string;
profilePic:string;

}

const ReviewProp:React.FC<Review> = ({name,stars,comment,date,profilePic}) => {
  return (
    <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md hover:bg-[#E6EFE9]">
    <div className="flex items-center gap-2">
      <img src= {profilePic ? profilePic : "/placeholder.svg"} alt="" className="w-12 h-12 rounded-full"/>
      <div className="font-semibold text-md">{name}</div>
      <div className="text-sm text-gray-500 dark:text-gray-400"> <Rating name="read-only" value={stars} readOnly /></div>
    </div>
    <p className="text-sm text-black dark:text-gray-400">{comment}</p>
    <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
  </div>
  )
}

export default ReviewProp;