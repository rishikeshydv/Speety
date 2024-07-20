"use client";

import Image, { StaticImageData } from "next/image";
import { Tabs } from "../ui/tabs";
import ScailImage from "./assets/house.png";
import ScailAI from "./assets/tech.png";
import ScailReport from "./assets/report.png";

export function HowWeHelp() {
  const tabs = [
    {
      title: "Scail",
      value: "scail",
      content: (
        <div className="w-full relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Scail</p>
          <TabContent
            image={ScailImage}
            description="Our in-house Scail Application makes the process of Buying, Selling and Renting properties ease and hassle free."
          />
        </div>
      ),
    },
    {
      title: "Scail AI",
      value: "scail_ai",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Scail AI</p>
          <TabContent
            image={ScailAI}
            description="Scail AI is an AI agent powered by powerful models like GPT-4 and trained on custom sets of data. The AI model is mainly designed to help with stuffs related to Real Estate business. "
          />{" "}
        </div>
      ),
    },
    {
      title: "Scail Analytics",
      value: "scail_analytics",
      content: (
        <div className="w-full overflow-hidden relative h-full rounded-2xl p-10 text-xl md:text-4xl font-bold text-white bg-gradient-to-br from-purple-700 to-violet-900">
          <p>Scail Analytics</p>
          <TabContent
            image={ScailReport}
            description="Scail Analytics is a high performance report generation tool. It provides a clear and amazing visualization of the current and past Real Estate market."
          />{" "}
        </div>
      ),
    },
  ];

  return (
    <div className="h-[100vh] lg:h-[80vh] w-full [perspective:1000px] flex flex-col items-start justify-start">
      <Tabs tabs={tabs} />
    </div>
  );
}

const TabContent = ({
  image,
  description,
}: {
  image: string | StaticImageData;
  description: string;
}) => {
  return (
    <div className="flex flex-col gap-y-5 lg:flex-row">
      <div className="flex-[0.7] pt-10">
        <Image src={image} alt="Image" />
      </div>

      <div className="text-xl font-light flex-wrap tracking-wider flex-[0.3]">
        {description}
      </div>
    </div>
  );
};
