/**
 * v0 by Vercel.
 * @see https://v0.dev/t/i9Ki0s3qTuL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import React, { useState, useEffect } from "react";

interface Props {
    message:string;
    msgTime:string;
    profilePic:string;
    status:string;
}
const NewProp1:React.FC<Props> = ({message,msgTime,profilePic, status}) => {
    const [updatedTime, setUpdatedTime] = useState<string>('')

    //default time: 2024-05-27 02:20:07 but i want to change it to 02:20 AM
    useEffect(() => {
    const time = new Date(msgTime)
    var hours = time.getHours()
    const minutes = time.getMinutes()
    const ampm = hours >= 12 ? 'PM' : 'AM';
    if (hours > 12) {
        hours = hours - 12;
    }
    const updatedTime = `${hours}:${minutes} ${ampm}`
    setUpdatedTime(updatedTime)
    }, [msgTime])


  return (
      <div className="flex items-start gap-3">
        <Avatar className="flex-shrink-0 w-7 h-7">
          <AvatarImage alt="@shadcn" src={profilePic} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="flex flex-col gap-1">
          <div className="bg-gray-700 text-white rounded-lg px-4 py-3 max-w-[300px] text-sm ">
            <p>
              {message}
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
            <time>{updatedTime}</time>
            {
                status === "sent" ? <CheckIcon className="w-4 h-4" />
                :
                status === "delivered" ? <DoubleCheckIcon className="w-4 h-4" />
                :
                status==="seen" ? <DoubleCheckIcon className="w-4 h-4" style={{color: 'blue'}}/>
                :null
            }
          </div>
        </div>
      </div>
  )
}

export default NewProp1

function CheckIcon(props:any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}

function DoubleCheckIcon(props:any) {
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
        <path d="M20 6L9 17l-5-5" />
        <path d="M20 12L9 23l-5-5" />
      </svg>
    );
  }