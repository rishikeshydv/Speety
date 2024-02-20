//this code is used to create a webRTC peerjs new Peer() on the chat app, if there is an event "call"
//we create a popup UI with options to ACCEPT/REJECT the call
//upon acceptance, the receiver is directed to /video/${user.email}
import React, { useEffect } from "react";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";
import IncomingCallPopup from "@/components/PopupCall"


useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
        const peer = new Peer();
        peer.on('call',function(call){
            //upon receiving the event "call", we are passing the call as an argument to a page that
            //pops up a window to answer or reject the call
            IncomingCallPopup(call)
        })
    });
}, []);