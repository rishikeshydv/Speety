/**
 * v0 by Vercel.
 * @see https://v0.dev/t/UqARte4Egfr
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import Rating from '@mui/material/Rating';
interface ListingProp {
    address: string;
    price: string;
    bedrooms: string;
    bathrooms: string;
    transactionType: string
    date: string;
    stars: number;
    review: string;
    image: string;
    }

const ListingCard:React.FC<ListingProp>=({ address,price,bedrooms,bathrooms,transactionType,date,stars,review,image})=> {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader className="p-4">
        <CardTitle className="text-2xl">{address}</CardTitle>
        <hr className="border-gray-200 dark:border-gray-800 border-2" />
        <CardDescription className="text-lg flex flex-col">
          <div className="flex items-start justify-between">
            <h1>{bedrooms} Beds, {bathrooms} Baths</h1>
            <h1 className="text-xl font-bold">{price}</h1>
            </div>
            <h1>{date}</h1></CardDescription>
        <div className="flex items-center gap-2 text-lg font-medium">
          <HomeIcon className="w-4 h-4" />
          <h1>{transactionType}</h1>
        </div>
      </CardHeader>
      <img
        alt="Property image"
        height={225}
        src={image}
        style={{
          aspectRatio: "400/225",
          objectFit: "cover",
        }}
        width={400}
      />
      <CardFooter className="flex flex-col p-4">
        <div className='ml-2'><Rating name="read-only" value={stars} readOnly /></div>
        <div className="text-lg font-medium">{review}</div>
      </CardFooter>
    </Card>
  )
}

export default ListingCard;

function HomeIcon(props:any) {
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
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function StarIcon(props:any) {
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
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}
