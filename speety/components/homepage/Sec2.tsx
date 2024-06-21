import React from 'react'
import { Card } from "@/components/ui/card"
import Image from '@/services/homepage/Image'

export default function Sec2() {
  return (
    <div className="bg-gray-200">
    <section className='py-10 xl:py-20 2xl:py-20'>
    <div className="container grid max-w-5xl gap-8 px-4 md:grid-cols-3 md:px-6">
      <Card className="flex flex-col items-center gap-4 px-4 py-6 xl:px-8 xl:py-16 rounded-3xl shadow-lg transition-all hover:translate-y-[-5px] hover:bg-[#439A86]">
        <img src="/hourglass.png" alt="hourglass" className='w-10 h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16'/>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Realtime Communication</h3>
          <p className="text-muted-foreground xl:text-sm">
          Connect instantly with voice, video, or chat.
          </p>
        </div>
      </Card>
      <Card className="flex flex-col items-center gap-4 px-4 py-6 xl:px-8 xl:py-16 rounded-3xl shadow-lg transition-all hover:translate-y-[-5px] hover:bg-[#439A86]">
      <img src="/anchor.png" alt="hourglass" className='w-10 h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16'/>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Dual Location Tracking</h3>
          <p className="text-muted-foreground xl:text-sm">Track each other in real-time on a shared map.</p>
        </div>
      </Card>
      <Card className="flex flex-col items-center gap-4 px-4 py-6 xl:px-8 xl:py-16 rounded-3xl shadow-lg transition-all hover:translate-y-[-5px] hover:bg-[#439A86]">
      <img src="/secure.png" alt="hourglass" className='w-10 h-10 xl:w-12 xl:h-12 2xl:w-16 2xl:h-16'/>
        <div className="text-center">
          <h3 className="text-lg font-semibold">Highly Secure</h3>
          <p className="text-muted-foreground xl:text-sm">Experience seamless and secure real-time connection, wherever life takes you.</p>
        </div>
      </Card>
    </div>

    <div className='xl:p-6 2xl:p-6'>
      <img src="/imgSample.png" alt="image1" className='w-full px-6 mt-10 xl rounded-2xl'/>
    </div>

        </section></div>
  )
}

