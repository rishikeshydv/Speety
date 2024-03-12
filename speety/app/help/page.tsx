"use client"
import React, { useState } from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Header'

export default function Help() {
  const [searchVal,setSearchVal] = useState<string>('')
  const onChangeHandler = (event:React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value)
  }
  const onSubmitHandler = (event:React.FormEvent) => {
      event.preventDefault();
//write a query to retrieve the help issues based on the search value and navigate that to a new page
//the new page should have articles relate to the issue
  }
  return (
    <div>
        <Header/>
        <section className='py-20'>
          <form onSubmit={onSubmitHandler}>
            <input type="text" onChange={onChangeHandler} className={`fixed left-1/4 right-1/4 shadow-lg rounded-xl border-2 h-20 px-10 text-2xl text-center`} placeholder="Enter your issue ..."/>
            <button type="submit" className={`fixed left-1/2 right-1/2 bg-gray-300 text-2xl px-2 py-2 rounded-xl uppercase font-bold w-40 h-16 mt-32`}>Search</button>
          </form>
        </section>
        <section className='bg-gray-200 mt-40'>
          <div className='mt-20 flex items-center justify-center  py-32'>
            <a href="/help/agents"><button className='bg-white rounded-xl text-2xl text-black uppercase w-80 h-24 hover:text-white hover:bg-gray-500 hover:font-bold'>Agents</button></a>
            <a href="/help/rentals"><button className='bg-white rounded-xl text-2xl text-black uppercase w-80 h-24 ml-10 hover:text-white hover:bg-gray-500 hover:font-bold'>Rentals</button></a>
            <a href="/help/sellers"><button className='bg-white rounded-xl text-2xl text-black uppercase w-80 h-24 ml-10 hover:text-white hover:bg-gray-500 hover:font-bold'>Sellers</button></a>
          </div>
        </section>
        <Footer/>
    </div>
  )
}