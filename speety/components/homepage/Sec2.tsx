import React from 'react'
import Card from '@/services/homepage/cards'
import Image from '@/services/homepage/Image'

export default function Sec2() {
  return (
    <div className="bg-gray-200">
    <section className='xl:py-10 2xl:py-10'>
        <div className="card-container flex flex-col ml-20 xl:ml-0 2xl:ml-0 xl:flex-row 2xl:flex-row justify-center">
      <Card 
        imageSrc="/hourglass.png"
        title="Realtime Communication"
        description="Connect instantly with voice, video, or chat."
      />
      <Card 
        imageSrc="/anchor.png"
        title="Dual Location Tracking"
        description="Track each other in real-time on a shared map."
      />
      <Card 
        imageSrc="/secure.png"
        title="Highly Secure"
        description="Experience seamless and secure real-time connection, wherever life takes you."
      />
    </div>

    <div className='xl:p-6 2xl:p-6'>
      <Image src="/imgSample.png" alt="Your Image"/>
    </div>

        </section></div>
  )
}
