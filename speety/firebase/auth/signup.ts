import React from 'react'
import { app } from '../config'
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { setDoc, doc, collection } from "firebase/firestore";
import { db } from "@/firebase/config";
const auth = getAuth(app);
export default async function Signup(email: string, password: string, name: string, role: string) {

  const createUserInDB = async (_name: string, _email: string, _role: string) => {
    try {
     // const userDocRef = doc(db, "User_Info", email); // Use email as the document ID
       const userRef = collection(db, "User_Info");
       const userDocRef = doc(userRef,_email);
      await setDoc(userDocRef, {
        email: _email,
        name: _name,
        role: _role,
        loginStatus: "Offline"
      });
    } catch (error) {
      console.log(error);
    }
  };

  createUserWithEmailAndPassword(auth, email, password).then
  (userCredential => {
      createUserInDB(name, email, role);
    })
    .catch((error) => {
      console.log(error);
    });
} 
  