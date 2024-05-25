import React from 'react'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
interface MsgProp {
    message:string;
    msgTime:string;
    profilePic:string;
}
const MessageProp2:React.FC<MsgProp> = ({message,msgTime,profilePic}) => {
  return (
  <div className="flex items-center justify-start w-28 h-14 rounded-2xl gap-2">
  <Button className="flex items-center w-28 h-14 bg-gray-100 shadow-md px-4" variant="outline">
    <div className="grid text-right ml-1">
      <div className="font-semibold text-md">{message}</div>
      <div className="text-xs mt-1 ml-4 tracking-tighter"><h3>{msgTime}</h3></div>
    </div>
  </Button>
  <Avatar className="w-10 h-10 p-0.5 border rounded-full mt-1">
      <AvatarImage alt="@jessica" src={profilePic} />
      <AvatarFallback>J</AvatarFallback>
    </Avatar>
</div>

  )
}
export default MessageProp2
