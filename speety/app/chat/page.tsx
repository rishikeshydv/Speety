"use client";
import React, { useRef, useEffect, useState } from "react";
import poppins from "@/font/font";
import LeftmostBar from "@/components/chat/LeftmostBar";
import TopLeft from "@/components/chat/TopLeft";
import TopRight from "@/components/chat/TopRight";
import UserList from "@/components/chat/UserList";
import ChatList from "@/components/chat/ChatList";
import SendBar from "@/components/chat/SendBar";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import Peer from "peerjs";
import moment from "moment"; //use moment.js to get time/date in a good format

//imports for video call
import { Button } from "@/components/ui/button"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"

//imports for location
import GetLatLng from "@/services/location/addressConverter";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Locator } from "@/services/location/currentLocation";
import { set } from "firebase/database";

interface User {
  id: string;
  name: string;
}

interface Message {
  id: string;
  text: string;
  senderId: string;
}

interface userLoc {
  email: string;
  location: [number, number];
}

interface LocationData {
  lat: number;
  lng: number;
}

interface MessageData {
  message: string;
}

//types for messages
interface eachMessage {
  msg: string;
  date: string;
}

export default function Chat() {
  const [user] = useAuthState(auth);
  const [id, setId] = useState<string>("");
  const [clicked, setClicked] = useState("");
  const [sentMessage, setSentMessage] = useState<eachMessage>({
    msg: "",
    date: "",
  });
  const [receivedMessage, setReceivedMessage] = useState<eachMessage>({
    msg: "",
    date: "",
  });
  //chats
  const [myPeer, setMyPeer] = useState<Peer | null>(null);
  const [connection, setConnection] = useState<any>({});
  const [currentTime, setCurrentTime] = useState(moment());
  const [sentTime, setSentTime] = useState("");
  const [receivedTime, setReceivedTime] = useState("");
  //video call
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  //location
    const { isLoaded } = useLoadScript({
      googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,      //initializing the google map api with the API key
    });
  var [address, setAddress] = useState<string>(""); //setting the destination location
  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {      //this handles the change in entered destination address and sets it to destination_
    setAddress(event.target.value);
  };
  const [latt, long] = GetLatLng({ address });
  const center = { lat: latt, lng: long };
    const [position1, setPosition1] = useState({ lat: 0, lng: 0 }); //retrieving user1's location uponChange
    const [position2, setPosition2] = useState({ lat: 0, lng: 0 });//retrieving user2's location uponChange
  useEffect(() => {
    // Function to update the current time every second
    const updateCurrentTime = () => {
      setCurrentTime(moment());
    };

    // Set up an interval to update the time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  // peerjs cannot make a peer with an email because of @ symbol
  //so we only set the id to the characters before the @ symbol
  //that slice of string is unique as it is the email id before the @ symbol
  useEffect(() => {
    if (user && user.email) {
      setId(user.email.slice(0, user.email.indexOf("@")));
    }
  }, [user]);

  //function to set the user that is clicked
  //and then make peer connection with that user
  function userOnClick(clickedUser: string) {
    setClicked(clickedUser);
  }

  //function to send the message
  const send = (message: string) => {
    const conn = myPeer?.connect(clicked);
    setConnection(conn);
    // Format the current time
    const formattedTime = currentTime.format("YYYY-MM-DD HH:mm:ss");
    setSentTime(String(formattedTime));
    setSentMessage({
      msg: message,
      date: formattedTime,
    });

    conn?.on("open", () => {
      conn.send(sentMessage);
    });
  };

  //function to make a call to the remote peer
  const call = (remotePeerId: string) => {
    // Check if getUserMedia is supported
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia is not supported in this browser");
      return;
    }
    // Use navigator.mediaDevices.getUserMedia for modern browsers
    navigator.mediaDevices
      .getUserMedia({ video: true, audio: true })
      .then((mediaStream) => {
        // Play local video stream
        if (currentUserVideoRef.current) {
          (currentUserVideoRef.current as HTMLVideoElement).srcObject =
            mediaStream;
          (currentUserVideoRef.current as HTMLVideoElement).play();
        }

        // Call the remote peer
        const call = myPeer?.call(remotePeerId, mediaStream);
        // Handle call errors
        call?.on("error", (error: any) => {
          console.error("Call error:", error);
        });
      })
      .catch((error) => {
        console.error("getUserMedia error:", error);
      });
  };

  //useEffect to make a peer connection

  useEffect(() => {
    if (!myPeer && id) {
      const peer = new Peer(id, {
        host: "localhost",
        port: 9000,
        path: "/myapp",
      });

      peer.on("open", (id) => {
        setMyPeer(peer);
        setId(id);
      });

      peer.on("connection", (conn) => {
        conn.on("data", (data: any) => {
          setReceivedMessage({
            msg: data.msg,
            date: data.date,
          });
          setReceivedTime(String(data.date));
        });
      });

      peer.on("call", (call) => {
        // Check if getUserMedia is supported
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error("getUserMedia is not supported in this browser");
          return;
        }

        // Use navigator.mediaDevices.getUserMedia for modern browsers
        navigator.mediaDevices
          .getUserMedia({ video: true, audio: true })
          .then((mediaStream) => {
            // Play local video stream
            if (currentUserVideoRef.current) {
              (currentUserVideoRef.current as HTMLVideoElement).srcObject =
                mediaStream;
              (currentUserVideoRef.current as HTMLVideoElement).play();
            }

            // Answer the call with the local media stream
            call.answer(mediaStream);

            // Handle incoming stream from the caller
            call.on("stream", (remoteStream) => {
              // Play remote video stream
              if (remoteVideoRef.current) {
              (remoteVideoRef.current as HTMLVideoElement).srcObject = remoteStream;
              (remoteVideoRef.current as HTMLVideoElement).play();
              }
            });

            // Handle call errors
            call.on("error", (error) => {
              console.error("Call error:", error);
            });
          })
          .catch((error) => {
            console.error("getUserMedia error:", error);
          });
      });
    }

    return () => {
      if (myPeer) {
        myPeer.destroy();
        setMyPeer(null);
      }
    };
  }, [myPeer, id]);

  return (
    <div className={poppins.className}>
            
      <LeftmostBar />
      <TopLeft />
      <TopRight callerRef={currentUserVideoRef} receiverRef={remoteVideoRef} videoOnClick={()=>call("")}/>
      <UserList onUserClick={userOnClick} />
      <ChatList
        sentMessage={sentMessage}
        sentTime={sentTime}
        receivedMessage={receivedMessage}
        receivedTime={receivedTime}
        senderEmail={user?.email as string}
        receiverEmail={clicked || "rishikeshadh4@gmail.com"}
      />{" "}
      {/*we will be loading the clicked one or the first one in the list  */}
      <SendBar sendMessageFunction={send} />
    </div>
  );
}
