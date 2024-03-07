import React from "react";
import Image from "@/services/homepage/Image";
import Prompts from "@/services/homepage/prompts";

export default function Sec4() {
  return (
    <div className="bg-gray-200">
      <section className="py-20">
        {/* The following DIV is used to add the slogan at the center */}
        <div className="text-center">
          <h1 className="text-8xl font-bold text-gray-500 mb-10">
            <span>Brokerage with </span>
            <button className="py-1 px-4 border border-blue-200 border-opacity-20 bg-blue-200 rounded-xl">
              Tech
            </button>
          </h1>
        </div>
        {/* The slogan is used to add an image at the center vertically */}
        <div>
          <Image src="/imgSample.png" alt="animation" />
        </div>
        <div className="flex flex-col items-center justify-center">
          {" "}
          <Prompts
            title="Ask Speety to buy for you"
            promptUrl="/write-with-ai.webp"
          />
          <Prompts
            title="Ask Speety to buy for you"
            promptUrl="/write-with-ai.webp"
          />
        </div>
      </section>
    </div>
  );
}
