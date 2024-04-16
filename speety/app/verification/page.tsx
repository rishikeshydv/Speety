/**
 * v0 by Vercel.
 * @see https://v0.dev/t/OvdVgVOvtr3
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { TableHead, TableRow, TableHeader, TableCell, TableBody, Table } from "@/components/ui/table"
import TicketProp from "@/services/tickets/TicketProp"
import Link from "next/link"
import Footer from '@/components/Footer';
import Header1 from "@/components/Tickets/Header1"


export default function Component() {
  //write a function that will redirect to /info/ticketNumber
  //so that we can retrieve the ticket number from the url
  //and then fetch the ticket details from the database using the ticket number
  
  return (
    <div className="w-full overflow-hidden bg-gradient-to-r from-[#ebf4f5] to-[#b5c6e0]">
      <Header1/>
      <div className="relative grid min-h-screen md:grid-cols-[200px_1fr] ">
      <div className="fixed left-10 top-20">
    </div>
        <div className="flex flex-col ">
        </div>
        <div className="flex flex-col gap-4 p-4 md:gap-8 md:p-6">
      <div className="text-center">
        <div className="flex flex-col items-center">
        <h1 className="font-bold text-7xl text-black">Identity Verification</h1>
        </div>
      </div>
      <div className="bg-gray-700 p-8 rounded-2xl shadow-2xl">
      <div className="flex items-center w-full max-w-sm rounded-lg border dark:border-gray-00">
        <SearchIcon className="h-4 w-4 ml-2.5 mr-2.5 text-white" />
        <Input
          className="w-full border-0 shadow-none appearance-none bg-gray-100/40 dark:bg-gray-800/40"
          placeholder="Search tickets..."
          type="search"
        />
      </div>
      <div className="grid items-center gap-4 overflow-auto">
        <Table className="text-slate-300">
          <TableHeader className="font-bold">
            <TableRow>
              <TableHead className="text-white font-bold text-lg">Ticket Number</TableHead>
              <TableHead className="text-white font-bold text-lg">Username</TableHead>
              <TableHead className="text-white font-bold text-lg">Subject</TableHead>
              <TableHead className="text-white font-bold text-lg">Status</TableHead>
              <TableHead className="text-white font-bold text-lg">Date Created</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TicketProp 
                ticketNumber="T001"
                username="JaneDoe"
                subject="Issue with account login"
                status="Open"
                date="Mar 16, 2024"
            />
            <TicketProp 
                ticketNumber="T002"
                username="JohnSmith"
                subject="Issue with account login"
                status="Open"
                date="Mar 16, 2024" 
            />
                        <TicketProp 
                ticketNumber="T003"
                username="JaneSmith"
                subject="Issue with account login"
                status="Open"
                date="Mar 16, 2024"
                />
                                        <TicketProp 
                ticketNumber="T004"
                username="JaneSmith"
                subject="Issue with account login"
                status="Open"
                date="Mar 16, 2024"
                />
                                                        <TicketProp 
                ticketNumber="T004"
                username="JaneSmith"
                subject="Issue with account login"
                status="Open"
                date="Mar 16, 2024"
                />

          </TableBody>
        </Table>
      </div>
      </div>
      </div>
      </div>
    </div>   
  )
}
function SearchIcon(props:any) {
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
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}