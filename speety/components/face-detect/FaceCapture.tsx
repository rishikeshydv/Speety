/**
 * v0 by Vercel.
 * @see https://v0.dev/t/1zGXKz0qlKZ
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import Webcam from "react-webcam";
import { Button } from "@/components/ui/button"
import React, { useState, useRef, useCallback } from "react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";
import { set } from "date-fns";

interface FaceCaptureProps {
    faceCaptureSend:(url:string)=>void
    faceCapture:boolean
    setFaceCapture:React.Dispatch<React.SetStateAction<boolean>>
}

const FaceCapture:React.FC<FaceCaptureProps> = ({faceCaptureSend, faceCapture, setFaceCapture}) => {
    const webcamRef = useRef<Webcam>(null);
    const [imgSrc, setImgSrc] = useState<string | null>(null);  //this is the BLOB URL of the captured image
    const [showPictures, setShowPictures] = useState(true);
    const [captured,setCaptured] = useState(false);
    const [titleText, setTitleText] = useState("Capture your face");

    //capture the photo
    const capturePhoto = useCallback(() => {
        if (webcamRef.current) {
          const imageSrc = webcamRef.current.getScreenshot();
          setImgSrc(imageSrc);
          setCaptured(true);
          setTitleText("Your Picture");
        }
      }, [webcamRef]);

  //to retake photo
  const retakePhoto = useCallback(() => {
    setCaptured(false);
    setImgSrc(null);
    setTitleText("Capture your face");
  }, []);

  //send the image to the peer user
    const sendImage = useCallback((imgSource:string) => {
        setCaptured(false);
        setFaceCapture(false);
        setShowPictures(true);
        faceCaptureSend(imgSource);;
    }, []);



  return (
<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
  <div className="flex flex-col gap-4 items-center justify-center rounded-3xl bg-slate-200 p-6" style={{ height: 450, width: 600 }}>
    <div className="flex">
      <h1 className="font-bold tracking-tighter text-3xl mt-1">{titleText}&nbsp;&nbsp;</h1>
      <h1 className="text-4xl">📸</h1>
    </div>
    <div className="bg-gray-100 dark:bg-gray-800 rounded-3xl overflow-hidden shadow-lg w-[80vw] max-w-[500px] aspect-video">
      {!captured ? (
        <Webcam
          audio={false}
          ref={webcamRef}
          screenshotFormat="image/jpeg"
          width={500}
          height={375}
          style={{
            aspectRatio: "500/375",
            objectFit: "cover",
          }}
          className="rounded-3xl w-full h-full object-cover"
        />
      ) : (
        <img
          src={imgSrc as string}
          width={500}
          height={375}
          style={{
            aspectRatio: "500/375",
            objectFit: "cover",
          }}
          className="rounded-3xl w-full h-full object-cover"
        />
      )}
    </div>
    {captured ? (
      <div className="mt-6 flex gap-4">
        <Button onClick={()=>sendImage(imgSrc as string)}>
          <CheckIcon className="w-6 h-6" />
        </Button>
        <Button variant="outline" onClick={retakePhoto}>
          <RefreshCcwIcon className="w-6 h-6" />
        </Button>
      </div>
    ) : (
      <Button onClick={capturePhoto} className="rounded-full px-4 py-2">
        <CameraIcon className="w-8 h-8" />
      </Button>
    )}
  </div>
</div>


  )
}

export default FaceCapture

function CameraIcon(props:any) {
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
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  )
}


function RefreshCcwIcon(props:any) {
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
      <path d="M21 12a9 9 0 0 0-9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
      <path d="M3 3v5h5" />
      <path d="M3 12a9 9 0 0 0 9 9 9.75 9.75 0 0 0 6.74-2.74L21 16" />
      <path d="M16 16h5v5" />
    </svg>
  )
}

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
  