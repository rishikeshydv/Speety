"use client"

import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import poppins from '@/font/font';

interface LocationData {
  lat: number;
  lng: number;
}
const LocationMap = () => {
  const mapRef = useRef(null);
  const params = useParams()

  const [destinationLngLat, setDestinationLngLat] = useState<LocationData>({ lat: 37.7749, lng: -122.4194});
  const destination = decodeURIComponent(params["address"] as string)
  console.log(destination)


  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAvamq-1AR2paooKX-Hq7LvyyfIbwNsVVU`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.addEventListener('load', initializeMap);
      document.body.appendChild(googleMapsScript);
    };

    const fetchLatLng = (address:string) => {
      const myGeocoder = new window.google.maps.Geocoder();
      myGeocoder.geocode({ address }, (results:any, status:any) => {
        if (status === 'OK' && results) {
          console.log(results);
          const locationData: LocationData = {
            lat: results[0].geometry.location.lat(),
            lng: results[0].geometry.location.lng(),
          };
          setDestinationLngLat(locationData);
        } else {
          console.error('Geocode was not successful for the following reason:', status);
        }
      });
   
    }

    // Check if the Google Maps script has already been loaded
    if (!window.google) {
      loadGoogleMapsScript();
    } else {
      // If the script is already loaded, directly initialize the map
      fetchLatLng(destination);
      if (destinationLngLat.lat !== 37.7749 || destinationLngLat.lng !== -122.4194){
        initializeMap();
        console.log(destinationLngLat)
      }
      
      
    }
  }, []);

const initializeMap = () => {
    if (mapRef.current) {
        const map = new window.google.maps.Map(mapRef.current, {
            center: destinationLngLat,
            zoom: 12,
        });

        const marker = new window.google.maps.Marker({
            position: destinationLngLat,
            map,
            label: { color: 'black', fontWeight: 'bold', text: 'Rishikesh' },
        });

        const infoWindow = new window.google.maps.InfoWindow();
        infoWindow.setPosition()

        infoWindow.setPosition({ lat: 37.7749, lng: -122.4194 });
        infoWindow.setContent('Content 1');
        infoWindow.open(map);

    }
};

  return (

        <div className={`flex flex-col w-full h-screen items-center space-y-2 ${poppins.className} bg-gray-200`}>
      <div className="text-center mt-20 py-8 px-16 rounded-full shadow-2xl bg-slate-400 mb-10">
        <h1 className="text-7xl font-bold tracking-tighter">Location Tracker</h1>
        <p className="text-sm text-gray-500 leading-loose md:text-base dark:text-gray-400">
          Accessible. Customizable. Open Source.
        </p>
      </div>
      <div className='bg-white p-4 rounded-3xl shadow-2xl'>
      <div ref={mapRef} style={{ height: '850px', width:"1600px" }}></div>
      </div>
    </div>

  );
};

export default LocationMap;
