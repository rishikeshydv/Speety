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
import EmailRoundedIcon from '@mui/icons-material/EmailRounded';
import { IoPeopleCircle } from "react-icons/io5";
import { IoIosPersonAdd } from "react-icons/io";
import Image from 'next/image';
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
<aside className="w-24 bg-black text-white rounded-3xl my-2 mx-2">
        <div className="flex items-center justify-center h-40 border-b border-gray-800">
          <a href={`/dashboard/${user?.email}`}>
            <img
              src="/speety_logo_revert.png"
              alt="Speety Logo"
              width={75}
              height={90}
              className="ml-1 mt-10"
            />
          </a>
        </div>
        <nav className="flex flex-col p-2">
          <div className="flex items-center">
            <div className="relative w-10 h-10 mt-10 ml-5 rounded-full overflow-hidden">
            <img
              src={userPic as string}
              alt="user_profile"
              className="object-cover w-full h-full"
            />
            </div>
          </div>
          <div className="flex flex-col items-center mt-8 py-10">
            <div>
              <EmailRoundedIcon className="xl:w-10 xl:h-10 2xl:w-12 2xl:h-12"/>
              <h1 className="text-white ml-1 mt-1 text-xs">Chat</h1>
            </div>
            <div className="mt-8">
              <IoPeopleCircle  className="xl:w-10 xl:h-10 2xl:w-12 2xl:h-12"/>
              <h1 className="text-white text-xs mt-2 ">People</h1>
            </div>
            <div className="mt-8">
            <IoIosPersonAdd className="xl:ml-1 2xl:ml-1 xl:w-10 xl:h-10 2xl:w-12 2xl:h-12"/>
              <h1 className="text-white text-xs mt-2">Request</h1>
            </div>
          </div>
        </nav>
      </aside>


  );
};

export default LeftmostBar;
