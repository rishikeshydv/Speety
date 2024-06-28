import { collection,getDoc,doc } from "firebase/firestore"; 
import {db} from "@/firebase/config";

export default async function IsUserConnected(senderEmail:string, receiverEmail:string){
  const userRef = collection(db, "connectedHistory");
  const userDocRef = doc(userRef, senderEmail);
  const userSnapshot = await getDoc(userDocRef);
  if(userSnapshot.exists()){
    const data = userSnapshot.data();
    const keys = Object.keys(data);
    if(keys.includes(receiverEmail.slice(0,receiverEmail.indexOf(".")))){
      return true;
    }
    else{
      return false;
    }
  }
  else{
    return false;
  }
}