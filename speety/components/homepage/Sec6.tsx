"use client";
import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { Button } from "../ui/button";
import { GrCaretNext } from "react-icons/gr";
import { IoCallSharp } from "react-icons/io5";
import { useRouter } from "next/navigation";
export default function Sec6() {
  const router = useRouter();
  const loginDirect = () => {
    router.push("/auth/login");
  };
  return (
    <div className="">
      <section className="py-6 md:py-20">
        {/* This DIV will be used to write the slogan */}
        <div className="text-center py-2">
          <h1 className="text-2xl md:text-5xl xl:text-7xl 2xl:text-7xl font-bold text-[#16302B] mb-4 xl:mb-10 2xl:mb-10">
            <span>Get started with </span>
            <button className="px-5 py-1  border border-blue-200 font-medium border-opacity-20 bg-[#397367] text-white rounded-xl">
              Scail
            </button>
          </h1>
          <h2 className="px-4 xl:px-0 2xl:px-0 text-xs xl:text-xl 2xl:text-xl text-[#000000]">
            Start your journey with Scail and get the best experience with real
            estate.
          </h2>

          {/* The DIV below takes care fof the buttons */}

          <div className="mt-6 xl:mt-20 2xl:mt-20 flex justify-center gap-6">
            <button
              className="bg-[#397367] hover:bg-gray-900 font-medium text-white px-8 py-2 rounded-[30px] shadow-lg md:h-12 2xl:h-14 flex items-center space-x-2 text-lg 2xl:text-lg mb-4 md:mb-10"
              onClick={loginDirect}
            >
              <span>Get started</span>
              <GrCaretNext />
            </button>
            <button
              className="bg-[#397367] hover:bg-gray-900 font-medium text-white px-8 py-2 rounded-[30px] shadow-lg md:h-12 2xl:h-14 flex items-center space-x-2 text-lg 2xl:text-lg mb-4 md:mb-10"
              onClick={() => router.push("/contact")}
            >
              <span>Support</span>
              <IoCallSharp />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
