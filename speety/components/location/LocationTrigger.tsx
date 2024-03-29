/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmSLpMcxfZm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import React from "react"
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
interface PopOverComponentProps {
src: string;
_className: string;
content:any
videoOnClick:any
}

const LocationTrigger:React.FC<PopOverComponentProps> = ({src,_className,content,videoOnClick}) => {
  return (
            <Popover>
      <PopoverTrigger asChild>
      <button onClick={videoOnClick}>
        <img
          src={src}
          className={_className}
        />
</button>
{/* Popover for video-call */}
      </PopoverTrigger>
      <PopoverContent align="end" style={{ width: "1700px", height: "1000px" }} className="flex-col border-0 p-0 bg-gray-600" side="top">
        {/* <PopOverComponent callerVideoRef={null} receiverVideoRef={null} callerUser="Mary" receiverUser="John"/> */}
        {content}
      </PopoverContent>
    </Popover>
  )
}

export default LocationTrigger;