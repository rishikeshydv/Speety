import VerticalBox from "@/services/homepage/VerticalBox";
import React from "react";
import { WobbleSection } from "./WobbleSection";
export default function Sec5() {
  return (
    <div className="bg-gray-200">
      <section className="mt-20 py-2 md:py-10">
        {/* This DIV will put the slogan at the center */}
        <div className="text-center">
          <h1 className="text-2xl xl:text-7xl 2xl:text-7xl font-bold text-[#16302B] mb-4 xl:mb-10 2xl:mb-10">
            <span>How are we </span>
            <button className="py-1 px-4 border border-blue-200 border-opacity-20 bg-[#A2D3C2] text-white rounded-xl">
              useful?
            </button>
          </h1>
        </div>

        <WobbleSection />
      </section>
    </div>
  );
}
