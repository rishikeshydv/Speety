"use client"

import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDoc,doc } from "firebase/firestore";
import poppins from "@/font/font";
import Typist from "react-typist-component";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillYahoo } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa6";
import Image from "next/image";
import Login from "@/firebase/auth/Login";
import { set } from "firebase/database";

interface SignInData {
  email: string;
  password: string;
}

export default function SignInPage() {
  const router = useRouter();
  const [user] = useAuthState(auth);
  const [err, setErr] = useState<string>("");

  const { register, handleSubmit,formState: { errors } } = useForm<SignInData>();

  const onSubmit:SubmitHandler<SignInData> = async (data) => {
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
        console.log("User does not exist!");
        setErr("User does not exist!");
        throw new Error("User does not exist");
      }
        Login(email,password).then(() => {
          router.push(`/dashboard/${email}`);
        });
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <div className={poppins.className}>
      <div className="flex">
        <div className={`bg-gray-800 h-screen w-1/2 flex items-center`}>
          <h1 className="text-9xl text-white px-16 text-center font-bold">
            <Typist>Your trusted partner in wealth creation.</Typist>
          </h1>
        </div>

        <div className="h-screen w-1/2 flex flex-col items-center justify-center">
          <Image
            src="/speety_logo.png"
            alt="Speety Logo"
            width={250}
            height={130}
            className="py-10"
          />
          <h1 className="text-xl text-gray-400">
            <Typist> Begin the journey with us ...</Typist>
          </h1>
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <button className="bg-gray-300 rounded-xl w-96 h-16 mt-8 text-2xl font-bold">
              <div className="flex flex-row items-center px-5">
                <AiFillGoogleCircle className="w-12 h-12" />
                <p className="ml-5">Continue with Google</p>
              </div>
            </button>
            <button className="bg-gray-300 rounded-xl w-96 h-16 mt-2 text-2xl font-bold">
              <div className="flex flex-row items-center px-5">
                <AiFillYahoo className="w-16 h-16" />
                <p className="ml-2">Continue with Yahoo</p>
              </div>
            </button>
            <button className="bg-gray-300 rounded-xl w-96 h-16 mt-2 text-2xl font-bold">
              <div className="flex flex-row items-center px-5">
                <FaMicrosoft className="w-10 h-10" />
                <p className="ml-2">Continue with Microsoft</p>
              </div>
            </button>
            <div className="flex flex-row gap-2 items-center">
              <hr className="mt-7 border-gray-400 border-2 flex-grow w-24" />
              <p className="text-gray-500 text-xl mt-6 ">Or Continue with</p>
              <hr className="border-2 border-gray-400 mt-7 flex-grow w-24" />
            </div>
            <div className="flex flex-col">
              <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
                Email
              </label>
              <input
                type="text"
                required
                {...register("email")}
                className="rounded-md bg-gray-200 h-16 w-96 px-4 text-2xl"
              />
              {errors.email && <p className="text-red-500">Email is required.</p>}
              <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
                Password
              </label>
              <input
                type="password"
                required
                {...register("password")}
                className="rounded-md bg-gray-200 h-16 w-96 px-4 text-2xl"
              />
              {errors.password && <p className="text-red-500">Password is required.</p>}
              <a href="#" className="mt-1 text-blue-700">
                Forgot Password?
              </a>
              <p id="error_msg" className="text-md text-red-400 font-semibold">{err}</p>
              <button
              type="submit"
                className="bg-gray-900 text-white mt-2 rounded-md h-12 w-96 font-bold text-xl"
              >
                Continue
              </button>
              <h3 className="mt-2 text-center text-xl">
                Don&apos;t have an account yet?{" "}
                <a href="/auth/signup" className="text-blue-600">
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
