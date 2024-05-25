"use client"
import React, { useEffect,useState } from "react";
import ChatListProp from "@/services/chat/ChatListProp";
import { useAuthState } from "react-firebase-hooks/auth";
import { db,auth } from "@/firebase/config";
//imports for queries
import { getConnectedUsers } from "@/queries/chatSystem";
import { Loading } from "@/app/Loading";

interface UserListProps {
  onUserClick:(clickedUsername:string) => void;
  lastMsg: string;
}


const UserList:React.FC<UserListProps> = ({onUserClick,lastMsg}) => {
  const [user] = useAuthState(auth);
  const [usersConnected, setUsersConnected] = useState<string[][]>([]);
  
  useEffect(() => {
    const fetchUsers = async () => {
      return new Promise((resolve, reject) => {
        getConnectedUsers(user?.email as string)
          .then((connectedUsers) => {
            setUsersConnected(connectedUsers as string[][]);
            resolve(connectedUsers);
          })
          .catch((error) => {
            reject(error);
          });
      });       
    };
  if (user && user?.email){
    fetchUsers();
  }
    
  }, [user]); // Add user to the dependency array to trigger useEffect when user changes


  return (
  <div className="w-76 h-full rounded-2xl shadow-xs mb-3 mt-1 bg-gray-200">
  <div className="flex flex-col items-center">
  {usersConnected.length > 0 ? (
  usersConnected.map(([_email,_name,_profilePic], index) => (
    <ChatListProp
      key={index}
      imgUrl={_profilePic} // replace with default avatar URL
      userName={_name}
      email={_email}
      lastMsg={lastMsg}
      lastMsgTime="Just now" // replace with actual last message time
      newMsg={false}
      onUserClick={onUserClick}
    />
  ))
  ):(
    <Loading />
  )}  
  </div>
</div>
  );
}

export default UserList;