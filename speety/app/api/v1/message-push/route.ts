import { db } from "@/firebase/config";
import { updateChats } from "@/queries/chatSystem";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface eachMessage {
    type: string;
    msg: string;
    date: string;
    status: string;
  }

export async function POST(req: NextRequest) {
    try {
        const requestData = await req.json();
        //we update sender and receiver chat history both of them
        //this is because doing this way would cover all the cases 
        //whether the user is online or offline
        //here, we exchange the status of the message from "received" to "sent" and vice versa for receiver user
        const messageCopy: eachMessage[] = requestData.messagesExchanged.map((msg: eachMessage) => ({
            ...msg,
            type: msg.type === "received" ? "sent" : "received",
          }));

        // Check if messages are actually modified
        const isModified = JSON.stringify(messageCopy) !== JSON.stringify(requestData.messagesExchanged);
        
    if (isModified) {
        await updateChats(requestData.senderEmail, requestData.receiverEmail, requestData.messagesExchanged);
        await updateChats(requestData.receiverEmail, requestData.senderEmail, messageCopy);
        console.log("Message Pushed");
        return NextResponse.json({ message: "Success" }, { status: 200 });
        } else {
        return NextResponse.json({ message: "No new messages to push" }, { status: 200 });
        }

    } catch (error) {
        console.error("Error processing request:", error);
        return NextResponse.json({ error: "Failed to process request" }, { status: 500 });
    }
}
