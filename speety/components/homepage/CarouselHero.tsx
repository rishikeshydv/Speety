/* eslint-disable */

import React from "react";

import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";

const carouselData = [
  {
    image:
      "https://images.unsplash.com/photo-1558036117-15d82a90b9b1?q=80&w=3270&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Find your perfect property with ease.",
  },
  {
    image:
      "https://plus.unsplash.com/premium_photo-1681487810054-4bced4f73e24?q=80&w=3280&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "One click analytics and report generation.",
  },
  {
    image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?q=80&w=2765&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Tailored real estate AI agent."
  }
];

export const CarouselHero = () => {
  return (
    <Carousel className="w-full h-full">
      <CarouselContent>
        {carouselData.map((item, index) => (
          <CarouselItem key={index}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-3 relative">
                  <Image
                    src={item.image}
                    alt="Hero image"
                    className="h-full w-full object-cover rounded-lg"
                    layout="fill"
                    objectFit="cover"
                  />

                  <div className="absolute text-white bottom-14 text-lg md:text-xl lg:text-2xl font-semibold">{item.text}</div>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="left-3" />
      <CarouselNext className="right-3" />
    </Carousel>
  );
};
