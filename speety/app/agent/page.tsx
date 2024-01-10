'use client';
import React from 'react';
import NavbarLeft from "@/components/navbarLeft";
import { db } from '@/firebase/config';
import { useState } from 'react';
import { agentQ } from '@/queries/agentQ';
export default function Agent() {


interface Agent {
    name: string;
    company:string;
    address: string;
    zip: string;
    }

  const [zipValue, setZipValue] = useState<string>("");
  const [resultList, setResultList] = useState<Agent[]>([]);

  const handleAgentSearch = async () => {
    try {
      const res = await agentQ(db, zipValue);
      setResultList(res);
    } catch (error) {
      console.error(error)
    }

  };

  return (
    
    <div>
      <div className="text-2xl"> <NavbarLeft /></div>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/home-bg.jpeg")' }}>
      <div className='flex flex-col items-center justify-center h-screen'>
      <div>
        <h1 className='text-6xl font-extrabold mt-2 text-yellow-200'>
          Find Your Agent
        </h1>
      </div>

      <div className="flex mt-4">
        <input  
          type="text"
          placeholder="Enter Address, City or Zip"
          className="border border-gray-300 px-6 py-2 w-3/4 rounded-l-md focus:outline-none focus:border-blue-500"
          value={zipValue}
          onChange={(e) => setZipValue(e.target.value)}
        />
        <button 
        className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
        onClick={handleAgentSearch}
        >
          Search
        </button>
      </div>
    </div>
      </div>


      {resultList.length > 0 && (
        <div>
          <h2>Result List:</h2>
          <ul>
            {resultList.map((agent: Agent, index) => (
              <li key={index}>
                {`Address: ${agent.name}, Company: ${agent.company}, Address: ${agent.address}, Zip: ${agent.zip}`}
              </li>
            ))}
          </ul>


        </div>
      )}

    </div >
  )
}
