"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { useForm,SubmitHandler } from "react-hook-form";
import { setDoc, doc } from "firebase/firestore";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import { db } from "@/firebase/config";
import poppins from "@/font/font";
import { AiFillGoogleCircle } from "react-icons/ai";
import { AiFillYahoo } from "react-icons/ai";
import { FaMicrosoft } from "react-icons/fa6";
import Image from "next/image";
import Signup from "@/firebase/auth/Signup";

interface SignupData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {

  const { register, handleSubmit, formState: { errors } } = useForm<SignupData>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();
  const [user] = useAuthState(auth);


  const createUserInDB = async (
    name: string,
    email: string,
    role: string
  ) => {

    try {
      const userDocRef = doc(db, "User_Info", email); // Use email as the document ID
      await setDoc(userDocRef, {
        name: name,
        role: role
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit:SubmitHandler<SignupData> = async (data) => {
    try {
      const { email,name, password, confirmPassword } =
        data;

      if (password !== confirmPassword) {
        // show message to user that passwords do not match
        setErrorMsg("Passwords do not match");
        return;
      }

      //const { userCredential, error } = await signup(email, password);
      Signup(email, password).then
      (() => {
       createUserInDB(name, email,"client");
      }).then(() => {
        router.push(`/dashboard/${email}`);
      })
      // if (!userCredential) {
      //   setErrorMsg("Something went wrong. Please try again later.");
      // }
      console.log(user);
      // Store user in database
    } catch (error) {
      console.log(error);
      setErrorMsg("Something went wrong. Please try again later.");
    }
  }
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
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">Email</label>
        <input type="text" required {...register("email")} className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4" />
        {errors.email && <p className="text-red-500">Email is required.</p>}

        <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">Name</label>
        <input type="text" required {...register("name")} className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4" />
        {errors.name && <p className="text-red-500">Name is required.</p>}

        <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">Password</label>
        <input type="password" required {...register("password")} className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4" />
        {errors.password && <p className="text-red-500">Password is required.</p>}

        <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">Confirm Password</label>
        <input type="password" required {...register("confirmPassword")} className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4" />
        {errors.confirmPassword && <p className="text-red-500">Please confirm your password.</p>}

        <p className="text-gray-500">Password must be 8 characters in length. </p>
        <p className="text-gray-500">Must contain an uppercase letter, a lowercase </p>
        <p className="text-gray-500">letter, one number and one special character.</p>
        <button type="submit" id="signupButton" className="bg-gray-900 text-white mt-2 rounded-md h-12 w-96 font-bold text-xl">Get Started</button>
        </form>
        <h3 className="mt-2 text-center text-xl">Already have an account <a href="#" className="text-blue-600">Login!</a></h3>
        </div>
      </div>
    </div> );
}