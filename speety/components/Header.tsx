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


//icons
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import NotificationsIcon from '@mui/icons-material/Notifications';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import LogoutIcon from '@mui/icons-material/Logout';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import EditCalendarIcon from '@mui/icons-material/EditCalendar';
import { set } from 'date-fns';

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
  const [isNotification, setIsNotification] = useState(false);
  const [isMeeting, setIsMeeting] = useState(false);
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
          setIsNotification(true);
        }
        //check meetings
        if (user && user.email){
        const meetingsExist = await CheckMeetings(user.email as string);
        if (meetingsExist) {
          setIsMeeting(true);
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
            <img src="/speety_logo.png" onClick={()=>router.push("/")} alt="logo" style={{width:200}}/>
        </div>
        {user && (
          <div className='absolute flex items-center justify-between shadow-sm px-4 py-1 top-4 right-1 bg-[#87a3a3] rounded-3xl'>
             <button onClick={dashboardRedirect} className='flex font-bold  right-80 '>
             <img src={userPic} alt="pp" className='w-8 h-8 bg-gray-300 p-1 rounded-full'/>
              <p className='mt-2 ml-2 text-sm hover:text-md hover:underline'>{userName}</p>
              </button>
             <button onClick={()=>router.push('/chat')} className='ml-4'>
              {/* <img src="/speech-balloon.png" className='w-12 h-12 right-52'/> */}
              <EmailRoundedIcon className='right-52' style={{width:25,height:25}}/>
              </button>

          {/* For Notification */}
            <DropdownMenu>
            <DropdownMenuTrigger>
              <button onClick={()=>{}} className='ml-2'>
                {
                  isNotification ? (
                    <NotificationsActiveIcon className='right-40'style={{width:25,height:25}}/>
                  ) : (
                    <NotificationsIcon className='right-40'style={{width:25,height:25}}/>
                  )
                }
              </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=''>
    <DropdownMenuSeparator />
    {notificationList && notificationList.map((notification: any, index: number) => (
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
              <button className='ml-2'>
                {isMeeting ? (
                  <EditCalendarIcon className="right-52" style={{width:25,height:25}}/>
                ) : (
                <CalendarMonthIcon className="right-52" style={{width:25,height:25}}/>
                )}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='mr-6'>
    <DropdownMenuSeparator />
    {/* Requested Meetings */}
    <div>
      <h1 className='px-2 text-xs font-bold'>Requests</h1>
      {meetingList &&  meetingList.map((meeting: any, index: number) => (
      <DropdownMenuItem key={index} >
        {
        meeting.status === "pending" ? (
          <NewMeetingProp from={meeting.email} date={meeting.date} id={meeting.id}/>
        )
        : null
        }
        
      </DropdownMenuItem>
    ))}
    </div>

{/* Upcoming Meetings */}
    <div>
      <h1 className='px-2 text-xs font-bold'>Upcoming</h1>
      {meetingList &&  meetingList.map((meeting: any, index: number) => (
      <DropdownMenuItem key={index} >
        {
        meeting.status === "accepted" && new Date(meeting.date) > new Date() ? (
          <AcceptedMeetingProp from={meeting.email} date={meeting.date} id={meeting.id}/>
        )
        : null
        }
        
      </DropdownMenuItem>
    ))}
    </div>

{/* Completed Meetings */}
    <div>
      <h1 className='px-2 text-xs font-bold'>Completed</h1>
      {meetingList &&  meetingList.map((meeting: any, index: number) => (
      <DropdownMenuItem key={index} >
        {
        meeting.status === "accepted" &&  new Date(meeting.date) < new Date() ? (
          <AcceptedMeetingProp from={meeting.email} date={meeting.date} id={meeting.id}/>
        )
        : null
        }
        
      </DropdownMenuItem>
    ))}
    </div>

{/* Cancelled Meetings */}
    <div>
      <h1 className='px-2 text-xs font-bold'>Cancelled</h1>
      {meetingList &&  meetingList.map((meeting: any, index: number) => (
      <DropdownMenuItem key={index} >
        {
        meeting.status === "cancelled" ? (
          <CancelledMeetingProp from={meeting.email} date={meeting.date} id={meeting.id}/>
        )
        : null
        }
        
      </DropdownMenuItem>
    ))}
    </div>
  </DropdownMenuContent>
          </DropdownMenu>
             <button onClick={logoutUser} className='ml-4'>
              <LogoutIcon className="w-6 h-6 right-8" style={{width:20,height:20}}/>
              </button>
          </div>
)}
</div>
        <div className='w-screen h-12 bg-[#87a3a3]'>
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
