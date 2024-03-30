"use client";
import React, { useRef, useEffect, useState, use } from "react";
import poppins from "@/font/font";
import LeftmostBar from "@/components/chat/LeftmostBar";
import TopLeft from "@/components/chat/TopLeft";
import TopRight from "@/components/chat/TopRight";
import UserList from "@/components/chat/UserList";
import ChatList from "@/components/chat/ChatList";
import SendBar from "@/components/chat/SendBar";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Peer from "peerjs";
import moment from "moment"; //use moment.js to get time/date in a good format

//imports for location
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Loader } from "@googlemaps/js-api-loader"
import { Locator } from "@/services/location/currentLocation";

interface userLoc {
  email: string;
  location: [number, number];
}

interface LocationData {
  lat: number;
  lng: number;
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
  const [myGeocoder, setMyGeocoder] = useState<any>({});
  const [position1, setPosition1] = useState({ lat: 0, lng: 0 }); //retrieving user1's location uponChange
  const [position2, setPosition2] = useState({ lat: 0, lng: 0 }); //retrieving user2's location uponChange

//setting up Google Map API
const loader = new Loader({
  apiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  version: "weekly",
  libraries: ["places"]
});
let map,infoWindow;
async function initMap(destination:LocationData) {
  const { Map } = await google.maps.importLibrary("maps") as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker") as google.maps.MarkerLibrary;
   map = new Map(document.getElementById("map") as HTMLElement,
    {
    center: position1,
     zoom: 8,
    }) ;
    infoWindow = new google.maps.InfoWindow();
    const geocoder = new google.maps.Geocoder();
    setMyGeocoder(geocoder);

    const destinationMarker = new AdvancedMarkerElement({
      map: map,
      position: destination,
      title: 'Destination'
    });

    //setting the marker for the sender
    infoWindow.setPosition(position1);
    infoWindow.setContent("Your current location");
    infoWindow.open(map);

    //setting the marker for the receiver
    infoWindow.setPosition(position2);
    infoWindow.setContent("Receiver's current location");
    infoWindow.open(map);
}

    const fetchLatLng = async (address:string) => {
      myGeocoder.geocode({ address }, (results:any, status:any) => {
        if (status === 'OK' && results) {
          console.log(results);
          const locationData: LocationData = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          return locationData;
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
    }
    //function to get the location of the user
    function locationUpdate() {
      //on clicking the location share button, there should be a popup
      // Send location when obtained
      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(function (position) {
          send({
            lat: position.coords.latitude,
            lng: position.coords.longitude,   
          });    //connection stores 'conn' as a state
        });
      } else {
        console.log("Geolocation is not supported by this browser.");
      }
    }

    //writing a function to get senderUser's location every 1 sec and sending it to the receiver
    useEffect(() => {
      const intervalId = setInterval(locationUpdate, 1000);
      return () => clearInterval(intervalId);
    }, []);
  



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
    const send = (message: any) => {
      const conn = myPeer?.connect(clicked);
      setConnection(conn);
      // sending a peerjs message
      if (typeof message === "string"){
        const formattedTime = currentTime.format("YYYY-MM-DD HH:mm:ss");
        setSentTime(String(formattedTime));
        setSentMessage({
          msg: message,
          date: formattedTime,
        });
        conn?.on("open", () => {
          conn.send(sentMessage);
        });
      }
      //sending a location
      if (typeof message === "object" && "msg" in message && "date" in message) {
        setPosition1({
          lat: message.latt,
          lng: message.long,
        });
        conn?.on("open", () => {
          conn.send(position1);
        });
    }}

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
            if (data === null) {
              console.log("Nothing reeived on Receiver End");
              return;
            }
            //checking if the incoming data is a message

            if (typeof data === "object" && "msg" in data && "date" in data) {
              const incomingMessage: eachMessage = data;
              setReceivedMessage({
                msg: incomingMessage.msg,
                date: incomingMessage.date,
              });
              setReceivedTime(String(incomingMessage.date));
              return;
            }

            //checking if the incoming data is a location
            if (typeof data === "object" && "lat" in data && "lng" in data) {
              const incomingLocation: LocationData = data;
              setPosition2({
                lat: incomingLocation.lat,
                lng: incomingLocation.lng,
              });
              return;
            }
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
                  (remoteVideoRef.current as HTMLVideoElement).srcObject =
                    remoteStream;
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
      <TopRight
        callerRef={currentUserVideoRef}
        receiverRef={remoteVideoRef}
        videoOnClick={() => call("")}
        mapInitialiser={initMap}
        addressConverter={fetchLatLng}
        senderLoc={position1}
        receiverLoc={position2}
      />
      <UserList onUserClick={userOnClick} /> 
<ChatList
        sentMessage={sentMessage}
        sentTime={sentTime}
        receivedMessage={receivedMessage}
        receivedTime={receivedTime}
        senderEmail={user?.email as string}
        receiverEmail={clicked || "rishikeshadh4@gmail.com"}

      />
      {/*we will be loading the clicked one or the first one in the list  */}
<SendBar sendMessageFunction={send} />
    
    </div>
  );
}

