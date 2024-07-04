import MeetingTemplate from "@/resend/MeetingTemplate";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import dotenv from "dotenv";
import NewsletterTemplate from "@/services/newsletters/NewsletterTemplate";
dotenv.config();
const resend = new Resend(process.env.NEXT_PUBLIC_RESEND_API_KEY!);

interface NewsType {
  date: string;
  source: string;
  header: string;
  paragraph1: string;
  paragraph2: string;
  paragraph3: string;
  image: string;
}

export async function POST(req: NextRequest) {
  //here we will check if any of the order is of tyoe Mods
  try {
    const meetingInfo = await req.json();
    const emails: string[] = meetingInfo.emails;
    const news: NewsType[] = meetingInfo.news;
    //sending emails to all the emails
    for (let i = 0; i < emails.length; i++) {
      const { data, error } = await resend.emails.send({
        from: "helpdesk@scail.it",
        to: emails[i],
        subject: "🗞️ Scail Newsletters Published",
        react: NewsletterTemplate({ news: news }),
      });

      if (error) {
        return NextResponse.json(
          { message: "Email sending failed", error },
          { status: 400 }
        );
      }
      return NextResponse.json(
        { message: "Email sent successfully", data },
        { status: 200 }
      );
    }
  } catch (error) {
    console.error(error);
  }
}
