/**
 * This code was generated by v0 by Vercel.
 * @see https://v0.dev/t/B2aerZGlup6
 */
"use client"
import React, { useState, useEffect } from 'react';
import { CardTitle, CardDescription, CardHeader, CardContent, CardFooter, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { SelectValue, SelectTrigger, SelectItem, SelectContent, Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { collection, addDoc, updateDoc } from "firebase/firestore"; 
import { db } from "@/firebase/config";
import poppins from "@/font/font";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import getImageUrl from '@/queries/ImgVidUrls/getImageUrl';
import getVideoUrl from '@/queries/ImgVidUrls/getVideoUrl';
import { setDoc,getDoc,doc} from "firebase/firestore"; 
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { uuidv4 } from "@firebase/util";  
import { useRouter } from 'next/navigation';
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import axios from 'axios';


export default function PropertyPost() {
  const router = useRouter();
  const [price, setPrice] = useState('');
  const [beds, setBeds] = useState('');
  const [baths, setBaths] = useState('');
  const [houseType, setHouseType] = useState('');
  const [transaction, setTransaction] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');
  const [lotSize, setLotSize] = useState('');
  const [sqft,setSqft]=useState('');
  const [listing, setListing] = useState('');
  const [brokerId, setBrokerId] = useState("");
  const [imgList,setImgList]=useState<File[]>([])
  const [imgUrlList,setImgUrlList]=useState<string []>([])
 const [vidList,setVidList]=useState<File[]>([])
 const [vidUrlList,setVidUrlList]=useState<string []>([])
 const [date, setDate] = useState("");
 const [resaleProbability, setResaleProbability] = useState(false);
 
 const [predictedPrice, setPredictedPrice] = useState(0);

 const [user] = useAuthState(auth);
 const _uniqueId = uuidv4()
//  if (!user) {
//    router.push("/auth/login");
//  }

//storing all the image files
  const handleImageChange = (event:any) => {
    const files = event.target.files; // Get the selected files
    if (!files) return;
    // Loop through the selected files and add them to the newFiles array
    for (let i = 0; i < files.length; i++) {
      imgList.push(files[i]);
    }
    // Update the state with the newFiles array
    setImgList(imgList);
  };

  //storing all the video files
  const handleVideoChange = (event:any) => { 
    const files = event.target.files; // Get the selected files
    if (!files) return;
    // Loop through the selected files and add them to the newFiles array
    for (let i = 0; i < files.length; i++) {
      vidList.push(files[i]);
    }
    // Update the state with the newFiles array
    setVidList(vidList);
  }

  //create image URL list

  const imageUrlListCreator = (imageList:any) => {    
    if (!imageList){
      return;
    }

    return new Promise((resolve, reject) => {
      for (let i = 0; i < imageList.length; i++) {
        getImageUrl(imageList[i])
          .then((downloadURL) => {
            imgUrlList.push(downloadURL.toString());
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
   }
    ); 
  }

//create video URL list

  const videoUrlListCreator = (videoList:any) => {
    if (!videoList){
      return;
    }
    return new Promise((resolve, reject) => {
      for (let i = 0; i < videoList.length; i++) {
        getVideoUrl(videoList[i])
          .then((downloadURL) => {
            vidUrlList.push(downloadURL.toString());
            resolve(downloadURL);
          })
          .catch((error) => {
            reject(error);
          });
      }
    }
  )}


  async function postDB() {
      //here we do the resale probability test
      //now we hit the price predict ML Model to get the price trend of the property
    const requestData = {
      "bed": [parseInt(beds as string)],
      "bath": [parseInt(baths as string)],
      "acre_lot": [parseFloat(lotSize as string)],
      "street": [893593.0],
      "city": [city as string],
      "state": [state as string],
      "house_size": [parseInt(sqft as string)],
      "zip_code": [parseInt(zip as string)],
    }
    const res = await axios.post('http://127.0.0.1:8080/api/v1/predict-price',requestData);
    setPredictedPrice(res.data.price);

    //logic for resale probability
    if (Math.abs(parseInt(price)-predictedPrice) > 80000) {
      setResaleProbability(true);
    }

    //storing the property details in the database in the 'volatileProperties' collection
    const volatileRef = doc(db, "volatileProperties",state);
    const volatileSnapshot = await getDoc(volatileRef);
    if(!volatileSnapshot.exists()){
      await setDoc( volatileRef, {
          // If the document doesn't exist, create a new one
          //each property to have a unique id
          //so when we have to assign a property to an agent, we can just assign him the unique id
          //instead of the whole property details
          //this makes it easy while querying
        [`${_uniqueId}`]: {
        price: price,
        beds: beds,
        baths: baths,
        houseType: houseType,
        transactionType: transaction,
        address: address,
        apartment: apartment,
        city: city,
        state: state,
        zip: zip,
        listedBy: listing,
        brokerId:brokerId,
        imageUrl: imgUrlList,
        videoUrl:vidUrlList,
        date:date,
        resaleProbability:resaleProbability
        }
        });
    }
    else{
      await updateDoc( volatileRef, {
        // If the document already exists, update it
        [`${_uniqueId}`]: {
        price: price,
        beds: beds,
        baths: baths,
        houseType: houseType,
        transactionType: transaction,
        address: address,
        apartment: apartment,
        city: city,
        state: state,
        zip: zip,
        listedBy: listing,
        brokerId:brokerId,
        imageUrl: imgUrlList,
        videoUrl:vidUrlList,
        date:date,
        resaleProbability:resaleProbability
        }
        });
    }


        const receiverRef = collection(db, "presentListings");
        const receiverDocRef =  doc(receiverRef, user?.email as string);
        const receiverSnapshot = await getDoc(receiverDocRef);
        if(!receiverSnapshot.exists()){
          await setDoc( receiverDocRef, {
              // If the document doesn't exist, create a new one
              //each property to have a unique id
              //so when we have to assign a property to an agent, we can just assign him the unique id
              //instead of the whole property details
              //this makes it easy while querying
            [`${_uniqueId}`]: {
            price: price,
            beds: beds,
            baths: baths,
            houseType: houseType,
            transactionType: transaction,
            address: address,
            apartment: apartment,
            city: city,
            state: state,
            zip: zip,
            listedBy: listing,
            brokerId:brokerId,
            imageUrl: imgUrlList,
            videoUrl:vidUrlList,
            date:date,
            resaleProbability:resaleProbability
            } 
            });
          router.push('/post/successful');
        }
        else{
          await updateDoc( receiverDocRef, {
            // If the document already exists, update it
            [`${_uniqueId}`]: {
            price: price,
            beds: beds,
            baths: baths,
            houseType: houseType,
            transactionType: transaction,
            address: address,
            apartment: apartment,
            city: city,
            state: state,
            zip: zip,
            listedBy: listing,
            brokerId:brokerId,
            imageUrl: imgUrlList,
            videoUrl:vidUrlList
            }
            });
            router.push('/post/successful');
        }
        console.log("Document written with ID: ", receiverDocRef.id);
    }

    //handling terms and condition
    const [isOpen, setIsOpen] = useState(false)
    const [agreed, setAgreed] = useState(false)
    const handleAgree = () => {
      setAgreed(true)
      setIsOpen(false)
    }
    const handleDecline = () => {
      setIsOpen(false)
      alert("You must agree to the terms and conditions to continue.")
    }

  return (
    <div className={poppins.className}>
      <Header />
      <section className="flex items-center justify-center gap-6 md:gap-20">
<div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-20 px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
<div className="flex-1 space-y-4 max-w-xl">
<div className="text-3xl font-bold sm:text-4xl md:text-7xl text-gray-400">Post your home<h1 className="text-[#397367] text-3xl font-bold sm:text-4xl md:text-7xl">yourself</h1></div>
<p className="text-muted-foreground md:text-lg tracking-tight">
Selling a property is a big decision. We are here to help you make the right choice.
  Our website provides you with the best options for selling your home. We have a wide range of properties.
  We help you find the best property that suits your needs. We provide you with the best experience in selling your home.
</p>
</div>
<video className="flex-1 max-w-[500px] h-full overflow-hidden [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.300/.48)_80%,_theme(colors.green.500)_86%,_theme(colors.green.300)_90%,_theme(colors.green.500)_94%,_theme(colors.green.600/.48))_border-box] rounded-2xl border-4 border-transparent animate-border" autoPlay muted playsInline>
          <source src="/vids/2.mp4" />
        </video>
</div>

</section>
<img src="/adobe/7.jpeg" alt="bg" className='h-[1200px] object-cover'/>
<div className='py-10 px-20 bg-gray-200'>
    <Card className='absolute top-[760px] left-20 right-20 flex flex-col items-center justify-center bg-gray-200 bg-opacity-85 shadow-sm rounded-2xl overflow-auto'>
      <CardHeader>
        <CardTitle className='text-2xl md:text-5xl'>Property information</CardTitle>
        <CardDescription className="text-md">Enter the details of the property you&apos;re listing.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="price" className='text-md'>Price</Label>
            <Input id="price" className='text-sm border-2' placeholder="$" type="number" value={price} onChange={(e) => setPrice(e.target.value)}/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="beds" className='text-md'>Beds</Label>
            <Input id="beds" className='text-sm border-2' placeholder="Beds" type="number" value={beds} onChange={(e) => setBeds(e.target.value)}/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="baths" className='text-md'>Baths</Label>
            <Input id="baths" placeholder="Baths" className='text-sm border-2' type="number" value={baths} onChange={(e) => setBaths(e.target.value)}/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="type" className='text-md'>Type</Label>
            <Select  onValueChange={(value) => setHouseType(value)}>
              <SelectTrigger id="type" className='text-sm border-2'>
                <SelectValue placeholder="Select"/>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Houses" >Houses</SelectItem>
                <SelectItem value="Apartments" >Apartments</SelectItem>
                <SelectItem value="Townhouses" >Townhomes</SelectItem>
                <SelectItem value="Condos/Co-ops" >Condos/Co-ops</SelectItem>
                <SelectItem value="Multi-family" >Multi-family</SelectItem>
                <SelectItem value="Lots/Land" >Lots/Land</SelectItem>
                <SelectItem value="Manufactured" >Manufactured</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="transaction" className='text-md'>Transaction</Label>
            <Select onValueChange={(value) => setTransaction(value)}
            >
              <SelectTrigger id="transaction" className='text-sm border-2'>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
              <SelectItem value="Buy">For Buy</SelectItem>
                <SelectItem value="Rent">For Rent</SelectItem>
                <SelectItem value="Sell">For Sale</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="address" className='text-md'>Address</Label>
          <Input id="address" placeholder="123 Main St" className='text-sm border-2' value={address} onChange={(e) => setAddress(e.target.value)}/>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="apartment" className='text-md'>Apartment, suite, etc.</Label>
          <Input id="apartment" className='text-sm border-2' placeholder="Apartment, suite, etc." value={apartment} onChange={(e) => setApartment(e.target.value)}/>
        </div>
        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="city" className='text-md'>City</Label>
            <Input id="city" className='text-sm border-2' placeholder="City" value={city} onChange={(e) => setCity(e.target.value)}/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="state" className='text-md'>State</Label>
            <Input id="state" className='text-sm border-2' placeholder="State" value={state} onChange={(e) => setState(e.target.value)}/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="zip"className='text-md'>ZIP code</Label>
            <Input id="zip" className='text-sm border-2' placeholder="ZIP code" value={zip} onChange={(e) => setZip(e.target.value)}/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="date"className='text-md'>Date</Label>
            <Input id="date" className='text-sm border-2' placeholder="YYYY-MM-DD" value={date} onChange={(e) => setDate(e.target.value)}/>
          </div>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="listing" className='text-md'>Listed by</Label>
          <Input id="listing" className='text-sm border-2' placeholder="Person or agency listing the property" value={listing} onChange={(e) => setListing(e.target.value)}/>
        </div>
        <div className="flex flex-col space-y-1.5">
          <Label htmlFor="listing" className='text-md'>Broker ID</Label>
          <Input id="listing" className='text-sm border-2' placeholder="Agent or Broker ID" value={brokerId} onChange={(e) => setBrokerId(e.target.value)}/>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="images" className='text-md'>Upload Images</Label>
            <Input accept="image/*" className='text-sm border-2' id="images" type="file" multiple 
            onChange={(e)=>
              {
                handleImageChange(e);
                imageUrlListCreator(imgList);
                }}/>
          </div>
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="videos" className='text-md'>Upload Videos</Label>
            <Input accept="video/*" className='text-sm border-2' id="videos" type="file" multiple 
            onChange={(e)=>
            {
              handleVideoChange(e);
              videoUrlListCreator(vidList);
              }}/>
          </div>
        </div>

        {/* UI for terms and conditions */}
        <Dialog open={isOpen} onOpenChange={setIsOpen} defaultOpen>
      <DialogTrigger asChild>
        <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms" onClick={() => setIsOpen(true)}>I agree to the terms and conditions</Label>
            </div>
      </DialogTrigger>
      {!agreed && (
        <DialogContent className="sm:max-w-[600px]">
          <div className="flex flex-col gap-6 p-6">
            <div className="space-y-2">
              <DialogTitle>Terms and Conditions</DialogTitle>
              <DialogDescription>
                Please read the following terms and conditions carefully before agreeing to them.
              </DialogDescription>
            </div>
            <div className="space-y-4 text-sm text-muted-foreground">
              <p>
              You must be the owner of the property or have explicit authorization from the owner to post the property on this website.
              </p>
              <p>
              You agree to provide accurate, current, and complete information about the property you are listing. You will not post false or misleading information. You are responsible for keeping your property information up to date.
              </p>
              <p>
              Scail reserves the right to remove any property listing that violates these terms and conditions or is otherwise deemed inappropriate.
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <Label htmlFor="terms">I agree to the terms and conditions</Label>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={handleDecline}>
                Decline
              </Button>
              <Button onClick={handleAgree}>Agree</Button>
            </div>
          </div>
        </DialogContent>
      )}
    </Dialog>

      </CardContent>

      <CardFooter className='flex items-center justify-center'>
        <Button size="lg" className='text-md'
         onClick={()=>{ 
          postDB();
    }
      }
        >
  
          Save</Button>
      </CardFooter>
    </Card>
</div>
    <Footer />
    </div>
  )
}
