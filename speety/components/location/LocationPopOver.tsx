/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VABe1FRBUSi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use state"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation";
import { set } from "firebase/database"
import poppins from "@/font/font"

interface LocationPopOverProps {
  clickedUser:string
}

const LocationPopOver:React.FC<LocationPopOverProps> = ({clickedUser}) =>{
  const router = useRouter();
  return (
    <div className={`${poppins.className}`}>
        <div className="grid gap-2 justify-items-center">
      <h2 className="text-lg font-semibold tracking-tighter">Location Tracking</h2>
      <div className="grid gap-2 justify-self-center">
        <p className="text-center text-xs leading-none">Do you want to proceed?</p>
        <div className="inline-grid gap-2">
          <Button size="sm" onClick={()=>router.push(`/map/${clickedUser}`)}>
           <p className="text-xs">Proceed &gt;&gt;&gt;</p> 
          </Button>
        </div>
      </div>
    </div>

    </div>

  )
}

export default LocationPopOver;
