'use client';
import React from 'react';
import NavbarLeft from "@/components/navbarLeft";
import { buyQ } from '@/queries/buyQ';
import { db } from '@/firebase/config';
import { useState } from 'react';

export default function Buy() {

  interface Home {
    price: string;
    address: string;
    zip: string;
    bed: string;
    bath: string;
  }

  const [zipValue, setZipValue] = useState<string>("");
  const [resultList, setResultList] = useState<Home[]>([]);

  const handleBuySearch = async () => {
    try {
      const res = await buyQ(db, zipValue);
      setResultList(res);
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
          placeholder="Enter Address, City or Zip"
          className="border border-gray-300 ml-4 px-6 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
          value={zipValue}
          onChange={(e) => setZipValue(e.target.value)}
        />

        <input
          type="string"
          placeholder="Min. $$$"
          className="border border-gray-300 ml-4 px-4 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
        />


        <input
          type="string"
          placeholder="Max. $$$"
          className="border border-gray-300 ml-4 px-4 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
        />


        <input
          type="string"
          placeholder="No. of Beds"
          className="border border-gray-300 ml-4 px-4 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
        />

        <input
          type="string"
          placeholder="No. of Baths"
          className="border border-gray-300 ml-4 px-4 py-4 rounded-l-md focus:outline-none focus:border-blue-500"
        />

        <button className="bg-blue-500 text-white ml-4 px-3 py-4 rounded-r-md hover:bg-blue-600 focus:outline-none"
          onClick={handleBuySearch}>
          Search
        </button>
      </div>
      <hr className="border-t border-[#2E1760] my-4 w-full" />

      {/* Display the list of names */}

      {resultList.length > 0 && (
        <div>
          <h2>Result List:</h2>
          <ul>
            {resultList.map((house: Home, index) => (
              <li key={index}>
                {`Address: ${house.address}, Price: ${house.price}, Beds: ${house.bed}, Baths: ${house.bath}`}
              </li>
            ))}
          </ul>


        </div>
      )}

    </div>
  )
}
