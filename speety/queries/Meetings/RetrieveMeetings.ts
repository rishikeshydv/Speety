//here we will be checking if the user has any unread notifications or not
//this would decide the type of notification icon to be displayed
import {
    collection,
    getDoc,
    doc
  } from "firebase/firestore";
  import { db } from "@/firebase/config";
  
  export default async function RetrieveMeetings(receiverEmail: string) {
    //algorithm to sort the notifications in descending order of time
    const compareTimeDescending = (a: any, b: any) => {
      const timeA: any = new Date(a.time);
      const timeB: any = new Date(b.time);
      return timeB - timeA;
    };
  
    const receiverRef = collection(db, "meetings");
    const receiverDocRef = doc(receiverRef, receiverEmail);
    const receiverSnapshot = await getDoc(receiverDocRef);
  
    let meetingsList: any = [];
    if (receiverSnapshot.exists()) {
      const retrievedData = await receiverSnapshot.data();
      for (let i = 0; i < Object.keys(retrievedData).length; i++) {
        meetingsList.push(retrievedData[Object.keys(retrievedData)[i]]);
      }
    }
    return meetingsList;
  }
  