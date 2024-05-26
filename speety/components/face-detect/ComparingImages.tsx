/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NfnxlfQNPWG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Button } from "@/components/ui/button"
import { db } from "@/firebase/config"
import { doc, getDoc } from "firebase/firestore"
import React, { useEffect, useState } from "react"

interface ComparingImagesProps {
    userEmail:string
    blobUrl:string
    faceCaptureReceived:boolean
    setFaceCaptureReceived:React.Dispatch<React.SetStateAction<boolean>>
    receiverFaceDeclined:boolean
    setReceiverFaceDeclined:React.Dispatch<React.SetStateAction<boolean>>
    faceCaptureDecline:()=>void
    faceCaptureConfirm:()=>void
}
const ComparingImages:React.FC<ComparingImagesProps> = ({userEmail, blobUrl, faceCaptureReceived, setFaceCaptureReceived, receiverFaceDeclined, setReceiverFaceDeclined, faceCaptureDecline, faceCaptureConfirm}) => {
    const [userPic, setUserPic] = useState<string>("")
    useEffect(() => {
        const getUserPic = async () => {
            const docRef = doc(db, "User_Info", userEmail)
            const docSnap = await getDoc(docRef)
            if (docSnap.exists()) {
                setUserPic(docSnap.data().profilePic)
            } else {
                console.log("No such document!")
            }
        }
        getUserPic()
    }, [userEmail])
  return (
<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
  <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-200 p-6 max-w-4xl w-full">
  <h1 className=" text-3xl tracking-tighter p-2 mb-2 font-bold">Identity Verification</h1>
    <div className="grid grid-cols-2 gap-8">
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img
          alt="Image 1"
          className="w-full h-auto object-cover"
          height={600}
          src={userPic}
          style={{
            aspectRatio: "800/600",
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
      <div className="relative group overflow-hidden rounded-lg shadow-lg">
        <img
          alt="Image 2"
          className="w-full h-auto object-cover"
          height={600}
          src={blobUrl}
          style={{
            aspectRatio: "800/600",
            objectFit: "cover",
          }}
          width={800}
        />
      </div>
    </div>
    <div className="flex justify-center gap-4 mt-8">
      <Button
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300 ease-in-out"
        variant="outline"
        onClick={() => {
          faceCaptureConfirm();
          setFaceCaptureReceived(false);
        }}
      >
        Confirm
      </Button>
      <Button
        className="bg-white text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg border-2 border-gray-400 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
        variant="outline"
        onClick={() => {
          faceCaptureDecline();
          setReceiverFaceDeclined(true);
          setFaceCaptureReceived(false);
        }}
      >
        Decline
      </Button>
    </div>
  </div>
</div>

  )
}

export default ComparingImages