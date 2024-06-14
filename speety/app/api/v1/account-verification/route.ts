import AccountVerificationTemplate from '@/resend/AccountVerificationTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(req:NextRequest) {
  //here we will check if any of the order is of tyoe Mods
    try {
        const accountInfo = await req.json();
      const { data, error } = await resend.emails.send({
          from: "info@scail.it",
          to: accountInfo.email,
          subject: "🎉 Your account has been verified!",
          react: AccountVerificationTemplate({ email:accountInfo.email,password:accountInfo.password })
      });
      if (error){
        return NextResponse.json(
            { message: "Email sending failed", error },
            { status: 400 }
          );
      }
      return NextResponse.json(
        { message: "Email sent successfully", data },
        { status: 200 }
      );
  
    } catch (error) {
      console.error(error);
    }
  };