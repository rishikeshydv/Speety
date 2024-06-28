/**
 * v0 by Vercel.
 * @see https://v0.dev/t/WddhBaSmvyH
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { useRouter } from "next/navigation";
import React, { useState } from "react"
export default function TimerStartConfirm() {
    const router = useRouter()
    const [time,setTime] = useState(5)
    setTimeout(() => {
        setTime(time-1)
    }, 1000);
    setTimeout(() => {
        router.push("/timer")
    }, 5000);

    return (
<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
  <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-200 p-6 max-w-lg w-full">
    <div className="text-center space-y-6">
      <h1 className="text-4xl font-extrabold text-gray-900 drop-shadow-md">Your identity has been confirmed</h1>
      <p className="text-gray-700 text-lg">Your timer begins in</p>
      <div className="flex items-center justify-center gap-4 text-6xl font-bold text-gray-900">
        <div className="w-20 h-20 rounded-full bg-gray-300 flex items-center justify-center animate-pulse shadow-lg">
          {time}
        </div>
      </div>
    </div>
  </div>
</div>

    )
  }