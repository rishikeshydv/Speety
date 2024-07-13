/* eslint-disable */
import React from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";

interface IFeatures {
  title: string;
  image: string;
  description: string;
}

const features: IFeatures[] = [
  {
    title: "            Organized Workflow",
    image: "/svgs/5.png",
    description: ` Ditch the spreadsheets! Our platform lets brokers see all their
            agents and clients in one place. Agents can update client info and
            deals in real-time, keeping everyone informed. Plus, built-in
            collaboration tools and automated tasks streamline communication and
            free up time for everyone to focus on what matters - closing deals.`,
  },
  {
    title: "Feature-Based Customization",
    image: "/svgs/6.png",
    description: `Speety is designed to be flexible and customizable. Agents can
            choose the features they need and customize their dashboard to suit
            their workflow. Our platform is designed to be user-friendly and
            intuitive, so agents can start using it.`,
  },
  {
    title: "Easy Getting Started",
    image: "/svgs/7.png",
    description: `An agent can get started in minutes by signing up, inviting their
            clients and most importantly importing their previous listings. Our
            platform is designed to be user-friendly and intuitive, so agents
            can start using it.`,
  },
];

export default function Sec3() {
  return (
    <div className="flex flex-col py-10">
      {/* This Div will create a title and a sparkle on the left */}
      <div className="flex items-center text-[#16302B] justify-center w-full py-5">
        <img
          src="/sparkle.png"
          alt="sparkle"
          width={40}
          height={5}
          className="w-6 h-6 xl:w-16 xl:h-16 2xl:w-16 2xl:h-16 mr-[6px] md:mr-[30px]"
        />
        <h1 className="text-[#004346] text-2xl md:text-5xl xl:text-7xl 2xl:text-7xl font-bold">
          Our Features
        </h1>
      </div>
      {/* The div following would create 3 features of the app */}
      <section className="flex gap-x-5 gap-y-5 px-5 flex-col md:flex-row py-8">
        {features.map((item, key) => (
          <Card className="cursor-pointer flex flex-col items-center gap-4 p-3 md:px-6 py-16 shadow-md border-muted bg-[#A2D3C2] bg-opacity-20 hover:bg-opacity-30 w-1/3">
            <img
              src={item.image}
              alt="Feature image"
              className="w-10 h-10 xl:w-40 xl:h-40 2xl:w-24 2xl:h-24"
              key={key + "_features_card"}
            />
            <CardTitle className="xl:text-2xl 2xl:text-2xl">
              {item.title}
            </CardTitle>
            <CardDescription className="xl:px-6 2xl:px-6 xl:text-center 2xl:text-center text-xs xl:text-lg 2xl:text-lg">
              {item.description}
            </CardDescription>
          </Card>
        ))}
      </section>
    </div>
  );
}
