/**
 * v0 by Vercel.
 * @see https://v0.dev/t/bPgs4jRIntL
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function TicketForm() {
  return (
    <div className="w-full max-w-2xl space-y-8 p-4 rounded-lg border border-gray-200 border-gray-200 dark:border-gray-800">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold">Ticket Details</h1>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="User1" readOnly />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" placeholder="user1@gmail.com" type="email" readOnly/>
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input id="subject" placeholder="Technical Error"  readOnly/>
        </div>
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea className="min-h-[100px]" id="description" placeholder="Descriptions 101" />
        </div>
        <div className="space-y-2 flex flex-col">
          <Label htmlFor="attachments">Attachments</Label>
          <span className="text-xs text-gray-500 dark:text-gray-400">
          {/* Images here */}
          <Image 
          src={`/console1.webp`}
          width={200}
          height={200}
          alt="issues"
          >
          </Image>
          </span>
        </div>
      </div>
    </div>
  )
}
