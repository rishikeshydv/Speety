//here we will be checking if the user has any unread notifications or not
//this would decide the type of notification icon to be displayed
import {
  collection,
  getDoc,
  doc
} from "firebase/firestore";
import { db } from "@/firebase/config";

export default async function CheckNotifications(receiverEmail: string) {

  const receiverRef = collection(db, "notifications");
  const receiverDocRef = doc(receiverRef, receiverEmail);
  const receiverSnapshot = await getDoc(receiverDocRef);
  if (receiverSnapshot.exists()) {
    const retrievedData = await receiverSnapshot.data();
    for (let i = 0; i < Object.keys(retrievedData).length; i++) {
      if (retrievedData[Object.keys(retrievedData)[i]].age === "new") {
        return true;
      }
    }
  }
}
