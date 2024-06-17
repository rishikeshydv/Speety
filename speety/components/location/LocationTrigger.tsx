/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmSLpMcxfZm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import React from "react"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import LocationPopOver from "./LocationPopOver";
import poppins from "@/font/font";
interface PopOverComponentProps {
src: string;
_className: string;
clickedUser:string;

}

const LocationTrigger:React.FC<PopOverComponentProps> = ({src,_className,clickedUser}) => {
  return (
    <div className={poppins.className}>
    <Popover>
    <PopoverTrigger asChild>
    <button>
      <img
        src={src}
        className={_className}
      />
</button>
{/* Popover for video-call */}
    </PopoverTrigger>
    <PopoverContent align="end" className="flex-col border-0 bg-gray-400 rounded-3xl p-6" side="top">
      <LocationPopOver clickedUser={clickedUser}/>
    </PopoverContent>
  </Popover>
  </div>
  )
}

export default LocationTrigger;