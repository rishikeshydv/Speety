"use client";
import React from "react";
import Typist from "react-typist-component";
import { useRouter } from "next/navigation";
import { GrCaretNext } from "react-icons/gr";
import { ContainerScroll } from "../ui/container-scroll-animation";
import { AnimatedTooltip } from "../ui/animated-tooltip";
import Image from "next/image";
import { CarouselHero } from "./CarouselHero";
import { HowWeHelp } from "./HowWeHelp";

const people = [
  {
    id: 1,
    name: "John Doe",
    designation: "Software Engineer",
    image:
      "https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3387&q=80",
  },
  {
    id: 2,
    name: "Robert Johnson",
    designation: "Product Manager",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 3,
    name: "Jane Smith",
    designation: "Data Scientist",
    image:
      "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8YXZhdGFyfGVufDB8fDB8fHww&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 4,
    name: "Emily Davis",
    designation: "UX Designer",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGF2YXRhcnxlbnwwfHwwfHx8MA%3D%3D&auto=format&fit=crop&w=800&q=60",
  },
  {
    id: 5,
    name: "Tyler Durden",
    designation: "Soap Developer",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3540&q=80",
  },
  {
    id: 6,
    name: "Dora",
    designation: "The Explorer",
    image:
      "https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=3534&q=80",
  },
];

export default function Sec1() {
  const router = useRouter();
  const loginDirect = () => {
    router.push("/auth/login");
  };

  return (
    <div>
      <section className="mb-10">
        <div className="flex w-full flex-col lg:flex-row">
          <div className="flex-[0.5] flex flex-col pb-5 md:px-16 items-center">
            <div className="text-[#508991] py-1 px-5 text-lg font-semibold tracking-tighter xl:mb-10 2xl:mb-10">
              <Typist>Introducing safety enhanced brokerage ...</Typist>
            </div>

            {/* "Selling fast" */}
            <div className="text-gray-400 text-3xl md:text-5xl xl:text-8xl 2xl:text-8xl font-bold flex items-center md:mb-2 pt-5 pb-2">
              <span className="">Selling fast,</span>
            </div>

            {/* "Buying smart" with gradient text */}
            <h1 className="text-gray-400 text-xl md:text-5xl xl:text-8xl 2xl:text-8xl font-bold flex items-center xl:mb-10 2xl:mb-10 pb-5">
              <span className="">buying</span>
              &nbsp;
              <span className="font-extrabold tracking-tight text-[#004346] h-[calc(theme(fontSize.xl)*theme(lineHeight.tight))] md:h-[calc(theme(fontSize.4xl)*theme(lineHeight.tight))] xl:h-[calc(theme(fontSize.7xl)*theme(lineHeight.tight))] 2xl:h-[calc(theme(fontSize.7xl)*theme(lineHeight.tight))] overflow-hidden mb-0.5">
                <ul className="animate-text-slide-3">
                  <li>smart</li>
                  <li>wise</li>
                  <li>sound</li>
                  <li aria-hidden="true">smart</li>
                </ul>
              </span>
              &nbsp;
            </h1>

            {/* Buttons for Buy, Sell, Rent */}
            <h1 className="text-black-500 text-md xl:text-xl 2xl:text-xl flex items-center md:mt-5 md:mb-8 xl:mb-10 2xl:mb-10 pb-3">
              <button className="px-5 py-2 border  border-opacity-20 tracking-tighter rounded-md xl:rounded-xl 2xl:rounded-xl">
                Buy
              </button>
              &nbsp;, &nbsp;
              <button className="px-5 py-2 border  border-opacity-20 tracking-tighter rounded-md xl:rounded-xl 2xl:rounded-xl">
                Sell
              </button>{" "}
              &nbsp; &amp; &nbsp;
              <button className="px-5 py-2 border  border-opacity-20 tracking-tighter rounded-md xl:rounded-xl 2xl:rounded-xl">
                Rent
              </button>{" "}
              &nbsp; with &nbsp;
              <button className="bg-gradient-to-r from-[#90A955] to-[#397367] text-transparent bg-clip-text animate-gradient px-5 py-2 2xl:px-2 border border-opacity-20 rounded-md xl:rounded-xl tracking-tighter">
                scail.it
              </button>
              <img
                src="/sparkle.png"
                width={30}
                height={20}
                className="xl:mb-5 2xl:mb-5 ml-2 xl:ml-5 2xl:ml-5 h-3 w-3 xl:w-[30px] xl:h-[20px] 2xl:w-[30px] 2xl:h-[20px]"
                alt="Sparkle"
              />
            </h1>

            <div className="flex flex-col gap-y-4 pb-4 ">
              <div className="text-lg font-light text-gray-600">
                Trusted by top founders all over the world.
              </div>
              <div className="flex items-center justify-center">
                <AnimatedTooltip items={people} />
              </div>
            </div>

            {/* Get started button */}
            <button
              className="bg-[#397367] hover:bg-gray-900 font-medium text-white px-8 py-2 rounded-[30px] shadow-lg md:h-12 2xl:h-14 flex items-center justify-center space-x-2 text-lg 2xl:text-lg mb-4 md:mb-10 max-w-[300px]"
              onClick={loginDirect}
            >
              <span>Get started</span>
              <GrCaretNext className="font-medium" />
            </button>
          </div>

          <div className="flex flex-[0.5] px-5">
            <CarouselHero />
          </div>
        </div>

        <div className="w-full h-full flex flex-col pt-10 px-10">
          <div className="title text-2xl lg:text-3xl 2xl:text-5xl font-bold text-gray-400 w-full flex items-start justify-center pt-10">
            How &nbsp; <span className="text-[#004346]"> Scail </span> &nbsp;
            Can Help You ?
          </div>

          <div className="flex flex-col w-full pt-20 lg:flex-row gap-y-5 items-center lg:items-start">
            <div className="flex-[0.4] px-10 flex flex-col gap-y-8 items-center justify-center lg:items-start lg:justify-start">
              <div className="main text-5xl font-bold tracking-wide">
                Scail has its own tailored suite of software.
              </div>

              <div className="text-2xl font-light mt-5">
                Equipped with best AI and modern tech stacks that will help your
                business grow faster.
              </div>

              <button
                className="bg-[#397367] hover:bg-gray-900 font-medium text-white px-8 py-2 rounded-[30px] shadow-lg md:h-12 2xl:h-14 flex items-center justify-center space-x-2 text-lg 2xl:text-lg mb-4 md:mb-10 max-w-[300px]"
                onClick={loginDirect}
              >
                <span>Explore more</span>
                <GrCaretNext className="font-medium" />
              </button>
            </div>

            <div className="flex-[0.6]">
              <HowWeHelp />
            </div>
          </div>
        </div>

        <ContainerScroll
          titleComponent={
            <div className="mb-5">
              <div className="text-2xl lg:text-5xl font-bold text-gray-400">
                Virtual Tour
              </div>
            </div>
          }
        >
          {/* Video */}
          <video
            className="h-full w-full overflow-hidden [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.300/.48)_80%,_theme(colors.green.500)_86%,_theme(colors.green.300)_90%,_theme(colors.green.500)_94%,_theme(colors.green.600/.48))_border-box] rounded-2xl border-4 border-transparent animate-border"
            autoPlay
            muted
            playsInline
          >
            <source src="https://firebasestorage.googleapis.com/v0/b/speety-2175.appspot.com/o/frontend-vids%2F1.mp4?alt=media&token=544c6031-7927-4982-ba30-57a4f39f095d" />
          </video>
        </ContainerScroll>
      </section>
    </div>
  );
}
