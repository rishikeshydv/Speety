"use client"

import React from 'react'
import poppins from "@/font/font";
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import { AiOutlineLogout } from "react-icons/ai";
import logout from '@/firebase/auth/logout';

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
  return (
    <div className={poppins.className}>
        <div className='flex items-center justify-center'>
            <img src="/speety_logo.png" alt="logo"/>
        </div>
        {user && (
          <div className='text-xl shadow-sm px-4'>
             <button onClick={dashboardRedirect} className='font-bold text-blue-300 absolute top-6 right-20'>{user?.email}</button>
             <button onClick={logoutUser} className='ml-2'><AiOutlineLogout className='w-8 h-8 absolute top-5 right-6'/></button>
          </div>
 
)}
    </div>
  )
}
