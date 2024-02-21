//speety/queries/notificationPush.ts pushes notification to “notifications” collection 
// of firebase and also to the realtime database

import { collection, addDoc } from "firebase/firestore"; 
import { uuidv4 } from "@firebase/util";  
import {db} from "@/firebase/config";
import {ref, set } from "firebase/database";
import { realtimeDatabase } from "@/firebase/config";
import { send } from "process";

export default async function pushNotifications(senderEmail:string,receiverEmail:string,notificationType:string){
  const _uniqueId = uuidv4()
  //add to the realtime database
  set(ref(realtimeDatabase, 'notifications'), {
    age:"NEW",
    notificationType:notificationType,
    receiverEmail:receiverEmail,
    senderEmail:senderEmail,
    status:"PENDING",
    uniqueId:_uniqueId
  });

  //add to the firebase firestore
    await addDoc(collection(db, "notifications"), {
        age:"NEW",
        notificationType:notificationType,
        receiverEmail:receiverEmail,
        senderEmail:senderEmail,
        status:"PENDING",
        uniqueId:_uniqueId
      });
  
  //also, add to "latestRequest" which would show what 'email' sent the latest request
  //to the email we are working on

    await addDoc(collection(db, "latestRequest"), {
      receipient:receiverEmail,
      sender: senderEmail
    });

}