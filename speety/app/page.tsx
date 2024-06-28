"use client"

import Sec1 from "@/components/homepage/Sec1";
import Sec2 from "@/components/homepage/Sec2";
import Sec3 from "@/components/homepage/Sec3";
import Sec4 from "@/components/homepage/Sec4";
import Sec5 from "@/components/homepage/Sec5";
import Sec6 from "@/components/homepage/Sec6";
import Sec7 from "@/components/Footer";
import poppins from "@/font/font";

import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home() {
  const [user] = useAuthState(auth);
  console.log(user?.email);
  return (
    <div className={poppins.className}>
      <Sec1 />
      <Sec2 />
      <Sec3 />
      <Sec5 />
      <Sec6 />
      <Sec7 />
    </div>
  );
}
