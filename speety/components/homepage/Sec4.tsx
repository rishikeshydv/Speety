import React from "react";
import Image from "@/services/homepage/Image";
import Prompts from "@/services/homepage/prompts";
import Typist from "react-typist-component";

export default function Sec4() {
  return (
    <div className="bg-gray-200">
      <section className="py-20">
        {/* The following DIV is used to add the slogan at the center */}
        <div className="text-center text-[#16302B]">
          <h1 className="text-7xl font-bold mb-10">
            <span>Brokerage with </span>
            <button className="py-1 px-4 border border-blue-200 border-opacity-20 bg-blue-200 rounded-xl">
              Tech
            </button>
          </h1>
        </div>
        <div className="text-center text-xl flex items-center justify-center text-[#84A07C]">
        <img src="/pin.png" alt="" className="w-6 h-6 mr-4"/>
        <Typist>Speety gives Real Estate a new face by providing a digital platform for business.</Typist>
        </div>
        {/* The slogan is used to add an image at the center vertically */}
        <div>
          <Image src="/techBroker.png" alt="animation" />
        </div>
      </section>
    </div>
  );
}
