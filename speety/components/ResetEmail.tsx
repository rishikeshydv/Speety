/**
 * v0 by Vercel.
 * @see https://v0.dev/t/D3tQKrUKVl5
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import React, { useState } from "react"
import {sendPasswordResetEmail } from "firebase/auth";
import { auth } from "@/firebase/config";
import { useForm, SubmitHandler } from "react-hook-form";

interface ResetEmailProps {
    setReset: React.Dispatch<React.SetStateAction<boolean>>
    setResetDone: React.Dispatch<React.SetStateAction<boolean>>
}

interface SignupData {
    email: string;
}

const ResetEmail:React.FC<ResetEmailProps> = ({setReset,setResetDone}) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
      } = useForm<SignupData>();

    const onSubmit:SubmitHandler<SignupData> =  async(data) => {
        try{
            const { email } = data;
          await sendPasswordResetEmail(auth,email);
          setReset(false);
          setResetDone(true);
        }catch(error){
          console.log(error);
        }
      }
  return (
    <Dialog defaultOpen>
    <DialogTrigger asChild>
      <Button>Reset Password</Button>
    </DialogTrigger>
    <DialogContent className="mx-auto max-w-md space-y-6">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Reset Password</h1>
        <p className="text-muted-foreground">
          Enter your email address and we&apos;ll send you a link to reset your password.
        </p>
      </div>
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" {...register("email")} required />
        </div>
        <Button type="submit" className="w-full">
          Reset Password
        </Button>
      </form>
    </DialogContent>
  </Dialog>
  )
}

export default ResetEmail