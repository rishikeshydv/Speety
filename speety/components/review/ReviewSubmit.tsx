/**
 * v0 by Vercel.
 * @see https://v0.dev/t/tjPaP12dZZ8
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
interface ReviewProps {
    reviewCompleteFunc: () => void
    }

const ReviewSuccess:React.FC<ReviewProps> = ({reviewCompleteFunc}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900/50 backdrop-blur-sm">
      <div className="mx-4 w-full max-w-md rounded-lg bg-white p-8 shadow-lg dark:bg-gray-950">
        <div className="flex flex-col items-center justify-center gap-6">
          <div className="rounded-full bg-green-100 p-4 dark:bg-green-900/20">
            <CheckIcon className="h-8 w-8 fill-green-500 dark:fill-green-400" />
          </div>
          <div className="space-y-2 text-center">
            <h3 className="text-2xl font-bold">Thank you for your review!</h3>
            <p className="text-gray-500 dark:text-gray-400">Your review has been submitted successfully.</p>
          </div>
          <Button className="w-full" onClick={reviewCompleteFunc}>
            Close
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ReviewSuccess

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