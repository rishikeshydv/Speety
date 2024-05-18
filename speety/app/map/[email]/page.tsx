"use client"

import React, { use, useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import poppins from '@/font/font';
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Peer, { DataConnection } from "peerjs";
import {
  collection,
  getDoc,
  doc
} from "firebase/firestore";
import { db } from "@/firebase/config";
import moment from "moment"; //use moment.js to get time/date in a good format

interface LocationData {
  lat: number;
  lng: number;
}
const LocationMap = () => {
  const [user] = useAuthState(auth);
  const [id, setId] = useState<string>("");

  useEffect(() => {
    if (user) {
      setId(user.email as string);
    }
  }
  , [user]);

  const params = useParams()
  const email = decodeURIComponent(params["email"] as string)

  const userLocation = useRef<LocationData>({ lat: 0, lng: 0 });
  const markerSender = useRef<google.maps.Marker>();
  const markerReceiver = useRef<google.maps.Marker>();
  const markerDestination = useRef<google.maps.Marker>();
  const googlemap = useRef<HTMLDivElement>();
  const map_ = useRef<google.maps.Map>();
  const position1 = useRef({ lat: 0, lng: 0 }); //retrieving user1's location uponChange
  const position2 = useRef({ lat: 0, lng: 0 }); //retrieving user2's location uponChange
  const destination= useRef<LocationData>({ lat: 0, lng: 0 }); //retrieving user2's location uponChange
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(null);
  const [isGoogleMapsLoaded, setGoogleMapsLoaded] = useState(false);  //to check if the google maps script is loaded or not

  const [senderUser, setSenderUser] = useState<string>('');
  const [receiverUser, setReceiverUser] = useState<string>('');

  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("")
  const [destinationAddress, setDestinationAddress] = useState("")
  const [buttonText, setButtonText] = useState("Submit")
  const [buttonColor, setButtonColor] = useState("bg-black")

  const [myPeer, setMyPeer] = useState<Peer | null>(null);
  const [connection, setConnection] = useState<DataConnection | null>(null);
  const [currentTime, setCurrentTime] = useState(moment());
  const [sentTime, setSentTime] = useState("");
  const [receivedTime, setReceivedTime] = useState("");

  //refresh the page
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };

  useEffect(() => {
  //function to get each user's name
  const getSenderUserInfo = async (userEmail:string) => {
    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, userEmail as string);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      setSenderUser(userSnapshot.data().name);
    }
  }
  if (id){
    getSenderUserInfo(id);
  }
  }, [id]);

  useEffect(() => {
    //function to get each user's name
    const getReceiverUserInfo = async () => {
      const userRef = collection(db, "User_Info");
      const userDocRef = doc(userRef, email);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        setReceiverUser(userSnapshot.data().name);
      }
    }
    getReceiverUserInfo();
  }, []);

  function joinAddress(e:any) {
    e.preventDefault();
    const address = `${streetAddress}, ${city}, ${state}, ${zip}, ${country}`;
    setDestinationAddress(address);
    
  }

  useEffect(() => {
    const geocodeDestination = async (address: any): Promise<LocationData> => {
      const myGeocoder = new google.maps.Geocoder();
      return new Promise<LocationData>((resolve, reject) => {
        myGeocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results) {
            const destinationLocation = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            resolve(destinationLocation);
          } else {
            reject(new Error("Geocode request failed."));
          }
        });
      });
    };

    const updateDestination = async () => {
      if (destinationAddress) {
        try {
          const location = await geocodeDestination(destinationAddress);
          destination.current = { lat: location.lat, lng: location.lng };

          if (markerDestination.current) {
            markerDestination.current.setPosition(destination.current);
          }
        } catch (error) {
          console.error("Error updating destination marker:", error);
        }
      }
    };
  
    updateDestination(); // Call function to update the destination marker when the address changes
  }, [destinationAddress]);

  
  useEffect(() => {
  const initializeMap = () => {
  
          const map = new google.maps.Map(
            googlemap.current as HTMLDivElement,
            {
              zoom: 4,
              center: position1.current,
              mapId: "LocationTrackingMap",
            }
          );

          //direction service
          const directionsService = new google.maps.DirectionsService();
          const directionsRenderer = new google.maps.DirectionsRenderer();
          directionsRenderer.setMap(map);
          map_.current = map;
          directionsServiceRef.current = directionsService;  //storing as a ref
          directionsRendererRef.current = directionsRenderer;  //storing as a ref

          setGoogleMapsLoaded(true); 

        markerSender.current = new google.maps.Marker({           
          position: position1.current,
          map,
          label: {text:senderUser, color: 'blue', fontSize: '12px', fontWeight: 'bold', fontFamily: 'Arial'},
          icon: {
            url: "https://maps.google.com/mapfiles/kml/shapes/man.png",
            fillColor: "red",
          },
        });

        markerReceiver.current = new google.maps.Marker({           
          position: position2.current,
          map,
          label: {text: receiverUser, color: 'black', fontSize: '12px', fontWeight: 'bold', fontFamily: 'Arial'},
          icon: {
            url: "https://maps.google.com/mapfiles/kml/shapes/man.png",
            fillColor: "blue",
          },
        });

        markerDestination.current = new google.maps.Marker({           
          position: destination.current,
          map,
          label: {text: "Destination", color: 'brown', fontSize: '12px', fontWeight: 'bold', fontFamily: 'Arial'},
          icon: {
            url: "https://maps.google.com/mapfiles/kml/shapes/ranger_station.png",
            fillColor: "green",
          },
        
        });
        
    }
    if (!window.google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAvamq-1AR2paooKX-Hq7LvyyfIbwNsVVU&callback=initializeMap`;
      script.async = true;
      script.defer = true;
      script.addEventListener('load', initializeMap);
      document.body.appendChild(script);
    } else {
      initializeMap(); // If Google Maps is already loaded
    }

  }, [senderUser, receiverUser, position1, position2]);

  useEffect(() => {
    if (isGoogleMapsLoaded) {
    const renderDirection = (route:any) => {
      if (directionsRendererRef.current) {
        (directionsServiceRef.current as google.maps.DirectionsService).route(route, (result, status) => {
          if (status === 'OK') {
            (directionsRendererRef.current as google.maps.DirectionsRenderer).setDirections(result);
          } else {
            console.error("Failed to render directions:", status);
          }
        });
      }
    };
  
    // Define your routes based on updated positions
    const route1 = {
      origin: position1.current,
      destination: destination.current,
      travelMode: google.maps.TravelMode.DRIVING,
    };
  
    const route2 = {
      origin: position2.current,
      destination: destination.current,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    renderDirection(route1);
    renderDirection(route2);
  }
  
  }, [position1, position2, destination,isGoogleMapsLoaded]); // Update directions when these dependencies change
  

useEffect(() => {
  const intervalId = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function (position) {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
              send(newLocation); // Send the new location to the other user
          });
        }
      },1000);
    return () => clearInterval(intervalId); // Cleanup
  });


  useEffect(() => {
    if (map_.current) {
      // if (markerSender.current) {
      //   markerSender.current.setPosition(position1);
      // }
      // if (markerReceiver.current) {
      //   markerReceiver.current.setPosition(position2);
      // }
      if (markerDestination.current) {
        markerDestination.current.setPosition(destination.current);
        // Optionally re-center the map if the destination changes
      }

      map_.current.setCenter(position1.current); 
  
    }
  }, [position1,destination]); 

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
        const send = (message: LocationData) => {

          //setting the position of the sender
          position1.current = message;
            if (connection && connection.open ){
             // connection.send(message);
                console.log('Connection opened, sending message...');
                connection.send(message);
            }
            if (markerSender.current) {
              markerSender.current.setPosition(message);
            }
        }

       //     useEffect to make a peer connection
    useEffect(() => {
      if (!myPeer && id) {
        const peer = new Peer(id.slice(0,id.indexOf("@")), {
          host: "localhost",
          port: 9000,
          path: "/myapp",
        });

        setMyPeer(peer);

        peer.on("open", (id) => {
          setMyPeer(peer);
        });


          const conn_ = peer.connect(email.slice(0, email.indexOf("@")));
          conn_.on('open', () => {
            console.log('Connection to receiver established');
            setConnection(conn_);
          });
          conn_.on('data', (data:any) => {
            console.log('Data received on receiver:', data);
            if (data) {
              if (markerReceiver.current) {
                markerReceiver.current.setPosition(data);
              }
              position2.current = data;
            } else {
              console.log('Nothing received on Receiver End');
            }
          });
          

        peer.on("connection", (conn:any) => {
          console.log('Receiver connected');
          conn.on("data", (data: any) => {
            console.log('Data received on receiver:', data);

              if (data && markerReceiver.current) {
                markerReceiver.current.setPosition(data);
                position2.current = data;
              }
              else{
                console.log('No data received');
              }
            
            
          });
        });

      }

      return () => {
        if (myPeer) {
          myPeer.destroy();
          setMyPeer(null);
        }
      };
    }, [id, myPeer]);


  return (

        <div className={`flex flex-col w-full h-screen items-center ${poppins.className} bg-gray-200`}>

      <div className="text-center mt-20 py-8 px-16 rounded-full shadow-2xl bg-slate-400">
        <h1 className="text-7xl font-bold tracking-tighter">Location Tracker</h1>
        <p className="text-sm text-gray-500 leading-loose md:text-base dark:text-gray-400">
          Accessible. Customizable. Open Source.
        </p>
      </div>
      <div className='flex gap-10 py-10'>
        <div className='flex flex-col gap-16 items-center'>
      <Button className="flex items-center justify-center h-16 w-40 mt-20 text-lg font-bold rounded-3xl bg-slate-400/50" variant="outline"
      onClick={handleRefresh}
      >
            <img src="/pin1.png" className='mr-2 h-7 w-7' alt="pin" />
            Locate Me
          </Button>
      {/* Destination Form Start*/}
<div className="mx-auto max-w-lg space-y-4 flex flex-col items-center justify-center bg-gray-100 px-20 rounded-3xl" style={{height:500}}>
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
    <Button className={`w-32 text-xl mt-4 ${buttonColor}`} type="submit" onClick={(e)=>{
      joinAddress(e);
      setButtonText("Submitted");
      setButtonColor("bg-green-500");
      }}>
          {buttonText}
        </Button>
        </div>
      </div>
    </div> 
    {/* Destination Form End */}

    </div>

    {/* Map Start */}
    <div className='bg-white p-6 rounded-3xl'>
      <div ref={googlemap as React.RefObject<HTMLDivElement>} style={{ height: '850px', width:"1600px" }}></div>
      </div>
      </div>
    </div>

  );
};

export default LocationMap;

function LocateIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="2" x2="5" y1="12" y2="12" />
      <line x1="19" x2="22" y1="12" y2="12" />
      <line x1="12" x2="12" y1="2" y2="5" />
      <line x1="12" x2="12" y1="19" y2="22" />
      <circle cx="12" cy="12" r="7" />
    </svg>
  )
}