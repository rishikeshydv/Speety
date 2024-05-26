/**
 * v0 by Vercel.
 * @see https://v0.dev/t/LaPL1j1EMkc
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function FaceDeclinedSender() {
    const router = useRouter()
  return (
<div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black bg-opacity-50">
  <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-200 p-6 max-w-md w-full">
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="p-4 rounded-full bg-blue-100 dark:bg-blue-900">
        <FrownIcon className="w-8 h-8 text-blue-500 dark:text-blue-400" />
      </div>
      <h2 className="text-xl font-bold text-gray-800 dark:text-gray-200">Face Detection Declined</h2>
      <p className="text-center text-gray-600 dark:text-gray-400">
        You did not verify the identity of the user on the other end. A ticket has been created for this issue.
        Please contact support for further assistance.
      </p>
      <Button className="w-full" onClick={() => router.push("/contact")}>
        Contact Support
      </Button>
    </div>
  </div>
</div>

  )
}

function FrownIcon(props:any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  )
}