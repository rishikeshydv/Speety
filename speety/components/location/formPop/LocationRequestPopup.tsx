"use client"
import { Button } from "@/components/ui/button"
import {
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogTrigger
} from "@/components/ui/dialog";
import { db } from "@/firebase/config";
import { set } from "date-fns";
import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { MdAddLocationAlt } from "react-icons/md";

interface LocationRequestPopupProps {
    email: string;
    shareAllow: boolean;
    setShareAllow: React.Dispatch<React.SetStateAction<boolean>>;
    popUpOpen: boolean;
    setPopUpOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const LocationRequestPopup: React.FC<LocationRequestPopupProps> = ({email,shareAllow, setShareAllow, popUpOpen, setPopUpOpen}) => {
    const [userName, setUserName] = useState("");
    async function getUserName() {
        const docRef = doc(db, "User_Info", email);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setUserName(docSnap.data().name);
        } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    useEffect(() => {
        getUserName();
    }, []);
    return (
    <div>
    <div className="flex flex-col items-center justify-center p-6 rounded-lg shadow-lg bg-white dark:bg-gray-950 fixed inset-0 z-50 bg-opacity-50 backdrop-blur-sm">
        <div className="flex flex-col items-center">
          <div className="text-2xl font-bold">Location Access Request</div>
          <div className="text-gray-500 dark:text-gray-400 mt-2">
            {userName} is requesting access to your location. Do you want to allow access to your location?
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            className="px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
            variant="outline"
            onClick={() => {setPopUpOpen(false); setShareAllow(false)}}
          >
            Deny
          </Button>
          <Button className="px-4 py-2 rounded-md bg-gray-900 text-white hover:bg-gray-800 transition-colors"
          onClick={()=>{
            setShareAllow(true);
            setPopUpOpen(false);
          }}>
            Allow
          </Button>
        </div>
      </div>
      </div>
      )
}

export default LocationRequestPopup;