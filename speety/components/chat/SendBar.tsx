import React from 'react'
import { BiPaperclip } from "react-icons/bi";
import { FaMicrophone } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

export default function SendBar() {
  return (
    <div className={`fixed bg-gray-200 flex flex-row rounded-3xl h-16 bottom-7 left-1/3 right-6`}>
        <div className={`fixed flex flex-grow px-10 ml-5 right-28`}>
         <button className="bg-white rounded-3xl px-3"><BiPaperclip className="transform -rotate-45 w-5 h-8" /></button>
        <input type="text" placeholder="Write Messages" className='px-10 rounded-3xl w-96 h-10 mt-3' />
        <button className="bg-white rounded-3xl px-3"><img src="/emoji.png" className="w-8 h-8" /></button>
        </div>
        <div className={`fixed flex flex-row right-7 mt-3`}>
            <button className='rounded-3xl'><FaMicrophone className='w-5 h-8' /></button>
            <button className='rounded-3xl ml-5'><img src="/send.png" className="mt-1 mr-5 h-auto w-8 rounded-3xl" /></button>
        </div>
    </div>
  )
}
