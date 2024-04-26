"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import poppins from '@/font/font';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Peer from "peerjs";
import moment from "moment"; //use moment.js to get time/date in a good format

interface LocationData {
  lat: number;
  lng: number;
}
const LocationMap = () => {
  const [user] = useAuthState(auth);
  const [id, setId] = useState("");

  useEffect(() => {
    if (user) {
      setId(user?.email as string);
    }
  }
  , [user]);

  const params = useParams()
  const email = decodeURIComponent(params["email"] as string)

  const [position1, setPosition1] = useState({ lat: 0, lng: 0 }); //retrieving user1's location uponChange
  const [position2, setPosition2] = useState({ lat: 0, lng: 0 }); //retrieving user2's location uponChange

  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("")
  const [location, setLocation] = useState("")

  //state variables for the peer connection    ttfrfrdxsz
  const [myPeer, setMyPeer] = useState<Peer | null>(null);
  const [connection, setConnection] = useState<any>({});
  const [currentTime, setCurrentTime] = useState(moment());
  const [sentTime, setSentTime] = useState("");
  const [receivedTime, setReceivedTime] = useState("");

  const initializeMap = () => {
    //GEOCODE LOGIC
   // const myGeocoder = new google.maps.Geocoder();
      //  myGeocoder.geocode( { 'address': destination}, function(results, status) {
      //   if (status == 'OK' && results) {

          const map = new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
              zoom: 4,
              center: { lat:40.7128 , lng: -74.0060 },
              mapId: "LocationTrackingMap",
            }
          );

          var markerSender = new google.maps.Marker({
            map: map,
            position: position1,
            label: { text: "Destination", color: 'blue', fontSize: '16px', fontWeight: 'bold'},
        });

        var markerReceiver = new google.maps.Marker({
          map: map,
          position: position2,
          label: { text: "Destination", color: 'blue', fontSize: '16px', fontWeight: 'bold'},
      });

    }

  useEffect(() => {

    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAvamq-1AR2paooKX-Hq7LvyyfIbwNsVVU&callback=initializeMap`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.addEventListener('load', initializeMap);
      document.body.appendChild(googleMapsScript);
    };

    // Check if the Google Maps script has already been loaded
    if (!window.google) {
      loadGoogleMapsScript();
    } 
  }, [position1, position2]);

   //   function to get the location of the user
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

        //function to send the message
        const send = (message: any) => {
          if (!email) {
            console.error("No user selected to send message to");
            return;
          }
          const conn = myPeer?.connect(email.slice(0, email.indexOf("@")));
          if (!conn) {
            console.log(conn)
          }
          setConnection(conn);

          //setting the position of the sender
          setPosition1({
              lat: message.lat,
              lng: message.lng,
            });
            conn?.on("open", () => {
              conn.send(message);
            });
        }

       //     useEffect to make a peer connection
    useEffect(() => {
      if (!myPeer && email) {
        const peer = new Peer(id.slice(0,id.indexOf("@")), {
          host: "localhost",
          port: 9000,
          path: "/myapp",
        });

        peer.on("open", (id) => {
          setMyPeer(peer);
        });

        peer.on("connection", (conn:any) => {
          conn.on("data", (data: any) => {
            if (data === null) {
              console.log("Nothing reeived on Receiver End");
              return;
            }
            //checking if the incoming data is a message
            console.log(data);
            
              setPosition2({
                lat: data.lat,
                lng: data.lng,
              });
              return;
            
          });
        });

      }

      return () => {
        if (myPeer) {
          myPeer.destroy();
          setMyPeer(null);
        }
      };
    }, []);

  return (

        <div className={`flex flex-col w-full h-screen items-center ${poppins.className} bg-gray-200`}>
      <div className="text-center mt-20 py-8 px-16 rounded-full shadow-2xl bg-slate-400">
        <h1 className="text-7xl font-bold tracking-tighter">Location Tracker</h1>
        <p className="text-sm text-gray-500 leading-loose md:text-base dark:text-gray-400">
          Accessible. Customizable. Open Source.
        </p>
      </div>
      <div className='flex gap-10 py-10'>
      {/* Destination Form Start*/}
<div className="mx-auto mt-48 max-w-lg space-y-4 flex flex-col items-center justify-center bg-gray-100 px-20 rounded-3xl" style={{height:500}}>
  <h1 className="text-2xl font-semibold">Enter Destination Location</h1>
      <div className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="street-address" className="text-xl">Street Address</Label>
          <Input id="street-address" placeholder="123 Main St" required  className="text-xl" value={streetAddress} onChange={(e)=>{setStreetAddress(e.target.value)}}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-xl">City</Label>
            <Input id="city" placeholder="City" required  className="text-xl" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-xl">State/Province</Label>
            <Input id="state" placeholder="State" required  className="text-xl" value={state} onChange={(e)=>{setState(e.target.value)}}/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip" className="text-xl">Postal/ZIP code</Label>
          <Input id="zip" placeholder="90210" required  className="text-xl" value={zip} onChange={(e)=>{setZip(e.target.value)}}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="country" className="text-xl">Country</Label>
          <Input id="country" placeholder="Country" required  className="text-xl" value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
        </div>
        
        <div className="flex items-center justify-center gap-5">
    <Button className="w-32 text-xl mt-4" type="submit" onClick={()=>{    }}>
          Submit
        </Button>
        </div>
      </div>
    </div> 
    {/* Destination Form End */}

    {/* Map Start */}
      <div className='bg-white p-4 rounded-3xl shadow-2xl'>
      <div id="map" style={{ height: '850px', width:"1600px" }}></div>
      </div>
      </div>
    </div>

  );
};

export default LocationMap;
