/**
 * v0 by Vercel.
 * @see https://v0.dev/t/VABe1FRBUSi
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use state"
import { useState,useEffect } from "react"
interface PopOverComponentProps {
  destination:any,
  mapInitialiser:any,
  addressConverter:any
  senderLoc:any
  receiverLoc:any
  }
  interface LocationData {
    lat: number;
    lng: number;
  }
  
const MapPopOver:React.FC<PopOverComponentProps> = ({destination,mapInitialiser,addressConverter,senderLoc,receiverLoc}) => {
  const [convertedDestination, setConvertedDestination] = useState<LocationData>({lat:0,lng:0})
  setConvertedDestination(addressConverter(destination))
  useEffect(() => {
    mapInitialiser(convertedDestination)
  }, [senderLoc,receiverLoc])



  return (
<div id="map">
      </div>
  )
}

export default MapPopOver;