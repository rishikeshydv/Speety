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
  lastMsgTime: string;
}


const UserList:React.FC<UserListProps> = ({onUserClick,lastMsg, lastMsgTime}) => {
  const [user] = useAuthState(auth);
  const [usersConnected, setUsersConnected] = useState<any[][]>([]);
  
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

  //selecting the first user of the list automatically as clicked
  useEffect(() => {
    if (usersConnected.length > 0){
      onUserClick(usersConnected[0][0]);
    }
  }, [usersConnected]);

  return (
  <div className="w-76 h-full rounded-2xl shadow-xs mb-3 mt-1 bg-gray-200">
  <div className="flex flex-col items-center">
  {usersConnected.length > 0 ? (
  usersConnected.map(([_email,_name,_profilePic,newMsgStatus], index) => (
    <ChatListProp
      key={index}
      imgUrl={_profilePic} // replace with default avatar URL
      userName={_name}
      email={_email}
      lastMsg={lastMsg}
      lastMsgTime={lastMsgTime} // replace with actual last message time
      newMsg={newMsgStatus}
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