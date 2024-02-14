"use client"

import NavbarLeft from "@/components/navbarLeft"
import HomeSlogan from "@/components/homeSlogan"
import { useParams } from "react-router-dom";

export default function Home() {
 // const { firstName } = useParams();
  return (
    <div>
      {/* <div>
      {firstName && <p>Welcome, {firstName}!</p>}
    </div> */}
      <div className="text-2xl"> <NavbarLeft /></div>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/home-bg.jpeg")' }}>
        <HomeSlogan />
      </div>
    </div >

  )
} 
