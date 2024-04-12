/**
 * v0 by Vercel.
 * @see https://v0.dev/t/omFgxqpUK7e
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import {
  CardTitle,
  CardDescription,
  CardHeader,
  CardContent,
  Card,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import poppins from "@/font/font";
import Footer from "@/components/Footer";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import ListingCard from "@/services/agent/ListingCard";
import { AvatarImage, Avatar } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useRef, useState } from "react";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

interface LocationData {
  lat: number;
  lng: number;
}

export default function Component() {
  const { email } = useParams();
  const mapRef = useRef(null);
  const router = useRouter();

  const agentLocations: LocationData[] = [
    { lat: -31.56391, lng: 147.154312 },
    { lat: -33.718234, lng: 150.363181 },
    { lat: -33.727111, lng: 150.371124 },
    { lat: -33.848588, lng: 151.209834 },
    { lat: -33.851702, lng: 151.216968 },
    { lat: -34.671264, lng: 150.863657 },
    { lat: -35.304724, lng: 148.662905 },
    { lat: -36.817685, lng: 175.699196 },
    { lat: -36.828611, lng: 175.790222 },
    { lat: -37.75, lng: 145.116667 },
    { lat: -37.759859, lng: 145.128708 },
    { lat: -37.765015, lng: 145.133858 },
    { lat: -37.770104, lng: 145.143299 },
    { lat: -37.7737, lng: 145.145187 },
    { lat: -37.774785, lng: 145.137978 },
    { lat: -37.819616, lng: 144.968119 },
    { lat: -38.330766, lng: 144.695692 },
    { lat: -39.927193, lng: 175.053218 },
    { lat: -41.330162, lng: 174.865694 },
    { lat: -42.734358, lng: 147.439506 },
    { lat: -42.734358, lng: 147.501315 },
    { lat: -42.735258, lng: 147.438 },
    { lat: -43.999792, lng: 170.463352 },
  ]

  useEffect(() => {
    const loadGoogleMapsScript = () => {
      const initializeMap = async () => {
        // const map = new window.google.maps.Map(document.getElementById('map') as HTMLElement, {
        //     center: agentLocations[0],
        //     zoom: 12,
        // });

        // agentLocations.forEach((location) => {
        //     new window.google.maps.Marker({
        //         map,
        //         position: location,
        //         label: { color: 'black', fontWeight: 'bold', text: 'Rishikesh' }
        //     });
        // });

        // const infoWindow = new window.google.maps.InfoWindow();
        // infoWindow.setPosition()

        // infoWindow.setPosition({ lat: 37.7749, lng: -122.4194 });
        // infoWindow.setContent('Content 1');
        // infoWindow.open(map);
        // Request needed libraries.
        const { Map, InfoWindow } = (await google.maps.importLibrary(
          "maps"
        )) as google.maps.MapsLibrary;
        const { AdvancedMarkerElement, PinElement } =
          (await google.maps.importLibrary(
            "marker"
          )) as google.maps.MarkerLibrary;

        const map = new google.maps.Map(
          document.getElementById("map") as HTMLElement,
          {
            zoom: 3,
            center: { lat: -28.024, lng: 140.887 },
            mapId: "DEMO_MAP_ID",
          }
        );

        const infoWindow = new google.maps.InfoWindow({
          content: "",
          disableAutoPan: true,
        });

        // Create an array of alphabetical characters used to label the markers.
        const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

        // Add some markers to the map.
        const markers = agentLocations.map((position, i) => {
          const label = labels[i % labels.length];
          const pinGlyph = new google.maps.marker.PinElement({
            glyph: label,
            glyphColor: "white",
          });
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position,
            content: pinGlyph.element,
          });

          // markers can only be keyboard focusable when they have click listeners
          // open info window when marker is clicked
          marker.addListener("click", () => {
            infoWindow.setContent(position.lat + ", " + position.lng);
            infoWindow.open(map, marker);
          });
          return marker;
        });

        // Add a marker clusterer to manage the markers.
        new MarkerClusterer({ markers, map });
      };

      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAvamq-1AR2paooKX-Hq7LvyyfIbwNsVVU`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.addEventListener("load", initializeMap);
      document.body.appendChild(googleMapsScript);
    };

    // Check if the Google Maps script has already been loaded
    if (!window.google) {
      loadGoogleMapsScript();
    }
  }, []);

  return (
    <div className={`${poppins.className}`}>
      <div className="flex items-center justify-center shadow-sm">
        <img src="/speety_logo.png" alt="logo" />
      </div>
      <div className="flex flex-col items-center bg-gray-200 px-40">
        <Card className="w-full mt-8 mb-8 shadow-md">
          <CardHeader>
            <CardTitle className="text-4xl">Broker Profile</CardTitle>
            <CardDescription className="text-xl">
              View and edit your profile
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20">
                <Image
                  alt="Profile picture"
                  className="rounded-full object-cover"
                  height={96}
                  src="/agent.jpeg"
                  layout="responsive"
                  objectFit="cover"
                  width={96}
                />
              </div>
              <div className="grid gap-1">
                <div className="font-bold text-lg md:text-2xl leading-none">
                  Coldwell Realty
                </div>
                <div className="text-lg text-gray-500 dark:text-gray-400">
                  Broker
                </div>
              </div>
            </div>
            <div>
              <form className="grid gap-4 md:grid-cols-2">
                <div className="grid gap-1.5">
                  <Label className="text-xl" htmlFor="name">
                    Name
                  </Label>
                  <Input
                    defaultValue="Alice Smith"
                    id="name"
                    className="text-lg"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xl" htmlFor="username">
                    Username
                  </Label>
                  <Input
                    id="username"
                    placeholder="Username"
                    className="text-lg"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xl" htmlFor="email">
                    Email
                  </Label>
                  <Input
                    id="email"
                    placeholder="Email"
                    type="email"
                    className="text-lg"
                  />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-xl" htmlFor="dob">
                    Date of Birth
                  </Label>
                  <Input id="dob" type="date" className="text-lg" />
                </div>
                <div className="grid gap-1.5">
                  <Label className="text-lg" htmlFor="brokerId">
                    Broker ID
                  </Label>
                  <Input
                    id="brokerId"
                    placeholder="Broker ID"
                    className="text-lg"
                  />
                </div>
              </form>
            </div>
            <div className="flex items-center gap-4">
              <Button size="lg" className="text-xl">
                Save
              </Button>
              <Button size="lg" variant="outline" className="text-xl">
                Cancel
              </Button>
            </div>
          </CardContent>
          <h3 className="text-4xl font-semibold px-6 py-5 tracking-tighter">
            Track Your Agents
          </h3>
          <div className="grid grid-cols-2 gap-6 px-4">
            <div className="flex flex-col gap-4 p-4">
              <div
                className="flex items-center space-x-6 bg-gray-200 px-6 rounded-3xl h-28"
                onClick={() => {
                  router.push("/agent/profile");
                }}
              >
                <Avatar className="w-20 h-16">
                  <AvatarImage
                    alt=""
                    src="/agent.jpeg"
                    className="w-full h-full"
                  />
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Alice Davis</h3>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Real State Agent
                  </p>
                </div>
                <Switch defaultChecked id="user-1" />
              </div>

              <div
                className="flex items-center space-x-6 bg-gray-200 px-6 rounded-3xl h-28"
                onClick={() => {
                  router.push("/agent/profile");
                }}
              >
                <Avatar className="w-20 h-16">
                  <AvatarImage
                    alt=""
                    src="/agent.jpeg"
                    className="w-ful,,.; h-full"
                  />
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Alice Davis</h3>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Real State Agent
                  </p>
                </div>
                <Switch defaultChecked id="user-1" />
              </div>

              <div
                className="flex items-center space-x-6 bg-gray-200 px-6 rounded-3xl h-28"
                onClick={() => {
                  router.push("/agent/profile");
                }}
              >
                <Avatar className="w-20 h-16">
                  <AvatarImage
                    alt=""
                    src="/agent.jpeg"
                    className="w-full h-full"
                  />
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-2xl font-bold">Alice Davis</h3>
                  <p className="text-lg text-gray-500 dark:text-gray-400">
                    Real State Agent
                  </p>
                </div>
                <Switch defaultChecked id="user-1" />
              </div>
            </div>
            <div className="grid gap-6 p-4">
              <Card>
                <CardHeader className="p-4">
                  <div className="text-lg font-bold">Map</div>
                </CardHeader>
                <CardContent className="p-4">
                  <div id="map" className="h-[800px] rounded-lg border"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </Card>
      </div>
      <Footer />
    </div>
  );
}
