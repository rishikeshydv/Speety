
"use client";

import React, { use, useEffect, useState } from "react";
import poppins from "@/font/font";
import LeftmostBar from '@/components/chat/LeftmostBar';
import TopLeft from '@/components/chat/TopLeft';
import TopRight from '@/components/chat/TopRight';
import UserList from '@/components/chat/UserList';
import ChatList from '@/components/chat/ChatList';
import SendBar from '@/components/chat/SendBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, addDoc, getDocs, where, query } from "firebase/firestore";
import { db } from "@/firebase/config";
import Peer from "peerjs"

//imports for sendbar
//import React, { useState } from 'react'
import { BiPaperclip } from "react-icons/bi";
import { FaMicrophone } from "react-icons/fa6";
import { FiSend } from "react-icons/fi";

//imports for location
import GetLatLng from "@/services/location/addressConverter";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Locator } from "@/services/location/currentLocation";

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
interface _messageInfo {
  msg: string;
  _datetime: string;
}
interface messageType {
  id: string;
  messageInfo: _messageInfo;
}

export default function Chat() {
  const [user] = useAuthState(auth);
  const [id, setId] = useState<string>("");

// peerjs cannot make a peer with an email because of @ symbol
//so we only set the id to the characters before the @ symbol
//that slice of string is unique as it is the email id before the @ symbol
  useEffect(() => {
    if (user && user.email) {

      setId(user.email.slice(0, user.email.indexOf('@')));
    }
  }, [user]);
  console.log(user?.email);




  const [clicked, setClicked] = useState("");
  const [messages, setMessages] = useState<messageType[]>([]);
  const [myPeer, setMyPeer] = useState<Peer | null>(null);
  const [connection, setConnection] = useState({});


  function userOnClick(clickedUser: string) {
    setClicked(clickedUser);
  }


  const send = (message:string) => {
    const conn = myPeer?.connect(clicked);

    conn?.on('open', () => {

      const newMessage: messageType = {
        id: "",
        messageInfo: {
          msg: message,
          _datetime: ""
        }
      };

      conn.send(newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);


    })}

    useEffect(() => {
        if (!myPeer && id){
      //    console.log("Hi",id);
          const peer = new Peer(id, {
              host: "localhost",
              port: 9000,
              path: "/myapp",
            });
        
            peer.on('open', (id ) => {
              setMyPeer(peer);
              setId(id);
            });
        
            peer.on('connection', (conn) => {
              conn.on('data', (data:any) => {
                setMessages((prevMessages) => [...prevMessages, data]);
              });
            });
      }
      return () => {
          if (myPeer) {
              myPeer.destroy();
              setMyPeer(null);
          }
      };
      }
      , [myPeer,id]);
  
  return (
    <div className={poppins.className}>
<LeftmostBar />
<TopLeft />
 <TopRight />
<UserList onUserClick={userOnClick}/>  
<ChatList chatHistory={messages}/>
    <SendBar sendMessageFunction={send}/>
    </div>
  )
}
