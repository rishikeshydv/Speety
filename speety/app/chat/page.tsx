import React from 'react'
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

export default function page() {
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
