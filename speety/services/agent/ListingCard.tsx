/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UqARte4Egfr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card";
import React from "react";
import { useRouter } from "next/navigation";
import Rating from '@mui/material/Rating';
interface ListingProp {
  propertyId: string;
    address: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    transactionType: string
    date: string;
    stars: number;
    review: string;
    image: string;
    }

const ListingCard:React.FC<ListingProp>=({ propertyId,address,price,bedrooms,bathrooms,transactionType,date,stars,review,image})=> {
  const router = useRouter();
  return (
    
    //         <div className="flex gap-2"><p>Listed On: </p><p className="font-bold">{date}</p></div>

    <Card onClick={()=>router.push(`/buy/${propertyId}`)} className="bg-gray-200">
    <img
      alt="property"
      className="w-full h-[200px] object-cover rounded-t-lg"
      height={300}
      src={image}
      style={{
        aspectRatio: "400/300",
        objectFit: "cover",
      }}
      width={400}
    />
    <CardContent className="px-4 py-2 bg-slate-100">
      <h3 className="text-lg font-bold">{address}</h3>
      <div className="flex">
      <p className="text-gray-500 dark:text-gray-400 text-sm">{bedrooms} beds · {bathrooms} baths · </p>
      <div className="flex ml-1">
      <HomeIcon className="w-3 h-3 mt-1" />
      <p className="text-gray-500 dark:text-gray-400 text-sm ml-1 font-bold">For {transactionType}</p>
      </div>
      </div>
      <div className="flex justify-between">
        <div className="flex">
      <p className="font-semibold tracking-tighter text-sm">Listed On:</p>
      &nbsp;
      <p className="text-sm tracking-tighter italic">{date}</p>
      </div>
        <p className="font-medium tracking-tighter text-sm">${price}</p>
        </div>
      
    </CardContent>
  </Card>
  )
}

export default ListingCard;

function HomeIcon(props:any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function StarIcon(props:any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
