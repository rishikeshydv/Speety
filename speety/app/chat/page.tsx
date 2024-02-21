"use client";

import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import { type } from "os";

interface User {
  id: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
}

export default function Chat() {
  const [user] = useAuthState(auth);
  const temp:any = [];
  var [userList,setUserList]= useState([]);
  //the function below returns a list to which userEmail is connected to
  //this is stored in the "connectedHistory" collection of firebase
  async function getConnectedUsers(){
    if (user) {
      const connectionEstablishedQuery = query(
        collection(db, "connectedHistory"),
        where("senderEmail", "==", user.email)
      );
      const connectionEstablishedSnapshot = await getDocs(
        connectionEstablishedQuery
      );
      connectionEstablishedSnapshot.forEach((doc) => {
          setUserList(doc.data().connectedEmails)
      });
    }
  }
  //starting the functions
getConnectedUsers()

//upon clicking the 
  function userOnClick(clickedUser: string) {
    useEffect(() => {
      import("peerjs").then(({ default: Peer }) => {
        //creating peer of the sender user
        var peer = new Peer(user?.email as string);
        //making connection with the receiver user email
        var conn = peer.connect(clickedUser);
      });
    }, []);
  }


  // here, we will be retrieving all the users that auth.email is connected with
  const [videoCallOpen, setVideoCallOpen] = useState(false);
  const [locationSharingOpen, setLocationSharingOpen] = useState(false);

  return (
    <div className="chat-container">
      <div className="w-screen h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>UserLists</ResizablePanel>
          <div className="connected-users">
            {/* Here we will be adding all the users inside this class "connected-users" */}
            <ul className="flex flex-row justify-center">
              {userList.map((email) => (
                <button onClick={()=>userOnClick(email)}><li key={email}>{email}</li></button>
              ))}
            </ul>
          </div>
          <ResizableHandle />
          <ResizablePanel>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel>
                <div className="flex flex-row justify-between">
                  <button>Video</button>
                  <button>Location</button>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <div className="chat-messages">
                  <h2>Chat Messages</h2>
                  <div>
                  <textarea className="rows-4 cols-50"
                placeholder="Enter text..."
              />
              <button onClick={()=>{}}>Send</button>
                  <ul></ul>
                  </div>                  
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
      <div className="button-container">
        <button onClick={() => setVideoCallOpen(true)}>Start Video Call</button>
        <button onClick={() => setLocationSharingOpen(true)}>
          Share Location
        </button>
      </div>
      {videoCallOpen && (
        <div className="video-call-modal">
          {/* Video call component */}
          <button onClick={() => setVideoCallOpen(false)}>
            Close Video Call
          </button>
        </div>
      )}
      {locationSharingOpen && (
        <div className="location-sharing-modal">
          {/* Location sharing component */}
          <button onClick={() => setLocationSharingOpen(false)}>
            Close Location Sharing
          </button>
        </div>
      )}
    </div>
  );
}
