import { collection, doc, updateDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import e from "express";
  //logic for changing login status
  const updateStatus = async (_userEmail:string,loginStatus:string) => {
    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, _userEmail);
    await updateDoc(userDocRef, {
      loginStatus: loginStatus
    });
          
  }

export default updateStatus;