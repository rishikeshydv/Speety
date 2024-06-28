"use client"

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDoc,doc, updateDoc } from "firebase/firestore";
import poppins from "@/font/font";
import Typist from "react-typist-component";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillYahoo } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa6";
import Image from "next/image";
import updateStatus from "@/queries/changeLoginStatus";
import Login from "@/firebase/auth/login";
import PasswordReset from "@/components/ResetThankYou";
import {sendPasswordResetEmail } from "firebase/auth";
import ResetEmail from "@/components/ResetEmail";
interface SignInData {
  email: string;
  password: string;
}
export default function SignInPage() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [err, setErr] = useState<string>("");
  const [reset, setReset] = useState<boolean>(false);
  const [resetDone, setResetDone] = useState<boolean>(false);
  
  const { register, handleSubmit,formState: { errors } } = useForm<SignInData>();


  const onSubmit:SubmitHandler<any> = async (data) => {
    const { email, password } = data;

    try {
      if (email === "" || password === "") {
        throw new Error("Please enter email and password");
        console.log("Please enter email and password");
      }

      const receiverRef = collection(db, "User_Info");
      const receiverDocRef =  doc(receiverRef, email);
      const receiverSnapshot = await getDoc(receiverDocRef);

      if(!receiverSnapshot.exists()){
        throw new Error("User does not exist");
//        alert("User does not exist");
      }
      await Login(email,password).then(() => {
        if (email){
            updateStatus(email,"Online");
        }
        router.push(`/dashboard/${email}`);
        });

     

    } catch (error) {
      alert("Invalid email or password");

    }
  };

  //logic to create a session timeout
  // a user can login upto 1 hour only
//   auth.onAuthStateChanged((user) => {
//     let sessionTimeout = null;
//     if (user===null) {
//     // User is logged out.
//     // Clear the session timeout.
//     sessionTimeout && clearTimeout(sessionTimeout);
//     sessionTimeout = null;
//   }
//   else{
//     // User is logged in.
//     // Set the session timeout for 1 hour
//     user.getIdTokenResult().then((idTokenResult) => {
//     const authTime = Number(idTokenResult.claims.auth_time) * 1000;
//     const sessionDuration = 30000;
//     const millisecondsUntilExpiration = authTime + sessionDuration - Date.now();
//     sessionTimeout = setTimeout(() => {
//       auth.signOut();
//     }, millisecondsUntilExpiration);
//   })
// }
//  });
  return (
    <div className={poppins.className}>
      <div className="flex">
        <div className={`bg-gray-800 h-screen w-1/2 hidden md:block`}>
          <img src="/loginFamily.jpg" alt="alt" className="md:w-full md:h-full lg:w-auto lg:h-auto"/>
        </div>
        {
          reset && <ResetEmail setReset={setReset} setResetDone={setResetDone}/>
        }
        {
          resetDone && <PasswordReset/>
        }

        <div className="h-screen w-1/2 flex flex-col items-center justify-center ml-20 md:ml-0">
          <Image
            src="/speety_logo.png"
            alt="Speety Logo"
            width={180}
            height={130}
            className="py-4"
          />
          <h1 className="text-md text-black">
            <Typist> Begin the journey with us ...</Typist>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col items-center">
            <button className="bg-[#397367] rounded-xl w-72 h-10 mt-2 text-lg font-bold">
              <div className="flex flex-row items-center">
                <AiFillGoogleCircle className="w-8 h-8 ml-3 text-white" />
                <p className="ml-5 text-white">Continue with Google</p>
              </div>
            </button>
            <button className="bg-[#397367] rounded-xl w-72 h-10 mt-2 text-lg font-bold">
              <div className="flex flex-row items-center">
                <AiFillYahoo className="w-8 h-8 ml-4 text-white" />
                <p className="ml-4 text-white">Continue with Yahoo</p>
              </div>
            </button>
            <button className="bg-[#397367] rounded-xl w-72 h-10 mt-2 text-lg font-bold">
              <div className="flex flex-row items-center">
                <FaMicrosoft className="w-6 h-6 ml-4 text-white" />
                <p className="ml-5 text-white">Continue with Microsoft</p>
              </div>
            </button>
            <div className="flex flex-row gap-2 items-center">
              <hr className="mt-7 border-gray-400 border-1 flex-grow w-24" />
              <p className="text-gray-500 text-md mt-6 ">Or Continue with</p>
              <hr className="border-1 border-gray-400 mt-7 flex-grow w-24" />
            </div>
            <div className="flex flex-col">
              <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800">
                Email
              </label>
              <input
                type="text"
                required
                {...register("email")}
                className="rounded-md bg-gray-200 md:h-10 md:w-96 px-4 text-sm"
              />
              {errors.email && <p className="text-red-500">Email is required.</p>}
              <label className="block uppercase tracking-wide text-sm font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                required
                {...register("password")}
                className="rounded-md bg-gray-200 md:h-10 md:w-96 px-4 text-sm"
              />

              {errors.password && <p className="text-red-500">Password is required.</p>}
              <h1 className="mt-1 text-[#397367] text-sm font-bold" onClick={()=>setReset(true)}>
                Forgot Password?
              </h1>
              <p id="error_msg" className="text-md text-red-400 font-semibold">{err}</p>
              <button
              type="submit"
                className="bg-[#397367] text-white mt-2 rounded-md md:h-10 md:w-96 font-bold text-md"
              >
                Continue
              </button>
              <h3 className="mt-2 text-center text-md">
                Don&apos;t have an account yet?{" "}
                <a href="/auth/signup" className="text-[#397367] font-bold tracking-tight underline">
                  Sign up!
                </a>
              </h3>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
