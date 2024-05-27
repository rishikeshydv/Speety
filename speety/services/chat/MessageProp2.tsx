"use client"

import React, {useState, useEffect} from 'react'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
interface MsgProp {
    message:string;
    msgTime:string;
    profilePic:string;
}
const MessageProp2:React.FC<MsgProp> = ({message,msgTime,profilePic}) => {
  const [msgList, setMsgList] = useState<string[]>([]) //store the message in chunks if it exceeds 63 characters

  const getChunks = (message:string) => {
    const chunkSize = 63
    const chunks = []
    for (let i = 0; i < message.length; i += chunkSize) {
      chunks.push(message.slice(i, i + chunkSize))
    }
    return chunks
  }

  useEffect(() => {
    if (message.length > 63) {
      setMsgList(getChunks(message))
    }
  }, [message])

  return (
  <div className="flex items-start justify-start w-28 h-auto rounded-2xl gap-2">
  <Button className="flex items-end justify-end w-28 h-auto bg-gray-100 shadow-md px-4" variant="outline">
    <div className="grid text-left ml-1">
    <div className="flex flex-col font-semibold text-md">
        {msgList.length > 0 ? (
          msgList.map((msg, index) => (
            <h1 key={index}>{msg}</h1>
          ))
        ) : <h1>{message}</h1>}
      </div>
      <div className="text-xs mt-1 tracking-tighter"><h3>{msgTime}</h3></div>
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
