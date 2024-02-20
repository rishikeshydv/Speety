//here we will be writing all the api's and their paths
import express, { Request, Response } from "express";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";


const app = express()

//this is the google.maps API that gets location as request and returns {latitude,longitude} in JSON as response
import { useEffect, useState } from 'react';

const GetLatLng = ({ address }: { address: string }) => {
  const [latLng, setLatLng] = useState<number[]>([0, 0]);

  useEffect(() => {
    const geocoder = new google.maps.Geocoder();

    const fetchLatLng = async () => {
      try {
        const { isLoaded } = await useLoadScript({
          googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY as string,
        });

        if (isLoaded) {
          geocoder.geocode({ address }, (results, status) => {
            if (status === 'OK' && results) {
              console.log(results);
              setLatLng([
                results[0].geometry.location.lat(),
                results[0].geometry.location.lng(),
              ]);
            } else {
              console.error('Geocode was not successful for the following reason:', status);
            }
          });
        }
      } catch (error) {
        console.error('Error loading Google Maps:', error);
      }
    };

    fetchLatLng();
  }, [address]);

  return latLng;
};

export default GetLatLng;
