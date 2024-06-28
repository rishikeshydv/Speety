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
import Link from "next/link";
import { Button } from "@/components/ui/button";
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
<div
className="relative group overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-transform duration-300 ease-in-out hover:bg-[#E6EFE9] hover:translate-y-[-5px]"
>
<img
  src={image}
  alt="Property Image"
  width={600}
  height={400}
  className="object-cover w-full h-48"
/>
<div className="absolute top-4 right-4 rounded-full bg-white/80 px-3 py-1 text-sm font-semibold">
  ${Number(price).toLocaleString()}
</div>
<div className="bg-white hover:bg-[#E6EFE9] p-4 dark:bg-gray-950">
  <h3 className="font-bold text-lg">{address}</h3>
  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
    <BedIcon className="w-4 h-4" />
    <span>{bedrooms} Beds</span>
    <BathIcon className="w-4 h-4" />
    <span>{bathrooms} Baths</span>
  </div>
  <div>
    <span className="text-sm text-gray-500 dark:text-gray-400">
      Listed on: {date}
    </span>
  </div>
  <Button variant="outline" className="mt-2" onClick={()=>router.push(`/buy/${propertyId}`)}>
    Show Details
  </Button>
</div>
</div>
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