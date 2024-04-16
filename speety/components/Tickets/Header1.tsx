"use client"

import React, { useState,useEffect } from 'react'
import poppins from "@/font/font";
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from "react-icons/ai";
import logout from '@/firebase/auth/logout';
import checkNotifications from '@/queries/Notifications/CheckNotifications';
import retrieveNotifications from '@/queries/Notifications/RetrieveNotifications';
import NotificationProp from '@/services/header/NotificationProp';
import NotificationSettle from '@/queries/Notifications/NotificationSettle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"





export default function Header1() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dashboardRedirect = () => {
    router.push(`/dashboard/${user?.email}`)
  }
  const logoutUser = () => {
    logout();
    router.push('/auth/login');
  }
  const [notificationIcon, setNotificationIcon] = useState("/notify.png");
  const [notificationList, setNotificationList] = useState<any>([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const notificationsExist = await checkNotifications(user?.email as string);
        if (notificationsExist) {
          setNotificationIcon("/notify_on.webp");
        }
        const notifications = await retrieveNotifications(user?.email as string);
        setNotificationList(notifications);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };
  
    fetchData();
  
    // Cleanup function if needed
    return () => {
      // Any cleanup code here if needed
    };
  }, [user?.email]);

  console.log(notificationList)


  return (
    <div className={poppins.className}>
      <div className='flex items-center justify-center p-4'>
        <div className='flex items-center justify-center'>
            <img src="/speety_logo.png" alt="logo"/>
        </div>
        {user && (
          <div className='absolute flex items-center justify-between text-xl shadow-sm px-4 top-5 right-5'>
             <button onClick={dashboardRedirect} className='font-bold  text-black-300  top-8 right-80 hover:text-2xl hover:underline'>{user?.email}</button>
             <button onClick={()=>{}} className='ml-2'><img src="/speech-balloon.png" className='w-16 h-16 right-52'/></button>



            <DropdownMenu>
            <DropdownMenuTrigger>
              <button onClick={()=>{}} className='ml-2'><img src={notificationIcon} className='w-11 h-11 right-32 mt-1'/>
              </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=''>
    <DropdownMenuSeparator />
    {notificationList.map((notification: any, index: number) => (
      <DropdownMenuItem key={index} onClick={()=>{NotificationSettle(notification.id,"OLD",notification.type,user?.email as string,notification.from,"completed",notification.date)}}>
        <NotificationProp from={notification.from} type={notification.type} date={notification.date}/>
      </DropdownMenuItem>
    ))}
  </DropdownMenuContent>
          </DropdownMenu>



             <button onClick={logoutUser} className='ml-4'><img src="/logout.webp" className="w-11 h-11 right-10"/></button>
          </div>
)}
</div>
    </div>
  )
}
