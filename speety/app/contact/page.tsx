"use client"
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Ticket } from '@/components/contact/Ticket';
import poppins from '@/font/font';
import { set } from 'firebase/database';
import React from 'react';

export default function Contact() {
  return (
    <div className={poppins.className}>

      <Header/>
      <section className="relative w-full">
  <img
    alt="Background"
    className="aspect-video object-cover object-center w-full"
    src="/contact_bg.jpg"
    style={{ maxHeight: '70vh' }} // Set maximum height to 50% of the viewport height
  />
  <div className="absolute inset-0 flex flex-col items-center justify-center w-full p-4 text-center gap-4 mb-40">
    <h2 className="text-7xl font-bold tracking-tight">
      Contact Us
    </h2>
    <p className="max-w-[1200px] text-black text-md font-semi-bold">
      Speety is always here to help you. If you have any questions or need help, feel free to contact us.
    </p>
  </div>
</section>
<Ticket />

      <Footer />
    </div>
  );
};
