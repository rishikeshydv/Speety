/**
 * v0 by Vercel.
 * @see https://v0.dev/t/uByvTwSr63Z
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client";
import { AvatarImage, AvatarFallback, Avatar } from "@/components/ui/avatar"
import { CardHeader, CardContent, Card } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import OpenAI from 'openai';
import * as dotenv from 'dotenv';
import React, { useEffect, useState } from "react";
import getResponse from "@/gpt3dot5/gpt3dot5";
import BotResponseProp from "./BotResponseProp";
import BotRequestProp from "./BotRequestProp";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import getUserProfile from "@/queries/getUserProfile";
import { Bot } from "lucide-react";
import { set } from "date-fns";

interface Message{
    msg:string
    from:string
}

export default function AIBot() {
    const [user] = useAuthState(auth);
    const [userProfilePic,setUserProfilePic] = useState('');
    const [messagesExchanged, setMessagesExchanged] = useState<Message[]>([]);

    const [prompt, setPrompt] = useState('');

    const pushMessages = (promptMsg: string) => {
        const finalPrompt = {
            msg: promptMsg,
            from: "user"
        }
        //setMessagesExchanged([...messagesExchanged, finalPrompt]);
        getResponse(finalPrompt.msg).then((response) => {
            const finalResponse = {
                msg: response as string,
                from: "bot"
            }
            setMessagesExchanged([...messagesExchanged,finalPrompt, finalResponse]);
        });
    }

useEffect(() => {
    if (!user) {
        return;
    }
    getUserProfile(user?.email as string).then((profile) => {
        if (profile) {
            setUserProfilePic(profile.profilePic);
        }
    }
    );
}, [user]);
  return (
    <Card key="1" className="max-w-[400px] rounded-2xl w-full mx-auto bg-white overflow-hidden border-0 shadow-lg">
      <CardHeader className="bg-[#87a3a3] py-4 px-6 flex items-center">
        <Avatar className="w-16 h-16">
          <AvatarImage alt="AI Bot" src="/svgs/13.png" className="p-1"/>
          <AvatarFallback>
            <XIcon className="" />
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold text-white">Scail Assistant</h3>
          <p className="text-sm text-gray-200">Hello, how can I assist you?</p>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4">
        <ScrollArea className="h-64 rounded-md border p-2">
          <div className="flex flex-col gap-2">
          {
    messagesExchanged && messagesExchanged.length > 0 ? (
        messagesExchanged.map((message, index) => {
            if (message.from === "user") {
                return <BotRequestProp key={index} msg={message.msg} profilePic={userProfilePic} />;
            } else {
                return <BotResponseProp key={index} msg={message.msg} />;
            }
        })
    ) : (
            <BotResponseProp msg="How can I help you today?" />
    )
}

          </div>
        </ScrollArea>
        <div className="flex items-center space-x-2">
          <Input
            className="flex-1 bg-gray-100 border-0 focus:ring-0 rounded-md px-4 py-2"
            placeholder="Type your message..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => {
                if (e.key === 'Enter') {
                    pushMessages(prompt);
                    setPrompt('');
                }
            }
            }
          />
          <Button className="flex items-center gap-2" variant="outline"
          onClick={() => {
            pushMessages(prompt);
            setPrompt('');
          }}
          >
            <SendIcon className="w-4 h-4" />
            Send
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function SendIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m22 2-7 20-4-9-9-4Z" />
      <path d="M22 2 11 13" />
    </svg>
  )
}


function XIcon(props:any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}