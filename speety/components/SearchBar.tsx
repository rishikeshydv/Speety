"use client"
import React,{useState} from 'react'
import poppins from "@/font/font";

export default function SearchBar() {
    const [formData,setFormData] = useState({zip:"",searchType:"",priceRange:"",beds:"",baths:"",homeType:""});
    const handleSubmit= (event:React.FormEvent<HTMLFormElement> ) => {
        event.preventDefault();
        //write a logic to retrieve the entries from database based on the form data
    }
    const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = event.target;
        setFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
      }
  return (
    <div className={poppins.className}>
        <div className='flex items-center justify-center ml-10 mt-2'>
            {/* This div tag is for search bar  */}
        <form onSubmit={handleSubmit}>
        <input type="text" placeholder='Enter your zip ...' name="zip" value={formData.zip} onChange={handleChange} className="border-gray-400 border-2 rounded-2xl h-16 w-72 pl-4 text-xl"/>

        <select  value={formData.searchType} onChange={handleChange} name="searchType" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-72 pl-4 text-xl text-gray-400'>
        <option  value="option1">For Buy</option>
        <option  value="option2">For Rent</option>
        <option  value="option3">For Agents</option>
        </select>

        <select  value={formData.priceRange} onChange={handleChange} name="priceRange" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-72 pl-4 text-xl text-gray-400'>
        <option  value="option1">Under $100,000</option>
        <option  value="option2">$100,000 - $200,000</option>
        <option  value="option3">$200,000 - $300,000</option>
        <option  value="option4">$300,000 - $500,000</option>
        <option  value="option5">$500,000 - $1,000,000</option>
        <option  value="option6">$1,000,000 - $5,000,000</option>
        <option  value="option7">$5,000,000 and above</option>
        </select>

        <input type="text" placeholder='Beds' value={formData.beds} onChange={handleChange} name="beds" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-72 pl-4 text-xl text-gray-400'/>
        <input type="text" placeholder='Baths' value={formData.baths} onChange={handleChange} name="baths" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-72 pl-4 text-xl text-gray-400'/>

        <select  value={formData.homeType} onChange={handleChange} name="homeType" className='ml-6 border-gray-400 border-2 rounded-2xl h-16 w-72 pl-4 text-xl text-gray-400'>
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
    </div>
  )
}
