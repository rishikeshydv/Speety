"use client";
import React, { useState, useEffect } from "react";

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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import dayjs, { Dayjs } from 'dayjs';
import {
  collection,
  getDoc,
  doc
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import PushMeetings from "@/queries/Meetings/PushMeetings";

interface TopRightProps {
callerRef:any
receiverRef:any
videoOnClick:any
senderLoc:any
receiverLoc:any
clickedUser:string
}

const TopRight:React.FC<TopRightProps> = ({callerRef,receiverRef,videoOnClick, senderLoc,receiverLoc, clickedUser}) => {
  const [_user] = useAuthState(auth);

  const [datetime, setDatetime] = useState<Dayjs | null>(dayjs('2022-04-17T15:30'));
  const [show, setShow] = useState(false);

  const [userPic,setUserPic] = useState<string|null>("");
  const [userName,setUserName] = useState<string|null>("");
  const [status,setStatus] = useState<string|null>("Offline");
  const [statusColor,setStatusColor] = useState<string|null>("text-gray-500");
  useEffect(() => {
  const getUserInfo = async (_userEmail:string) => {
    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, _userEmail);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      setUserPic(userSnapshot.data().profilePic);
      setUserName(userSnapshot.data().name);
      setStatus(userSnapshot.data().loginStatus);
      if(userSnapshot.data().loginStatus === "Online"){
        setStatusColor("text-green-500");
      }
      else{
        setStatusColor("text-gray-500");
      }

    }
  }
  if (clickedUser){
    getUserInfo(clickedUser);
  }
   
}, [clickedUser]);

  //PushNotifications(user?.email as string,email,"msg",currentTime.format("YYYY-MM-DD HH:mm:ss"))

  return (
    <div className="flex justify-between bg-gray-200 rounded-2xl mt-2 h-20 px-6">
    <div className="flex items-center space-x-2">
      <button>
        <img
          src={userPic as string}
          alt="Image description"
          className="w-12 h-12 rounded-full ml-3"
        />
      </button>
      <div>
        <div className="font-semibold text-xl ml-4">{userName}</div>
        <div className={`text-md ${statusColor} ml-4`}>
          {status}
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
  <PopoverTrigger onClick={()=>setShow(true)}>
  <img
          src="/calendar-icon.webp"
          alt="Image description"
          className="w-26 h-14 rounded-full"
        />
  </PopoverTrigger>

{show && (
    <PopoverContent style={{width:600,height:600}} className="mr-10 mt-6 bg-gray-300 rounded-3xl">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <StaticDateTimePicker 
       className="w-full h-full bg-gray-300 rounded-3xl p-4"
       value={datetime}
       onChange={(newValue) => setDatetime(newValue)}
       onAccept={()=>{
        setShow(false);
      console.log(datetime?.toString());
      alert("Appointment Scheduled for "+datetime?.toString());
      //we need to push this meeting to both sender and receiver database
      PushMeetings(_user?.email as string,clickedUser,datetime?.toString() as string);
      PushMeetings(clickedUser, _user?.email as string,datetime?.toString() as string);
    }} 
       />
           </LocalizationProvider>
  </PopoverContent>
 )}

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