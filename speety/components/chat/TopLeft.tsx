import React from 'react'

export default function TopLeft() {
  return (
//<div className={`fixed flex flex-col items-center bg-gray-200 rounded-3xl shadow-lg w-100 h-40 ml-60 top-10`}>
<div  className={`fixed bg-gray-200 rounded-3xl shadow-lg w-80 h-20 mt-5 left-40`}>
      <div className="flex items-center justify-center px-3 py-4">
      <h2 className="text-2xl font-semibold text-gray-800">Chat</h2>
      <input
            type="text"
            className="w-40 h-10 ml-3 px-4 py-2 rounded-2xl focus:outline-none focus:ring-1 focus:ring-blue-500"
            placeholder="Search..."
          />
        <img
          src="/add.webp"
          alt="Image description"
          className="w-8 h-8 rounded-full ml-3"
        />
      </div>
    </div>

  )
}
