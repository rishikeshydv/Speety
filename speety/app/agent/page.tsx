"use client";
import React, { useState, useEffect, useRef } from "react";
//import NavbarLeft from "@/components/navbarLeft";
import { agentQ } from "@/queries/Transactions/agentQ";
import poppins from "@/font/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import AgentProp from "@/services/agent/AgentProp";



export default function Agent() {
  const [zipVal, setZipVal] = useState<string>("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setZipVal(event.target.value);
  };

  const [resultList,setResultList] = useState<any>([]);
  const [resultText,setResultText] = useState<string>("");

  async function handleSubmit(event:any ) {
    event.preventDefault();
    //write a logic to retrieve the entries from database based on the form data
    return new Promise((resolve, reject) => {
      agentQ(zipVal)
        .then((agentList) => {
          setResultList(agentList);
          if (resultList.length === 0){
            setResultText("No results found!")
          }
          else{
            setResultText("Results:")
          }
          resolve(agentList);
        })
        .catch((error) => {
          reject(error);
        });
    }); 
}


  useEffect(() => {
    const initializeMap = () => {
      const _autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById('autocomplete') as HTMLInputElement
        );
};
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement('script');
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places&callback=initAutocomplete`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.addEventListener('load', initializeMap);
      document.body.appendChild(googleMapsScript);
    };

    // Check if the Google Maps script has already been loaded
    if (!window.google) {
      loadGoogleMapsScript();
    }
  }, []);




  return (
    <div className={poppins.className}>
      <Header />
      <div>
        <section className="py-20 shadow-md">
          <h1 className="text-7xl font-bold tracking-tighter text-center px-96">
            Sell traditionally with an{" "}
            <button className="bg-red-400 rounded-3xl px-6 py-4">agent</button>
          </h1>
          <div className="flex flex-col items-center justify-center mt-20">
            <input
              id="autocomplete"
              type="text"
              placeholder=" Enter a zip code ..."
              className={`bottom-20 h-16 w-1/4 bg-gray-100 text rounded-3xl text-center text-xl`}
              value={zipVal}
              onChange={handleChange}
            />
            <button
              className={` text-white bg-black rounded-2xl px-4 h-16 w-60 text-xl font-bold uppercase mt-16`}
              onClick={handleSubmit}
            >
              Find an agent
            </button>
          </div>
          <div className="flex"></div>
        </section>
      </div>

      <section className="flex flex-col ">
        <div>
        <h1 className="p-10 text-3xl font-bold tracking-tight text-gray-700 ">
          {resultText}
        </h1>
        </div>
        <div className="flex overflow-scroll p-10 gap-10">
      {
        resultList.map((agent:any) => {
          return (
            <AgentProp
              key={agent.id}
              photoUrl={agent.profilePic}
              name={agent.name}
              stars={agent.stars}
              phone={agent.phone}
              reviewCount={agent.reviewCount}
              company={agent.broker}
              license={agent.license}
              email={agent.email}

            />
          );
        })
      }
      </div>

      </section>
      <Footer />
    </div>
  );
}
