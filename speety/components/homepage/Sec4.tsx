import React from "react";
import Image from "@/services/homepage/Image";
import Prompts from "@/services/homepage/prompts";
import Typist from "react-typist-component";

export default function Sec4() {
  return (
    <div className="bg-white">
      <section className="py-8 xl:py-20 2xl:py-20">
        {/* The following DIV is used to add the slogan at the center */}
        <div className="text-center text-[#16302B]">
          <h1 className="text-2xl xl:text-7xl 2xl:text-7xl font-bold mb-4 xl:mb-10 2xl:mb-10">
            <span>Brokerage with </span>
            <button className="py-1 px-2 xl:px-4 2xl:px-4 border border-blue-200 border-opacity-20 bg-[#397367] rounded-xl text-white">
              Tech
            </button>
          </h1>
          
        </div>
        <div className="text-center text-xs px-4 xl:px-4 2xl:px-4 xl:text-xl 2xl:text-xl flex items-center justify-center text-[#84A07C]">
        <img src="/pin.png" alt="" className="w-3 h-3 ml-2 mb-4 xl:mb-0 2xl:mb-0 xl:w-6 xl:h-6 xl:mr-4 2xl:w-6 2xl:h-6 2xl:mr-4"/>
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
