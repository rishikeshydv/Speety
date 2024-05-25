//speety/queries/notificationPush.ts pushes notification to “notifications” collection 
// of firebase and also to the realtime database

import { collection, setDoc,getDoc,doc, updateDoc } from "firebase/firestore"; 
import { uuidv4 } from "@firebase/util";  
import {db} from "@/firebase/config";



export default async function PushNotifications(senderEmail:string,receiverEmail:string,date:string){
  const _uniqueId = uuidv4()
  //add to the realtime database
  // set(ref(realtimeDatabase, 'notifications'), {
  //   age:"NEW",
  //   notificationType:notificationType,
  //   receiverEmail:receiverEmail,
  //   senderEmail:senderEmail,
  //   status:"PENDING",
  //   uniqueId:_uniqueId
  // });

  const receiverRef = collection(db, "notifications");
  const receiverDocRef =  doc(receiverRef, receiverEmail);
  const receiverSnapshot = await getDoc(receiverDocRef);
  if(!receiverSnapshot.exists()){
    await setDoc( receiverDocRef, {
        // If the document doesn't exist, create a new one
      [`${_uniqueId}`]: {
        age:"new",
        from:senderEmail,
        status:"pending",
        date:date,
        type:"chat",
        id:_uniqueId
      }
      });
  }
  else{
  // If the document exists, update its fields
  await updateDoc(receiverDocRef, {
    [`${_uniqueId}`]: {
      age:"new",
      from:senderEmail,
      status:"pending",
      date:date,
      type:"chat",
      id:_uniqueId
    }
  });
  }


  


}