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
import { RealtorCard } from "@/components/agent/RealtorCard";
import ListingCard from "@/services/agent/ListingCard";
import Rating from '@mui/material/Rating';
import { useParams } from 'react-router-dom';
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import moment from "moment"; //use moment.js to get time/date in a good format
import { useState,useEffect } from "react";
import PushNotifications from "@/queries/Notifications/PushNotifications";


export default function Component() {
  //we will be retrieving the agent email from te url
  // the url will be in the format of /agent/profile/:email
 // const { email } = useParams();
 const email = "ryadav@caldwell.edu"
  const [user] = useAuthState(auth);
  const [buttonText, setButtonText] = useState("Connect with me");
  const [buttonIcon, setButtonIcon] = useState("/imsg.webp");
  const [buttonColor, setButtonColor] = useState("bg-gray-200");

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
                src="/profile.png"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-3xl font-bold">Evelyn Adams</h2>
              <p className="text-lg text-gray-500 dark:text-gray-400">Real Estate Broker</p>
              <button 
              className={`flex shadow-sm p-2 ${buttonColor} font-bold rounded-lg`}
              onClick={()=>{
                if (buttonText!="Requested") {
                  PushNotifications(user?.email as string,email,currentTime.format("YYYY-MM-DD HH:mm:ss"))
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
          <h1 className="font-bold text-4xl">About Evelyn Adams</h1>
          <p className="text-xl">
            Evelyn Adams is a dedicated real estate broker with over a decade of experience in helping clients find
            their perfect homes. Her commitment to excellence and in-depth knowledge of the housing market have made her
            a trusted advisor for both buyers and sellers.
          </p>
        </div>


  <Accordion type="single" collapsible>
  <AccordionItem value="item-1">
    <AccordionTrigger className="text-3xl font-bold">Present Listing</AccordionTrigger>
    <AccordionContent className="text-xl">
   

    <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap gap-4">
        <ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />
        <ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />
        <ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />
          </div>
        </div>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-2">
    <AccordionTrigger className="text-3xl font-bold">Present Listing</AccordionTrigger>
    <AccordionContent className="text-xl">
   

    <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex flex-wrap gap-4">
        <ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />
        <ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />
        <ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />
          </div>
        </div>
    </AccordionContent>
  </AccordionItem>

  <AccordionItem value="item-3">
    <AccordionTrigger className="text-3xl font-bold">Customer Reviews</AccordionTrigger>
    <AccordionContent className="text-xl">
    <div className="mt-4 space-y-4 text-sm text-black dark:text-gray-400">
          <div className="grid gap-4">
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <img src="/seller.png" alt="" className="w-16 h-16"/>
                <div className="font-semibold text-xl">Evelyn Adams</div>
                <div className="text-sm text-gray-500 dark:text-gray-400"> <Rating name="read-only" value={3} readOnly /></div>
              </div>
              <p className="text-lg text-black dark:text-gray-400">Excellent service and expertise!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">June 23, 2023</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <img src="/seller.png" alt="" className="w-16 h-16"/>
                <div className="font-semibold text-xl">Evelyn Adams</div>
                <div className="text-sm text-gray-500 dark:text-gray-400"> <Rating name="read-only" value={3} readOnly /></div>
              </div>
              <p className="text-lg text-black dark:text-gray-400">Excellent service and expertise!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">June 23, 2023</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <img src="/seller.png" alt="" className="w-16 h-16"/>
                <div className="font-semibold text-xl">Evelyn Adams</div>
                <div className="text-sm text-gray-500 dark:text-gray-400"> <Rating name="read-only" value={3} readOnly /></div>
              </div>
              <p className="text-lg text-black dark:text-gray-400">Excellent service and expertise!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">June 23, 2023</p>
            </div>
          </div>
        </div>
    </AccordionContent>
  </AccordionItem>
</Accordion>
</CardContent>

        {/* Right Column */}
<RealtorCard />
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
