import React from 'react'

function HomeSlogan() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
      <div>
        <h1 className='text-6xl font-extrabold mt-2 text-yellow-200'>
          Buy.Rent.Sell
        </h1>
      </div>

      <div className="flex mt-4">
        <input
          type="text"
          placeholder="Enter Address, City or Zip"
          className="border border-gray-300 px-6 py-2 w-3/4 rounded-l-md focus:outline-none focus:border-blue-500"
        />
        <button className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none">
          Search
        </button>
      </div>
    </div>
  )

}

export default HomeSlogan
