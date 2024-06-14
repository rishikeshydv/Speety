import MeetingTemplate from '@/resend/MeetingTemplate';
import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY);
export async function POST(req:NextRequest) {
  //here we will check if any of the order is of tyoe Mods
    try {
        const meetingInfo = await req.json();
      const { data, error } = await resend.emails.send({
          from: "info@scail.it",
          to: meetingInfo.receiver,
          subject: "🗓️ Your have a meeting scheduled!",
          react: MeetingTemplate({ sender:meetingInfo.sender,date:meetingInfo.date })
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