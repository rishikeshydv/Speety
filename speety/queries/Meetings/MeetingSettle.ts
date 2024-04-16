import { collection, setDoc,getDoc,doc, updateDoc } from "firebase/firestore"; 
import { uuidv4 } from "@firebase/util";  
import {db} from "@/firebase/config";

export default async function MeetingSettle(meetingId:string,receiverEmail:string, senderEmail:string, status:string,date:string){
  
    const receiverRef = collection(db, "meetings");
    const receiverDocRef = doc(receiverRef, receiverEmail);
    await updateDoc(receiverDocRef, {
        [`${meetingId}`]: {
          from:senderEmail,
          status:status,
          date:date,
          id:meetingId
        }
      });

}
