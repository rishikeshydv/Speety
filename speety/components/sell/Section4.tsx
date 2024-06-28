import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FaQuestionCircle } from "react-icons/fa";
import { FaHandPointRight } from "react-icons/fa";

export default function Section4() {
  return (
    <div>
      <section className="bg-white py-8 xl:py-40 2xl:py-40">
      <div className="flex items-center justify-center">
      <h1 className="text-xl md:text-4xl xl:text-6xl 2xl:text-9xl font-bold text-center text-[#004346]">Frequently Asked Questions &nbsp;</h1>
        <FaQuestionCircle className="text-[#004346] text-2xl xl:text-6xl 2xl:text-9xl"/>
      </div>
        <div className="px-4 xl:px-0 2xl:px-0">
        <Accordion type="single" collapsible className="xl:px-60 xl:mt-16 2xl:px-60 2xl:mt-16">
        <AccordionItem value="item-1">
          <AccordionTrigger className="border-2 border-black mt-6 rounded-2xl px-1 md:px-10 2xl:px-10 md:text-lg 2xl:text-lg text-[#004346]">When selling my house, where should I begin?</AccordionTrigger>
          <AccordionContent className="text-md px-4 py-3 italic text-[#004346]">
            <div className="flex gap-2">
            <FaHandPointRight className="text-xl"/>
          Start your home selling process by gathering information and considering your options. After choosing a selling path that works best for you, take the first step; contact an iBuyer, a real estate agent or begin home prep.
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" >
        <AccordionTrigger className="border-2 border-black rounded-2xl px-4 xl:px-10 2xl:px-10 xl:text-lg 2xl:text-lg text-[#004346]">How long does it take to sell a house?</AccordionTrigger>
          <AccordionContent  className="text-md px-4 py-3 italic text-[#004346]">
          <div className="flex gap-2">
            <FaHandPointRight className="text-xl"/>
          On average, homes in the U.S. spend about one month on the market before going under contract, and another month or more to close. In 2020, the average time to sell a home was 55-70 days from list to close.
          </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
        <AccordionTrigger className="border-2 border-black rounded-2xl px-2.5 xl:px-10 2xl:px-10 xl:text-lg 2xl:text-lg text-[#004346]">What home seller mistakes should I avoid?</AccordionTrigger>
          <AccordionContent  className="text-md px-4 py-3 italic text-[#004346]">
          <div className="flex gap-2">
            <FaHandPointRight className="text-xl"/>
          On average, homes in the U.S. spend about one month on the market before going under contract, and another month or more to close. In 2020, the average time to sell a home was 55-70 days from list to close.
          </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
        </div>

      </section>
    </div>
  );
}
