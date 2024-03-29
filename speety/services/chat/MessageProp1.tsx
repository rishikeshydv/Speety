import React from 'react'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
interface MsgProp {
    message:string;
    msgTime:string;
}
const MessageProp1:React.FC<MsgProp> = ({message,msgTime}) => {
  return (
            <div className="flex items-start justify-start ml-6 mt-10 w-28 h-20 rounded-2xl">
                  <Avatar className="w-16 h-16 p-0.5 border rounded-full mt-2">
      <AvatarImage alt="@jessica" src="/placeholder-user.jpg" />
      <AvatarFallback>J</AvatarFallback>
    </Avatar>
  <Button className="flex items-start justify-start w-28 h-20 gap-2 bg-blue-100 ml-2 shadow-md" variant="outline">
    <div className="grid text-left ml-4">
      <div className="font-semibold text-lg">{message}</div>
      <div className="text-sm line-clamp-1"><h3>{msgTime}</h3></div>
    </div>
  </Button>
</div>

  )
}
export default MessageProp1
