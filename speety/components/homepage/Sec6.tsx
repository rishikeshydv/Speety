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
      <section className="py-6 xl:py-20 2xl:py-20">
        {/* This DIV will be used to write the slogan */}
        <div className="text-center py-2">
          <h1 className="text-2xl xl:text-7xl 2xl:text-7xl font-bold text-[#16302B] mb-4 xl:mb-10 2xl:mb-10">
            <span>Get started for </span>
            <button className="xl:py-1 2xl:py-1 px-1 xl:px-4 2xl:px-4 border border-blue-200 border-opacity-20 bg-green-200 rounded-xl">
              free
            </button>
          </h1>
          <h2 className="px-4 xl:px-0 2xl:px-0 text-xs xl:text-xl 2xl:text-xl text-[#84A07C]">
            Start using it for free, and upgrade to premium whenever you want.
          </h2>

          {/* The DIV below takes care fof the buttons */}

          <div className="mt-6 xl:mt-20 2xl:mt-20 flex justify-center">
          <Button className="bg-black hover:bg-gray-900 text-white px-2 xl:px-4 2xl:px-4 rounded-2xl xl:h-14 2xl:h-14 flex items-center text-xs xl:text-xl 2xl:text-xl font-poppins mb-5" onClick={loginDirect}>
    <span>Get started</span>
    &nbsp; 
    <AiOutlineDoubleRight />
  </Button>

  <Button className="bg-black hover:bg-gray-900 text-white py-0 xl:py-1 2xl:py-1 px-6 xl:px-4 2xl:px-4 rounded-2xl xl:h-14 2xl:h-14 flex items-center space-x-2 text-xs xl:text-xl 2xl:text-xl font-poppins mb-5 ml-5">
    Plans
  </Button>
</div>


        </div>
      </section>
    </div>
  );
}
