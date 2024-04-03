import { collection, setDoc,getDoc,doc, updateDoc } from "firebase/firestore"; 
import { uuidv4 } from "@firebase/util";  
import {db} from "@/firebase/config";

export default async function NotificationSettle(notificationId:string,age:string,type:string,receiverEmail:string, senderEmail:string, status:string,date:string){
  
    const receiverRef = collection(db, "notifications");
    const receiverDocRef = doc(receiverRef, receiverEmail);
    await updateDoc(receiverDocRef, {
        [`${notificationId}`]: {
          age:age,
          type:type,
          from:senderEmail,
          status:status,
          date:date,
          id:notificationId
        }
      });

}
