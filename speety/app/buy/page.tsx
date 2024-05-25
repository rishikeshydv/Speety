"use client";
import React, { useEffect, useState } from "react";
import { buyQ } from "@/queries/Transactions/buyQ";
import poppins from "@/font/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Typist from "react-typist-component";
import ListingCard from "@/services/agent/ListingCard";
import PresentListingCache from "@/cacheMemory/PresentListingCache";

interface Property {
  [key: string]: {
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
  };
}
  //creating a cache object
 export const cache = new PresentListingCache(300000); //5 minutes

export default function Buy() {
  const [formData, setFormData] = useState({
    zip: "",
    searchType: "Buy",
    priceLower: "",
    priceUpper: "",
    beds: "",
    baths: "",
    homeType: "",
  });
  const [refinedList, setRefinedList] = useState<Property>({});
  const [resultList, setResultList] = useState<Property>({});
  const [resultText, setResultText] = useState<string>("");
  let _refinedList: Property = {};

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    //write a logic to retrieve the entries from database based on the form data
    return new Promise((resolve, reject) => {
      buyQ(
        formData.zip,
        formData.priceLower,
        formData.priceUpper,
        formData.searchType,
        formData.beds,
        formData.baths,
        formData.homeType
      )
        .then((buyList) => {
          setResultList(buyList as Property);
          if (Object.keys(buyList).length === 0) {
            setResultText("No results found!");
          } else {
            setResultText("Results:");
          }
          resolve(buyList);
        })
        .catch((error) => {
          reject(error);
        });
    });
  }


  //refine list
  useEffect(() => {
    const keys = Object.keys(resultList);
    keys.map((key) => {
      if (
        resultList[key]["zip"] == formData.zip &&
        parseInt(resultList[key]["price"]) >= parseInt(formData.priceLower) &&
        parseInt(resultList[key]["price"]) <= parseInt(formData.priceUpper) &&
        resultList[key]["transactionType"] == formData.searchType &&
        resultList[key]["beds"] == formData.beds &&
        resultList[key]["baths"] == formData.baths &&
        resultList[key]["houseType"] == formData.homeType
      ) {
        _refinedList[key] = resultList[key];
        cache.set(key, resultList[key]);
        console.log(cache)
      }
    });
    setRefinedList(_refinedList);
  }, [resultList]);


  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  //zip auto-complete
  useEffect(() => {
    const initializeMap = () => {
      const _autocomplete = new window.google.maps.places.Autocomplete(
        document.getElementById("autocomplete") as HTMLInputElement
      );
    };
    const loadGoogleMapsScript = () => {
      const googleMapsScript = document.createElement("script");
      googleMapsScript.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}&libraries=places&callback=initAutocomplete`;
      googleMapsScript.async = true;
      googleMapsScript.defer = true;
      googleMapsScript.addEventListener("load", initializeMap);
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
      <div className="bg-gradient-to-r from-[#87a3a3] to-[#f6f6f6]">
        <div className="flex items-center justify-center ml-8 pt-3">
          {/* This div tag is for search bar  */}
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              id="autocomplete"
              placeholder="Enter your zip ..."
              name="zip"
              value={formData.zip}
              onChange={handleChange}
              className="border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm"
            />

            <select
              value={formData.searchType}
              onChange={handleChange}
              name="searchType"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            >
              <option value="Buy">For Buy</option>
              <option value="Rent">For Rent</option>
              <option value="Agents">For Agents</option>
            </select>

            <select
              value={formData.priceLower}
              onChange={handleChange}
              name="priceLower"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            >
              <option value="NA">Min. Price</option>
              <option value="0">$0</option>
              <option value="100000">$100,000</option>
              <option value="200000">$200,000</option>
              <option value="300000">$300,000</option>
              <option value="500000">$500,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="5000000">$5,000,000</option>
            </select>

            <select
              value={formData.priceUpper}
              onChange={handleChange}
              name="priceUpper"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            >
              <option value="NA">Max. Price</option>
              <option value="100000">$100,000</option>
              <option value="200000">$200,000</option>
              <option value="300000">$300,000</option>
              <option value="500000">$500,000</option>
              <option value="1000000">$1,000,000</option>
              <option value="5000000">$5,000,000</option>
              <option value="10000000">$10,000,000</option>
            </select>

            <input
              type="text"
              placeholder="Beds"
              value={formData.beds}
              onChange={handleChange}
              name="beds"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            />
            <input
              type="text"
              placeholder="Baths"
              value={formData.baths}
              onChange={handleChange}
              name="baths"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40 pl-4 text-sm text-gray-400"
            />

            <select
              value={formData.homeType}
              onChange={handleChange}
              name="homeType"
              className="ml-2 border-gray-400 border-2 rounded-2xl h-10 w-40  pl-4 text-sm text-gray-400"
            >
              <option value="Houses">Houses</option>
              <option value="Townhomes">Townhomes</option>
              <option value="Multi-family">Multi-family</option>
              <option value="Condos/Co-ops">Condos/Co-ops</option>
              <option value="Lots/Land">Lots/Land</option>
              <option value="Apartments">Apartments</option>
              <option value="Manufactured">Manufactured</option>
            </select>

            <button
              type="submit"
              className="ml-2 bg-black text-white px-3 py-2 rounded-xl h-10 w-40 font-bold text-md"
            >
              Search
            </button>
          </form>
        </div>
        <hr className="border-2 border-gray-300 mt-4" />

        <div className="bg-gray-200">
          <section className="py-10 flex flex-col items-center justify-center">
            {/* "Selling fast" */}
            <div className="text-7xl font-bold flex items-center tracking-tighter">
              <span>Buying your home</span>
            </div>

            {/* "Buying smart" with gradient text */}
            <h1 className="text-7xl font-bold flex items-center mb-10 tracking-tighter">
              <span>with</span>
              &nbsp;
              <span className="text-transparent bg-gradient-to-r from-red-500 to-blue-500 bg-clip-text">
                confidence
              </span>
              <img
                src="/sell_house.png"
                width={120}
                height={60}
                className="mb-5 ml-5"
                alt="Home"
              />
            </h1>
            <div className="py-1 px-4 border border-blue-200 border-opacity-20 text-blue-500 bg-blue-50 text-md mb-10">
              <Typist>
                Speety is making it simpler to buy your home and settle.
              </Typist>
            </div>
          </section>
        </div>
        {refinedList && (
          <section className="p-10">
            <div className="flex flex-col">
              <h1 className="p-4 text-xl font-bold tracking-tight text-gray-700 ">
                {resultText}
              </h1>
            </div>
            <div
              id="propertyLists"
              className="flex p-4 gap-10 overflow-scroll"
            >
              {Object.keys(refinedList).map((key) => {
                return (
                  <ListingCard
                    key={key}
                    propertyId={key}
                    address={
                      refinedList[key]["address"] +
                      ", " +
                      refinedList[key]["city"]
                    }
                    price={refinedList[key]["price"]}
                    bedrooms={refinedList[key]["beds"]}
                    bathrooms={refinedList[key]["baths"]}
                    transactionType={refinedList[key]["transactionType"]}
                    date={refinedList[key]["date"]}
                    stars={5}
                    review="Excellent"
                    image={refinedList[key]["imageUrl"][0]}
                  />
                );
              })}
            </div>
          </section>
        )}
      </div>
      <Footer />{" "}
    </div>
  );
}
