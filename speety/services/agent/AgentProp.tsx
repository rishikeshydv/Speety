import React, { useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { AiFillPhone } from "react-icons/ai";
interface Agent{
    photoUrl:string;    //we wont be using image like zillow, we will use GIF/Video
    name:string;
    stars:number;
    phone:string;
    usersReviews:number;
    company: string;
    license: string;

}
const AgentProp:React.FC<Agent> = ({photoUrl,name,stars,phone,usersReviews,company,license}) => {
  return (
    <div className='border-2 shadow-md rounded-2xl h-80 w-96 bg-gray-600'>
        <img src={photoUrl} alt="houseVideo" className='rounded-2xl'/>
        <p className='text-2xl font-bold mt-2 ml-4'>{name}</p>
        <div className='flex ml-2'><AiFillPhone className='h-8 w-8' /><p className='text-xl mt-1'> {phone}</p></div>
        <p className='ml-2'><Rating name="read-only" value={stars} readOnly /></p>
        <p className='text-xl ml-2'>{usersReviews} Reviews</p>
        <p className='ml-2'>{company}</p>
        <p className='ml-2' >Agent License #: {license}</p>
    </div>
  )
}

export default AgentProp;