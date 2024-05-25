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
interface NotificationProps {
  id:string
  type:string
  from:string
  date:string
  }
import NotificationSettle from '@/queries/Notifications/NotificationSettle';
import { auth} from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { useRouter } from 'next/navigation';

const OldReviewNotificationProp:React.FC<NotificationProps> = ({id,type,from,date}) => {
  const [user] = useAuthState(auth);
  const router = useRouter();

  //retrieve profilePic and name of the user
  const [userProfile, setUserProfile] = useState<any>({});
  useEffect(() => {
    getUserProfile(from).then((userProfile: any) => {
      setUserProfile(userProfile);
    });
  }
  , []);

    return (
      <div className="w-full group flex flex-col gap-4 border bg-gray-100 border-gray-200 rounded-lg dark:border-gray-800">
      <div className="flex items-start p-4">
        <div className="flex items-start gap-4 text-sm">
          <Avatar>
            <AvatarImage alt="@shadcn" src={userProfile.profilePic} />
            <AvatarFallback>JP</AvatarFallback>
          </Avatar>
          <div className="grid gap-1">
            <div className="font-semibold">{userProfile.name}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400">Posted you a profile review.</div>
          </div>
        </div>
        <div className="ml-6 flex gap-2">
          <Button variant="outline" size="sm" onClick={()=>{
            NotificationSettle(id,"old",type,user?.email as string,from,"completed",date);
            router.push(`/agent/profile/${user?.email}`);
          }}>View Review</Button>
          {/* <Button variant="ghost" size="sm">Decline</Button> */}
        </div>
      </div>
    </div>
    )
  }
  export default OldReviewNotificationProp;
  function MailOpenIcon(props:any) {
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
        <path d="M21.2 8.4c.5.38.8.97.8 1.6v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 .8-1.6l8-6a2 2 0 0 1 2.4 0l8 6Z" />
        <path d="m22 10-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 10" />
      </svg>
    )
  }
  