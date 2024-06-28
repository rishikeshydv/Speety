import React from 'react';
import {TableRow, TableCell } from "@/components/ui/table"
import Link from "next/link"
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import TicketForm from '@/components/Tickets/TicketForm';

//importing queries to resolve tickets
import NormalUser from '@/queries/UserVerification/NormalUser';
import AgentUser from '@/queries/UserVerification/AgentUser';
import BrokerUser from '@/queries/UserVerification/BrokerUser';

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


const TicketProp = (props:TicketPropProps) => {
    return (
            <TableRow className=''>
              <TableCell>
              {props.email}
              </TableCell>
              <TableCell className="font-medium">{props.name}</TableCell>
              <TableCell className="font-medium">
                <div className='flex items-center gap-10'>
                  Account Verification
                {/* Here is the popup for ticket open */}
                <AlertDialog>
              <AlertDialogTrigger className='bg-gray-900 p-2 rounded-lg px-8'>Open</AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle className='text-center font-semibold text-2xl'>Verification for {props.name}</AlertDialogTitle>
                  <AlertDialogDescription >
              <TicketForm 
                          brokerId={props.brokerId}
                          confirmPassword={props.confirmPassword}
                          date={props.date}
                          driverLicense={props.driverLicense}
                          email={props.email}
                          faceCapture={props.faceCapture}
                          name={props.name}
                          password={props.password}
                          role={props.role}
                          ticketStatus={props.ticketStatus}/>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Exit</AlertDialogCancel>
                  <AlertDialogAction onClick={()=>NormalUser(
                    props.email,
                    props.name,
                    props.confirmPassword,
                    props.password,
                    props.brokerId,
                    props.driverLicense,
                    props.faceCapture,
                    props.role,
                    props.date
                  )}>As Normal User</AlertDialogAction>
                  <AlertDialogAction onClick={()=>AgentUser(
                    props.email,
                    props.name,
                    props.confirmPassword,
                    props.password,
                    props.brokerId,
                    props.driverLicense,
                    props.faceCapture,
                    props.role,
                    props.date
                  )}>As Agent</AlertDialogAction>
                  <AlertDialogAction 
                  onClick={()=>BrokerUser(
                    props.email,
                    props.name,
                    props.confirmPassword,
                    props.password,
                    props.brokerId,
                    props.driverLicense,
                    props.faceCapture,
                    props.role,
                    props.date
                  )}>As Broker</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
                </div>

                </TableCell>
              <TableCell className="hidden md:table-cell">{props.ticketStatus}</TableCell>
              <TableCell className="hidden md:table-cell">{props.date}</TableCell>
            </TableRow>
    );
};

export default TicketProp;