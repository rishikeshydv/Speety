//we will be using this code to check the ACCEPT/DENY status of the chat notifications
//speety/services/notificationCheck/rrChat.ts checks for the chat notifications in realtime
// and make an UI for the new notification with the required button

import { realtimeDatabase,db } from "@/firebase/config";
import {
    collection,
    addDoc
  } from "firebase/firestore";
  import {ref, onValue } from "firebase/database";


//CHAT notification check

export function statusChat(_senderEmail: string, _receiverEmail: string){
    const notificationReference = ref(realtimeDatabase,`notifications/${_senderEmail}_${_receiverEmail}`);
    const valueLookup = onValue(notificationReference,(snapshot)=>{
        const chatStat = snapshot.val().status;
        if (chatStat === "PENDING"){


        // writing a function to add the notification to the notification bar
        //and a UI
        
            
        //write a function to make a change to the notification icon
        //what can you do is, if there is anything 'pending', just change the
        //notification
        //also if user is still in session, make a popup UI


        }
    })
}



//    // try {
        // // Query Firestore for notifications between sender and receiver
        // const q = query(
        //     collection(db, "notifications"),
        //     where("senderEmail", "==", _senderEmail),
        //     where("receiverEmail", "==", _receiverEmail)
        // );

        // // Retrieve chat requests
        // const chatRequests = await getDocs(q);

        // // Loop through each notification
        // for (const doc of chatRequests.docs) {
        //     // Get the status from the notification
        //     const chatStatus: "PENDING" | "ACCEPTED" | "REJECTED" = doc.data().status;

        //     // If any chat request is accepted, return true
        //     if (chatStatus === "ACCEPTED") {
        //         return true;
        //     }
        // }

        // // If no accepted chat request found, return false
        // return false;
    // } catch (error) {
    //     console.error("Error fetching chat status:", error);
    //     throw error;
    // }