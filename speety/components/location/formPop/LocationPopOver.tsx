/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VABe1FRBUSi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use state"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { count } from "console"

const LocationPopOver = () =>{
  const [streetAddress, setStreetAddress] = useState("")
  const [city, setCity] = useState("")
  const [state, setState] = useState("")
  const [zip, setZip] = useState("")
  const [country, setCountry] = useState("")
  const [location, setLocation] = useState("")
  const handleSubmit = (e:any) => {
    e.preventDefault()
    setLocation(`${streetAddress} ${city} ${state} ${zip} ${country}`)

  }
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
        <div className="flex items-center justify-center">
        <Button className="w-32 text-xl mt-4" type="submit">
          Submit
        </Button>
        </div>
      </div>
    </div>
  )
}

export default LocationPopOver;

function MicIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  )
}

function PhoneCallIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
      <path d="M14.05 2a9 9 0 0 1 8 7.94" />
      <path d="M14.05 6A5 5 0 0 1 18 10" />
    </svg>
  )
}


function ScreenShareIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3" />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <path d="m17 8 5-5" />
      <path d="M17 3h5v5" />
    </svg>
  )
}
  function VideoOffIcon(props:any) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M10.66 6H14a2 2 0 0 1 2 2v2.34l1 1L22 8v8" />
        <path d="M16 16a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2l10 10Z" />
        <line x1="2" x2="22" y1="2" y2="22" />
      </svg>
    )
  }
  
