"use client"

import Sec1 from "@/components/homepage/Sec1";
import Sec2 from "@/components/homepage/Sec2";
import Sec3 from "@/components/homepage/Sec3";
import Sec4 from "@/components/homepage/Sec4";
import Sec5 from "@/components/homepage/Sec5";
import Sec6 from "@/components/homepage/Sec6";
import Sec7 from "@/components/Footer";
import poppins from "@/font/font";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Mailing from "@/components/mailingList/mailing";
import { useState } from "react";
import { setDoc, doc } from "firebase/firestore";

export default function Home() {
  const [user] = useAuthState(auth);
  const [email, setEmail] = useState("");
  console.log(user?.email);

  //function to push email to firestore
  async function EmailPush() {
    if (email){
      const docRef = doc(db, "newslettersEmails", email);
      await setDoc(docRef, {
        email: email,
      });
    }
  }
  return (
    <div className={poppins.className}>
      <Sec1 />
      <Sec2 />
      <Sec3 />
      <Sec5 />
      <Sec6 />
      <Mailing setEmail={setEmail} EmailPush={EmailPush}/>
      <Sec7 />
    </div>
  );
}
