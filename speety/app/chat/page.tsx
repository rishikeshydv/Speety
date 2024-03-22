import React, { useEffect, useState } from "react";
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

export default function Chat() {
  const [user] = useAuthState(auth);

  const [id, setId] = useState<string>("");
  const [friendId, setFriendId] = useState<string>("");
  const [message, setMessage] = useState<string>("");

  const [clicked, setClicked] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [myPeer, setMyPeer] = useState<Peer | null>(null);
  const [connection, setConnection] = useState({});

  function userOnClick(clickedUser: string) {
    setClicked(clickedUser);
  }

  function messageFunc(event: any) {
    setMessage(event.target.value);
  }

  const send = () => {
    const conn = myPeer?.connect(friendId);

    conn?.on('open', () => {

      const msgObj = {
        sender: id,
        message: message
      };

      conn.send(msgObj);
      setMessages((prevMessages) => [...prevMessages, message]);
      setMessage('')

    })}

    useEffect(() => {
      if (!myPeer && user && user.email){
          const peer = new Peer(user.email, {
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
                setMessages((prevMessages) => [...prevMessages, data.message]);
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
      , [myPeer]);
  
  return (
    <div className={poppins.className}>
<LeftmostBar />
<TopLeft />
 <TopRight />
<UserList />  
<ChatList />
<SendBar />
    </div>
  )
}
