//we will be using this code to check the ACCEPT/DENY status of the video notifications
//speety/services/notificationCheck/rrVideo.ts checks for the chat notifications in realtime
// and make an UI for the new notification with the required button

import { realtimeDatabase,db } from "@/firebase/config";
import {
    collection,
    addDoc
  } from "firebase/firestore";
  import {ref, onValue } from "firebase/database";


//CHAT notification check

export function statusVideo(_senderEmail: string, _receiverEmail: string){
    const notificationReference = ref(realtimeDatabase,`notifications/${_senderEmail}_${_receiverEmail}`);
    const valueLookup = onValue(notificationReference,(snapshot)=>{
        const videoStat = snapshot.val().status;
        if (videoStat === "PENDING"){
            
        //if the user is still in session, create a popUp to receive or decline the video call
        //else the call remains as a message in the chat history with a timestamp


        }
    })
}

