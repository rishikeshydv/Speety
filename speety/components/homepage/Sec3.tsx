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
                Our Features
                </h1>
            </div>
            <hr className='border border-gray-300 w-30 mt-5 ml-5'/> {/* Horizontal line */}
            {/* The div following would create 3 features of the app */}
            <div className='flex flex-col gap-80'>
            <Feature 
            imageSrc='/bulb.png'
            title='Organized Workflow'
            description='Ditch the spreadsheets! Our platform lets brokers see all their agents and clients in one place. 
            Agents can update client info and deals in real-time, keeping everyone informed. 
            Plus, built-in collaboration tools and automated tasks streamline communication and free up time for 
            everyone to focus on what matters - closing deals.'
            />
              <Feature 
            imageSrc='/bell_.png'
            title='Easy Getting Started'
            description='An agent can get started in minutes by signing up, inviting their clients and most importantly importing
            their previous listings. Our platform is designed to be user-friendly and intuitive, so agents can start using it'
            />
              <Feature 
            imageSrc='/cam.png'
            title='Feature-Based Customization'
            description='Speety is designed to be flexible and customizable. Agents can choose the features they need and
            customize their dashboard to suit their workflow. Our platform is designed to be user-friendly and 
            intuitive, so agents can start using it.'
            />
            </div>
            </div>
            {/* Here, I will be adding an image at the right */}
            <div className='px-10px w-1/2 p-4'>
            <Image
            src="/brokerOrganize.png"
            alt="animation" 
            />
             <Image
            src="/import.png"
            alt="animation" 
            />
             <Image
            src="/features.png"
            alt="animation" 
            />
            </div>
            </div>
        </section>
    </div>
  )
}
