//this is the server to handle the messages
import { db } from "@/firebase/config";
import { doc, getDoc } from "firebase/firestore";
import { NextRequest, NextResponse } from "next/server";

interface eachMessage {
    type: string;
    msg: string;
    date: string;
    status: string;
}
const serverChatHub:Map<string, eachMessage[]> = new Map();
export async function POST(req: NextRequest) {
    const data = await req.json();

    if (!serverChatHub.has(data.from)) {
        serverChatHub.set(data.from, []);
    }
    if (!serverChatHub.has(data.to)) {
        serverChatHub.set(data.to, []);
    }
    serverChatHub.get(data.from)?.push({
        type: "sent",
        msg: data.msg,
        date: data.date,
        status: data.status,
    });
    serverChatHub.get(data.to)?.push({
        type: "received",
        msg: data.msg,
        date: data.date,
        status: data.status,
    });
    console.log(serverChatHub);
    return NextResponse.json({ message: serverChatHub });
}
