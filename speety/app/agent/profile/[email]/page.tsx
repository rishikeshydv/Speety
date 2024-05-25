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
import { useParams, useRouter } from 'next/navigation';
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment"; //use moment.js to get time/date in a good format
import { useState,useEffect } from "react";
import PushNotifications from "@/queries/Notifications/PushNotifications";
import { collection,getDoc,doc} from "firebase/firestore"; 
import { db } from "@/firebase/config";
import RealtorCard from "@/components/agent/RealtorCard";
import ReviewProp from "@/services/agent/ReviewProp";
import Review from "@/components/review/Review";
import ReviewSuccess from "@/components/review/ReviewSubmit";
import IsUserConnected from "@/queries/IsUserConnected";
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

  const router = useRouter();

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

  //state variable to show if the agent is already a connection
  const [connected, setConnected] = useState(false);

  //showing review UI
  const [reviewComplete, setReviewComplete] = useState(false);
  const reviewCompleteFunc = () => {
    setReviewComplete(!reviewComplete);
  }

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

    async function getProfileImage(reviewEmail_:string) {
      const receiverRef = collection(db, "User_Info");  
      const receiverDocRef =  doc(receiverRef, reviewEmail_);
      const receiverSnapshot = await getDoc(receiverDocRef);
      if (receiverSnapshot.exists()) {
        //console.log("Document data:", receiverSnapshot.data());
        const data = receiverSnapshot.data();
        return data?.profilePic;
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }


async function checkConnection(senderEmail:string, receiverEmail:string) {
  const connected = await IsUserConnected(senderEmail, receiverEmail);
  setConnected(connected);
}

async function checkRequestStatus(senderEmail:string, receiverEmail:string) {
  const receiverRef = collection(db, "notifications");
  const receiverDocRef =  doc(receiverRef, receiverEmail);
  const receiverSnapshot = await getDoc(receiverDocRef);
  if (receiverSnapshot.exists()) {
    const data = receiverSnapshot.data();
    const keys = Object.keys(data);
    for (let i = 0; i < keys.length; i++) {
      const notificationData = data[keys[i]];
      if (notificationData.from === senderEmail && notificationData.status === "pending") {
        setButtonText("Requested");
        setButtonIcon("/check.png");
        setButtonColor("bg-green-200");
      }
    }
  }
}

  useEffect(() => {
    getPresentListings();
    getSoldListings();
    getAgentProfileImage();
    if (user){
      checkRequestStatus(user.email as string,emailParams);
      checkConnection(user.email as string,emailParams);
    }
    getAgentData().then(async() => {
      const updatedReviews = { ...reviews };
      for (const key of Object.keys(reviews)) {
        const reviewEmail_ = reviews[key][0];
        const retrievedProfilePic = await getProfileImage(reviewEmail_);
        updatedReviews[key] = [...reviews[key], retrievedProfilePic];
      }
      setReviews(updatedReviews);
    });
  }, [user]);




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
              <h2 className="text-xl font-bold">{name}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Real Estate Broker</p>
              {
                connected ? 
                
              <button 
              className={`flex shadow-sm p-2 bg-slate-200 font-bold text-sm rounded-lg`}
              onClick={()=>{
                router.push(`/chat`)
              }}
              > Message
          <img src={buttonIcon} className="w-5 h-5 ml-2" />
          </button>
                : 
                <button 
                className={`flex shadow-sm p-2 ${buttonColor} font-bold text-sm rounded-lg`}
                onClick={()=>{
                  if (buttonText!="Requested") {
                    PushNotifications(user?.email as string,emailParams,currentTime.format("YYYY-MM-DD"))
                    setButtonText("Requested")
                    setButtonIcon("/check.png")
                    setButtonColor("bg-green-200")
                  }
                  else{
                    alert("User already requested!")
                  }
                }}
                > {buttonText}
            <img src={buttonIcon} className="w-5 h-5 ml-2" />
            </button>
              }
            </div>
          </div>
        </div>
      </CardHeader>

      <div className="grid gap-40 lg:grid-cols-2 lg:px-6 lg:gap-40">

        {/* Left Column */}

        <CardContent className="pt-0">
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <div className="mt-4 space-y-4 text-sm text-black dark:text-gray-400">
          <h1 className="font-bold text-2xl">About {name}</h1>
          <p className="text-md">
            {description}
          </p>
        </div>


  <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-2xl font-bold">Present Listings</AccordionTrigger>
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
    <AccordionTrigger className="text-2xl font-bold">Sold Listings</AccordionTrigger>
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
    <AccordionTrigger className="text-2xl font-bold">Customer Reviews</AccordionTrigger>
    <AccordionContent className="text-xl">
    <div className="mt-4 space-y-4 text-sm text-black dark:text-gray-400">
          <div className="grid gap-4">
            {
              Object.keys(reviews).map( (key) => {
                return <ReviewProp key={key} name={reviews[key][1]} stars={parseInt(reviews[key][2])} comment={reviews[key][3]} date={reviews[key][4]} profilePic={reviews[key][-1]} />
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
    {
      reviewComplete ? <ReviewSuccess reviewCompleteFunc={reviewCompleteFunc}/> : <Review name={name} reviewCompleteFunc={reviewCompleteFunc} agentEmail={emailParams}/>
    }
    <Footer />
    </div>
  )
}


