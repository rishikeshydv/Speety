import React from "react";

interface ChatList {
  imgUrl: string;
  userName: string;
  lastMsg: string;
  lastMsgTime: string;
  newMsg: boolean;
}

const ChatListProp: React.FC<ChatList> = ({
  imgUrl,
  userName,
  lastMsg,
  lastMsgTime,
  newMsg,
}) => {
  if (newMsg === true) {
    return (
      <div className="flex bg-blue-100 w-80 h-20 py-2">
        <img src="/user.png" alt="user1" className="w-12 h-12" />
        <div className="flex flex-col ml-5">
        <h1 className="font-bold text-2xl">{userName}</h1>
        <h3>New Message</h3>
        </div>

      </div>
    );
  } else {
    return (
      <div style={{ backgroundColor: '#FFFFFF' }}  className="flex w-80 h-20 py-5">
        <img src="/user.png" alt="user1" className="w-12 h-12" />
        <div className="ml-5">
          <div className="flex flex-row mt-2">
            <h1 className="font-bold text-2xl">{userName}</h1>
            <h3 className="ml-5 py-1">{lastMsgTime}</h3>
          </div>
          <h3>{lastMsg}</h3>
        </div>
      </div>
    );
  }
};

export default ChatListProp;
