import Header from '@/components/Header'
import Section1 from '@/components/sell/Section1'
import Section2 from '@/components/sell/Section2'
import Section3 from '@/components/sell/Section3'
import Section4 from '@/components/sell/Section4'
import React from 'react'
import poppins from "@/font/font";
import Footer from '@/components/Footer'
export default function Sell() {
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
