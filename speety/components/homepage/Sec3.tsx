/* eslint-disable */
import React from "react";
import { Card, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";
import { CiCircleCheck } from "react-icons/ci";

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
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="aspect-w-16 aspect-h-7">
          <img
            className="w-full h-[40vh] object-cover rounded-xl"
            src="https://images.unsplash.com/photo-1624571409412-1f253e1ecc89?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80"
            alt="Image Description"
          />
        </div>

        <div className="mt-5 lg:mt-16 grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-1">
            <h2 className="font-bold text-2xl md:text-3xl text-gray-800">
              What features do we offer ?
            </h2>
            <p className="mt-2 md:mt-4 text-gray-500">
              Besides working with start-up enterprises as a partner for
              digitalization, we have built enterprise products for common pain
              points that we have encountered in various products and projects.
            </p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid sm:grid-cols-2 gap-8 md:gap-12">
              {features.map((item, key) => (
                <div className="flex gap-x-5" key={key}>
                  <div className="grow">
                    <h3 className="text-lg font-semibold text-gray-800 flex gap-x-5 items-center">
                      <CiCircleCheck size={25} />
                      {item.title}
                    </h3>
                    <p className="mt-1 text-gray-600">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
