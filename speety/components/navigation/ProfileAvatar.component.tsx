import { auth } from "@/firebase/config";
import React, { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import getUserProfile from "@/queries/getUserProfile";
import { IoMdNotifications, IoIosChatboxes } from "react-icons/io";
import { FaCalendarAlt } from "react-icons/fa";
import updateStatus from "@/queries/changeLoginStatus";
import logout from "@/firebase/auth/logout";
import { useRouter } from "next/navigation";
import { IoLogOutSharp } from "react-icons/io5";
import Link from "next/link";
import { RxAvatar } from "react-icons/rx";

  

export const ProfileAvatar = () => {
  const [user] = useAuthState(auth);
  const [userPic, setUserPic] = useState("");
  const [userName, setUserName] = useState("");

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (state: boolean) => setIsMenuOpen(state);

  // set user profile picture
  React.useEffect(() => {
    if (user && user.email) {
      getUserProfile(user?.email as string).then((userProfile: any) => {
        setUserPic(userProfile.profilePic);
        setUserName(userProfile.name);
      });
    }
  }, [user]);

  const router = useRouter();

  const logoutUser = async () => {
    updateStatus(user?.email as string, "Offline").then(() => {
      logout();
      router.push("/auth/login");
    });
  };
  return (
    <div>
      {user && (
        <>
          <DropdownMenu open={isMenuOpen} onOpenChange={toggleMenu}>
            <DropdownMenuTrigger>
              <Avatar className="outline-none shadow-lg border-2 border-gray-500 h-[40px] w-[40px]">
                <AvatarImage src={userPic} alt="User avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>{userName}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="py-3 px-2">
                <Link
                  href={"/dashboard/"+user.email}
                  className="flex items-center gap-x-3"
                >
                  <RxAvatar size={20} />
                  <span className="text-[15px]">View Profile</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-3 px-2">
                <Link
                  href={"/chat"}
                  className="flex items-center gap-x-3"
                >
                  <IoIosChatboxes size={20} />
                  <span className="text-[15px]">Chat</span>
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex items-center py-3 px-2 gap-x-3">
                <FaCalendarAlt size={20} />
                <span className="text-[15px]">Appointments</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                className="flex items-center py-3 px-2 gap-x-3"
                onClick={logoutUser}
              >
                <IoLogOutSharp size={20} />
                <span className="text-[15px]">Logout</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};
