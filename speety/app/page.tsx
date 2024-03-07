"use client"

// import NavbarLeft from "@/components/navbarLeft"
// import HomeSlogan from "@/components/homeSlogan"
import Sec1 from "@/components/homepageSections/sec1"
import Sec2 from "@/components/homepageSections/sec2"
import { Poppins } from 'next/font/google';

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['400', '500', '600', '700', '800', '900']
});
export default function Home() {
  return (
    <div className={poppins.className}>
      {/* <div>
      {firstName && <p>Welcome, {firstName}!</p>}
    </div> */}
      {/* <div className="text-2xl"> <NavbarLeft /></div>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/home-bg.jpeg")' }}>
        <HomeSlogan />
      </div> */}
    <Sec1 />
    <Sec2 />
      
    </div >

  )
} 
