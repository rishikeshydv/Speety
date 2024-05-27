"use client"

import React, { useState,useEffect } from 'react'
import poppins from "@/font/font";
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import logout from '@/firebase/auth/logout';

import RetrieveNotifications from '@/queries/Notifications/RetrieveNotifications';
import CheckNotifications from '@/queries/Notifications/CheckNotifications';
import NewNotificationProp from '../services/header/NewNotificationProp';
import NewMeetingProp from '@/services/header/NewMeetingProp';
import AcceptedMeetingProp from '@/services/header/AcceptedMeetingProp';
import CancelledMeetingProp from '@/services/header/CancelledMeetingProp';
import CheckMeetings from '@/queries/Meetings/CheckMeetings';
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
import NewReviewNotificationProp from '@/services/header/NewReviewNotificationProp';
import OldReviewNotificationProp from '@/services/header/OldReviewNotificationProp';
import RetrieveMeetings from '@/queries/Meetings/RetrieveMeetings';


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
  const [notificationSize, setNotificationSize] = useState('w-8 h-8');
  const [meetingIcon, setMeetingIcon] = useState("/calendar-icon.webp");
  const [meetingIconSize, setMeetingIconSize] = useState('w-8 h-8');
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
          setNotificationSize('w-12 h-12');
        }
        //check meetings
        if (user && user.email){
        const meetingsExist = await CheckMeetings(user.email as string);
        if (meetingsExist) {
          setMeetingIcon("/active_meetings.png");
          setMeetingIconSize('w-12 h-12');
        }
      }
        //retrieve notifications
        const notifications = await RetrieveNotifications(user?.email as string);
        setNotificationList(notifications);

        //retrieve meetings
        if (user && user.email){
          const meeting = await RetrieveMeetings(user.email);
          setMeetingList(meeting);
        }
        else{
          return;
        }
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchData();

    //retrieveing username and profile picture
    if (user && user.email){
      getUserProfile(user?.email as string).then((userProfile: any) => {
        setUserName(userProfile.name);
        setUserPic(userProfile.profilePic);
      });
    }
    // Cleanup function if needed
    return () => {
      // Any cleanup code here if needed
    };
  }, [user]);


  return (
    <div className={poppins.className}>
      <div className='flex items-center justify-center p-4'>
        <div className='flex items-center justify-center'>
            <img src="/speety_logo.png" alt="logo" style={{width:300}}/>
        </div>
        {user && (
          <div className='absolute flex items-center justify-between shadow-sm px-4 top-1 right-2'>
             <button onClick={dashboardRedirect} className='flex font-bold  text-blue-300 right-80 '>
             <img src={userPic} alt="pp" className='w-8 h-8 bg-gray-300 p-1 rounded-full'/>
              <p className='mt-2 ml-2 text-sm hover:text-md hover:underline'>{userName}</p>
              </button>
             <button onClick={()=>router.push('/chat')} className='ml-2'><img src="/speech-balloon.png" className='w-12 h-12 right-52'/></button>

          {/* For Notification */}
            <DropdownMenu>
            <DropdownMenuTrigger>
              <button onClick={()=>{}} className='ml-2'><img src={notificationIcon} className={`${notificationSize} right-40 mt-1`}/>
              </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=''>
    <DropdownMenuSeparator />
    {notificationList.map((notification: any, index: number) => (
      <DropdownMenuItem className='overflow-scroll' key={index}>
        {
notification.type === "chat" && notification.age === "new" ? (
            <NewNotificationProp id={notification.id} type={notification.type} from={notification.from} date={notification.date} selfName={userName}/>
          ) 
          
          : notification.type === "review" && notification.age === "new" ? 
           (
            <NewReviewNotificationProp id={notification.id} type={notification.type} from={notification.from} date={notification.date}/>
          )
          : (
            <OldReviewNotificationProp id={notification.id} type={notification.type} from={notification.from} date={notification.date}/>
          )
        }
        
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
          </DropdownMenu>

          {/* For Meetings/Appointments */}
          <DropdownMenu>
            <DropdownMenuTrigger>
              <button className='ml-2 mt-1'><img src={meetingIcon} className={`${meetingIconSize} right-52`}/></button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mr-6'>
    <DropdownMenuSeparator />
    {meetingList &&  meetingList.map((meeting: any, index: number) => (
      <DropdownMenuItem key={index} >
        {
        meeting.status === "pending" ? (
          <NewMeetingProp from={meeting.email} date={meeting.date} id={meeting.id}/>
        ):
        meeting.status === "cancelled" ? (
          <CancelledMeetingProp from={meeting.email} date={meeting.date} id={meeting.id}/>
        )
        : meeting.status === "accepted" ?
         (
          <AcceptedMeetingProp from={meeting.email} date={meeting.date} id={meeting.id}/>
        )
        : null
        }
        
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
          </DropdownMenu>
             <button onClick={logoutUser} className='ml-4'><img src="/logout.webp" className="w-6 h-6 right-10"/></button>
          </div>
)}
</div>
        <div className='w-screen h-12 bg-gray-400'>
            <ul className='font-bold flex items-center justify-center'>
                <li className=' text-white hover:text-black hover:scale-125 text-xl mt-2'><a href='/buy'>BUY</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-xl ml-16 mt-2'><a href='/rent'>RENT</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-xl ml-16 mt-2'><a href='/sell'>SELL</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-xl ml-16 mt-2'><a href='/agent'>AGENT</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-xl ml-16 mt-2'><a href='/contact'>HELP</a></li>
            </ul>
        </div>
    </div>
  )
}
