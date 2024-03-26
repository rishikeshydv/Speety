import Link from "next/link";
import React from "react";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"

interface ChatList {
  imgUrl: string;
  userName: string;
  lastMsg: string;
  lastMsgTime: string;
  newMsg: boolean;
 onClick:(clickedUsername:string) => void;
  //onClick:() => void;
}

const ChatListProp: React.FC<ChatList> = ({
  imgUrl,
  userName,
  lastMsg,
  lastMsgTime,
  newMsg,
  onClick
}) => {
  if (newMsg === true) {
    return (
      // <div className="flex bg-blue-100 w-96 h-20 py-2">
      //   <button>
      //   <img src="/user.png" alt="user1" className="w-12 h-12" />
      //   <button><h1 className="font-bold text-2xl"></h1></button>
      //   <h3>New Message</h3>
      //   </button>
      // </div>
<div className="flex items-start justify-start w-full h-28" onClick={()=>onClick(userName)}>
  <Button className="flex items-start justify-start w-full h-28 gap-2 bg-blue-100" variant="outline">
    <Avatar className="w-16 h-16 p-0.5 border rounded-full">
      <AvatarImage alt="@jessica" src="/placeholder-user.jpg" />
      <AvatarFallback>J</AvatarFallback>
    </Avatar>
    <div className="grid text-left ml-4">
      <div className="font-semibold text-2xl">{userName}</div>
      <div className="text-lg line-clamp-1 font-bold"><h3>New Message</h3></div>
    </div>
  </Button>
</div>
    );
  } else {
    return (
      
      <div className="flex items-start justify-start w-full h-28" onClick={()=>onClick(userName)}>
      <Button className="flex items-start justify-start w-full h-28 gap-2" variant="outline">
        <Avatar className="w-16 h-16 p-0.5 border rounded-full">
          <AvatarImage alt="@jessica" src="/placeholder-user.jpg" />
          <AvatarFallback>J</AvatarFallback>
        </Avatar>
        <div className="grid text-left ml-4">
          <div className="font-semibold text-2xl">{userName}</div>
          <div className="text-lg line-clamp-1"><h3>{lastMsg}</h3></div>
        </div>
      </Button>
    </div>
    );
  }
};


export default ChatListProp;
