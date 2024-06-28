import { doc, updateDoc, deleteField } from "firebase/firestore";  
import {db} from "@/firebase/config";

export default async function DeleteNotification(notificationId:string,email:string){
  
    const receiverRef = doc(db, "notifications", email);
    await updateDoc(receiverRef, {
        [`${notificationId}`]: deleteField()
      });
}
