//here we will be checking if the user has any unread notifications or not
//this would decide the type of notification icon to be displayed
import {
    collection,
    getDoc,
    doc
  } from "firebase/firestore";
  import { db } from "@/firebase/config";
  
  export default async function CheckMeetings(receiverEmail: string) {
    const receiverRef = collection(db, "meetings");
    const receiverDocRef = doc(receiverRef, receiverEmail);
    const receiverSnapshot = await getDoc(receiverDocRef);

    if (receiverSnapshot.exists()) {
      const retrievedData = receiverSnapshot.data();
      const keys = Object.keys(retrievedData);
      for (let i = 0; i < keys.length; i++) {
        if (retrievedData[keys[i]].age === "new") {
          return true;
        }
      }
    }
  }
  