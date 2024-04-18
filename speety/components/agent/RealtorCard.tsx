/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/F97E1CdR8Sk
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import Link from "next/link"
import { Button } from "@/components/ui/button"

interface RealtorCardProps {
  name: string
  phone: string
  email: string
  website: string
  address: string
}

const RealtorCard:React.FC<RealtorCardProps> = ({name,phone,email,website,address}) => {
  return (
    <Card className="p-20 shadow-md">
      <CardHeader>
        <CardTitle className="text-4xl font-bold">Contact Details</CardTitle>
      </CardHeader>
      <CardContent>
      <div className="grid gap-1">
          <p className="text-xl py-4">
            <PhoneIcon className="w-7 h-7 mr-1.5 inline-block" />
            <strong>Phone: </strong>
            (555) 123-4567{"\n                  "}
          </p>
          <hr className="border-gray-200 dark:border-gray-800" />
          <p className="text-xl py-4">
            <MailIcon className="w-7 h-7 mr-1.5 inline-block" />
            <strong>Email: </strong>
            emma@example.com{"\n                  "}
          </p> 
          <hr className="border-gray-200 dark:border-gray-800" />
          <p className="text-xl py-4">
            <LinkIcon className="w-7 h-7 mr-1.5 inline-block" />
            <strong>Website: </strong>
            <Link href="#">example.com</Link>
          </p>
          <hr className="border-gray-200 dark:border-gray-800" />
          <p className="text-xl py-4">
            <MapPinIcon className="w-7 h-7 mr-1.5 inline-block" />
            <strong>Address: </strong>
            1234 Elm Street, Pleasantville, CO, 80202{"\n                  "}
          </p>

        </div>
      </CardContent>
      <CardFooter>
        <Button variant="outline" className="text-xl shadow-md bg-gray-100">
          <ShareIcon className="mr-2 h-7 w-7" />
          Share Profile
        </Button>
      </CardFooter>
    </Card>
  )
}

export default RealtorCard;

function PhoneIcon(props:any) {
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
    </svg>
  )
}


function MailIcon(props:any) {
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
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function LinkIcon(props:any) {
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
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}


function MapPinIcon(props:any) {
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
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  )
}


function ShareIcon(props:any) {
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
      <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
      <polyline points="16 6 12 2 8 6" />
      <line x1="12" x2="12" y1="2" y2="15" />
    </svg>
  )
}
