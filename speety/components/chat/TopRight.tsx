"use client";
import React, { useState, useEffect } from "react";

//imports for video call
import PopoverTriggerComponent from "@/components/video/PopOverTriggerComponent";
import LocationTrigger from "../location/LocationTrigger";

//imports for calendar
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDateTimePicker } from '@mui/x-date-pickers/StaticDateTimePicker';
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
clickedUser:string
endCall:any
callAccepted:React.MutableRefObject<boolean>
sendEndCallMessage:()=>void
changeCallEndedState:()=>void
callEndedState:boolean
}

const TopRight:React.FC<TopRightProps> = ({callerRef,receiverRef,videoOnClick, clickedUser,endCall, callAccepted,sendEndCallMessage,changeCallEndedState,callEndedState}) => {
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

  return (
    <div className="flex justify-between bg-gray-200 rounded-2xl mt-2 h-16 px-6">
    <div className="flex items-center space-x-2">
      <button>
        <img
          src={userPic as string}
          alt="Image description"
          className="w-10 h-10 rounded-full ml-3"
        />
      </button>
      <div>
        <div className="font-semibold text-md ml-4">{userName}</div>
        <div className={`text-xs ${statusColor} ml-4`}>
          {status}
        </div>
      </div>
    </div>

{/* Video Call Component */}
    <div className="flex items-center">
    <PopoverTriggerComponent src="/facetime.png" _className="w-12 h-14 rounded-full" videoOnClick={videoOnClick} callerVideoRef={callerRef} receiverVideoRef={receiverRef} endCall={endCall} callAccepted={callAccepted} sendEndCallMessage={sendEndCallMessage} changeCallEndedState={changeCallEndedState} callEndedState={callEndedState}/>

    {/* Location Component */}
<LocationTrigger 
src="/map.png" 
_className="w-18 h-12 rounded-full" 
clickedUser={clickedUser}
/>

{/* Calender Element */}
<Popover>
  <PopoverTrigger onClick={()=>setShow(true)}>
  <img
          src="/calendar-icon.webp"
          alt="Image description"
          className="w-10 h-10 mb-1 rounded-full"
        />
  </PopoverTrigger>

{show && (
    <PopoverContent style={{width:400,height:600}} className="mr-10 mt-6 bg-gray-300 rounded-3xl">
    <LocalizationProvider dateAdapter={AdapterDayjs}>
       <StaticDateTimePicker 
       className="w-full h-full bg-gray-300 rounded-3xl"
       value={datetime}
       onChange={(newValue) => setDatetime(newValue)}
       onAccept={()=>{
        setShow(false);
      console.log(datetime?.toString());
      alert("Appointment Scheduled for "+datetime?.toString());
      //we only push this meeting to the receiver
      PushMeetings(_user?.email as string,clickedUser,datetime?.toString() as string);
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