import React from 'react'
import { Input } from "@/components/ui/input";

export default function TopLeft() {
  return (
//<div className={`fixed flex flex-col items-center bg-gray-200 rounded-3xl shadow-lg w-100 h-40 ml-60 top-10`}>
<div className="flex h-16 items-center bg-gray-200 rounded-2xl mt-2 w-96 px-4 py-4" style={{ width:300 }}>
<h1 className="text-xl font-semibold text-gray-800">
  Chat
</h1>
<div className="ml-4 flex-1 max-w-xl">
  <Input
    className="w-full max-w-xl h-8 bg-white rounded-full"
    placeholder="Search..."
  />
</div>
</div>

  )
}
