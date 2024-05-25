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
import { Textarea } from "@/components/ui/textarea"
import { useState,useEffect, useRef } from "react"
import { collection,getDoc,doc, setDoc, updateDoc} from "firebase/firestore"; 
import { db } from "@/firebase/config";
import moment from "moment"; //use moment.js to get time/date in a good format
import getImageUrl from "@/queries/ImgVidUrls/getImageUrl"
import { set } from "firebase/database"


interface Property {
  address: string;
  apartment: string;
  baths: string;
  beds: string;
  brokerId: string;
  city: string;
  houseType: string;
  imageUrl: string[];
  listedBy: string;
  price: string;
  state: string;
  transactionType: string;
  videoUrl: string[];
  zip: string;
}

export default function Component() {

const params = useParams();
  const paramsEmail = decodeURIComponent(params.email as string);
 //   console.log(paramsEmail);

 //state variables for user data
 const [address, setAddress] = useState("");
 const [name, setName] = useState("");
 const [brokerId, setBrokerId] = useState("");
 const [description, setDescription] = useState("");
 const [phone, setPhone] = useState("");
 const [profilePic, setProfilePic] = useState("");
 const [website, setWebsite] = useState("");
 const [role, setRole] = useState("");
 const [loginStatus, setLoginStatus] = useState("");

 //state variables for change in buttons
 const [buttonText, setButtonText] = useState("Save");
 const [buttonColor, setButtonColor] = useState("bg-gray-400");

 //for listings
 const [presentListings, setPresentListings] = useState<Property[]>([]);
 let _presentListings: Property[] = [];
 async function getPresentListings() {
  const receiverRef = collection(db, "presentListings");
  const receiverDocRef =  doc(receiverRef, paramsEmail);
  const receiverSnapshot = await getDoc(receiverDocRef);
  if (receiverSnapshot.exists()) {
    //console.log("Document data:", receiverSnapshot.data());
    const data = receiverSnapshot.data();
    const propertyKeys = Object.keys(data);
    for (let i = 0; i < propertyKeys.length; i++) {
      const propertyData = data[propertyKeys[i]];
      _presentListings.push(propertyData);
    }
    setPresentListings(_presentListings);
  } else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
  }
}

//dealing with time
const [currentTime, setCurrentTime] = useState(moment());
useEffect(() => {
  // Function to update the current time every second
  const updateCurrentTime = () => {
    setCurrentTime(moment());
  };

  // Set up an interval to update the time every second
  const intervalId = setInterval(updateCurrentTime, 1000);

  // Clean up the interval when the component unmounts
  return () => clearInterval(intervalId);
}, []);
 
 async function getUserData(){
  const receiverRef = collection(db, "User_Info");
  const receiverDocRef =  doc(receiverRef, paramsEmail);
  const receiverSnapshot = await getDoc(receiverDocRef); 
  if (receiverSnapshot.exists()) {
    const data = receiverSnapshot.data();
    setAddress(data.address);
    setName(data.name);
    setBrokerId(data.brokerId);
    setDescription(data.description);
    setPhone(data.phone);
    setProfilePic(data.profilePic);
    setWebsite(data.website);
    setRole(data.role);
    //console.log(data);
  } else {
    console.log("No such document!");
  }
}

async function updateProfile(){
  const receiverRef = collection(db, "User_Info");
  const receiverDocRef =  doc(receiverRef, paramsEmail);; 
  await setDoc(receiverDocRef,{
    address: address,
    name: name,
    brokerId: brokerId,
    description: description,
    phone: phone,
    profilePic: profilePic,
    website: website,
    role: role,
    loginStatus: loginStatus
  }) 
}

  useEffect(() => {
    getUserData();
    getPresentListings();
  }
  ,[]);

  //dealing with profile picture change
  const [newProfilePic, setNewProfilePic] =  useState<File | null>(null);
  const [newProfilePicUrl, setNewProfilePicUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [confirmText, setConfirmText] = useState("Confirm");
  const [confirmTextColor, setConfirmTextColor] = useState("bg-black");

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

    //to confirm the new profile pic
    useEffect(() => {
      if (!newProfilePic) {
        return;
      }
  
    const confirmNewProfile = () => {    
      return new Promise((resolve, reject) => {
        getImageUrl(newProfilePic as File)
        .then((driverUrl) => {
          setNewProfilePicUrl(driverUrl);
          resolve(driverUrl);
        })
        .catch((error) => {
          reject(error);
        });
      }
      ); 
    }
    confirmNewProfile();
      }, [newProfilePic]);

  async function ConfirmFunc() {
    setConfirmText("Confirmed!");
    setConfirmTextColor("bg-green-400");

    //update the profile pic in the database
    const usersCollection = doc(db, "User_Info", paramsEmail);
    const usersSnapshot = await getDoc(usersCollection);
    if (usersSnapshot.exists()) {
      await updateDoc(usersCollection, {
        profilePic: newProfilePicUrl
      });
    }
  }

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
        <div>
        <div className="flex items-center gap-6">
            <div className="relative w-20 h-20">
                <img
                    alt="Profile picture"
                    className="rounded-full object-cover"
                    height={80}
                    src={profilePic}
                    width={80}
                />
            </div>
            <div className="grid gap-1.5">
                <div className="font-bold text-lg md:text-2xl leading-none">{name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{role}</div>
            </div>
        </div>
        <div className="mt-2">
          <Button onClick={handleIconClick}>Change Profile</Button>
          {newProfilePicUrl && (
            <Button className={`confirmTextColor`} onClick={ConfirmFunc}>{confirmText}</Button>
            )}
        <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={(e) => {setNewProfilePic(e.target.files?.[0] || null);}}
      />
        </div>
        </div>
        <div>
          <form className="grid gap-4 md:grid-cols-2">
            <div className="grid gap-1.5">
              <Label className="text-xl" htmlFor="name">
                Name
              </Label>
              <Input value={name} readOnly id="name"  className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-xl" htmlFor="email">
                Email
              </Label>
              <Input id="email" readOnly value={paramsEmail} type="email" className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="brokerId">
                Broker ID
              </Label>
              <Input id="brokerId" readOnly value={brokerId} placeholder="Broker ID" className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="">
                Address
              </Label>
              <Input id="address" value={address} onChange={(e)=>{setAddress(e.target.value)}} placeholder="123 Test St..." className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="">
                Phone
              </Label>
              <Input id="phone" value={phone} onChange={(e)=>{setPhone(e.target.value)}} className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="">
                Website
              </Label>
              <Input id="website" value={website} onChange={(e)=>{setWebsite(e.target.value)}} className="text-lg"/>
            </div>
            <div className="grid gap-1.5">
              <Label className="text-lg" htmlFor="">
                My Description
              </Label>
              <Textarea id="description" value={description} onChange={(e)=>{setDescription(e.target.value)}}  className="text-lg"/>
            </div>
          </form>
        </div>
        <div className="flex items-center gap-4">
          <Button size="lg" className={`text-lg ${buttonColor}`} onClick={()=>{
            updateProfile();
            setButtonText("Updated!");
            setButtonColor("bg-green-400");
            }}>{buttonText}</Button>
        </div>
      </CardContent>
      <h3 className="text-3xl font-semibold px-10 py-5">Listed Properties</h3>
      <div className="flex flex-wrap gap-6 p-9">

        
        {presentListings && presentListings.map((property, index) => (
          <ListingCard
          key={index}
          propertyId={""}
          address={property.address}
          price={property.price}
          bedrooms={property.beds}
          bathrooms={property.baths}
          transactionType={property.transactionType}
          date={currentTime.format("MMMM DD, YYYY")}
          stars={3}
          review="Excellent service and expertise!"
          image={property.imageUrl[0]}
          />
        ))}

  </div>
    </Card>
    </div>
    <Footer />
    </div>
  )
}


