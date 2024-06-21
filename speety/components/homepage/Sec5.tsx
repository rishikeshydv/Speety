import VerticalBox from "@/services/homepage/VerticalBox";
import React from "react";
export default function Sec5() {
  return (
    <div>
      <section className="mt-20 py-2">
        {/* This DIV will put the slogan at the center */}
        <div className="text-center">
          <h1 className="text-2xl xl:text-7xl 2xl:text-7xl font-bold text-[#16302B] mb-4 xl:mb-10 2xl:mb-10">
            <span>How is it </span>
            <button className="py-1 px-4 border border-blue-200 border-opacity-20 bg-pink-200 rounded-xl">
              useful?
            </button>
          </h1>
          <h2 className="text-xs xl:text-lg 2xl:text-lg px-20 py-2 text-[#84A07C]">
          In today&apos;s fast-paced world, staying connected and getting things done quickly is more important than ever.
          </h2>
        </div>
        {/* This DIV tag will add 4 vertical boxes */}
        <div className="flex flex-col xl:flex-row 2xl:flex-row items-center justify-center gap-4 xl:gap-10 py-4">
          <VerticalBox 
          promptUrl="/broker.svg" 
          title="Brokers" 
          point1="◘ Encrypted communication protects data from breaches." 
          point2="◘ Intuitive platform simplifies property management and communication." 
          point3="◘ Privacy attracts clients concerned about online security." />

          <VerticalBox 
          promptUrl="/buyer.png" 
          title="Buyers" 
          point1="◘ Secure access to detailed property information and market data." 
          point2="◘ Advanced search filters and personalized recommendations." 
          point3="◘ Streamlined communication and document management." />

          <VerticalBox 
          promptUrl="/seller.svg" 
          title="Sellers"   
          point1="◘ Controlled access to property details protects privacy." 
          point2="◘ High-quality virtual tours and property listings attract qualified buyers." 
          point3="◘ Stand out from competition with unique privacy features." />

          <VerticalBox 
          promptUrl="/renter.png" 
          title="Renters" 
          point1="◘ Verified listings and secure platform minimize risk of scams and fraud actions." 
          point2="◘ Advanced search filters and personalized recommendations."
          point3="◘ Access to community information and reviews for informed choices." />
        </div>
      </section>
    </div>
  );
}
