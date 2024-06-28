/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/HG79xSQyyj9
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/
"use client";
import React, { useState, useEffect, useRef } from "react";
import { Separator } from "@/components/ui/separator"
import { CardContent, Card } from "@/components/ui/card"
import poppins from "@/font/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
//import { cache } from "../page";
import { useParams, useRouter } from "next/navigation";
import { collection, query,getDocs, getDoc,doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import { set } from "firebase/database";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import Link from "next/link"
import { Button } from "@/components/ui/button";
import TourUI from "@/components/virtual-tour/TourUI";

interface LocationData {
  lat: number;
  lng: number;
}

interface Property {
  address: string;
  apartment: string;
  city: string;
  state: string;
  zip: string;
  price: string;
  beds: string;
  baths: string;
  houseType: string;
  transactionType: string;
  listedBy: string;
  listerEmail: string;
  brokerId: string;
  imageUrl: string[];
  videoUrl: string[];
  date: string;
  sqft: string;
  lotSize: string;
  yearBuilt: string;
  description: string;
  parkingSpace: string;
  estimatedMortgage: string;
  amenities: string;
}

export default function Property() {
  const params = useParams()
  const propertyId = decodeURIComponent(params["id"] as string)
  const [property, setProperty] = useState<Property | null>(null)
  const [buttonText, setButtonText] = useState("Connect");
  const [buttonColor, setButtonColor] = useState("bg-black");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [showVirtualTour, setShowVirtualTour] = useState(false);
  const [fullAddress, setFullAddress] = useState("");

  useEffect(() => {
  setFullAddress(`${property?.address}, ${property?.city}, ${property?.state}, ${property?.zip}`);
  }, [property]);

  const router = useRouter();

  async function fetchProperty() {
    const q = query(
      collection(db, "presentListings")
    );
    const buyResults = await getDocs(q);

    buyResults.forEach((doc) => {
      const data = doc.data();
      const keys = Object.keys(data);
      keys.map((key) => {
        if (key === propertyId) {
          setProperty(data[key]);
        }
      });
    });
  }

  async function getAgentData(email:string) {
    const receiverRef = collection(db, "agentList");
    const receiverDocRef =  doc(receiverRef, email);
    const receiverSnapshot = await getDoc(receiverDocRef);
    if (receiverSnapshot.exists()) {
      //console.log("Document data:", receiverSnapshot.data());
      const data = receiverSnapshot.data();
      setName(data?.name);
      setDescription(data?.description);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function getAgentProfileImage(email: string) {
    const receiverRef = collection(db, "User_Info");
    const receiverDocRef =  doc(receiverRef, email);
    const receiverSnapshot = await getDoc(receiverDocRef);
    if (receiverSnapshot.exists()) {
      //console.log("Document data:", receiverSnapshot.data());
      const data = receiverSnapshot.data();
      setProfileImage(data?.profilePic);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  const handleRoute = () => {
    router.push(`/agent/profile/${property?.listerEmail}`);
  }

  useEffect(() => {
    //retrieving the property from the cache
    const cache = new Map();
    const getProperty = cache.get(propertyId);
    //fetching the property from the database if not found in the cache
     if (!getProperty) {
      fetchProperty();
     }
     setProperty(getProperty);
  }, [propertyId])

  useEffect(() => {
    if (property){
      getAgentData(property.listerEmail);
      getAgentProfileImage(property.listerEmail);
    }
  }, [property]);

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
    if (fullAddress){
      try{
        const returnLatLng = await geocodeDestination(fullAddress as string);
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
 }, [fullAddress])


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
     script.src = `https://maps.googleapis.com/maps/api/js?v=3.57&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places`;
     script.async = true;
     script.defer = true;
     script.addEventListener("load", initializeMap); 
     document.body.appendChild(script);
   } else {
       initializeMap(); // If Google Maps is already loaded
   }
 }, [fullAddressLatLng.current]);




  return (
    <div className={`${poppins.className} bg-gray-100`}>
         <Header />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 xl:px-40 2xl:px-40 px-6 py-6">
        {
          showVirtualTour ? (
            <TourUI propertyAddress={fullAddress as string} />
          ) : null
        }
        <div className="order-2 md:order-1">
          <div className="grid gap-2">
            <div>
              <h1 className="text-4xl font-bold tracking-tighter">Property Description</h1>
              <p className="text-gray-500 dark:text-gray-400 text-md mt-4 font-medium"> · {property?.beds} beds · {property?.baths} baths · {property?.sqft} sqft</p>
            </div>
            <div className="grid gap-4">
              <div className="flex items-center gap-4">
                <LocateIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-md">{property?.address}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">{property?.city}, {property?.state}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <CalendarIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-md">Listed on {property?.date}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Days on Zillow: {Math.floor((Date.now() - (new Date(property?.date as any) as any)) / (1000*60*60*24))}</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <TagIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                <div>
                  <p className="font-medium text-md">${property?.price}</p>
                  <p className="text-gray-500 dark:text-gray-400 text-sm">Estimated mortgage: ${property?.estimatedMortgage}/mo</p>
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 mt-4">
              <h2 className="text-3xl font-bold tracking-tighter">About this home</h2>
              <div className="prose max-w-none">
                <p className="text-sm">
                  {property?.description}
                </p>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 mt-4">
              <h2 className="text-3xl font-bold tracking-tighter">Key details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <BedIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-md">{property?.beds} beds</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Bedrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <BathIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-md">{property?.baths} baths</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Bathrooms</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <RulerIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-md">{property?.sqft} sqft</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Bedroom</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <ListIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-md">{property?.lotSize} acres</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Lot size</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CalendarIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-md">{property?.yearBuilt}</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Year built</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <CarIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <div>
                    <p className="font-medium text-md">{property?.parkingSpace} car(s)</p>
                    <p className="text-gray-500 dark:text-gray-400 text-sm">Garage</p>
                  </div>
                </div>
              </div>
            </div>
            <Separator />
            <div className="grid gap-4 mt-4">
              <h2 className="text-3xl font-bold tracking-tighter">Amenities</h2>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-4">
                  <WifiIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <p className="text-md font-medium">Wifi</p>
                </div>
                <div className="flex items-center gap-4">
                  <FlameIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <p className="text-md font-medium">Fireplace</p>
                </div>
                <div className="flex items-center gap-4">
                  <LoaderIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <p className="text-md font-medium">Washer</p>
                </div>
                <div className="flex items-center gap-4">
                  <RefrigeratorIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <p className="text-md font-medium">Dryer</p>
                </div>
                <div className="flex items-center gap-4">
                  <WalletIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <p className="text-md font-medium">Pool</p>
                </div>
                <div className="flex items-center gap-4">
                  <BuildingIcon className="w-6 h-6 text-gray-500 dark:text-gray-400" />
                  <p className="text-md font-medium">Balcony</p>
                </div>
              </div>
            </div>
          </div>
          <Separator className="mt-5"/>
          <div className="mt-4">
            <p className="my-2 font-bold text-3xl tracking-tighter">Listed by:</p>
      <div className="container p-6">
        <div className="space-y-6">
          <div className="flex flex-col xl:flex-row 2xl:flex-row items-start justify-start gap-6 xl:gap-40 2xl:gap-40">
            <div className="flex items-start justify-start space-x-4" onClick={handleRoute}>
              <Avatar className="h-8 w-8">
                <AvatarImage alt="Agent" src={profileImage} />
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <div className="text-md font-semibold">{name}</div>
                <div className="text-xs text-gray-500 dark:text-gray-400">Real Estate Agent</div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                className={`inline-flex items-center rounded-md ${buttonColor} px-3 py-2 text-xs font-medium text-gray-50 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:${buttonColor} dark:text-gray-900 dark:focus-visible:ring-gray-300`}
                onClick={()=>{
                  setButtonText("Requested");
                  setButtonColor("bg-orange-400");
                
                }}
              >
                <PhoneIcon className="mr-2 h-4 w-4" />
                {buttonText}
              </Button>
              <Button
                className="inline-flex items-center rounded-md bg-gray-900 px-3 py-2 text-xs font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
              >
                <MailIcon className="mr-2 h-4 w-4" />
                Email
              </Button>
            </div>
            </div>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="text-xl font-bold">About the Agent</h3>
            <p className="text-gray-500 dark:text-gray-400 text-md">
              {description}
            </p>
          </div>
          </div>
        </div>
        
        <div className="order-1 md:order-2">
          <img
            alt="Property Image"
            className="object-cover rounded-lg w-[400px] h-[300px] xl:w-[800px] xl:h-[600px] 2xl:w-[800px] 2xl:h-[600px]"
            src={property?.imageUrl[0]}
            style={{
              aspectRatio: "600/400",
              objectFit: "cover",
            }}
          />
          <div className="grid grid-cols-2 gap-4 mt-4">
            <img
              alt="Property Image"
              className="w-full h-[200px] object-cover rounded-lg"
              height={200}
              src={property?.imageUrl[0]}
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <img
              alt="Property Image"
              className="w-full h-[200px] object-cover rounded-lg"
              height={200}
              src={property?.imageUrl[0]}
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <img
              alt="Property Image"
              className="w-full h-[200px] object-cover rounded-lg"
              height={200}
              src={property?.imageUrl[0]}
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
            <img
              alt="Property Image"
              className="w-full h-[200px] object-cover rounded-lg"
              height={200}
              src={property?.imageUrl[0]}
              style={{
                aspectRatio: "300/200",
                objectFit: "cover",
              }}
              width={300}
            />
          </div>
          <div className="my-2 flex items-end justify-end">
          <Button onClick={()=>{
            setShowVirtualTour(true);
          }}>
          Virtual Tour
        </Button>
        </div> 
        </div>
      </div>

      <div className="mt-8 xl:px-40 2xl:px-40 px-6 mb-6">
        <h2 className="text-3xl font-bold tracking-tighter">Similar Homes</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-4">
          <Card>
            <img
              alt="Similar Home"
              className="w-full h-[200px] object-cover rounded-t-lg"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-bold">Beachfront Oasis</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">3 beds · 2 baths · 1,800 sqft</p>
              <p className="font-medium text-lg">$2,500,000</p>
            </CardContent>
          </Card>
          <Card>
            <img
              alt="Similar Home"
              className="w-full h-[200px] object-cover rounded-t-lg"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-bold">Coastal Retreat</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">2 beds · 2 baths · 1,500 sqft</p>
              <p className="font-medium text-lg">$1,800,000</p>
            </CardContent>
          </Card>
          <Card>
            <img
              alt="Similar Home"
              className="w-full h-[200px] object-cover rounded-t-lg"
              height={300}
              src="/placeholder.svg"
              style={{
                aspectRatio: "400/300",
                objectFit: "cover",
              }}
              width={400}
            />
            <CardContent className="p-4">
              <h3 className="text-xl font-bold">Oceanview Villa</h3>
              <p className="text-gray-500 dark:text-gray-400 text-sm">4 beds · 3 baths · 2,200 sqft</p>
              <p className="font-medium text-lg">$3,200,000</p>
            </CardContent>
          </Card>
        </div>
      </div>
      <Footer />
    </div>
  )
}

function BathIcon(props:any) {
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
      <path d="M9 6 6.5 3.5a1.5 1.5 0 0 0-1-.5C4.683 3 4 3.683 4 4.5V17a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      <line x1="10" x2="8" y1="5" y2="7" />
      <line x1="2" x2="22" y1="12" y2="12" />
      <line x1="7" x2="7" y1="19" y2="21" />
      <line x1="17" x2="17" y1="19" y2="21" />
    </svg>
  )
}


function BedIcon(props:any) {
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
      <path d="M2 4v16" />
      <path d="M2 8h18a2 2 0 0 1 2 2v10" />
      <path d="M2 17h20" />
      <path d="M6 8v9" />
    </svg>
  )
}


function BuildingIcon(props:any) {
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
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  )
}


function CalendarIcon(props:any) {
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
      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
      <line x1="16" x2="16" y1="2" y2="6" />
      <line x1="8" x2="8" y1="2" y2="6" />
      <line x1="3" x2="21" y1="10" y2="10" />
    </svg>
  )
}


function CarIcon(props:any) {
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
      <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
      <circle cx="7" cy="17" r="2" />
      <path d="M9 17h6" />
      <circle cx="17" cy="17" r="2" />
    </svg>
  )
}


function FlameIcon(props:any) {
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
      <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
    </svg>
  )
}


function ListIcon(props:any) {
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
      <line x1="8" x2="21" y1="6" y2="6" />
      <line x1="8" x2="21" y1="12" y2="12" />
      <line x1="8" x2="21" y1="18" y2="18" />
      <line x1="3" x2="3.01" y1="6" y2="6" />
      <line x1="3" x2="3.01" y1="12" y2="12" />
      <line x1="3" x2="3.01" y1="18" y2="18" />
    </svg>
  )
}


function LoaderIcon(props:any) {
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
      <line x1="12" x2="12" y1="2" y2="6" />
      <line x1="12" x2="12" y1="18" y2="22" />
      <line x1="4.93" x2="7.76" y1="4.93" y2="7.76" />
      <line x1="16.24" x2="19.07" y1="16.24" y2="19.07" />
      <line x1="2" x2="6" y1="12" y2="12" />
      <line x1="18" x2="22" y1="12" y2="12" />
      <line x1="4.93" x2="7.76" y1="19.07" y2="16.24" />
      <line x1="16.24" x2="19.07" y1="7.76" y2="4.93" />
    </svg>
  )
}


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


function RefrigeratorIcon(props:any) {
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
      <path d="M5 6a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6Z" />
      <path d="M5 10h14" />
      <path d="M15 7v6" />
    </svg>
  )
}


function RulerIcon(props:any) {
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
      <path d="M21.3 15.3a2.4 2.4 0 0 1 0 3.4l-2.6 2.6a2.4 2.4 0 0 1-3.4 0L2.7 8.7a2.41 2.41 0 0 1 0-3.4l2.6-2.6a2.41 2.41 0 0 1 3.4 0Z" />
      <path d="m14.5 12.5 2-2" />
      <path d="m11.5 9.5 2-2" />
      <path d="m8.5 6.5 2-2" />
      <path d="m17.5 15.5 2-2" />
    </svg>
  )
}


function TagIcon(props:any) {
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
      <path d="M12 2H2v10l9.29 9.29c.94.94 2.48.94 3.42 0l6.58-6.58c.94-.94.94-2.48 0-3.42L12 2Z" />
      <path d="M7 7h.01" />
    </svg>
  )
}


function WalletIcon(props:any) {
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
      <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4" />
      <path d="M3 5v14a2 2 0 0 0 2 2h16v-5" />
      <path d="M18 12a2 2 0 0 0 0 4h4v-4Z" />
    </svg>
  )
}


function WifiIcon(props:any) {
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
      <path d="M5 13a10 10 0 0 1 14 0" />
      <path d="M8.5 16.5a5 5 0 0 1 7 0" />
      <path d="M2 8.82a15 15 0 0 1 20 0" />
      <line x1="12" x2="12.01" y1="20" y2="20" />
    </svg>
  )
}


function MailIcon(props:any) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function PhoneIcon(props:any) {
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
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  )
}