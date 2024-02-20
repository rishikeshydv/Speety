"use client";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/firebase/config";
import { useRouter } from "next/navigation";

function NavbarLeft() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  if (user) {
    const userpod = document.createElement;
  }
  const handleClick = () => {
    if (user) {
      console.log(user.email);
      auth.signOut().then(() => {
        router.push("/");
      });
    } else {
      router.push("/auth/login");
    }
  };
  return (
    <div className="flex items-center justify-between h-1/2">
      <div className="flex">
        <ul className="flex">
          <li className="mx-10">
            <a href="/buy">Buy</a>
          </li>
          <li className="mx-10">
            <a href="/rent">Rent</a>
          </li>
          <li className="mx-10">
            <a href="/sell">Sell</a>
          </li>
          <li className="mx-10">
            <a href="/agent">Agent Finder</a>
          </li>
        </ul>
      </div>
      <div>
        <a href="/">
          <h1 className="text-6xl font-bold font-mono">Speety</h1>
        </a>
      </div>

      <div>
        <ul className="flex">
        {user && (
        <li className='mx-6'>
          <a href="/dashboard/${user.email}"><h2>Dashboard</h2></a>
        </li>
      )}

          <li className="mx-6">
            <a href="/help">Help</a>
          </li>
          <li className="mx-6">
            <button onClick={handleClick}>
              {user ? "Log Out" : "Sign In"}
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default NavbarLeft;
