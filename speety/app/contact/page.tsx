"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import AIBot from '@/components/ai-bot/AIBot';
import { Ticket } from '@/components/contact/Ticket';
import poppins from '@/font/font';
import { set } from 'firebase/database';
import React from 'react';
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
export default function Contact() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  // if (!user) {
  //   router.push("/auth/login");
  // }
  return (
    <div className={poppins.className}>

      <Header/>
      <section className="relative w-full">
  <img
    alt="Background"
    className="aspect-video object-cover object-center w-full"
    src="/adobe/3.jpeg"
    style={{ maxHeight: '80vh' }} // Set maximum height to 50% of the viewport height
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center w-full p-4 text-center gap-4 xl:mb-40 2xl:mb-40">
    <h2 className="text-3xl xl:text-7xl 2xl:text-7xl font-bold tracking-tight text-[#004346]">
      Contact Us
    </h2>
    <p className="max-w-[1200px] text-black text-xs xl:text-lg 2xl:text-lg font-semi-bold">
      Scail is always here to help you. If you have any questions or need help, feel free to contact us.
    </p>
  </div>
</section>
<Ticket />

      <Footer />
    </div>
  );
};
