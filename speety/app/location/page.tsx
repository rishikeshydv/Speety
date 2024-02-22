//temporarily i am using a <div> tag in the /chat/page.tsx for easy rendering
//once a basic form of location is established, will think of a better UI


//we are not using this code for now
import React, { useState, useEffect } from 'react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useRouter } from "next/router";
import GetLatLng from "@/services/location/addressConverter";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { Locator } from "@/services/location/currentLocation";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "@/firebase/config";


interface userLoc {
email:string;
location:[number, number]
}

export default function Location() {
  //initializing the google map api with the API key
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
  });

  //initializing firebase database to store the location of users
  const [user] = useAuthState(auth);
  const userCollectionRef = collection(db, "userLocation");

  //retrieving the longitude and latitude of the destination address
  const router = useRouter();
  const address = router.query.address as string;
  const [latt, long] = GetLatLng({ address });
  const center = { lat: latt, lng: long };

  //retrieving user1's location every 3 second
  const [position1, setPosition1] = useState({ lat: 0, lng: 0 }); 
  const user1Loc = () => {
    setInterval(async () => {
      try {
        const currLoc = await Locator(); // Call the Locator function to get current location
        console.log('Current Location:', currLoc);
        setPosition1({ lat: currLoc[0], lng: currLoc[1] });
        const currData1: userLoc = {
            email: user?.email as string,
            location: [currLoc[0], currLoc[1]]
        };
      } catch (error) {
        console.error('Error getting location:', error);
      }
    }, 3000); // Interval set to 3000 milliseconds (3 seconds)
  };
  user1Loc()
  return (
    <div>
      <div id="map">
        {/* Map will be added here */}
        {!isLoaded ? (
          <h1>Loading...</h1>
        ) : (
          <GoogleMap
            mapContainerClassName="map-container"
            center={center}
            zoom={10}
          >
            {/* This would be the marker of user1 */}
            <Marker position={{ lat: position1.lat, lng: position1.lat }} />
          </GoogleMap>
        )}
      </div>
    </div>
  );
}
