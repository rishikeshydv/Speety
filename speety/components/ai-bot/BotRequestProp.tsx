import React from 'react'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
interface BotRequestProps {
  msg:string
  profilePic:string
}
const BotRequestProp:React.FC<BotRequestProps> = ({msg,profilePic}) => {
  return (
    <div className="flex items-start gap-2">
    <Avatar className="w-8 h-8">
      <AvatarImage alt="AI Bot" src={profilePic} />
      <AvatarFallback>
        <Avatar />
      </AvatarFallback>
    </Avatar>
    <div className="bg-indigo-100 rounded-md p-1 max-w-[60%]">
      <p className="text-sm">{msg}</p>
    </div>
  </div>
  )
}

export default BotRequestProp