'use client';
import React from 'react';
import NavbarLeft from "@/components/navbarLeft";
import { db } from '@/firebase/config';
import { useState } from 'react';
import { rentQ } from '@/queries/rentQ';

export default function Rent() {

  interface Home {
    price: string;
    address: string;
    zip: string;
    bed: string;
    bath: string;
  }

  const [price, setPrice] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [zip, setZip] = useState<string>("");
  const [bed, setBed] = useState<string>("");
  const [bath, setBath] = useState<string>("");

  const handleRentSearch = async () => {
    try {
      await RentQ(db,
        price,
        address,
        zip,
        bed,
        bath);
    } catch (error) {
      console.error(error)
    }

  };

  return (
    <div>
      <div className="text-2xl"> <NavbarLeft /></div>
      <hr className="border-t border-[#2E1760] my-2 w-full" />
      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Enter Address"
          className="border border-gray-300 ml-4 px-6 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          type="number"
          placeholder="Zip Code"
          className="border border-gray-300 ml-4 px-4 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
          value={zip}
          onChange={(e) => setZip(e.target.value)}

        />


        <input
          type="number"
          placeholder="Price"
          className="border border-gray-300 ml-4 px-4 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />


        <input
          type="number"
          placeholder="No. of Beds"
          className="border border-gray-300 ml-4 px-4 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
          value={bed}
          onChange={(e) => setBed(e.target.value)}
        />

        <input
          type="number"
          placeholder="No. of Baths"
          className="border border-gray-300 ml-4 px-4 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
          value={bath}
          onChange={(e) => setBath(e.target.value)}
        />

        <button className="bg-blue-500 text-white ml-4 px-3 py-4 rounded-r-md hover:bg-blue-600 focus:outline-none"
          onClick={handleRentSearch}>
          Rent
        </button>
      </div>
      <hr className="border-t border-[#2E1760] my-4 w-full" />
    </div>
  )
}

