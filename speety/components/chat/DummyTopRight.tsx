"use client";
import React, { useState, useEffect } from "react";

//imports for video call
import PopoverTriggerComponent from "@/components/video/PopOverTriggerComponent";

//imports for calendar
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

const DummyTopRight = () => {
  const [_user] = useAuthState(auth);


  //PushNotifications(user?.email as string,email,"msg",currentTime.format("YYYY-MM-DD HH:mm:ss"))

  return (
    <div className="flex items-end justify-end bg-gray-200 rounded-2xl mt-2 h-16 px-6">
    <div className="flex items-end justify-end">
      <img src="/facetime.png" alt="dummy" className="w-12 h-14 mb-1 rounded-full"/>
    <img src="/map.png" alt="" className="w-18 h-12 mb-2"/>

{/* Calender Element */}

  <img
          src="/calendar-icon.webp"
          alt="Image description"
          className="w-10 h-10 mb-3 rounded-full"
        />
    </div>
  </div>



  );
}


export default DummyTopRight;