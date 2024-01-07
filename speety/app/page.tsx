import NavbarLeft from "@/components/navbarLeft"
import HomeSlogan from "@/components/homeSlogan"

export default function Home() {
  return (
    <div>
      <div className="text-2xl"> <NavbarLeft /></div>
      <div className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url("/home-bg.jpeg")' }}>
        <HomeSlogan />
      </div>
    </div >

  )
} 
