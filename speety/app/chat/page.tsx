"use client";

import React, { useEffect, useState } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase/config";

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
  var [userList, setUserList] = useState([]);
  //clicked is used to store the receiverEmail
  var [clicked, setClicked] = useState("");

  //the function below returns a list to which userEmail is connected to
  //this is stored in the "connectedHistory" collection of firebase
  //we will be using it to build the left UI of the chatroom
  async function getConnectedUsers() {
    if (user) {
      const connectionEstablishedQuery = query(
        collection(db, "connectedHistory"),
        where("senderEmail", "==", user.email)
      );
      const connectionEstablishedSnapshot = await getDocs(
        connectionEstablishedQuery
      );
      connectionEstablishedSnapshot.forEach((doc) => {
        setUserList(doc.data().connectedEmails);
      });
    }
  }
  //starting the function to get users
//  getConnectedUsers();

  //upon clicking the users in the left, we set the value of 'clicked'
  function userOnClick(clickedUser: string) {
    setClicked(clickedUser);
    console.log(clicked)
  }

//gets me a list of users on the left side of the app
  useEffect(()=>{
    async function fetchData() {
      await getConnectedUsers();
  }
  fetchData();
  }, [])

  //we will be sending and receiving messages now
  useEffect(() => {
    const messageInput = document.getElementById(
      "message-input"
    ) as HTMLTextAreaElement;
    const sendButton = document.getElementById(
      "send-button"
    ) as HTMLButtonElement;

    import("peerjs").then(({ default: Peer }) => {
      //creating peer of the sender user
      var peer = new Peer(user?.email as string);
      //making connection with the receiver user email
      var conn = peer.connect(clicked);

      //TODO: Chat App Start
      peer.on("connection", (conn) => {
        console.log("Connected to: " + conn.peer);

        //sending the message to the receiver peer upon clicking on the send button
        sendButton.addEventListener("click", () => {
          const message = messageInput.value;
          conn.send(message);
          displayMessage(message)
          messageInput.value = ""; // Clear the input box
        });

        conn.on("data", (data) => {
          displayMessage(data as string);
        });

        function displayMessage(message: string) {
          const messagesDiv = document.getElementById(
            "text-area"
          ) as HTMLElement;
          const messageParagraph = document.createElement("p");
          messageParagraph.textContent = message;
          messagesDiv.appendChild(messageParagraph);
        }

        //TODO: Chat App End

        //TODO: Video Call App Start
        //here, we will check if we have any incoming calls
        var getUserMedia = navigator.mediaDevices.getUserMedia;
      //grabs the frame onto which the receiver video will be shown
        const receiverVideo = document.getElementById(
          "receiver"
        ) as HTMLVideoElement;
        peer.on("call", function (call) {
          getUserMedia({ video: true, audio: true }).then(
            (stream: MediaStream) => {
              call.answer(stream);
              
              //TODO: DATABASE LOGIC

              //write a logic to store the call into the database and its status of ACCEPT/REJECT
              //this should be restored in the chat history

              
              call.on("stream", function (remoteStream) {
                // Show stream in some video/canvas element.
                receiverVideo.srcObject = stream;
                try {
                  receiverVideo.play();
                } catch (error) {
                  console.log("Error playing the caller video", error);
                }
              });
            }
          );
        });


         //here, we will be sending call to different peers
        //the react functional component below accesses the caller video and send the
        //stream to the receiver
        //it returns a html component which means you get an UI as well
        function videoOnClick() {
          console.log("Video Call Started")
          //accessing the video frame of the calling user
          const callerVideo = document.getElementById(
            "caller"
          ) as HTMLVideoElement;

          //adding the event listener for the user who starts the call
            var getUserMedia = navigator.mediaDevices.getUserMedia;
            getUserMedia({ video: true, audio: true })
              .then((stream: MediaStream) => {
                var call = peer.call(clicked, stream); //stream is the video/audio of callerUser
                call.on("stream", function (remoteStream: MediaStream) {
                  //remoteStream is the video/audio of receiverUser
                  callerVideo.srcObject = stream;
                  try {
                    callerVideo.play();
                  } catch (error) {
                    console.log("Error playing the caller video", error);
                  }
                });
                call.on("error",(error)=>{
                  console.log("Error occurred during call:", error);
                })
              })
              .catch((err) => {
                console.log("Error Occurred during getUserMedia");
              });

              //TODO: DATABASE LOGIC

              //write a logic to store the call into the database and its status of ACCEPT/REJECT
              //this should be restored in the chat history
        }

        //here, we access the video call icon and add an OnClickEventListener
        const VideoCall = document.getElementById(
          "start-call"
        ) as HTMLButtonElement;
        VideoCall.addEventListener('click',videoOnClick)
      });
    });
  }, []);

  return (
    <div className="chat-container">
      <div className="w-screen h-screen">
        <ResizablePanelGroup direction="horizontal">
          <ResizablePanel>UserLists</ResizablePanel>
          <div className="connected-users">
            {/* Here we will be adding all the users inside this class "connected-users" */}
            <ul className="flex flex-row justify-center">
              {userList.map((email) => (
                <button key={email} onClick={() => userOnClick(email)}>
                  <li>{email}</li>
                </button>
              ))}
            </ul>
          </div>
          <ResizableHandle />
          <ResizablePanel>
            <ResizablePanelGroup direction="vertical">
              <ResizablePanel>
                <div
                  className="flex flex-row justify-between"
                  onClick={() => {}}
                >
                  {/* this is the avatar ui for video call */}
                  <button id="start-video">
                    <Avatar>
                      <AvatarImage src="/video-call.png" />
                      <AvatarFallback>Video</AvatarFallback>
                    </Avatar>
                  </button>
                  {/* this is the avatar ui for location call */}
                  <button id="start-location" onClick={() => {}}>
                    <Avatar>
                      <AvatarImage src="/locate.png" />
                      <AvatarFallback>Location</AvatarFallback>
                    </Avatar>
                  </button>
                </div>
              </ResizablePanel>
              <ResizableHandle />
              <ResizablePanel>
                <div className="chat-messages">
                  <h2>Chat Messages</h2>
                  <div id="text-area"></div>
                  <div>
                    <textarea
                      id="message-input"
                      className="rows-4 cols-50"
                      placeholder="Enter text..."
                    />
                    <button id="send-button">Send</button>
                    <ul></ul>
                  </div>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>

{
/* 
Here we will be temporarily adding the sender and receiver videos
I really need to find a way to pop up a screen to accept/reject the call, store the history of calls
*/}
      <div>
              <video id="caller"></video>
              <video id="receiver"></video>
            </div>

    </div>
  );
}
