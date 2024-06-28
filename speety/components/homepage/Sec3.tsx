import React from 'react'
import Feature from '@/services/homepage/feature'
import Image from '@/services/homepage/Image'
import { Card, CardTitle, CardDescription } from "@/components/ui/card"

export default function Sec3() {
  return (
    <div>
        <section className='py-4 md:py-10'>
            {/* This DIV creates a left and right column */}
            <div className='flex'>
            <div className='w-1/2 p-1 md:p-4'>
            {/* This Div will create a title and a sparkle on the left */}
            <div className='mt-10 md:ml-10 md:px-10 flex items-center text-[#16302B]'>
                <img 
                src="/sparkle.png" 
                alt='sparkle'
                width={40}
                height={5}
                className='w-6 h-6 xl:w-16 xl:h-16 2xl:w-16 2xl:h-16 mr-[6px] md:mr-[30px]'
                />
                <h1 className='text-[#004346] text-2xl md:text-5xl xl:text-7xl 2xl:text-7xl font-bold'>
                Our Features
                </h1>
            </div>
            <hr className='border border-gray-300 w-30 mt-5 ml-5'/> {/* Horizontal line */}
            {/* The div following would create 3 features of the app */}
            <section className="grid gap-6 p-4 xl:gap-10 xl:p-10 sm:grid-cols-1 md:grid-cols-1 lg:p-8">
      <Card className="flex flex-col items-start xl:items-center 2xl:items-center gap-4 p-3 md:px-6 md:py-16 shadow-md border-muted bg-[#A2D3C2] bg-opacity-20 hover:bg-opacity-30 hover:translate-y-[5px]">
        <img src="/svgs/5.png" alt="" className='w-8 h-8 xl:w-24 xl:h-24 2xl:w-24 2xl:h-24'/>
        <CardTitle className='xl:text-2xl 2xl:text-2xl'>Organized Workflow</CardTitle>
        <CardDescription className='xl:px-6 2xl:px-6 xl:text-center 2xl:text-center text-xs xl:text-lg 2xl:text-lg'>
        Ditch the spreadsheets! Our platform lets brokers see all their agents and clients in one place. 
            Agents can update client info and deals in real-time, keeping everyone informed. 
            Plus, built-in collaboration tools and automated tasks streamline communication and free up time for 
            everyone to focus on what matters - closing deals.
        </CardDescription>
      </Card>
      <Card className="flex flex-col items-start xl:items-center 2xl:items-center gap-4 p-3 md:px-6 md:py-16 shadow-md border-muted bg-[#A2D3C2] bg-opacity-20 hover:bg-opacity-30 hover:translate-y-[5px]">
        <img src="/svgs/6.png" alt="" className='w-10 h-10 xl:w-36 xl:h-28 2xl:w-36 2xl:h-28'/>
        <CardTitle className='xl:text-2xl 2xl:text-2xl'>Feature-Based Customization</CardTitle>
        <CardDescription className='xl:px-6 2xl:px-6 xl:text-center 2xl:text-center text-xs xl:text-lg 2xl:text-lg'>
        Speety is designed to be flexible and customizable. Agents can choose the features they need and
            customize their dashboard to suit their workflow. Our platform is designed to be user-friendly and 
            intuitive, so agents can start using it.
        </CardDescription>
      </Card>
      <Card className="flex flex-col items-start xl:items-center 2xl:items-center gap-4 p-3 md:px-6 md:py-16 shadow-md border-muted bg-[#A2D3C2] bg-opacity-20 hover:bg-opacity-30 hover:translate-y-[5px]">
        <img src="/svgs/7.png" alt="" className='w-10 h-10 xl:w-40 xl:h-40 2xl:w-24 2xl:h-24'/>
        <CardTitle className='xl:text-2xl 2xl:text-2xl'>Easy Getting Started</CardTitle>
        <CardDescription className='xl:px-6 2xl:px-6 xl:text-center 2xl:text-center text-xs xl:text-lg 2xl:text-lg'>
        An agent can get started in minutes by signing up, inviting their clients and most importantly importing
            their previous listings. Our platform is designed to be user-friendly and intuitive, so agents can start using it.
        </CardDescription>
      </Card>
    </section>
            </div>
            {/* Here, I will be adding an image at the right */}
          <div className='px-4'>
            <img src="/adobe/2.jpeg" alt="img-right" className='w-[700px] h-full md:h-full md:w-[1000px] 2xl:w-[1650px] 2xl:h-[1400px] overflow-hidden rounded-3xl shadow-xl'/>
          </div>
            </div>
        </section>
    </div>
  )
}

function LeafIcon(props:any) {
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
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  )
}


function SunIcon(props:any) {
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
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2" />
      <path d="M12 20v2" />
      <path d="m4.93 4.93 1.41 1.41" />
      <path d="m17.66 17.66 1.41 1.41" />
      <path d="M2 12h2" />
      <path d="M20 12h2" />
      <path d="m6.34 17.66-1.41 1.41" />
      <path d="m19.07 4.93-1.41 1.41" />
    </svg>
  )
}


function WavesIcon(props:any) {
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
      <path d="M2 6c.6.5 1.2 1 2.5 1C7 7 7 5 9.5 5c2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 12c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
      <path d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  )
}