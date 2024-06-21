/**
 * v0 by Vercel.
 * @see https://v0.dev/t/cSJ0HnYqpUq
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"

import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import InsideMenus from "./InsideMenus"
import InsideVideo from "./InsideVideo"
import React, { useState, useEffect, useRef } from "react"
import DummyMenus from "./DummyMenus"
import { set } from "date-fns"


interface TourUIProps {
  propertyAddress: string;
}


interface LocationData {
  lat: number;
  lng: number;
}

const TourUI:React.FC<TourUIProps> = ({propertyAddress}) => {
  const [insideView, setInsideView] = useState(true)
  const [customWidth, setCustomWidth] = useState(720)
  const [marginLeft, setMarginLeft] = useState("ml-20")

  const [divClassname, setDivClassname] = useState("flex flex-col ml-1 w-[350px] h-[500px] xl:h-[700px] xl:w-[720px] 2xl:h-[700px] 2xl:w-[720px]")
  const [h1Classname, setH1Classname] = useState("text-xl xl:text-5xl 2xl:text-5xl tracking-tighter font-bold xl:ml-20")
  //TODO: Implement the following features
 //HANDLING MAPS
 const [googleMapsLoaded, setGoogleMapsLoaded] = useState(false);
 const panorama = useRef<HTMLDivElement>(null);
 const map_ = useRef<google.maps.Map | null>(null);
 //making a list of addresses from presentListings using joinAddress function
 const fullAddressLatLng = useRef<LocationData>({ lat: 0, lng: 0 });

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

//now we make a list of Latitudes and Longitudes of the addresses
   const getLatLngList = async () => {
    if (propertyAddress){
      try{
        const returnLatLng = await geocodeDestination(propertyAddress as string);
        fullAddressLatLng.current = {
          lat: returnLatLng.lat,
          lng: returnLatLng.lng,
        };
      } catch (e){
        console.error(e);
      }
    }
   };
    getLatLngList();   
 }, [propertyAddress])


 useEffect(() => {

   const initializeMap = () => {
     if (!google.maps.Map){
       return; 
     }

          //setting up a panorama
      const panorama_ = new google.maps.StreetViewPanorama(
        panorama.current as HTMLDivElement,
        {
          position: fullAddressLatLng.current,
          pov: {
            heading: 34,
            pitch: 10,
          },
        }
      );

     setGoogleMapsLoaded(true);

   };
   if (!window.google) {
     const script = document.createElement("script");
     script.type = "text/javascript";
     script.src = `https://maps.googleapis.com/maps/api/js?v=3.57&key=AIzaSyAvamq-1AR2paooKX-Hq7LvyyfIbwNsVVU&libraries=places`;
     script.async = true;
     script.defer = true;
     script.addEventListener("load", initializeMap); 
     document.body.appendChild(script);
   } else {
       initializeMap(); // If Google Maps is already loaded
   }
 }, [fullAddressLatLng.current]);

  return (
<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
  <div className="grid md:grid-cols-[130px_1fr] w-full max-w-4xl bg-white dark:bg-gray-800 shadow-lg p-2 xl:p-6 2xl:p-6 rounded-3xl">
    {/* For inside menus, there must be options for view of different areas */}
    {
      insideView ? (
        <InsideMenus />
      ) : (
        // <DummyMenus />
        null
      )

    }
    
    <div className={`${divClassname}`}>
      <div className="bg-gray-100 dark:bg-gray-950 p-2 md:p-4 flex justify-between items-center rounded-t-lg md:rounded-tr-none">
        <h1 className={`${h1Classname}`}>Scail Virtual Tour</h1>
        <div className="flex items-center space-x-2">
          <Switch id="change-view" onClick={()=>{
            setDivClassname(insideView ? "flex flex-col ml-1 w-[350px] h-[500px] xl:h-[700px] xl:w-[840px] 2xl:h-[700px] 2xl:w-[840px]" : "flex flex-col ml-1 w-[350px] h-[500px] xl:w-[720px] xl:h-[700px] 2xl:h-[700px] 2xl:w-[720px]")
            setH1Classname(insideView ? "text-xl xl:text-5xl 2xl:text-5xl tracking-tighter font-bold xl:ml-52 2xl:ml-52" : "text-xl xl:text-5xl 2xl:text-5xl tracking-tighter font-bold xl:ml-20 2xl:ml-20")
            setInsideView(!insideView)
          }}/>
          <Label htmlFor="dark-mode">Switch View</Label>
        </div>
      </div>
      <div className="flex-1 bg-gray-100 dark:bg-gray-950 p-4 md:p-6 rounded-b-lg md:rounded-br-none">
        {
      insideView ? (
        <InsideVideo />
      ) : (
        <div className="w-full h-full xl:w-[790px] xl:h-[520px] max-w-4xl shadow-lg" ref={panorama as React.RefObject<HTMLDivElement>}>
        </div>
      )

    }
      </div>
    </div>
  </div>
</div>

  )
}

export default TourUI

