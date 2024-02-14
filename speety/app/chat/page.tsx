"use client"

import React, { useEffect, useRef, useState } from "react";
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  limit,
  Timestamp,
  where
} from "firebase/firestore";
import { db } from "@/firebase/config";
import Message from "@/components/Message";
import SendMessage from "@/components/SendMessage";

interface MessageData {
  uid: string;
  text: string;
  name: string;
  createdAt: Timestamp
}

const ChatBox = () => {
  const email = "rishikeshadh4@gmail.com"
  const [messages, setMessages] = useState<MessageData[]>([]);
  const scroll = useRef<HTMLSpanElement>(null!);

  useEffect(() => {
    const q = query(
      collection(db, "messages"),
      where("email", "==", email),
      orderBy("createdAt", "desc"),
      limit(50)
    );

    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      const fetchedMessages: MessageData[] = [];
      QuerySnapshot.forEach((doc) => {
        fetchedMessages.push({ ...doc.data(), uid: doc.id } as MessageData);
      });
      const sortedMessages = fetchedMessages.sort(
        (a, b) => b.createdAt.toMillis() - a.createdAt.toMillis()
      );
      setMessages(sortedMessages);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.uid} message={message} />
        ))}
      </div>
      {/* when a new message enters the chat, the screen scrolls down to the scroll div */}
      <span ref={scroll}></span>
      <SendMessage scroll={scroll} />
    </main>
  );
};

export default ChatBox;
