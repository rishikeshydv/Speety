"use client";
import React from "react";
import { useRouter } from "next/router";

export default function Help() {
  // const router = useRouter();
  // const handleClick = () => {
  //   router.push("/");
  // };
  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
        <h1 className="text-4xl text-red-400">
          Customer Support and Documentation Under Maintenance
        </h1>
      </div>
      <div>
        {/* <button
          className="bg-blue-300 text-white hover:bg-blue-700"
          onClick={handleClick}
        >
          Return to Home
        </button> */}
        <a  href="/" className="text-3xl font-sans font-bold bg-cyan-300">Return to Home</a>
      </div>
    </div>
  );
}
