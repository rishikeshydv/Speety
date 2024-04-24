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
            <div className="flex items-start justify-start ml-6 mt-10 w-40 h-20 rounded-2xl">
                  <Avatar className="w-16 h-16 p-0.5 border rounded-full mt-2">
      <AvatarImage alt="@jessica" src={profilePic} />
      <AvatarFallback>J</AvatarFallback>
    </Avatar>
  <Button className="flex items-start justify-start w-28 h-20 gap-2 bg-blue-100 ml-2 shadow-md" variant="outline">
    <div className="grid text-left ml-4">
      <div className="font-semibold text-lg mt-2">{message}</div>
      <div className="text-xs line-clamp-1 mt-4 ml-4 italic"><h3>{msgTime}</h3></div>
    </div>
  </Button>
</div>

  )
}
export default MessageProp1
