/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PU4BC928Dha
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import poppins from "@/font/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

import ListingCard from "@/services/agent/ListingCard";
import { useParams } from 'next/navigation';
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment"; //use moment.js to get time/date in a good format
import { useState,useEffect } from "react";
import PushNotifications from "@/queries/Notifications/PushNotifications";
import { collection,getDoc,doc} from "firebase/firestore"; 
import { db } from "@/firebase/config";
import RealtorCard from "@/components/agent/RealtorCard";
import ReviewProp from "@/services/agent/ReviewProp";
interface Review {
  [key: string]: string[];
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

export default function Component() {

 const params = useParams();
 const emailParams = decodeURIComponent(params.email as string)

  const [user] = useAuthState(auth);
  const [buttonText, setButtonText] = useState("Connect with me");
  const [buttonIcon, setButtonIcon] = useState("/imsg.webp");
  const [buttonColor, setButtonColor] = useState("bg-gray-200");

  //state variables to get the agent data from the database
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [lastLocation, setLastLocation] = useState<string []>([]);  //we dont show this in the UI
  const [website, setWebsite] = useState("");
  const [role, setRole] = useState("");  //we dont show this in the UI
  const [reviews, setReviews] = useState<Review>({});
  const [profileImage, setProfileImage] = useState("");
  const [presentListings, setPresentListings] = useState<Property[]>([]);
  const [soldListings, setSoldListings] = useState<Property[]>([]);

  let _presentListings: Property[] = [];
  let _soldListings: Property[] = [];
  async function getPresentListings() {
    const receiverRef = collection(db, "presentListings");
    const receiverDocRef =  doc(receiverRef, emailParams);
    const receiverSnapshot = await getDoc(receiverDocRef);
    if (receiverSnapshot.exists()) {
      //console.log("Document data:", receiverSnapshot.data());
      const data = receiverSnapshot.data();
      const propertyKeys = Object.keys(data);
      for (let i = 0; i < propertyKeys.length; i++) {
        const propertyData = data[propertyKeys[i]];
        _presentListings.push(propertyData);
      }
      setPresentListings(_presentListings);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function getSoldListings() {
    const receiverRef = collection(db, "soldListings");
    const receiverDocRef =  doc(receiverRef, emailParams);
    const receiverSnapshot = await getDoc(receiverDocRef);
    if (receiverSnapshot.exists()) {
      //console.log("Document data:", receiverSnapshot.data());
      const data = receiverSnapshot.data();
      const propertyKeys = Object.keys(data);
      for (let i = 0; i < propertyKeys.length; i++) {
        const propertyData = data[propertyKeys[i]];
        _soldListings.push(propertyData);
      }
      setSoldListings(_soldListings);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function getAgentData() {
    const receiverRef = collection(db, "agentList");
    const receiverDocRef =  doc(receiverRef, emailParams);
    const receiverSnapshot = await getDoc(receiverDocRef);
    if (receiverSnapshot.exists()) {
      //console.log("Document data:", receiverSnapshot.data());
      const data = receiverSnapshot.data();
      setName(data?.name);
      setDescription(data?.description);
      setAddress(data?.address);
      setPhoneNumber(data?.phoneNumber);
      setLastLocation(data?.lastLocation);
      setWebsite(data?.website);
      setRole(data?.role);
      setReviews(data?.reviews);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  }

  async function getAgentProfileImage() {
    const receiverRef = collection(db, "User_Info");
    const receiverDocRef =  doc(receiverRef, emailParams);
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


  useEffect(() => {
    getPresentListings();
    getSoldListings();
    getAgentData();
    getAgentProfileImage();
  }, []);





  const [currentTime, setCurrentTime] = useState(moment());
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
  return (
    <div className={poppins.className}>
        <Header />
    <Card>
      {/* User button */}
      <CardHeader className="p-20 flex items-center">
        <div className="flex items-center space-x-4">
          <div className="flex items-center  space-x-3">
            <Avatar className="w-24 h-24">
              <img
                alt="Avatar"
                className="rounded-full"
                height="100"
                src={profileImage}
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-3xl font-bold">{name}</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">Real Estate Broker</p>
              <button 
              className={`flex shadow-sm p-2 ${buttonColor} font-bold rounded-lg`}
              onClick={()=>{
                if (buttonText!="Requested") {
                  PushNotifications(user?.email as string,emailParams,currentTime.format("YYYY-MM-DD HH:mm:ss"))
                  setButtonText("Requested")
                  setButtonIcon("/check.png")
                  setButtonColor("bg-green-200")
                }
                else{
                  alert("User already requested!")
                }
              }}
              > {buttonText}
          <img src={buttonIcon} className="w-7 h-7 ml-2" />
          </button>
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="grid gap-40 lg:grid-cols-2 lg:px-6 lg:gap-40">

        {/* Left Column */}

        <CardContent className="pt-0">
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <div className="mt-4 space-y-4 text-sm text-black dark:text-gray-400">
          <h1 className="font-bold text-4xl">About {name}</h1>
          <p className="text-xl">
            {description}
          </p>
        </div>


  <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-3xl font-bold">Present Listings</AccordionTrigger>
    <AccordionContent className="text-xl">
   

    <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap gap-4">
        
        {presentListings && presentListings.map((property, index) => (
          <ListingCard
          key={index}
          propertyId=""
          address={property.address}
          price={property.price}
          bedrooms={property.beds}
          bathrooms={property.baths}
          transactionType={property.transactionType}
          date={currentTime.format("MMMM DD, YYYY")}
          stars={3}
          review="Excellent service and expertise!"
          image={property.imageUrl[0]}
          />
        ))}
          </div>
        </div>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="text-3xl font-bold">Sold Listings</AccordionTrigger>
    <AccordionContent className="text-xl">
   

    <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap gap-4">
          {soldListings.map((property, index) => (
          <ListingCard
          key={index}
          propertyId=""
          address={property.address}
          price={property.price}
          bedrooms={property.beds}
          bathrooms={property.baths}
          transactionType={property.transactionType}
          date={currentTime.format("MMMM DD, YYYY")}
          stars={3}
          review="Excellent service and expertise!"
          image={property.imageUrl[0]}
          />
        ))}
          </div>
        </div>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger className="text-3xl font-bold">Customer Reviews</AccordionTrigger>
    <AccordionContent className="text-xl">
    <div className="mt-4 space-y-4 text-sm text-black dark:text-gray-400">
          <div className="grid gap-4">
            {
              Object.keys(reviews).map((key) => {
                return <ReviewProp key={key} name={reviews[key][1]} stars={parseInt(reviews[key][2])} comment={reviews[key][3]} date={reviews[key][4]} />
              })
            }
          </div>
        </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
</CardContent>

        {/* Right Column */}
<RealtorCard name={name} phone={phoneNumber} email={emailParams} address={address} website={website} />

      </div>
    </Card>
    <Footer />
    </div>
  )
}

interface HomeIconProps {
    className?: string;
    width?: number;
    height?: number;
}

function HomeIcon(props: HomeIconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


interface StarIconProps {
    className?: string;
    width?: number;
    height?: number;
}

function StarIcon(props: StarIconProps): JSX.Element {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
