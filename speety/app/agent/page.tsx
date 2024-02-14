"use client";
import React from "react";
import NavbarLeft from "@/components/navbarLeft";
import { db } from "@/firebase/config";
import { useState } from "react";
import { agentQ } from "@/queries/agentQ";
import { AiFillMessage } from "react-icons/ai";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Agent() {
  interface Agent {
    name: string;
    company: string;
    address: string;
    zip: string;
  }

  const [zipValue, setZipValue] = useState<string>("");
  const [resultList, setResultList] = useState<Agent[]>([]);

  const handleAgentSearch = async () => {
    try {
      const res = await agentQ(zipValue);
      setResultList(res);
    } catch (error) {
      console.error(error);
    }
  };


  return (
    <div>
      <div className="text-2xl">
        {" "}
        <NavbarLeft />
      </div>
      <div
        className="bg-cover bg-center h-screen"
        style={{ backgroundImage: 'url("/home-bg.jpeg")' }}
      >
        <div className="flex flex-col items-center justify-center h-screen">
          <div>
            <h1 className="text-6xl font-extrabold mt-2 text-yellow-200">
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
      <Table>
        <TableCaption>Broker List</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Company</TableHead>
            <TableHead>Address</TableHead>
            <TableHead className="text-right">Zip</TableHead>
            <TableHead className="text-right">Connect</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {/* {resultList.length > 0 && ( */}
          {resultList.map((agent: Agent) => (
            <TableRow key={agent.name}>
              <TableCell className="font-medium">{agent.name}</TableCell>
              <TableCell>{agent.company}</TableCell>
              <TableCell>{agent.address}</TableCell>
              <TableCell className="text-right">{agent.zip}</TableCell>
              <TableCell className="text-right"><a href="/chat"><AiFillMessage /></a></TableCell>
            </TableRow>
          ))}
          {/* )} */}
        </TableBody> 
      </Table>
    </div>
  );
}
