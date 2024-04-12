"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import poppins from '@/font/font';


interface LocationData {
  lat: number;
  lng: number;
}
const LocationMap = () => {
  const params = useParams()
  const destination = decodeURIComponent(params["address"] as string)
  const [destinationLngLat, setDestinationLngLat] = useState<LocationData>({ lat: 0, lng: 0 });

  const initializeMap = () => {
    // const { AdvancedMarkerElement } =
    // (await google.maps.importLibrary(
    //   "marker"
    // )) as google.maps.MarkerLibrary;
    const myGeocoder = new google.maps.Geocoder();
     function codeAddress() {
       myGeocoder.geocode( { 'address': destination}, function(results, status) {
        if (status == 'OK' && results) {
          const map = new google.maps.Map(
            document.getElementById("map") as HTMLElement,
            {
              zoom: 3,
              center: results[0].geometry.location,
              mapId: "DEMO_MAP_ID",
            }
          );

          var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location,
            label: { text: "User 1", color: 'white' },
        });

        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }
    codeAddress();
};

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
  }, []);

  return (

        <div className={`flex flex-col w-full h-screen items-center space-y-2 ${poppins.className} bg-gray-200`}>
      <div className="text-center mt-20 py-8 px-16 rounded-full shadow-2xl bg-slate-400 mb-10">
        <h1 className="text-7xl font-bold tracking-tighter">Location Tracker</h1>
        <p className="text-sm text-gray-500 leading-loose md:text-base dark:text-gray-400">
          Accessible. Customizable. Open Source.
        </p>
      </div>
      <div className='bg-white p-4 rounded-3xl shadow-2xl'>
      <div id="map" style={{ height: '850px', width:"1600px" }}></div>
      </div>
    </div>

  );
};

export default LocationMap;
