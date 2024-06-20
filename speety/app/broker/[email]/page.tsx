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
import { collection, doc, query,getDocs, getDoc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { set } from "firebase/database";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
interface LocationData {
  lat: number;
  lng: number;
}

interface AgentInfo {
  [email: string]: [string, string, LocationData];
}

export default function Component() {

  const [user] = useAuthState(auth);
  const router = useRouter();

  // if (!user) {
  //   router.push("/auth/login");
  // }

  const params = useParams();
  const emailParams = decodeURIComponent(params.email as string);
  const mapRef = useRef(null);
  const [agentEmails, setAgentEmails] = useState<string[]>([]);
  const [agentInfo, setAgentInfo] = useState<any>({});
  

  const getAgentLocation = async (email:string) => {
    const userRef = collection(db, "agentList");
    const userDocRef = doc(userRef, email);
    const userDoc = await getDoc(userDocRef);
    if (userDoc.exists()) {
        return [userDoc.data().name,userDoc.data().profilePic,userDoc.data().lastLocation];
    } else {
        return null;
    }
}

const getAgentEmails = async (brokerId:string) => {
  const agentRef = query(collection(db, brokerId));
  const agentSnapshot = await getDocs(agentRef);
  const agentEmails:string[] = [];
  agentSnapshot.forEach((doc) => {
      agentEmails.push(doc.id);
  });
  setAgentEmails(agentEmails);
}

useEffect(() => {
  getAgentEmails(emailParams);
}, []);

useEffect(() => {
  let _agentLocations: any = {};
  for (let i = 0; i < agentEmails.length; i++) {
    getAgentLocation(agentEmails[i]).then((userInfo) => {
      _agentLocations[(agentEmails[i]).toString()] = userInfo;
  });
}
setAgentInfo(_agentLocations);
}
, [agentEmails]);


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
            center: { lat: 40.713, lng: -74.006 },
            mapId: "DEMO_MAP_ID",
          }
        );

        const infoWindow = new google.maps.InfoWindow({
          content: "",
          disableAutoPan: true,
        });

        // Add some markers to the map.
        const markers = Object.keys(agentInfo).map((email) => {
          const label = agentInfo[email][0];
          const pinGlyph = new google.maps.marker.PinElement({
            glyph: label,
            glyphColor: "white",
          });
          const marker = new google.maps.marker.AdvancedMarkerElement({
            position: {lat: parseFloat(agentInfo[email][2][0]), lng: parseFloat(agentInfo[email][2][1])},
            content: pinGlyph.element,
          });

          // markers can only be keyboard focusable when they have click listeners
          // open info window when marker is clicked
          marker.addListener("click", () => {
            infoWindow.setContent(parseFloat(agentInfo[email][2][0]) + ", " + parseFloat(agentInfo[email][2][1]));
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
  }, [agentInfo]);

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
            {agentInfo &&
              Object.keys(agentInfo).map((email) => {
                return (
                  <div className="flex flex-col gap-4 p-4" key={email}>
                  <div
                    className="flex items-center space-x-6 bg-gray-200 px-6 rounded-3xl h-28"
                    onClick={() => {
                      router.push(`/agent/profile/${email}`);
                    }}
                  >
                    <Avatar className="w-16 h-18">
                      <AvatarImage
                        alt=""
                        src={agentInfo[email][1]}
                        className="w-full h-full"
                      />
                    </Avatar>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{agentInfo[email][0]}</h3>
                      <p className="text-lg text-gray-500 dark:text-gray-400">
                        Real State Agent
                      </p>
                    </div>
                    <Switch defaultChecked id="user-1" />
                  </div>
                </div>

                )
              })}

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
