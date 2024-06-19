"use client"

import Header from '@/components/Header'
import Section1 from '@/components/sell/Section1'
import Section2 from '@/components/sell/Section2'
import Section3 from '@/components/sell/Section3'
import Section4 from '@/components/sell/Section4'
import React from 'react'
import poppins from "@/font/font";
import Footer from '@/components/Footer'
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from "next/navigation";
export default function Sell() {
  const [user] = useAuthState(auth);
  const router = useRouter();
  if (!user) {
    router.push("/auth/login");
  }
  return (
    <div className={poppins.className}>
        <Header />
        <Section1 />
        <Section2 />
        <Section3 />
        <Section4 />
        <Footer />
    </div>
  )
}
