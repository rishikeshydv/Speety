import React from 'react'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Typist from 'react-typist-component'
interface BotResponseProps {
  msg:string
}
const BotResponseProp:React.FC<BotResponseProps> = ({msg}) => {
  return (
    <div className="flex justify-end items-start gap-2">
    <div className="bg-gray-100 rounded-md p-1 max-w-[60%]">
    <div className="text-sm"><Typist>{msg}</Typist></div>
    </div>
    <Avatar className="w-8 h-8">
      <AvatarImage alt="User" src="/Scailbot.png" />
      <AvatarFallback>
        <Avatar />
      </AvatarFallback>
    </Avatar>

    {/* <BotResponseProp msg="Hello, how can I assist you?" profilePic="/Scailbot.png" />
            <BotRequestProp msg="Hi! My name is Rishi!" profilePic={userProfilePic} /> */}

  </div>
  )
}

export default BotResponseProp
