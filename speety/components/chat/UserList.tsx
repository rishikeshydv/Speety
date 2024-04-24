"use client"
import React, { useEffect,useState } from "react";
import ChatListProp from "@/services/chat/ChatListProp";
import { useAuthState } from "react-firebase-hooks/auth";
import { db,auth } from "@/firebase/config";
//imports for queries
import { getConnectedUsers } from "@/queries/chatSystem";
import { Loading } from "@/app/Loading";

interface User {
  name: string;
  role: string;
}
export default function UserList({ onUserClick }: { onUserClick: (clickedUsername:string) => void }) {
  const [user] = useAuthState(auth);
  const [usersConnected, setUsersConnected] = useState<string[][]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const connectedUsers = await getConnectedUsers(user?.email as string);
        setUsersConnected(connectedUsers);
      } catch (error) {
       console.error(error); 
      }
    };
  
    fetchUsers();
  }, [user]); // Add user to the dependency array to trigger useEffect when user changes

  return (
  <div className="w-full h-full rounded-2xl shadow-xs mt-2 bg-gray-200">
  <div className="flex flex-col items-center">
  {usersConnected.length > 0 ? (
  usersConnected.map(([_email,_name,_profilePic], index) => (
    <ChatListProp
      key={index}
      imgUrl={_profilePic} // replace with default avatar URL
      userName={_name}
      email={_email}
      lastMsg="Hello"
      lastMsgTime="Just now" // replace with actual last message time
      newMsg={false}
      onClick={onUserClick}
    />
  ))
  ):(
    <Loading />
  )}  
  </div>
</div>
  );
}
