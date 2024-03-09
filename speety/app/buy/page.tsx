'use client';
import React,{ useState }  from 'react';
//import NavbarLeft from "@/components/navbarLeft";
import { buyQ } from '@/queries/buyQ';
import { db } from '@/firebase/config';
import poppins from "@/font/font";
import PropertyProp from '@/services/property/PropertyProp';

interface Property{
  price:number;
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

  const [formData,setFormData] = useState({zip:"",searchType:"",priceLower:"",priceUpper:"",beds:"",baths:"",homeType:""});
  const [resultList,setResultList] = useState<Property[]>([]);
  
  async function handleSubmit(event:React.FormEvent<HTMLFormElement> ) {
      event.preventDefault();
      //write a logic to retrieve the entries from database based on the form data
        const res = await buyQ(db,formData.zip,formData.priceLower,formData.priceUpper,formData.searchType,formData.beds,formData.baths,formData.homeType );
        setResultList(res);
  }
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
    };

  return (
    <div className={poppins.className}>
         <div className={poppins.className}>
         <div className='flex items-center justify-center ml-10 mt-2'>
            {/* This div tag is for search bar  */}
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter your zip ...' name="zip" value={formData.zip} onChange={handleChange} className="border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl"/>

        <select  value={formData.searchType} onChange={handleChange} name="searchType" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'>
        <option  value="option1">For Buy</option>
        <option  value="option2">For Rent</option>
        <option  value="option3">For Agents</option>
        </select>

        <select  value={formData.priceLower} onChange={handleChange} name="priceRange" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'>
        <option  value="option1">Min. Price</option>
        <option  value="option1">$0</option>
        <option  value="option2">$100,000</option>
        <option  value="option3">$200,000</option>
        <option  value="option4">$300,000</option>
        <option  value="option5">$500,000</option>
        <option  value="option6">$1,000,000</option>
        <option  value="option7">$5,000,000</option>
        </select>

        <select  value={formData.priceUpper} onChange={handleChange} name="priceRange" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'>
        <option  value="option1">Max. Price</option>
        <option  value="option1">$100,000</option>
        <option  value="option2">$200,000</option>
        <option  value="option3">$300,000</option>
        <option  value="option4">$500,000</option>
        <option  value="option5">$1,000,000</option>
        <option  value="option6">$5,000,000</option>
        <option  value="option7">$10,000,000</option>
        </select>

        <input type="text" placeholder='Beds' value={formData.beds} onChange={handleChange} name="beds" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'/>
        <input type="text" placeholder='Baths' value={formData.baths} onChange={handleChange} name="baths" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'/>

        <select  value={formData.homeType} onChange={handleChange} name="homeType" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-60 pl-4 text-xl text-gray-400'>
        <option  value="option1">Houses</option>
        <option  value="option2">Townhomes</option>
        <option  value="option3">Multi-family</option>
        <option  value="option4">Condos/Co-ops</option>
        <option  value="option5">Lots/Land</option>
        <option  value="option6">Apartments</option>
        <option  value="option7">Manufactured</option>
        </select>

        <button type="submit" className='ml-6 bg-black text-white px-3 py-2 rounded-xl h-16 w-36 font-bold text-2xl'>Search</button>
        </form>
        </div>
        <hr className='border-2 border-gray-300 mt-4'/>
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
    </div>    </div>
  )
}
