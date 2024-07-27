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
import { IoMdNotifications } from "react-icons/io";

export const Notifications = () => {
  const [user] = useAuthState(auth);

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = (state: boolean) => setIsMenuOpen(state);

  return (
    <div>
      {user && (
        <>
          <DropdownMenu open={isMenuOpen} onOpenChange={toggleMenu}>
            <DropdownMenuTrigger>
              <IoMdNotifications size={30} />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Notifications</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </div>
  );
};
