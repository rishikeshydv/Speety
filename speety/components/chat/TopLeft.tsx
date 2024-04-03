import React from 'react'
import { Input } from "@/components/ui/input";

export default function TopLeft() {
  return (
//<div className={`fixed flex flex-col items-center bg-gray-200 rounded-3xl shadow-lg w-100 h-40 ml-60 top-10`}>
<div className="flex h-24 items-center bg-gray-200 rounded-2xl mt-6 w-96 px-10" style={{ width:500 }}>
<h1 className="text-3xl font-semibold text-gray-800 px-3">
  Chat
</h1>
<div className="ml-4 flex-1 max-w-xl">
  <Input
    className="w-full max-w-xl h-12 bg-white rounded-full"
    placeholder="Search..."
  />
</div>
</div>

  )
}
