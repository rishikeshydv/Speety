/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QuFIIA2RWto
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Button } from "@/components/ui/button";
import poppins from "@/font/font";
import getUserProfile from "@/queries/getUserProfile"
import { useState,useEffect } from "react"

interface NotificationProps {
from:string
date:string
}

const NotificationProp:React.FC<NotificationProps> = ({from,date}) => {
  //retrieve profilePic and name of the user
  const [userProfile, setUserProfile] = useState<any>({});
  useEffect(() => {
    getUserProfile(from).then((userProfile: any) => {
      setUserProfile(userProfile);
    });
  }
  , []);

    return (
      <div className={`grid items-center gap-4 px-4 py-2 border rounded-lg shadow-md hover:shadow-md transition-colors bg-gray-200 ${poppins.className}`}>
        <div className="grid">
        <img src="/connect.png" className="w-10 h-10" />
        <div className='flex font-bold  text-blue-300'>
             <img src={userProfile.profilePic} alt="pp" className='w-12 h-12 bg-gray-300 p-1 rounded-full'/>
              <p className='mt-3 ml-2 text-blue-700'>{userProfile.name} wants to connect.</p>
        </div>
        <div className="flex items-center gap-2">
        <Button className="bg-green-500">Accept</Button>
        <Button className="bg-red-400">Decline</Button>
        <p className="text-xs text-gray-500 dark:text-gray-400">{date}</p>
        </div>
          
        </div>
      </div>
    )
  }
  export default NotificationProp;
  function MailOpenIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
        <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
      </svg>
    )
  }
  