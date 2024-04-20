/**
 * v0 by Vercel.
 * @see https://v0.dev/t/dmPtKdcZme4
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */

import Link from "next/link"
export default function TimerSuccess() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 max-w-md w-full">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="bg-green-500 text-white rounded-full p-3">
            <CheckIcon className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold">Congratulations!</h2>
          <p className="text-gray-500 dark:text-gray-400 text-center">
            You have successfully viewed the property. <br /> You can now go back to the homepage.
          </p>
          <Link
            className="inline-flex items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
            href="/"
          >
            Go to Homepage
          </Link>
        </div>
      </div>
    </div>
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
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}