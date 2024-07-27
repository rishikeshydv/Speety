"use client";
import Image from "next/image";
import React from "react";
import { WobbleCard } from "../ui/wobble-card";

export function WobbleSection() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Brokers
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
            Encrypted communication protects data from breaches, ensuring
            security and privacy for clients. Our intuitive platform simplifies
            property management and communication, making it easier to handle
            tasks efficiently. This focus on privacy and ease of use attracts
            clients who are concerned about online security, providing them with
            a reliable and secure solution.
          </p>
        </div>
        <Image
          src="/svgs/9.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl  hidden md:block"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          Sellers
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          Controlled access to property details protects privacy, ensuring that
          sensitive information is secure. High-quality virtual tours and
          property listings attract qualified buyers, making it easier to
          showcase properties effectively. These unique privacy features help
          you stand out from the competition, offering clients a secure and
          appealing experience.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Buyers
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Secure access to detailed property information and market data
            ensures that users have the insights they need. With advanced search
            filters and personalized recommendations, finding the perfect
            property becomes easier. Additionally, streamlined communication and
            document management enhance efficiency, making the entire process
            smoother and more effective.
          </p>
        </div>
        <Image
          src="/svgs/10.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl hidden md:block"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Renters
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
            Verified listings and a secure platform minimize the risk of scams
            and fraud, providing a trustworthy environment for users. Advanced
            search filters and personalized recommendations make finding the
            right property easier. Additionally, access to community information
            helps users make informed decisions about their potential new
            neighborhoods.
          </p>
        </div>
        <Image
          src="/svgs/12.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl  hidden md:block"
        />
      </WobbleCard>
    </div>
  );
}
