"use client";
import { Button } from "@/components/ui/button";
import poppins from "@/font/font";
import Image from "next/image";
import Link from "next/link";
export default function VerificationPage() {
  return (
    <div className={poppins.className}>
      <div
        className={`fixed bottom-16 top-16 left-1/4 right-1/4 flex flex-col items-center justify-center bg-gray-100 shadow-sm rounded-2xl`}
      >
        {/* This div is for the right side of the page */}
        <Image
          src="/speety_logo.png"
          alt="Speety Logo"
          width={250}
          height={130}
          className=""
        />
        <div className="flex flex-row gap-2 items-center">
          {/* This is for the horizontal line */}
          <hr className="mt-3 border-gray-400 border-2 flex-grow w-44" />

          <hr className="border-2 border-gray-400 mt-3 flex-grow w-44" />
        </div>
        <div className="flex flex-col items-center p-4">
        <img src="/verification_email.png" alt="" className="w-32 h-32 p-4" />
        <h1 className="text-6xl font-semibold text-center p-4">Your account has been sent for verification!</h1>
        <h1 className="text-2xl text-center p-4">We will get back to you soon. </h1>
        <Button size='lg' className="text-lg bg-gray-500"><Link href={"/"}>Return to Site</Link></Button>
        </div>
      </div>
    </div>
  );
}
