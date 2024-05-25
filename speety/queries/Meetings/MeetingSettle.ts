import { collection, setDoc,getDoc,doc, updateDoc } from "firebase/firestore"; 
import { uuidv4 } from "@firebase/util";  
import {db} from "@/firebase/config";

export default async function MeetingSettle(meetingId:string,receiverEmail:string, senderEmail:string, status:string,date:string){
  
      //resolves the user?.email side notifications
    const receiverRef = collection(db, "meetings");
    const receiverDocRef = doc(receiverRef, receiverEmail);
    await updateDoc(receiverDocRef, {
        [`${meetingId}`]: {
          from:senderEmail,
          status:status,
          date:date,
          id:meetingId,
          age:"old"
        }
      });

    //resolves the from side notifications
    const docRef2 = doc(db, "meetings", senderEmail);
    const docSnap2 = await getDoc(docRef2);
    if (docSnap2.exists()) {
      const data = docSnap2.data();
      const keys  = Object.keys(data);
      for (const key of keys) {
        if(data[key].email === receiverEmail && data[key].date === date){
        data[key].status = "accepted";
        data[key].age = "old";
        await updateDoc(docRef2, data);
        } 
      }
    }

}
