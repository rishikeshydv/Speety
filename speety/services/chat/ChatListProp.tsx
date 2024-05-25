import Link from "next/link";
import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ChatList {
  imgUrl: string;
  userName: string;
  email: string;
  lastMsg: string;
  lastMsgTime: string;
  newMsg: boolean;
 onUserClick:(clickedUsername:string) => void;
  //onClick:() => void;
}

const ChatListProp: React.FC<ChatList> = ({
  imgUrl,
  userName,
  email,
  lastMsg,
  lastMsgTime,
  newMsg,
  onUserClick
}) => {
  if (newMsg === true) {
    return (
 
<div className="flex items-start justify-start h-16 " onClick={()=>onUserClick(email)}>
  <Button className="flex items-start justify-start w-full h-16 bg-blue-100 " variant="outline">
    <Avatar className="w-11 h-11 p-0.5 border rounded-full mt-1">
      <AvatarImage alt="" src={imgUrl} />
      <AvatarFallback>J</AvatarFallback>
    </Avatar>
    <div className="grid text-left mt-1">
      <div className="font-semibold text-lg">{userName}</div>
      <div className="text-xs line-clamp-1 font-bold text-gray-300"><h3>New Message</h3></div>
    </div>
  </Button>
</div>
    );
  } else {
    return (
      
      <div className="flex items-start justify-start w-full h-16" onClick={()=>onUserClick(email)}>
      <Button className="flex items-start justify-start w-full h-16 gap-4 " variant="outline">
        <Avatar className="w-11 h-11 border rounded-full mt-1">
          <AvatarImage alt="@" src={imgUrl} />
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
        <div className="grid text-left mt-1">
          <div className="font-semibold text-lg tracking-tighter">{userName}</div>
          <div className="flex gap-16">
          <div className="text-xs font-semibold line-clamp-1 text-gray-500"><h3>{lastMsg}</h3></div>
        <div className="text-xs line-clamp-1 text-gray-400 tracking-tighter">{lastMsgTime}</div>
          </div>
          
        </div>
      </Button>
    </div>
    );
  }
};


export default ChatListProp;
