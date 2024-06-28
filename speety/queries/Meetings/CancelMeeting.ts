//speety/queries/notificationPush.ts pushes notification to “notifications” collection
// of firebase and also to the realtime database

import { collection, setDoc, getDoc, doc, updateDoc } from "firebase/firestore";
import { uuidv4 } from "@firebase/util";
import { db } from "@/firebase/config";

    export default async function CancelMeetings(meetingId:string,receiverEmail:string, senderEmail:string, status:string,date:string){
      //resolves the user?.email side notifications
      const receiverRef = collection(db, "meetings");
      const receiverDocRef = doc(receiverRef, receiverEmail);
      await updateDoc(receiverDocRef, {
          [`${meetingId}`]: {
            from:senderEmail,
            status:status,
            date:date,
            id:meetingId,
            age:"new"
          }
        });
}
