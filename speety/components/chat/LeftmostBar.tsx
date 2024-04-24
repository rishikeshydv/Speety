"use client";
import {
  collection,
  getDoc,
  doc
} from "firebase/firestore";
import { db } from "@/firebase/config";
import React, { useEffect, useState } from 'react';
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { main } from "@/services/faceDetection/FaceDetector";

interface LeftmostBarProps {
  userEmail: string;
}
const LeftmostBar:React.FC<LeftmostBarProps> = ({userEmail}) => {
  const [user] = useAuthState(auth);
  const [userPic,setUserPic] = useState<string|null>("");
  useEffect(() => {
  const getUserInfo = async (_userEmail:string) => {
    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, _userEmail);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      setUserPic(userSnapshot.data().profilePic);
    }
  }
  if (userEmail){
    getUserInfo(userEmail);
  }
   
}, [userEmail]);
  return (
<aside className="w-40 bg-black text-white rounded-3xl m-6">
        <div className="flex items-center justify-center h-40 border-b border-gray-800">
          <a href={`${user?.email}`}>
            <img
              src="/speety_logo_revert.png"
              alt="Speety Logo"
              width={150}
              height={200}
              className="ml-1 mt-10"
            />
          </a>
        </div>
        <nav className="flex flex-col p-2">
          <div className="flex flex-col items-center" onClick={main}>
            <img
              src={userPic as string}
              alt="user_profile"
              className="mt-10"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col items-center mt-10 py-10">
            <div>
              <img
                src="/msg.png"
                alt="chat"
                width={60}
                height={60}
              />
              <h1 className="text-white ml-2">Chat</h1>
            </div>
            <div className="mt-10">
              <img src="/people.png" alt="people" width={50} height={50} />
              <h1 className="text-white">People</h1>
            </div>
            <div className="mt-10">
              <img
                src="/hourglass-not-done.png"
                alt="requests"
                width={50}
                height={50}
              />
              <h1 className="text-white">Request</h1>
            </div>
          </div>
        </nav>
      </aside>


  );
};

export default LeftmostBar;
