/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QuFIIA2RWto
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import poppins from "@/font/font";
import getUserProfile from "@/queries/getUserProfile"
import { useState,useEffect } from "react"
interface MeetingProps {
from:string
date:string
}
import { Button } from "@/components/ui/button";

const MeetingProp:React.FC<MeetingProps> = ({from,date}) => {
  //retrieve profilePic and name of the user
  const [userProfile, setUserProfile] = useState<any>({});
  useEffect(() => {
    getUserProfile(from).then((userProfile: any) => {
      setUserProfile(userProfile);
    });
  }
  , []);

    return (
      <div className={`grid items-center gap-4 px-4 py-2 border rounded-lg shadow-md hover:shadow-md transition-colors bg-gray-200 ${poppins.className}`} style={{width:400}}>
        <div className="grid">
        <img src="/calendar-icon.webp" className="w-10 h-10" />
        <div className='flex font-semibold  text-blue-300'>
             <img src={userProfile.profilePic} alt="pp" className='w-12 h-12 bg-gray-300 p-1 rounded-full'/>
              <p className='ml-2 text-md text-blue-700'>You have a meeting with {userProfile.name} on {date}</p>
        </div>   
        <div className="flex items-center gap-2">
        <Button className="bg-green-500">Accept</Button>
        <Button className="bg-red-400">Decline</Button>
        </div>       
        </div>
      </div>
    )
  }
  export default MeetingProp;
  