/**
 * v0 by Vercel.
 * @see https://v0.dev/t/R6lEUyj0VBq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { Button } from "@/components/ui/button";
import { AiOutlineAudio } from "react-icons/ai"; //unmute icon
import { AiOutlineAudioMuted } from "react-icons/ai"; //mute icon
import { BsCameraVideo } from "react-icons/bs"; //video icon
import { BsCameraVideoOff } from "react-icons/bs"; //video off icon
import React, { useState, useEffect } from "react";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/router";

export default function Component() {
  const [clicked, setClicked] = useState<string>("");
  //TODO: Video Call App Start
  //here, we will check if we have any incoming calls
  var getUserMedia = global.navigator.mediaDevices.getUserMedia;
  //grabs the frame onto which the receiver video will be shown
  const receiverVideo = document.getElementById("receiver") as HTMLVideoElement;
  const callerVideo = document.getElementById("caller") as HTMLVideoElement;
  const [user] = useAuthState(auth);
  useEffect(() => {
    import("peerjs").then(({ default: Peer }) => {
      const peer = new Peer(user?.email || "");
      console.log("Peer Created " + user?.email);
      console.log(peer);


        //here, we will be receiving calls from different peers
      peer.on("call", function (call) {
        getUserMedia({ video: true, audio: true }).then(
          (stream: MediaStream) => {
            call.answer(stream);
            console.log("Answered the call");

            //TODO: DATABASE LOGIC

            //write a logic to store the call into the database and its status of ACCEPT/REJECT
            //this should be restored in the chat history

            call.on("stream", function (remoteStream) {
              // Show stream in some video/canvas element.
              receiverVideo.srcObject = stream;
              try {
                receiverVideo.play();
                console.log("Receiver Video Played");
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
      const StartCall = document.getElementById("start-call") as HTMLVideoElement;
      StartCall?.addEventListener("click", videoOnClick);
      function videoOnClick() {
        console.log("Video Call Started");
        //accessing the video frame of the calling user

        //adding the event listener for the user who starts the call
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
            call.on("error", (error) => {
              console.log("Error occurred during call:", error);
            });
          })
          .catch((err) => {
            console.log("Error Occurred during getUserMedia");
          });
      }
    });
  }, [user?.email,clicked]);

  //TODO: Video Call App End

  return (
    <div className="flex flex-col h-[600px] rounded-xl overflow-hidden shadow-lg">
      <div className="flex flex-row h-full">
        <div className="aspect-video bg-gray-200 dark:bg-gray-800 w-1/2 rounded-3xl ml-3 mr-3 mb-4">
          <video id="caller"></video>
        </div>
        <div className="aspect-video bg-red-200 dark:bg-gray-800 w-1/2 rounded-3xl mr-4 mb-4">
          <video
            id="receiver"
            className="object-cover w-full rounded-md"
          ></video>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center p-4 bg-gray-100 dark:bg-gray-800">
        <Button
          className="rounded-lg bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 w-40 mr-4"
          size="lg"
        >
          <BsCameraVideo className="h-6 w-6" />
          Video Call
        </Button>
        <Button
          className="rounded-lg bg-green-500 hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-800 w-40 mr-4"
          size="lg"
        >
          <AiOutlineAudio className="h-6 w-6" />
          Unmute
        </Button>
        <Button
          className="rounded-lg bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 w-40"
          size="lg"
        >
          End Call
        </Button>
      </div>
      <div>
        <button 
        className="bg-black text-white" 
        onClick={()=>{
            setClicked("test@test.com");
            console.log("Clicked " + clicked);
        }}
        >Call Saddy</button>

<button 
        className="bg-black text-white" 
        id="start-call"
        >Start Call</button>
      </div>
    </div>
  );
}
