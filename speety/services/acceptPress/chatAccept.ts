import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import {
    collection,
    addDoc
  } from "firebase/firestore";
import React from 'react';

export default function chatAccept() {
    const [user] = useAuthState(auth);

    const socketAdd = addDoc(collection(db,"socketCreation"),{
        socketStatus:"YES",
        userEmail:user?.email
    })

}
