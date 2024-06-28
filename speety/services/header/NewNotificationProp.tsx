/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QuFIIA2RWto
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Button } from "@/components/ui/button";
import poppins from "@/font/font";
import getUserProfile from "@/queries/getUserProfile"
import { useState,useEffect } from "react"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';
import DeleteNotification from "@/queries/Notifications/DeleteNotification";
import { collection,doc, getDoc, setDoc, updateDoc} from "firebase/firestore"; 
import { db } from "@/firebase/config";

interface NotificationProps {
id:string
type:string
from:string
date:string
selfName:string
}

// Define the structure for a single message
interface messagesExchanged {
  date: string;
  msg: string;
  type: string;
}

// Define the structure for the connected history
interface ConnectedHistory {
  [key: string]: {
  name: string;
  messagesExchanged: messagesExchanged[];
  }
  
}
const NewNotificationProp:React.FC<NotificationProps> = ({id,type,from,date,selfName}) => {
  const [user] = useAuthState(auth);
  console.log(user?.displayName)
  const router = useRouter();

  //retrieve profilePic and name of the user
  const [userProfile, setUserProfile] = useState<any>({});
  useEffect(() => {
    getUserProfile(from).then((userProfile: any) => {
      setUserProfile(userProfile);
    });
  }
  , []);

  async function addConnection(senderEmail:string, receiverEmail:string){
    // const data:Map<string,any> = new Map();
    // data.set(receiverEmail.slice(0,receiverEmail.indexOf(".")),{});
    //getting the agent's name
    const nameRef = doc(db,"User_Info",receiverEmail);
    const nameSnapshot = await getDoc(nameRef);
    if (!nameSnapshot.exists()) {
      console.log('No such document!');
    }
    const receiverName = nameSnapshot.data()?.name;
    //defining an  data object for the sender connection
    const senderData:ConnectedHistory = {
      [`${receiverEmail.slice(0,receiverEmail.indexOf("."))}`]:{
        name:receiverName,
        messagesExchanged:[]
      }
    }
    const docRef1 = doc(db, "connectedHistory", senderEmail);
    const docSnap1 = await getDoc(docRef1);
    if (docSnap1.exists()) {
      await updateDoc(docRef1,
        senderData)
    } else {
      await setDoc(docRef1,
        senderData)

  //defining an  data object for the receiver connection
      const receiverData:ConnectedHistory = {
        [`${senderEmail.slice(0,senderEmail.indexOf("."))}`]:{
          name:selfName,
          messagesExchanged:[]
        }
      }
      const docRef2 = doc(db, "connectedHistory", receiverEmail);
      const docSnap2 = await getDoc(docRef2);
      if (docSnap2.exists()) {
        await updateDoc(docRef2,
          receiverData)
      } else {
        await setDoc(docRef2,
          receiverData)
      }
  }
}

    return (
      <div className="group flex flex-col gap-4 w-full border bg-blue-100 border-gray-200 rounded-lg dark:border-gray-800">
      <div className="flex items-start p-4">
        <div className="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarImage alt="@shadcn" src={userProfile.profilePic} />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold">{userProfile.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Sent you a friend request</div>
          </div>
        </div>
        <div className="ml-2 flex gap-2">
          <Button variant="outline" size="sm" onClick={async()=>{
            await addConnection(user?.email as string,from as string);
            await DeleteNotification(id,user?.email as string);
            router.push(`/chat`);
          }}>Accept</Button>
          <Button variant="ghost" size="sm" onClick={()=>{
            DeleteNotification(id,user?.email as string);
          }}>Decline</Button>
        </div>
      </div>
    </div>
    )
  }
  export default NewNotificationProp;
  