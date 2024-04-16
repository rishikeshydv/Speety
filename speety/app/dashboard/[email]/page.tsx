/**
 * v0 by Vercel.
 * @see https://v0.dev/t/omFgxqpUK7e
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import poppins from "@/font/font";
import Footer from "@/components/Footer";
import { useParams } from 'next/navigation';
import Image from 'next/image';
import ListingCard from "@/services/agent/ListingCard";
import Header from "@/components/Header"


export default function Component() {
    const { email } = useParams();
    //email is received as one of the parameters of the url
    //write a query to retrieve users info and listing
    //also write a query to push the changes when the user presses 'save'

  return (
    <div className={`${poppins.className}`}>
<Header/>
        <div className="flex flex-col items-center bg-gray-200">
    <Card className="w-full max-w-7xl mt-8 mb-8 shadow-md">
      <CardHeader>
        <CardTitle className="text-3xl">User Profile</CardTitle>
        <CardDescription className="text-xl">View and edit your profile</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <div className="flex items-center gap-6">
            <div className="relative w-20 h-20">
                <Image
                    alt="Profile picture"
                    className="rounded-full object-cover"
                    height={96}
                    src="/agent.jpeg"
                    layout="responsive"
                    objectFit="cover"
                    width={96}
                />
            </div>
            <div className="grid gap-1.5">
                <div className="font-bold text-lg md:text-2xl leading-none">Alice Smith</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Broker</div>
            </div>
        </div>
        <div>
          <form className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1.5">
              <Label className="text-xl" htmlFor="name">
                Name
              </Label>
              <Input defaultValue="Alice Smith" id="name"  className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xl" htmlFor="username">
                Username
              </Label>
              <Input id="username" placeholder="Username" className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xl" htmlFor="email">
                Email
              </Label>
              <Input id="email" placeholder="Email" type="email" className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xl" htmlFor="dob">
                Date of Birth
              </Label>
              <Input id="dob" type="date" className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="brokerId">
                Broker ID
              </Label>
              <Input id="brokerId" placeholder="Broker ID" className="text-lg"/>
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <Button size="sm">Save</Button>
          <Button size="sm" variant="outline">
            Cancel
          </Button>
        </div>
      </CardContent>
      <h3 className="text-3xl font-semibold px-10 py-5">Listed Properties</h3>
      <div className="flex flex-wrap gap-6">
<ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />
         

         <ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />

<ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />

<ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />

<ListingCard
        address="123 Main St, Sunnyvale, CA"
        price="$750,000"
        bedrooms="3"
        bathrooms="2"
        transactionType="Buy"
        date="June 12, 2023"
        stars={3}
        review="Excellent service and expertise!"
        image="/home-bg.jpeg"
        />
        

  </div>
    </Card>
    </div>
    <Footer />
    </div>
  )
}


