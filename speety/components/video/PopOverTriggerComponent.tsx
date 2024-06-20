/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PmSLpMcxfZm
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import React, {useState, useEffect} from "react"
import { PopoverTrigger, PopoverContent, Popover } from "@/components/ui/popover"
import VideoEnded from "./VideoEnded";

interface PopOverComponentProps {
  src: string;
  _className: string;
  videoOnClick: any;
  callerVideoRef: any;
  receiverVideoRef: any;
  endCall: any;
  callAccepted:React.MutableRefObject<boolean>
  sendEndCallMessage:()=>void
  changeCallEndedState:()=>void
  callEndedState:boolean
}

const PopoverTriggerComponent:React.FC<PopOverComponentProps> = ({src,_className,videoOnClick,callerVideoRef,receiverVideoRef,endCall, callAccepted,sendEndCallMessage,changeCallEndedState,callEndedState}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if(!callAccepted){
      endCall();
    }
  }, [callAccepted]) 
  return (
    <div>
            <Popover>
      <PopoverTrigger asChild>
      <button onClick={()=>{
        videoOnClick();
        setShow(true);
        }}>
        <img
          src={src}
          className={_className}
          alt="video-call"
        />
</button>
{/* Popover for video-call */}
      </PopoverTrigger>
      {
        show && (
          <PopoverContent align="end" className="flex-col bg-gray-600 rounded-2xl backdrop-blur-sm xl:w-[1200px] xl:h-[700px] 2xl:w-[3000px] 2xl:h-[1200px]" side="top">
                <div className="flex w-full h-full flex-col py-10">
      <div className="flex-grow flex items-center justify-center">
          <video ref={receiverVideoRef} className=" bg-gray-100 rounded-xl xl:w-[800px] xl:h-[500px] 2xl:w-[2300px] 2xl:h-[800px]"/>
      </div>
      <div className="flex items-center justify-between p-2">
      <div className="flex flex-1 justify-center gap-2 ml-60">
      <VideoOffIcon className="mx-2 h-12 w-12 rounded-full bg-white p-3 text-gray-600" />
        <MicIcon className="mx-2 h-12 w-12 rounded-full bg-white p-3 text-gray-600" />
        <ScreenShareIcon className="mx-2 h-12 w-12 rounded-full bg-white p-3 text-gray-600" />
        <PhoneCallIcon className="mx-2 h-12 w-12 rounded-full bg-red-600 p-3 text-white" onClick={()=>
          {endCall();
          sendEndCallMessage();
          setShow(false);
          changeCallEndedState();
           }}/>
      </div>
          <video ref={callerVideoRef  } className="w-100% bg-gray-100 rounded-3xl mr-4 mt-1 xl:w-[173px] xl:h-[130px] 2xl:w-[267px] 2xl:h-[200px]"/>
          </div>
    </div>
          </PopoverContent>
        )
}
    </Popover>

    {
        callAccepted.current && (
          <div style={{ width: "1700px", height: "1000px" }} className="fixed inset-0 my-28 mx-80 z-50 flex flex-col border-0 p-0 bg-gray-600 rounded-2xl backdrop-blur-sm">
                <div className="flex w-full h-full flex-col py-10">
      <div className="flex-grow flex items-center justify-center">
          <video ref={receiverVideoRef} style={{ width: "1000", height: "700px" }} className=" bg-gray-100 rounded-xl" />
      </div>
      <div className="flex items-center justify-between p-4">
      <div className="flex flex-1 justify-center gap-4 ml-60">
      <VideoOffIcon className="mx-2 h-16 w-16 rounded-full bg-white p-3 text-gray-600" />
        <MicIcon className="mx-2 h-16 w-16 rounded-full bg-white p-3 text-gray-600" />
        <ScreenShareIcon className="mx-2 h-16 w-16 rounded-full bg-white p-3 text-gray-600" />
        <PhoneCallIcon className="mx-2 h-16 w-16 rounded-full bg-red-600 p-3 text-white" onClick={()=>{
          endCall();
          sendEndCallMessage();
          setShow(false);
          callAccepted.current=false;
          changeCallEndedState();
          }}/>
      </div>
          <video ref={callerVideoRef  } style={{ width: "307px", height: "230px" }} className="w-100% bg-gray-100 rounded-3xl"/>
          </div>
    </div>
          </div>
        )
}

{
  callEndedState && (
    <VideoEnded changeCallEndedState={changeCallEndedState}/>
  )
}

    </div>
  )
}

export default PopoverTriggerComponent;


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
  
