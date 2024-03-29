import React from 'react'

export default function TopLeft() {
  return (
//<div className={`fixed flex flex-col items-center bg-gray-200 rounded-3xl shadow-lg w-100 h-40 ml-60 top-10`}>
<div  className={`absolute bg-gray-200 rounded-3xl shadow-lg w-1/4 h-20 mt-5 left-44`}>
      <div className="flex items-start justify-start px-3 py-4">
      <h2 className="text-3xl font-semibold text-gray-800 ml-10 mt-2">Chat</h2>
      <input
            type="text"
            className="w-80 h-12 ml-12 px-4 py-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search..."
          />
      </div>
    </div>

  )
}
