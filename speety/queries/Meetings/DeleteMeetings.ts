import { doc, updateDoc, deleteField } from "firebase/firestore";  
import {db} from "@/firebase/config";

export default async function DeleteMeetings(notificationId:string,email:string){
  
    const receiverRef = doc(db, "meetings", email);
    await updateDoc(receiverRef, {
        [`${notificationId}`]: deleteField()
      });
}
