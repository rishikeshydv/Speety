"use client"

import React from 'react'
import poppins from "@/font/font";
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
export default function Header() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  const dashboardRedirect = () => {
    router.push(`/dashboard/${user?.email}`)
  }
  return (
    <div className={poppins.className}>
        <div className='flex items-center justify-center'>
            <img src="/speety_logo.png" alt="logo"/>
        </div>
        {user && (
 <button onClick={dashboardRedirect} className='text-xl font-bold text-blue-300 shadow-sm px-4 absolute top-6 right-10'>{user?.email}</button>
)}
    </div>
  )
}
