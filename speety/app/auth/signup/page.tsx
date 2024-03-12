"use client";
import signup from "@/firebase/auth/signup";
import { useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection } from "firebase/firestore";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "@/firebase/config";
import poppins from "@/font/font";
import Typist from "react-typist-component";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillYahoo } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa6";
import Header from '@/components/Header';

import Image from "next/image";

export default function SignupPage() {

  var [name, setName] = useState("");
  var [email, setEmail] = useState("");
  var [password, setPassword] = useState("");
  var [confirmPassword, setConfirmPassword] = useState("");

  const router = useRouter();
  const [user] = useAuthState(auth);
  const userCollectionRef = collection(db, "User_Info");

  const emailOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const nameOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const passwordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const confirmPasswordOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConfirmPassword(event.target.value);
  };

  useEffect(() => {
    const loginStatus = document.getElementById("login_status");
    const signupButton = document.getElementById("signupButton");
    signupButton?.addEventListener("click", onRegisterFunction)

    async function onRegisterFunction() {
      //console.log(email, password, name, confirmPassword);
        if (email === "" || password === "" || name === "" || confirmPassword === "") {
          if (loginStatus) {
            loginStatus.innerText = "Please enter email and password";
            return;
          }
        }
        
        if (password !== confirmPassword) {
          // show message to user that passwords do not match
          if (loginStatus) {
            loginStatus.innerText = "Passwords do not match";
            return;
          }
        }

        try{
          await signup(email, password)
          // Store user in database
          await createUserInDB(name,email,password,"client");
          router.push("/dashboard");
        }
        catch(error){
          console.log(error);
          if (loginStatus) {
            loginStatus.innerText = "Something went wrong. Please try again later.";
            return;
          }
        }

    };

    const createUserInDB = async (
      name: string,
      email: string,
      password:string,
      role: string
    ) => {

      try {
        await addDoc(collection(db, "User_Info"), {
          name: name,
          email: email,
          password: password,
          role: role
        });
      } catch (error) {
        console.log(error);
        if (loginStatus) {
          loginStatus.innerText = "Something went wrong. Please try again later.";
        }
      }
    };
  }, [confirmPassword, email, name, password]
  );
  return (
    <div className={poppins.className}>
        <div className={`fixed bottom-32 top-32 left-1/3 right-1/3 flex flex-col items-center justify-center bg-gray-100 shadow-sm rounded-2xl`}>{/* This div is for the right side of the page */}
      <Image
            src="/speety_logo.png"
            alt="Speety Logo"
            width={250}
            height={130}
            className=""
          />
          {/* <h1 className="text-xl text-gray-400"><Typist> Begin the journey with us ...</Typist></h1> */}
        <button className="bg-gray-300 rounded-xl w-96 h-16 mt-4 text-2xl font-bold"><div className="flex flex-row items-center px-5"><AiFillGoogleCircle className="w-12 h-12"/><p className="ml-5">Continue with Google</p></div></button>
        <button className="bg-gray-300 rounded-xl w-96 h-16 mt-2 text-2xl font-bold"><div className="flex flex-row items-center px-5"><AiFillYahoo className="w-16 h-16"/><p className="ml-2">Continue with Yahoo</p></div></button>
        <button className="bg-gray-300 rounded-xl w-96 h-16 mt-2 text-2xl font-bold"><div className="flex flex-row items-center px-5"><FaMicrosoft className="w-10 h-10"/><p className="ml-2">Continue with Microsoft</p></div></button>
        <div className="flex flex-row gap-2 items-center">
            {/* This is for the horizontal line */}
            <hr className="mt-3 border-gray-400 border-2 flex-grow w-44"/>
            <p className="text-gray-500 text-xl mt-3 ">Or</p>
            <hr className="border-2 border-gray-400 mt-3 flex-grow w-44"/>
        </div>
        <div className="flex flex-col">
        <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">Email</label>
        <input type="text" required className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4" onChange={emailOnChange}/>
        <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">Name</label>
        <input type="text" required className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4" onChange={nameOnChange}/>
        <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">Password</label>
        <input type="password" required className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4" onChange={passwordOnChange}/>
        <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">Confirm Password</label>
        <input type="password" required className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4" onChange={confirmPasswordOnChange} />
        <p id="login_status" className="py-3"></p>
        <p className=" text-gray-500">Password must be 8 characters in length. </p>
        <p className=" text-gray-500">Must contain an uppercase letter, a lowercase </p>
        <p className=" text-gray-500">letter, one number and one special character.</p>
        <button id="signupButton" className="bg-gray-900 text-white mt-2 rounded-md h-12 w-96 font-bold text-xl">Get Started</button>
        <h3 className="mt-2 text-center text-xl">Already have an account <a href="#" className="text-blue-600">Login!</a></h3>
        </div>
      </div>
    </div> );
}