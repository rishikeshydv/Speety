/**
 * v0 by Vercel.
 * @see https://v0.dev/t/yn6TdaseEN1
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import Link from "next/link"
import { Button } from "@/components/ui/button"
interface VideoEndedProps {
  changeCallEndedState:()=>void
}
const VideoEnded:React.FC<VideoEndedProps> = ({changeCallEndedState}) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen gap-8 px-4 md:px-6 fixed inset-0 z-50">
      <div className="bg-slate-100/50 dark:bg-gray-950 p-8 w-full max-w-md rounded-2xl shadow-2xl">
        <div className="flex flex-col items-center justify-center gap-6">
          <PhoneCallIcon className="w-16 h-16 text-gray-500 dark:text-gray-400" />
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-bold">Call Ended</h2>
            <p className="text-gray-500 dark:text-gray-400">Your call has been successfully ended.</p>
          </div>
          <div className="flex gap-2 w-full">
            <Button
              className="inline-flex h-10 items-center justify-center rounded-md text-lg font-medium transition-colors hover:bg-gray-100 hover:text-gray-900 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-800 dark:bg-gray-950 dark:hover:bg-gray-800 dark:hover:text-gray-50 dark:focus-visible:ring-gray-300 flex-1"
              variant="outline"
              onClick={changeCallEndedState}
              size={"sm"}
            >
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
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

export default VideoEnded