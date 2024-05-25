//here we will be checking if the user has any unread notifications or not
//this would decide the type of notification icon to be displayed
import {
    collection,
    getDoc,
    doc
  } from "firebase/firestore";
  import { db } from "@/firebase/config";
  
  export default async function RetrieveMeetings(receiverEmail: string) {
    const receiverRef = collection(db, "meetings");
    const receiverDocRef = doc(receiverRef, receiverEmail);
    const receiverSnapshot = await getDoc(receiverDocRef);
  
    let meetingsList: any = [];
    if (receiverSnapshot.exists()) {
      const retrievedData = receiverSnapshot.data();
      for (let i = 0; i < Object.keys(retrievedData).length; i++) {
        meetingsList.push(retrievedData[Object.keys(retrievedData)[i]]);
      }
    }
    return meetingsList;
  }
  