/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmSLpMcxfZm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import React from "react"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import MapPopOver from "./MapPopOver";
import poppins from "@/font/font";
interface PopOverComponentProps {
src: string;
_className: string;
}

const MapTrigger:React.FC<PopOverComponentProps> = ({src,_className}) => {
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
    <PopoverContent align="end" style={{ width: "800px", height: "600px" }} className="flex-col border-0 p-0 bg-gray-400 rounded-3xl" side="top">
      <MapPopOver/>
    </PopoverContent>
  </Popover>
  </div>
  )
}

export default MapTrigger;