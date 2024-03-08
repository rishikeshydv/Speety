"use client";
import Login from "@/firebase/auth/login";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { auth, db } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, query, where, getDocs } from "firebase/firestore";
import poppins from "@/font/font";
import Typist from "react-typist-component";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillYahoo } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa6";
import Image from "next/image";


export default function SignInPage() {
  const router = useRouter();
  var [user] = useAuthState(auth);
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  useEffect(() => {
    const loginStatus = document.getElementById("login_status");
    const loginButton = document.getElementById("loginButton");
    loginButton?.addEventListener("click", onSubmitFunction)
    //upon clicking on login, we check if such a customer exist
    async function onSubmitFunction() {
      if (email === "" || password === "") {
        if (loginStatus) {
          loginStatus.innerText = "Please enter email and password";
        }
        return;
      }
      else {
      const docRef = collection(db, "User_Info");
      const q = query(docRef, where("email", "==", email));
      const docSnap = await getDocs(q);
      if (docSnap.empty) {
        if (loginStatus) {
          loginStatus.innerText = "No such user exists! Please sign up.";
          setEmail("");
          setPassword("");  
        }

        return;
      } else {
        docSnap.forEach(async (doc) => {
          await Login(email, password);
          console.log(user?.email);
          //upon login, route to the dashboard
          //right now, i am just routing to the home page becuase the dashbard is not ready
          router.push("/");
  
        });
      }

      }
    }
  }, [email, password, router]);

  return (
    <div className={poppins.className}>
      <div className="flex">
        <div className={`bg-gray-800 h-screen w-1/2 flex items-center`}>
          {/* This div is for the left side of the page */}
          <h1 className="text-9xl text-white px-16 text-center font-bold">
            <Typist>Your trusted partner in wealth creation.</Typist>
            {/* Your trusted partner in wealth creation. */}
          </h1>
        </div>

        <div className="h-screen w-1/2 flex flex-col items-center justify-center">
          {/* This div is for the right side of the page */}
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
            {/* This is for the horizontal line */}
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
              className="rounded-md bg-gray-200 h-16 w-96 px-4 text-2xl"
              value={email}
              onChange={emailOnChange}
            />
            <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              required
              className="rounded-md bg-gray-200 h-16 w-96 px-4 text-2xl"
              value={password}
              onChange={passwordOnChange}
            />
            <a href="#" className="mt-1 text-blue-700">
              Forgot Password?
            </a>
            <p id="login_status" className="py-3"></p>
            <button
              id="loginButton"
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
        </div>
      </div>
    </div>
  );
}
