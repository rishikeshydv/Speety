import { NextRequest, NextResponse } from "next/server";
import twilio from "twilio";

export async function POST(req:NextRequest){
    const data = await req.json();
    const client = twilio(
        process.env.NEXT_PUBLIC_TWILIO_ACCOUNT_SID,
        process.env.NEXT_PUBLIC_TWILIO_AUTH_TOKEN
    );
    client.messages.create({
        body: data.message,
        from: process.env.NEXT_PUBLIC_TWILIO_PHONE_NUMBER,
        to: data.phoneNumber
    });
}