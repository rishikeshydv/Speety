import React from 'react'
import Card from '@/services/homepage/cards'
import Image from '@/services/homepage/Image'

export default function Sec2() {
  return (
    <div className="bg-gray-200">
    <section className='py-10'>
        <div className="card-container flex flex-row justify-center">
      <Card 
        imageSrc="/hourglass.png"
        title="Realtime Communication"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
      />
      <Card 
        imageSrc="/anchor.png"
        title="Dual Location Tracking"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
      />
      <Card 
        imageSrc="/secure.png"
        title="Highly Secure"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do"
      />
    </div>

    <div>
      <Image src="/imgSample.png" alt="Your Image" />
    </div>

        </section></div>
  )
}
