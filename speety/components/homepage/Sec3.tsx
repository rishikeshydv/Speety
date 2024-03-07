import React from 'react'
import Feature from '@/services/homepage/feature'
import Image from '@/services/homepage/Image'
export default function Sec3() {
  return (
    <div>
        <section className='py-10'>
            {/* This DIV creates a left and right column */}
            <div className='flex'>
            <div className='w-1/2 p-4'>
            {/* This Div will create a title and a sparkle on the left */}
            <div className='mt-10 ml-10 px-10px flex items-center'>
                <img 
                src="/sparkle.png" 
                width={80}
                height={5}
                style={{ marginRight: '30px' }}/>
                <h1 className='text-6xl font-bold'>
                Place Your Slogan Here
                </h1>
            </div>
            <hr className='border border-gray-300 w-30 mt-5 ml-5'/> {/* Horizontal line */}
            {/* The div following would create 3 features of the app */}
            <div>
            <Feature 
            imageSrc='/bulb.png'
            title='Title 1'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet'
            
            />
              <Feature 
            imageSrc='/bell_.png'
            title='Title 2'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet'
            />
              <Feature 
            imageSrc='/cam.png'
            title='Title 3'
            description='Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            Lorem ipsum dolor sit amet'
            />
            </div>
            </div>
            {/* Here, I will be adding an image at the right */}
            <div className='px-10px w-1/2 p-4'>
            <Image
            src="/imgSample.png"
            alt="animation" 
            />
             <Image
            src="/imgSample.png"
            alt="animation" 
            />
             <Image
            src="/imgSample.png"
            alt="animation" 
            />
            </div>
            </div>
        </section>
    </div>
  )
}
