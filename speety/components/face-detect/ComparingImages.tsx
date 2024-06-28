/**
 * v0 by Vercel.
 * @see https://v0.dev/t/NfnxlfQNPWG
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Button } from "@/components/ui/button"
import { db } from "@/firebase/config"
import axios from "axios"
import { doc, getDoc } from "firebase/firestore"
import React, { use, useEffect, useState } from "react"

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
    const [faceMatch, setFaceMatch] = useState<number>(0)

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

    //upon retrieval of both images, we send a POST request to the API to compare the images
    useEffect(() => {
      if (blobUrl && userPic) {
        const compareImages = async () => {
          const res = await axios.post('/api/v1/face-rekognition', {
            input1: userPic,
            input2: blobUrl
          }, {
            headers: {
              'Content-Type': 'application/json'
            }
          })
          setFaceMatch(res.data[0]['Similarity'])
        }
        compareImages()
      }
    }, [blobUrl, userPic])

    const [count, setCount] = useState<number>(0);

    // Adding animated counter animation to the matching percentage
    useEffect(() => {
      if (!faceMatch) return;
      
      let start = 0;
      const duration = 2; // duration in seconds
      const increment = Math.ceil(faceMatch / (duration * 60)); // approximately 60 FPS
      
      const timer = setInterval(() => {
        start = Math.min(start + increment, faceMatch);
        setCount(start);
        
        if (start >= faceMatch) {
          clearInterval(timer);
        }
      }, 1000 / 60); // run at approximately 60 FPS
      
      return () => clearInterval(timer); // clean up the interval on component unmount
    }, [faceMatch]);
    
    
    
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
    <div className="flex flex-col items-center justify-center gap-4 mt-8">
      <h1 className="font-bold tracking-tighter text-xl">Confirming Identity</h1>
    <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin" />
    <h1 className="font-bold tracking-tighter text-6xl">{count.toFixed(0)}%</h1>
    <div className="flex gap-6">
            <Button
        className="bg-green-400 hover:bg-green-500 text-gray-800 font-bold py-2 px-4 rounded-lg shadow-lg transition-colors duration-300 ease-in-out"
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
</div>

  )
}

export default ComparingImages