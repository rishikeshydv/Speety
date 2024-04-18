/**
 * v0 by Vercel.
 * @see https://v0.dev/t/bPgs4jRIntL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import Link from "next/link"

interface TicketPropProps {
  brokerId: string;
  confirmPassword: string;
  date:string;
  driverLicense: string;
  email: string;
  faceCapture: string;
  name: string;
  password: string;
  role: string;
  ticketStatus : string;
}

const TicketForm = (props:TicketPropProps) => {
  return (
    <div className="w-full max-w-2xl space-y-8 p-4 rounded-lg border border-gray-200 border-gray-200 dark:border-gray-800">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Ticket Details</h1>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" value={props.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" value={props.email} type="email"/>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input id="role" value={props.role} />
          </div>
          <div className="space-y-2">
          <Label htmlFor="brokerId">Broker ID</Label>
          <Input id="brokerId" value={props.brokerId} />
        </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="role">Password</Label>
            <Input id="role" value={props.password} />
          </div>
          <div className="space-y-2">
          <Label htmlFor="brokerId">Confirm Password</Label>
          <Input id="brokerId" value={props.confirmPassword} />
        </div>
        </div>
        <div className="flex items-center gap-20 px-20">
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="attachments">Driver License</Label>
          {/* Images here */}
          <Link href={props.driverLicense} className="bg-gray-300 rounded-xl p-2 text-lg text-center font-bold" target="_blank"> View</Link>
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="attachments">Face Capture</Label>
          <Link href={props.faceCapture} className="bg-gray-300 rounded-xl p-2 text-center font-bold text-lg" target="_blank"> View</Link>
        </div>
        </div>
      </div>
    </div>
  )
}

export default TicketForm;