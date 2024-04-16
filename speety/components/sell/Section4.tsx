import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function Section4() {
  return (
    <div><section className="bg-gray-200 py-40">
        <h1 className="text-8xl font-bold text-center">Frequently Asked Questions</h1>
        <div className="">
        <Accordion type="single" collapsible className="px-60 mt-20">
        <AccordionItem value="item-1">
          <AccordionTrigger className="border-2 border-black mt-6 rounded-2xl px-10 text-2xl">When selling my house, where should I begin?</AccordionTrigger>
          <AccordionContent className="text-xl px-4 py-3 italic">
          Start your home selling process by gathering information and considering your options. After choosing a selling path that works best for you, take the first step; contact an iBuyer, a real estate agent or begin home prep.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-2" >
        <AccordionTrigger className="border-2 border-black rounded-2xl px-10 text-2xl">How long does it take to sell a house?</AccordionTrigger>
          <AccordionContent  className="text-xl px-4 py-3 italic">
          On average, homes in the U.S. spend about one month on the market before going under contract, and another month or more to close. In 2020, the average time to sell a home was 55-70 days from list to close.
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="item-3">
        <AccordionTrigger className="border-2 border-black rounded-2xl px-10 text-2xl">What home seller mistakes should I avoid?</AccordionTrigger>
          <AccordionContent  className="text-xl px-4 py-3 italic">
          On average, homes in the U.S. spend about one month on the market before going under contract, and another month or more to close. In 2020, the average time to sell a home was 55-70 days from list to close.
          </AccordionContent>
        </AccordionItem>
      </Accordion>
        </div>

      </section>
    </div>
  );
}
