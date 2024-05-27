/**
 * v0 by Vercel.
 * @see https://v0.dev/t/QuFIIA2RWto
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import poppins from "@/font/font";
import getUserProfile from "@/queries/getUserProfile"
import { useState,useEffect } from "react"
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import MeetingSettle from '@/queries/Meetings/MeetingSettle';
import CancelMeetings from "@/queries/Meetings/CancelMeeting";
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation'
import DeleteMeetings from "@/queries/Meetings/DeleteMeetings";

interface MeetingProps {
from:string
date:string
id:string
}

const NewMeetingProp:React.FC<MeetingProps> = ({from,date,id}) => {
  const [user] = useAuthState(auth);
  const router = useRouter();
  //retrieve profilePic and name of the user
  const [userProfile, setUserProfile] = useState<{ name: string; profilePic: string } | null>(null);
  useEffect(() => {
    const fetchUserProfile = async () => {
      const retrievedProfile = await getUserProfile(from);
      setUserProfile(retrievedProfile);
    };

    fetchUserProfile();
  }, [from]);
    return (
      <div className="group flex flex-col w-full gap-2 border bg-blue-100 border-gray-200 rounded-lg dark:border-gray-800">
        {userProfile ? (

<div className="flex flex-1 flex-row items-center p-2 gap-2">
<Avatar className="h-8 w-8">
  <AvatarImage alt="Meeting Organizer" src={userProfile.profilePic} />
  <AvatarFallback>JD</AvatarFallback>
</Avatar>
<div className="flex flex-col"> 
  <div className="font-semibold tracking-tighter text-md">{userProfile.name}</div>
  <div className="text-xs text-gray-500 dark:text-gray-400">Scheduled a meeting</div>
</div>
<div className="ml-auto text-xs text-gray-500 dark:text-gray-400">{date}</div>
<div className="ml-2 flex gap-2">
  <Button size="sm" variant="outline" className="text-xs"
  onClick={()=>{MeetingSettle(id,user?.email as string,from,"accepted",date)}}>
    Accept
  </Button>
  <Button size="sm" variant="outline" className="text-xs"
  onClick={()=>{
    CancelMeetings(id,from,user?.email as string,"cancelled",date);
    DeleteMeetings(id,user?.email as string);
  }}
  >
    Decline
  </Button>
</div>
</div>)
: (
  <p>Loading ...</p>
)}
    </div>
    )
  }
  export default NewMeetingProp;
  