"use client";
import React, { useState } from "react";

//imports for video call
import PopoverTriggerComponent from "@/components/video/PopOverTriggerComponent";
import PopOverComponent from "@/components/video/PopOverComponent";
import LocationTrigger from "../location/formPop/LocationTrigger";

//imports for calendar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';

interface TopRightProps {
callerRef:any
receiverRef:any
videoOnClick:any
addressConverter:any
senderLoc:any
receiverLoc:any
}

const TopRight:React.FC<TopRightProps> = ({callerRef,receiverRef,videoOnClick,addressConverter,senderLoc,receiverLoc}) => {
  //use realtime firebase to get the status
  var onlineStatus = "•Online";
  //parse these personal information while clicking on them on the left side
  //no need to hardcode them
  var user = "Mary";
  var imageUrl = "/old-woman.png";


  const [currentDate, setCurrentData] = useState(new Date());
  return (
    <div className="flex justify-between bg-gray-200 rounded-2xl mt-2 h-20 px-6">
    <div className="flex items-center space-x-2">
      <button>
        <img
          src="/user.png"
          alt="Image description"
          className="w-12 h-12 rounded-full ml-3"
        />
      </button>
      <div>
        <div className="font-semibold text-xl ml-4">Mary</div>
        <div className="text-sm text-green-500 font-bold ml-4">
          Online
        </div>
      </div>
    </div>

    <div className="flex items-center">
    <PopoverTriggerComponent src="/facetime.png" _className="w-16 h-20 rounded-full" content={<PopOverComponent callerVideoRef={callerRef} receiverVideoRef={receiverRef} callerUser="Mary" receiverUser="John"/>} videoOnClick={videoOnClick}/>
<LocationTrigger 
src="/map.png" 
_className="w-18 h-20 rounded-full" 
senderLoc={senderLoc}
receiverLoc={receiverLoc}/>

{/* Calender Element */}
<Popover>
  <PopoverTrigger>
  <img
          src="/calendar-icon.webp"
          alt="Image description"
          className="w-26 h-14 rounded-full"
        />
  </PopoverTrigger>
  <PopoverContent style={{width:600,height:500}} className="mr-10 mt-6 bg-gray-300 rounded-3xl">
  <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StaticDateTimePicker orientation="landscape" className="w-full h-full bg-gray-300 rounded-3xl py-4 px-4"/>
    </LocalizationProvider>
  </PopoverContent>
</Popover>

{/* 
      <a href="/buy">
        <img
          src="/cross.png"
          alt="Image description"
          className="w-26 h-12 rounded-full ml-6"
        />
      </a> */}
    </div>
  </div>



  );
}


export default TopRight;