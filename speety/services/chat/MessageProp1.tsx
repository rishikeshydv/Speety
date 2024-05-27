"use client"

import React, {useState, useEffect} from 'react'
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { set } from 'date-fns';
interface MsgProp {
    message:string;
    msgTime:string;
    profilePic:string;
}
const MessageProp1:React.FC<MsgProp> = ({message,msgTime,profilePic}) => {
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
            <div className="flex items-st art justify-start mt-1 w-28 h-auto rounded-2xl">
      <Avatar className="w-10 h-10 p-0.5 border rounded-full mt-1">
      <AvatarImage alt="@jessica" src={profilePic} />
      <AvatarFallback>J</AvatarFallback>
    </Avatar>
  <Button className="flex items-end justify-end w-28 h-auto gap-2 bg-gray-700 text-white ml-2 shadow-md hover:bg-gray-800">
    <div className="grid text-left">
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
</div>
  )
}
export default MessageProp1
