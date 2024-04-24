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
            <div className="flex items-start justify-start w-28 h-20 rounded-2xl">
  <Button className="flex items-start justify-start w-28 h-20 gap-2 bg-gray-100 shadow-md px-6" variant="outline">
    <div className="grid text-left ml-4">
      <div className="font-semibold text-lg">{message}</div>
      <div className="text-sm line-clamp-1"><h3>{msgTime}</h3></div>
    </div>
  </Button>
  <Avatar className="w-16 h-16 p-0.5 border rounded-full ml-2 mt-1">
      <AvatarImage alt="@jessica" src={profilePic} />
      <AvatarFallback>J</AvatarFallback>
    </Avatar>
</div>

  )
}
export default MessageProp2
