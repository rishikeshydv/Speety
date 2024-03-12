/**
 * v0 by Vercel.
 * @see https://v0.dev/t/PU4BC928Dha
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import poppins from "@/font/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export default function Component() {
  return (
    <div className={poppins.className}>
        <Header />
    <Card>
      <CardHeader className="pb-0">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-3">
            <Avatar className="w-24 h-24">
              <img
                alt="Avatar"
                className="rounded-full"
                height="100"
                src="/placeholder.svg"
                style={{
                  aspectRatio: "100/100",
                  objectFit: "cover",
                }}
                width="100"
              />
            </Avatar>
            <div className="space-y-1">
              <h2 className="text-xl font-bold">Evelyn Adams</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">Real Estate Broker</p>
            </div>
          </div>
          <Button size="sm" variant="outline">
            Message
          </Button>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="grid gap-2">
          <div className="space-y-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">Phone</h3>
            <p className="text-sm">+1 (123) 456-7890</p>
          </div>
          <div className="space-y-2">
            <h3 className="text-sm font-semibold tracking-wide uppercase text-gray-500 dark:text-gray-400">Email</h3>
            <p className="text-sm">evelyn@example.com</p>
          </div>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-800" />
        <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-400">
          <p>
            Evelyn Adams is a dedicated real estate broker with over a decade of experience in helping clients find
            their perfect homes. Her commitment to excellence and in-depth knowledge of the housing market have made her
            a trusted advisor for both buyers and sellers.
          </p>
        </div>
        <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-400">
          <h3 className="font-semibold">Recent Transactions</h3>
          <div className="grid gap-2">
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <HomeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="font-semibold">Sunnyvale Condo</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">June 12, 2023</div>
                <div className="font-semibold">Buy</div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Excellent service and expertise!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">5 stars - June 23, 2023</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <HomeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="font-semibold">Parkside Villa</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">August 5, 2023</div>
                <div className="font-semibold">Sell</div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Highly recommended for first-time buyers</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">4 stars - August 10, 2023</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <HomeIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="font-semibold">Tranquil Acres</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">March 21, 2023</div>
                <div className="font-semibold">Buy</div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Smooth selling process</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">5 stars - March 30, 2023</p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-400">
          <h3 className="font-semibold">Customer Reviews</h3>
          <div className="grid gap-4">
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <StarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="font-semibold">Evelyn Adams</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">5 stars</div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Excellent service and expertise!</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">June 23, 2023</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <StarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="font-semibold">John Doe</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">4 stars</div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Highly recommended for first-time buyers</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">August 10, 2023</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="flex items-center gap-2">
                <StarIcon className="w-4 h-4 text-gray-500 dark:text-gray-400" />
                <div className="font-semibold">Jane Smith</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">5 stars</div>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">Smooth selling process</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">March 30, 2023</p>
            </div>
          </div>
        </div>
        <div className="mt-4 space-y-4 text-sm text-gray-500 dark:text-gray-400">
          <h3 className="font-semibold">Present Listing</h3>
          <div className="grid gap-4">
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Property</div>
                <div className="font-semibold">Status</div>
                <div className="font-semibold">Price</div>
                <div>Sunnyvale Condo</div>
                <div>2 beds / 2 baths</div>
                <div>$500,000</div>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Property</div>
                <div className="font-semibold">Status</div>
                <div className="font-semibold">Price</div>
                <div>Parkside Villa</div>
                <div>3 beds / 2 baths</div>
                <div>$750,000</div>
              </div>
            </div>
            <div className="p-4 bg-white dark:bg-gray-950 rounded-lg shadow-md">
              <div className="grid grid-cols-3 gap-2">
                <div className="font-semibold">Property</div>
                <div className="font-semibold">Status</div>
                <div className="font-semibold">Price</div>
                <div>Tranquil Acres</div>
                <div>4 beds / 3 baths</div>
                <div>$1,200,000</div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
    <Footer />
    </div>
  )
}

interface HomeIconProps {
    className?: string;
    width?: number;
    height?: number;
}

function HomeIcon(props: HomeIconProps) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
        </svg>
    )
}


interface StarIconProps {
    className?: string;
    width?: number;
    height?: number;
}

function StarIcon(props: StarIconProps): JSX.Element {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width={props.width || 24}
            height={props.height || 24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}
