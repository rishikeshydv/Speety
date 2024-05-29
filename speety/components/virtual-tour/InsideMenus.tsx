import React from 'react'
import { Button } from "@/components/ui/button"
export default function InsideMenus() {
  return (
    <div className="bg-gray-100 dark:bg-gray-950 hidden md:flex flex-col gap-4 text-gray-900 dark:text-gray-50 px-2 py-40" style={{width:150}}>
    <div className="grid gap-2">
      <Button
        className="justify-start gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
        variant="ghost"
      >
        <HomeIcon className="w-5 h-5" />
        Living Room
      </Button>
      <Button
        className="justify-start gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
        variant="ghost"
      >
        <BedIcon className="w-5 h-5" />
        Bedroom
      </Button>
      <Button
        className="justify-start gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
        variant="ghost"
      >
        <BathIcon className="w-5 h-5" />
        Bathroom
      </Button>
      <Button
        className="justify-start gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
        variant="ghost"
      >
        <CookingPotIcon className="w-5 h-5" />
        Kitchen
      </Button>
      <Button
        className="justify-start gap-2 px-3 py-2 rounded-md hover:bg-gray-200 dark:hover:bg-gray-800"
        variant="ghost"
      >
        <ConciergeBellIcon className="w-5 h-5" />
        Balcony
      </Button>
    </div>
  </div>
  )
}

function BathIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
        <line x1="10" x2="8" y1="5" y2="7" />
        <line x1="2" x2="22" y1="12" y2="12" />
        <line x1="7" x2="7" y1="19" y2="21" />
        <line x1="17" x2="17" y1="19" y2="21" />
      </svg>
    )
  }
  
  
  function BedIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 4v16" />
        <path d="M2 8h18a2 2 0 0 1 2 2v10" />
        <path d="M2 17h20" />
        <path d="M6 8v9" />
      </svg>
    )
  }
  
  
  function ConciergeBellIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" />
        <path d="M20 16a8 8 0 1 0-16 0" />
        <path d="M12 4v4" />
        <path d="M10 4h4" />
      </svg>
    )
  }
  
  
  function CookingPotIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M2 12h20" />
        <path d="M20 12v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-8" />
        <path d="m4 8 16-4" />
        <path d="m8.86 6.78-.45-1.81a2 2 0 0 1 1.45-2.43l1.94-.48a2 2 0 0 1 2.43 1.46l.45 1.8" />
      </svg>
    )
  }
  
  
  function HomeIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    )
  }