/**
 * v0 by Vercel.
 * @see https://v0.dev/t/f8239rDSZLD
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogClose } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import poppins from "@/font/font"
import { useRouter } from "next/navigation"

export default function PasswordReset() {
  const router = useRouter()
  return (
    <div className={poppins.className}>
    <Dialog defaultOpen>
      <DialogContent className="sm:max-w-[425px]">
        <div className="flex flex-col items-center justify-center gap-4 py-8">
          <MailOpenIcon className="text-primary h-12 w-12" />
          <DialogTitle>Password Reset Requested</DialogTitle>
          <DialogDescription>
            An email has been sent to your inbox with instructions to reset your password. Please check your email and
            follow the steps provided.
          </DialogDescription>
        </div>
        <DialogFooter >
          <div onClick={()=>router.push("/auth/signup")}>
            <Button type="button">Close</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>
  )
}

function MailOpenIcon(props:any) {
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
      <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
      <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
    </svg>
  )
}