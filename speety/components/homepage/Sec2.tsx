import React from "react";
import { Card } from "@/components/ui/card";
import Image from "@/services/homepage/Image";
import { Button } from "../ui/button";
import StickyScrollingPage from "../ui/sticky";

export default function Sec2() {
  return (
    <div className="bg-gray-200">
      {/* <section className="flex flex-col py-10 xl:py-20 2xl:py-20 gap-6">
        <div className="flex items-center justify-between p-4">
        <div className="px-10 flex flex-col gap-4">
          <h1 className="text-2xl md:text-7xl text-[#004346] font-bold tracking-normal">How We Help!</h1>
          <p className="text-center">
            {" "}
            Scail works to provide a new dimension to the world of real estate
            through technology.
          </p>
        </div>
        <div className="flex items-center justify-between gap-1">
      <Button
        variant="outline"
        className="rounded-full px-2 py-1 transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <ChevronLeftIcon className="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        className="rounded-full px-2 py-1 transition-colors hover:bg-primary hover:text-primary-foreground"
      >
        <ChevronRightIcon className="h-5 w-5" />
      </Button>
    </div>
    </div>
        <div className="container grid max-w-5xl gap-8 px-4 md:grid-cols-3 md:px-6">
          <Card className="flex flex-col items-center gap-4 px-4 py-6 xl:px-8 xl:py-16 rounded-3xl shadow-lg transition-all hover:translate-y-[-5px] hover:bg-[#E6EFE9]">
            <img
              src="/svgs/2.png"
              alt="hourglass"
              className="w-10 h-10 xl:w-24 xl:h-24 2xl:w-24 2xl:h-24"
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Realtime Communication</h3>
              <p className="text-muted-foreground xl:text-sm">
                Connect instantly with voice, video, or chat.
              </p>
            </div>
          </Card>
          <Card className="flex flex-col items-center gap-4 px-4 py-6 xl:px-8 xl:py-16 rounded-3xl shadow-lg transition-all hover:translate-y-[-5px] hover:bg-[#E6EFE9]">
            <img
              src="/svgs/3.png"
              alt="hourglass"
              className="w-10 h-10 xl:w-24 xl:h-24 2xl:w-24 2xl:h-24"
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Dual Location Tracking</h3>
              <p className="text-muted-foreground xl:text-sm">
                Track each other in real-time on a shared map.
              </p>
            </div>
          </Card>
          <Card className="flex flex-col items-center gap-4 px-4 py-6 xl:px-8 xl:py-16 rounded-3xl shadow-lg transition-all hover:translate-y-[-5px] hover:bg-[#E6EFE9]">
            <img
              src="/svgs/4.png"
              alt="hourglass"
              className="w-10 h-10 xl:w-24 xl:h-24 2xl:w-24 2xl:h-24"
            />
            <div className="text-center">
              <h3 className="text-lg font-semibold">Highly Secure</h3>
              <p className="text-muted-foreground xl:text-sm">
                Experience seamless and secure real-time connection, wherever
                life takes you.
              </p>
            </div>
          </Card>
        </div>
      </section> */}
      <StickyScrollingPage />
    </div>
  );
}


function ChevronLeftIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}


function ChevronRightIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  )
}