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

interface PopOverComponentProps {
  senderLoc:any
  receiverLoc:any
  }
  

const LocationPopOver:React.FC<PopOverComponentProps> = ({senderLoc,receiverLoc}) =>{
  const router = useRouter();
  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("")
  const [location, setLocation] = useState("")
  const handleSubmit = (e:any) => {
    e.preventDefault()
    setLocation(`${streetAddress}, ${city}, ${state}, ${zip}, ${country}`)
    setButtonText("Confirmed"),
    setButtonColor("bg-green-500")
  }


  const [buttonText, setButtonText] = useState("Confirm");
  const [buttonColor, setButtonColor] = useState("bg-black");
  return (
<div className="mx-auto max-w-sm space-y-6 flex flex-col items-center justify-center">
  <h1 className="text-2xl font-semibold mt-20">Enter Destination Location</h1>
      <div className="space-y-2">
        <div className="space-y-2">
          <Label htmlFor="street-address" className="text-xl">Street Address</Label>
          <Input id="street-address" placeholder="123 Main St" required  className="text-xl" value={streetAddress} onChange={(e)=>{setStreetAddress(e.target.value)}}/>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="city" className="text-xl">City</Label>
            <Input id="city" placeholder="City" required  className="text-xl" value={city} onChange={(e)=>{setCity(e.target.value)}}/>
          </div>
          <div className="space-y-2">
            <Label htmlFor="state" className="text-xl">State/Province</Label>
            <Input id="state" placeholder="State" required  className="text-xl" value={state} onChange={(e)=>{setState(e.target.value)}}/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="zip" className="text-xl">Postal/ZIP code</Label>
          <Input id="zip" placeholder="90210" required  className="text-xl" value={zip} onChange={(e)=>{setZip(e.target.value)}}/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="country" className="text-xl">Country</Label>
          <Input id="country" placeholder="Country" required  className="text-xl" value={country} onChange={(e)=>{setCountry(e.target.value)}}/>
        </div>
        
        <div className="flex items-center justify-center gap-5">
        {/* The following Submit button works to trigger the MapPopOver */}
        <Button className={`w-32 text-xl ${buttonColor} mt-4`} onClick={handleSubmit}>
          {buttonText}
        </Button>
    <Button className="w-32 text-xl mt-4" type="submit" onClick={()=>{
          if (location !== ""){
            router.push(`/map/${location}`)
          }
    }}>
          Submit
        </Button>
        </div>
      </div>
    </div>
  )
}

export default LocationPopOver;
