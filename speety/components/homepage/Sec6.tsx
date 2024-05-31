"use client"
import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";
export default function Sec6() {
  const router = useRouter();
  const loginDirect = () => {
    router.push("/auth/login")
}
  return (
    <div className="bg-gray-200">
      <section className="py-20">
        {/* This DIV will be used to write the slogan */}
        <div className="text-center py-2">
          <h1 className="text-7xl font-bold text-[#16302B] mb-10">
            <span>Get started for </span>
            <button className="py-1 px-4 border border-blue-200 border-opacity-20 bg-green-200 rounded-xl">
              free
            </button>
          </h1>
          <h2 className="text-xl text-[#84A07C]">
            Start using it for free, and upgrade to premium whenever you want.
          </h2>

          {/* The DIV below takes care fof the buttons */}

          <div className="mt-20 flex justify-center">
          <Button className="bg-black hover:bg-gray-900 text-white px-4 rounded-2xl h-14 flex items-center text-xl font-poppins mb-5" onClick={loginDirect}>
    <span>Get started</span>
    &nbsp; 
    <AiOutlineDoubleRight />
  </Button>

  <Button className="bg-black hover:bg-gray-900 text-white py-1 px-6 rounded-2xl h-14 flex items-center space-x-2 text-xl font-poppins mb-5 ml-5">
    Plans
  </Button>
</div>


        </div>
      </section>
    </div>
  );
}
