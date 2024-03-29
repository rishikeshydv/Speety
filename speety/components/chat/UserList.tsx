"use client"
import React, { useEffect,useState } from "react";
import ChatListProp from "@/services/chat/ChatListProp";
import { useAuthState } from "react-firebase-hooks/auth";
import { db,auth } from "@/firebase/config";

//imports for queries
import { getConnectedUsers } from "@/queries/chatSystem";

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
       console.error(error); // Log any errors
      }
    };
  
    fetchUsers();
  }, [user]); // Add user to the dependency array to trigger useEffect when user changes

  return (
    <div className={`absolute bg-gray-200 rounded-3xl shadow-xs w-1/4 top-28 left-44 bottom-7`}>
    {usersConnected.length > 0 ? (
      usersConnected.map(([user,userEmail], index) => (
        <ChatListProp
          key={index}
          imgUrl="" // replace with default avatar URL
          userName={user}
          lastMsg={user}
          lastMsgTime="Just now" // replace with actual last message time
          newMsg={false}
          onClick={() => onUserClick(userEmail)}
        />
      ))
    ) : (
      <h1 className="text-xl font-italic text-center mt-10">Loading users...</h1>
    )}
  </div>
  );
}
