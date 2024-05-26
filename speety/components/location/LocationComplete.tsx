/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uNQNplHE3ke
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import React from "react"

interface LocationCompleteProps {
  destinationReached:boolean
  setDestinationReached:React.Dispatch<React.SetStateAction<boolean>>
  faceCapture: boolean
  setFaceCapture: React.Dispatch<React.SetStateAction<boolean>>
}

const LocationComplete:React.FC<LocationCompleteProps> = ({faceCapture,setFaceCapture, destinationReached, setDestinationReached}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50" />
      <div className="z-10 mx-auto max-w-md space-y-6 rounded-xl bg-white p-8 shadow-lg dark:bg-gray-900">
        <div className="flex items-center justify-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-500">
            <CheckIcon className="h-8 w-8 text-white" />
          </div>
        </div>
        <div className="space-y-2 text-center">
          <h2 className="text-2xl font-bold">You&apos;ve reached your destination!</h2>
          <p className="text-gray-500 dark:text-gray-400">
            Please proceed to face verification to complete the process.
          </p>
        </div>
        <Button className="w-full" onClick={()=>{
          setDestinationReached(false)
          setFaceCapture(true)}}>Proceed to Face Verification</Button>
      </div>
    </div>
  )
}

export default LocationComplete

function CheckIcon(props:any) {
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
      <path d="M20 6 9 17l-5-5" />
    </svg>
  )
}