"use client";
import React, { useState, useEffect } from "react";

//imports for video call
import PopoverTriggerComponent from "@/components/video/PopOverTriggerComponent";
import { FaCalendarAlt } from "react-icons/fa";
import { FaLocationArrow } from "react-icons/fa";
import { FaVideo } from "react-icons/fa6";
//imports for calendar
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const DummyTopRight = () => {
  const [_user] = useAuthState(auth);


  //PushNotifications(user?.email as string,email,"msg",currentTime.format("YYYY-MM-DD HH:mm:ss"))

  return (
    <div className="flex items-end justify-end bg-gray-200 rounded-2xl mt-2 h-16 px-6 md:w-[calc(93%-0px)] xl:w-[calc(100%-0px)] 2xl:w-[calc(100%-0px)]">
    <div className="flex items-end justify-end gap-3 md:gap-4 mb-4">
    <FaVideo className="h-4 w-4 md:h-7 md:w-7"/>
    <FaLocationArrow className="h-4 w-4 md:h-5 md:w-5 mb-1"/>

{/* Calender Element */}

<FaCalendarAlt className="h-4 w-4 md:h-6 md:w-6 mb-1"/>
    </div>
  </div>



  );
}


export default DummyTopRight;