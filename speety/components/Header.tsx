"use client"

import React, { useState,useEffect } from 'react'
import poppins from "@/font/font";
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from "react-icons/ai";
import logout from '@/firebase/auth/logout';
import checkNotifications from '@/queries/checkNotifications';
import retrieveNotifications from '@/queries/retrieveNotifications';
import NotificationProp from '../services/header/NotificationProp';
import NotificationSettle from '@/queries/NotificationSettle';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"





export default function Header() {
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
      <div className='flex items-center justify-between p-4'>
        <div className='flex items-center'>
            <img src="/speety_logo.png" alt="logo"/>
        </div>
        {user && (
          <div className='flex items-start justift-end text-xl shadow-sm px-4 mt-0 mb-36'>
             <button onClick={dashboardRedirect} className='font-bold  text-blue-300  top-8 right-80 hover:text-2xl hover:underline'>{user?.email}</button>
             <button onClick={()=>{}} className='ml-2'><img src="/msgIcon.png" className='w-12 h-12  top-5 right-52'/></button>



            <DropdownMenu>
            <DropdownMenuTrigger>
              <button onClick={()=>{}} className='ml-2'><img src={notificationIcon} className='w-12 h-12  top-5 right-32'/>
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



             <button onClick={logoutUser} className='ml-2'><AiOutlineLogout className='w-12 h-12  top-5 right-12'/></button>
          </div>
)}
</div>
        <div className='w-screen h-20 bg-gray-400'>
            <ul className='font-bold flex items-center justify-center'>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5'><a href='/buy'>BUY</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='/rent'>RENT</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='/sell'>SELL</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='/agent'>AGENT</a></li>
                <li className=' text-white hover:text-black hover:scale-125 text-3xl mt-5 ml-16'><a href='/help'>HELP</a></li>
            </ul>
        </div>
    </div>
  )
}
