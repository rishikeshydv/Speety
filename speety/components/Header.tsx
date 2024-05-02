"use client"

import React, { useState,useEffect } from 'react'
import poppins from "@/font/font";
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from "react-icons/ai";
import logout from '@/firebase/auth/logout';

import RetrieveNotifications from '@/queries/Notifications/RetrieveNotifications';
import CheckNotifications from '@/queries/Notifications/CheckNotifications';
import NotificationProp from '../services/header/NotificationProp';
import NotificationSettle from '@/queries/Notifications/NotificationSettle';

import MeetingProp from '@/services/header/MeetingProp';
import CheckMeetings from '@/queries/Meetings/CheckMeetings';
import MeetingSettle from '@/queries/Meetings/MeetingSettle';
import getUserProfile from '@/queries/getUserProfile';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import updateStatus from "@/queries/changeLoginStatus";
import { set } from 'firebase/database';





export default function Header() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dashboardRedirect = () => {
    router.push(`/dashboard/${user?.email}`)
  }
  const logoutUser = async() => {
    updateStatus(user?.email as string,"Offline").then(() => {
    logout();
    router.push('/auth/login');
  }
  )}
  const [notificationIcon, setNotificationIcon] = useState("/notify.png");
  const [notificationSize, setNotificationSize] = useState('w-11 h-11');
  const [meetingIcon, setMeetingIcon] = useState("/calendar-icon.webp");
  const [notificationList, setNotificationList] = useState<any>([]);
  const [meetingList, setMeetingList] = useState<any>([]);
  const [userName, setUserName] = useState("");
  const [userPic, setUserPic] = useState("");
  useEffect(() => {
    const fetchData = async () => {
      try {
        //check notifications
        const notificationsExist = await CheckNotifications(user?.email as string);
        if (notificationsExist) {
          setNotificationIcon("/notify_on.webp");
          setNotificationSize('w-16 h-16');
        }
        //check meetings
        const meetingsExist = await CheckMeetings(user?.email as string);
        if (meetingsExist) {
          setMeetingIcon("/active_meetings.png");
        }
        //retrieve notifications
        const notifications = await RetrieveNotifications(user?.email as string);
        setNotificationList(notifications);

        //retrieve meetings
        const meeting = await RetrieveNotifications(user?.email as string);
        setMeetingList(meeting);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchData();

    //retrieveing username and profile picture
    if (!user) return;
    getUserProfile(user?.email as string).then((userProfile: any) => {
      setUserName(userProfile.name);
      setUserPic(userProfile.profilePic);
    });
    // Cleanup function if needed
    return () => {
      // Any cleanup code here if needed
    };
  }, [user?.email]);



  return (
    <div className={poppins.className}>
      <div className='flex items-center justify-center p-4'>
        <div className='flex items-center justify-center'>
            <img src="/speety_logo.png" alt="logo"/>
        </div>
        {user && (
          <div className='absolute flex items-center justify-between text-xl shadow-sm px-4 top-5 right-5'>
             <button onClick={dashboardRedirect} className='flex font-bold  text-blue-300 top-8 right-80 '>
             <img src={userPic} alt="pp" className='w-12 h-12 bg-gray-300 p-1 rounded-full'/>
              <p className='mt-3 ml-2 hover:text-2xl hover:underline'>{userName}</p>
              </button>
             <button onClick={()=>router.push('/chat')} className='ml-2'><img src="/speech-balloon.png" className='w-16 h-16 right-52'/></button>

          {/* For Notification */}
            <DropdownMenu>
            <DropdownMenuTrigger>
              <button onClick={()=>{}} className='ml-2'><img src={notificationIcon} className={`${notificationSize} right-32 mt-1`}/>
              </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='bg-gray-100'>
    <DropdownMenuSeparator />
    {notificationList.map((notification: any, index: number) => (
      <DropdownMenuItem key={index} onClick={()=>{NotificationSettle(notification.id,"OLD",notification.type,user?.email as string,notification.from,"completed",notification.date)}}>
        <NotificationProp from={notification.from} date={notification.date}/>
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
          </DropdownMenu>

          {/* For Meetings/Appointments */}
          <DropdownMenu>
            
            <DropdownMenuTrigger>
              <button className='ml-2 mt-1'><img src={meetingIcon} className='w-11 h-11 right-52'/></button>
              </DropdownMenuTrigger>

              <DropdownMenuContent className=''>
    <DropdownMenuSeparator />
    {meetingList.map((meeting: any, index: number) => (
      <DropdownMenuItem key={index} onClick={()=>{MeetingSettle(meeting.id,user?.email as string,meeting.from,"completed",meeting.date)}}>
        <MeetingProp from={meeting.from} date={meeting.date}/>
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
          </DropdownMenu>

             <button onClick={logoutUser} className='ml-4'><img src="/logout.webp" className="w-10 h-10 right-10"/></button>
          </div>
)}
</div>
        <div className='w-screen h-20 bg-gray-400'>
            <ul className='font-bold flex items-center justify-center'>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5'><a href='/buy'>BUY</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='/rent'>RENT</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='/sell'>SELL</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='/agent'>AGENT</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='/contact'>HELP</a></li>
            </ul>
        </div>
    </div>
  )
}
