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
import { useParams } from 'react-router-dom';
import Image from 'next/image';

export default function Component() {
    const { email } = useParams();
    //email is received as one of the parameters of the url
    //write a query to retrieve users info and listing
    //also write a query to push the changes when the user presses 'save'

  return (
    <div className={`${poppins.className}`}>
            <div className='flex items-center justify-center shadow-sm'>
                <img src="/speety_logo.png" alt="logo" />
            </div>
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
                <h2 className="font-bold text-lg md:text-2xl leading-none">Alice Smith</h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">Broker</p>
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
      <CardContent className="grid gap-6">
        <h3 className="text-3xl font-semibold">Listed Properties</h3>
        <ul className="grid gap-4 text-2xl">
        <li className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
            <div className="flex flex-row">
            <div>
            <Image
                alt="Profile picture"
                className="rounded-full object-cover"
                height={96}
                src="/home.png"
                layout="responsive"
                objectFit="cover"
                width={96}
            />
                </div>
                <div className="mt-4 ml-6">
                <h4 className="font-semibold">123 Main St</h4>
                <p className="text-xl">Beds: 3, Baths: 2, Status: Sold</p>
                </div>
            </div>
        </li>
        <li className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
            <div className="flex flex-row">
            <div>
            <Image
                alt="Profile picture"
                className="rounded-full object-cover"
                height={96}
                src="/home.png"
                layout="responsive"
                objectFit="cover"
                width={96}
            />
                </div>
                <div className="mt-4 ml-6">
                <h4 className="font-semibold">456 Main St</h4>
                <p className="text-xl">Beds: 3, Baths: 2, Status: Sold</p>
                </div>
            </div>
        </li>
        <li className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
            <div className="flex flex-row">
            <div>
            <Image
                alt="Profile picture"
                className="rounded-full object-cover"
                height={96}
                src="/home.png"
                layout="responsive"
                objectFit="cover"
                width={96}
            />
                </div>
                <div className="mt-4 ml-6">
                <h4 className="font-semibold">789 Main St</h4>
                <p className="text-xl">Beds: 3, Baths: 2, Status: Sold</p>
                </div>
            </div>
        </li>
        </ul>
      </CardContent>
    </Card>
    </div>
    <Footer />
    </div>
  )
}


