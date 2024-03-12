"use client";
import React, { useState } from "react";
//import NavbarLeft from "@/components/navbarLeft";
import { agentQ } from "@/queries/agentQ";
import { db } from "@/firebase/config";
import poppins from "@/font/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgentProp from "@/services/agent/AgentProp";

interface Agent{
  photoUrl:string; 
  name:string;
  stars:number;
  phone:string;
  usersReviews:number;
  company: string;
  license: string;
  address:string;
  email:string;
  zip:string

}

export default function Buy() {
  const [zipVal, setZipVal] = useState<string>("");
  const [resultList, setResultList] = useState<Agent[]>([]);

  async function handleSubmit() {
    //write a logic to retrieve the entries from database based on the form data

    const res = await agentQ(zipVal);
    setResultList(res);
    console.log(resultList);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipVal(event.target.value);
  };

  return (
    <div className={poppins.className}>
      <Header />
      <div>
        <section className="py-52 shadow-md">
          <h1 className="text-9xl font-bold text-center px-96">
            Sell traditionally with an{" "}
            <button className="bg-red-400 rounded-3xl px-10 py-6">agent</button>
          </h1>
          <div className="flex flex-col items-center justify-center mt-20">
            <input
              type="text"
              placeholder=" Enter a zip code ..."
              className={`bottom-20 h-24 w-1/3 bg-gray-100 text rounded-3xl text-center text-3xl`}
              value={zipVal}
              onChange={handleChange}
            />
            <button
              className={` text-white bg-black rounded-2xl px-10 h-24 w-80 text-3xl font-bold uppercase mt-16`}
              onClick={handleSubmit}
            >
              Find an agent
            </button>
          </div>
          <div className="flex"></div>
        </section>
      </div>
      <section>
        {resultList.map((agent: Agent, index: number) => {
          return (
            <AgentProp
              key={index}
              photoUrl={agent.photoUrl}
              name={agent.name}
              stars={agent.stars}
              phone={agent.phone}
              usersReviews={agent.usersReviews}
              company={agent.company}
              license={agent.license}
              address={agent.address}
              email={agent.email}
              zip={agent.zip}
            />
          );
        })}
      </section>
      <Footer />
    </div>
  );
}
