'use client';
import React,{ useEffect, useState }  from 'react';
//import NavbarLeft from "@/components/navbarLeft";
import { buyQ } from '@/queries/buyQ';
import poppins from "@/font/font";
import PropertyProp from '@/services/property/PropertyProp';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Typist from "react-typist-component";
import { useNavigate } from "react-router-dom";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

interface Property{
  price:string;
  beds:string;
  baths:string;
  houseType:string;
  transactionType:string;
  address: string;
  apartment:string;
  city:string;
  state:string;
  zip:string;
  listedBy: string;
  imageUrl:string[];
  videoUrl:string[]
}

export default function Buy() {
  const [formData,setFormData] = useState({zip:"",searchType:"Buy",priceLower:"",priceUpper:"",beds:"",baths:"",homeType:""});
  const [resultList,setResultList] = useState<Property[]>([]);
  
  async function handleSubmit(event:React.FormEvent<HTMLFormElement> ) {
      event.preventDefault();
      //write a logic to retrieve the entries from database based on the form data
      console.log(formData.zip,formData.priceLower,formData.priceUpper,formData.searchType,formData.beds,formData.baths,formData.homeType)
        const res = await buyQ(db,formData.zip,formData.priceLower,formData.priceUpper,formData.searchType,formData.beds,formData.baths,formData.homeType );
        setResultList(res);
        console.log(resultList)
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

  return (
    <div className={poppins.className}>
      <Header />
         <div>
         <div className='flex items-center justify-center ml-10 mt-6 mb-6'>
            {/* This div tag is for search bar  */}
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter your zip ...' name="zip" value={formData.zip} onChange={handleChange} className="border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl"/>

        <select  value={formData.searchType} onChange={handleChange} name="searchType" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'>
        <option  value="Buy">For Buy</option>
        <option  value="Rent">For Rent</option>
        <option  value="Agents">For Agents</option>
        </select>

        <select  value={formData.priceLower} onChange={handleChange} name="priceLower" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'>
        <option  value="NA">Min. Price</option>
        <option  value="0">$0</option>
        <option  value="100000">$100,000</option>
        <option  value="200000">$200,000</option>
        <option  value="300000">$300,000</option>
        <option  value="500000">$500,000</option>
        <option  value="1000000">$1,000,000</option>
        <option  value="5000000">$5,000,000</option>
        </select>

        <select  value={formData.priceUpper} onChange={handleChange} name="priceUpper" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'>
        <option  value="NA">Max. Price</option>
        <option  value="100000">$100,000</option>
        <option  value="200000">$200,000</option>
        <option  value="300000">$300,000</option>
        <option  value="500000">$500,000</option>
        <option  value="1000000">$1,000,000</option>
        <option  value="5000000">$5,000,000</option>
        <option  value="10000000">$10,000,000</option>
        </select>

        <input type="text" placeholder='Beds' value={formData.beds} onChange={handleChange} name="beds" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'/>
        <input type="text" placeholder='Baths' value={formData.baths} onChange={handleChange} name="baths" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'/>

        <select  value={formData.homeType} onChange={handleChange} name="homeType" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'>
        <option  value="Houses">Houses</option>
        <option  value="Townhomes">Townhomes</option>
        <option  value="Multi-family">Multi-family</option>
        <option  value="Condos/Co-ops">Condos/Co-ops</option>
        <option  value="Lots/Land">Lots/Land</option>
        <option  value="Apartments">Apartments</option>
        <option  value="Manufactured">Manufactured</option>
        </select>

        <button type="submit" className='ml-6 bg-black text-white px-3 py-2 rounded-xl h-16 w-36 font-bold text-2xl'>Search</button>
        </form>
        </div>
        <hr className='border-2 border-gray-300 mt-4'/>

        <div className='bg-gray-200'>
        <section className='py-52 flex flex-col items-center justify-center'>
        
  {/* "Selling fast" */}
  <div className="text-9xl font-bold flex items-center mb-10">
    <span>Buying your home</span>
  </div>

  {/* "Buying smart" with gradient text */}
  <h1 className="text-9xl font-bold flex items-center mb-10">
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
        <button className="py-1 px-4 border border-blue-200 border-opacity-20 text-blue-500 bg-blue-50 text-2xl mb-10">
    <Typist>Speety is making it simpler to buy your home and settle.</Typist>
  </button>
        </section>
    </div>

        <div id='propertyLists' className='mt-4 ml-4'>

      {resultList.map((property:Property, index:number) => {
        return (
          <PropertyProp 
            key={index}
            price={property.price}
            beds={property.beds}
            baths={property.baths}
            houseType={property.houseType}
            transactionType={property.transactionType} // Add transactionType property
            apartment={property.apartment} // Add apartment property
            address={property.address}
            city={property.city}
            state={property.state}
            zip={property.zip}
            listedBy={property.listedBy}
            imageUrl={property.imageUrl[0]} 
            videoUrl={property.videoUrl[0]} // Add videoUrl property
          />
        )
      })}
        </div>
    </div> 
    <Footer />   </div>
  )
}
