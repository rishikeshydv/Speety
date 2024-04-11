"use client";
import { useRouter } from "next/navigation";
import { useCallback, useState, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
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
import Webcam from "react-webcam";
import { MdCamera } from "react-icons/md";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface SignupData {
  name: string;
  email: string;
  role: string;
  id: string;
  faceCapture: File;
  driverLicense: File;
  password: string;
  confirmPassword: string;
}

export default function SignupPage() {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupData>();
  const [errorMsg, setErrorMsg] = useState<string>("");
  const router = useRouter();
  const [user] = useAuthState(auth);

  //to watch the value of the USER role
  const [role_, setRole_] = useState<string>("");

  //to capture the photo
  const webcamRef = useRef<Webcam>(null);
  const [photo, setPhoto] = useState(null);
  const capturePhoto = () => {
    if (!webcamRef.current) return;
    const imageSrc = webcamRef.current.getScreenshot();
    setPhoto(imageSrc);
  };

  const createUserInDB = async (name: string, email: string, role: string) => {
    try {
      const userDocRef = doc(db, "User_Info", email); // Use email as the document ID
      await setDoc(userDocRef, {
        name: name,
        role: role,
      });
    } catch (error) {
      console.log(error);
    }
  };
  const onSubmit: SubmitHandler<SignupData> = async (data) => {
    try {
      const {
        email,
        name,
        role,
        id,
        faceCapture,
        driverLicense,
        password,
        confirmPassword,
      } = data;

      if (password !== confirmPassword) {
        // show message to user that passwords do not match
        setErrorMsg("Passwords do not match");
        return;
      }

      //const { userCredential, error } = await signup(email, password);
      Signup(email, password)
        .then(() => {
          createUserInDB(name, email, "client");
        })
        .then(() => {
          router.push(`/dashboard/${email}`);
        });
      // if (!userCredential) {
      //   setErrorMsg("Something went wrong. Please try again later.");
      // }
      console.log(user);
      // Store user in database
    } catch (error) {
      console.log(error);
      setErrorMsg("Something went wrong. Please try again later.");
    }
  };
  return (
    <div className={poppins.className}>
      <div
        className={`fixed bottom-16 top-16 left-1/4 right-1/4 flex flex-col items-center justify-center bg-gray-100 shadow-sm rounded-2xl`}
      >
        {/* This div is for the right side of the page */}
        <Image
          src="/speety_logo.png"
          alt="Speety Logo"
          width={250}
          height={130}
          className=""
        />
        {/* <h1 className="text-xl text-gray-400"><Typist> Begin the journey with us ...</Typist></h1> */}
        <button className="bg-gray-300 rounded-xl w-96 h-16 mt-4 text-2xl font-bold">
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
        <div className="flex flex-row gap-2 items-center">
          {/* This is for the horizontal line */}
          <hr className="mt-3 border-gray-400 border-2 flex-grow w-44" />
          <p className="text-gray-500 text-xl mt-3 ">Or</p>
          <hr className="border-2 border-gray-400 mt-3 flex-grow w-44" />
        </div>
        <div className="flex flex-col">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <div className="flex mt-4 gap-8">
              <div>
                <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
                  Email
                </label>
                <input
                  type="text"
                  required
                  {...register("email")}
                  className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4"
                />
                {errors.email && (
                  <p className="text-red-500">Email is required.</p>
                )}
              </div>

              <div>
                <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  required
                  {...register("name")}
                  className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4"
                />
                {errors.name && (
                  <p className="text-red-500">Name is required.</p>
                )}
              </div>
            </div>

            <div className="flex gap-8">
              <div>
                <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800 py-2">
                  Role
                </label>
                <select
                  {...register("role")}
                  value={role_}
                  onChange={(e) => {
                    setRole_(e.target.value);
                  }}
                  name="searchType"
                  className=" rounded-md h-16 w-96 pl-4 text-xl text-gray-800 bg-gray-200"
                >
                  <option value="Buyer/Renter">Buyer/Renter</option>
                  <option value="Broker">Broker</option>
                  <option value="Agent">Agent</option>
                </select>
                {errors.role && (
                  <p className="text-red-500">Role is required.</p>
                )}
              </div>

              {role_ === "Broker" || role_ === "Agent" ? (
                <>
                  <div className="py-4">
                    <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
                      Broker Id
                    </label>
                    <input
                      type="text"
                      required
                      {...register("id")}
                      className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4"
                    />
                    {errors.id && (
                      <p className="text-red-500">Name is required.</p>
                    )}
                  </div>
                </>
              ) : null}
            </div>
            <div className="flex gap-8">
            <div className="relative flex items-center">
              <div className="flex flex-col">
                <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
                  Capture Face
                </label>
                <input
                  placeholder="Add a profile picture"
                  type="text"
                  readOnly
                  {...register("name")}
                  className="rounded-md bg-gray-200 h-16 w-96 text-lg px-4"
                />
              </div>
              <div className="relative mt-7">
                <Popover>
                  <PopoverTrigger className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-200 px-4">
                    <MdCamera className="h-10 w-10" />
                  </PopoverTrigger>
                  <PopoverContent
                    style={{ width: 600, height: 500 }}
                    className="mr-10 mt-6 bg-gray-300 rounded-3xl"
                  >
                    <Webcam
                      audio={false}
                      ref={webcamRef}
                      screenshotFormat="image/jpeg"
                      width={320}
                      height={240}
                    />
                    <button onClick={capturePhoto}>Capture Photo</button>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
            <div>
              <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
                Driver&apos;s License
              </label>
              <input
                type="file"
                accept="image/*"
                required
                {...register("name")}
                className="rounded-md text-xl font-semibold h-16 w-96 py-4"
              />
              {errors.driverLicense && (
                <p className="text-red-500">
                  Driver&apos;s License is required.
                </p>
              )}
            </div>
            </div>

            <div className="flex mt-4 gap-8">
              <div>
                <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
                  Password
                </label>
                <input
                  type="password"
                  required
                  {...register("password")}
                  className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4"
                />
                {errors.password && (
                  <p className="text-red-500">Password is required.</p>
                )}
              </div>

              <div>
                <label className="block uppercase tracking-wide text-lg font-semibold text-gray-800">
                  Confirm Password
                </label>
                <input
                  type="password"
                  required
                  {...register("confirmPassword")}
                  className="rounded-md bg-gray-200 h-16 w-96 text-2xl px-4"
                />
                {errors.confirmPassword && (
                  <p className="text-red-500">Please confirm your password.</p>
                )}
              </div>
            </div>
            <div className="flex items-center justify-center py-8">
            <button
              type="submit"
              id="signupButton"
              className="bg-gray-900 text-white mt-2 rounded-md h-12 w-96 font-bold text-xl"
            >
              Get Started
            </button>
            </div>

          </form>
          <h3 className="mt-2 text-center text-xl">
            Already have an account{" "}
            <a href="#" className="text-blue-600">
              Login!
            </a>
          </h3>
        </div>
      </div>
    </div>
  );
}
