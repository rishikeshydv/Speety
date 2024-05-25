import React from 'react'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
interface MsgProp {
    message:string;
    msgTime:string;
    profilePic:string;
}
const MessageProp1:React.FC<MsgProp> = ({message,msgTime,profilePic}) => {
  return (
            <div className="flex items-start justify-start mt-1 w-28 h-14 rounded-2xl">
      <Avatar className="w-10 h-10 p-0.5 border rounded-full mt-1">
      <AvatarImage alt="@jessica" src={profilePic} />
      <AvatarFallback>J</AvatarFallback>
    </Avatar>
  <Button className="flex items-end justify-end w-28 h-14 gap-2 bg-gray-700 text-white ml-2 shadow-md hover:bg-gray-800">
    <div className="grid text-left">
      <div className="font-semibold text-md">{message}</div>
      <div className="text-xs mt-1 tracking-tighter"><h3>{msgTime}</h3></div>
    </div>
  </Button>
</div>
  )
}
export default MessageProp1
