import React from "react";
import { AiOutlineDoubleRight } from "react-icons/ai";
export default function Sec6() {
  return (
    <div className="bg-gray-200">
      <section className="py-20">
        {/* This DIV will be used to write the slogan */}
        <div className="text-center py-20 mt-20 mb-20">
          <h1 className="text-8xl font-bold text-gray-500 mb-10">
            <span>Get started for </span>
            <button className="py-1 px-4 border border-blue-200 border-opacity-20 bg-green-200 rounded-xl">
              free
            </button>
          </h1>
          <h2 className="text-3xl text-gray-600">
            Start using it for free, and upgrade to premium whenever you want.
          </h2>

          {/* The DIV below takes care fof the buttons */}

          <div className="mt-20 flex justify-center">
  <button className="bg-black hover:bg-gray-900 text-white py-1 px-9 rounded-2xl h-20 flex items-center space-x-2 text-2xl font-poppins mb-5">
    <span>Get started</span>
    &nbsp; &nbsp; &nbsp;
    <AiOutlineDoubleRight />
  </button>

  <button className="bg-black hover:bg-gray-900 text-white py-1 px-9 rounded-2xl h-20 flex items-center space-x-2 text-2xl font-poppins mb-5 ml-5">
    Plans
  </button>
</div>


        </div>
      </section>
    </div>
  );
}
