"use client"

import React, { useEffect, useState } from "react";
import MessageProp1 from "@/services/chat/MessageProp1";
import MessageProp2 from "@/services/chat/MessageProp2";
import { getChats,updateChats } from "@/queries/chatSystem";
import { Button } from "@/components/ui/button";
import {
  collection,
  getDoc,
  doc
} from "firebase/firestore";
import { db } from "@/firebase/config";
import { send } from "process";

interface eachMessage {
      type: string;
      msg: string;
      date: string;
}

interface ChatListProps {
  sentMessage: eachMessage;
  receivedMessage: eachMessage;
  senderEmail: string;
  receiverEmail: string;
  sendMessageFunction:(textMessage:string)=>void;
  lastMsg: string;
  setLastMsg: React.Dispatch<React.SetStateAction<string>>;
} 

const ChatList:React.FC<ChatListProps>=({sentMessage, receivedMessage, senderEmail, receiverEmail,sendMessageFunction, lastMsg, setLastMsg }) => {
  //write a logic to retrieve the chatHistory or chatLists of sender and receiver
  //these are retrieved from the database
  var [messagesExhanged,setMessagesExhanged] = useState<eachMessage[]>([]);
  const [senderPic,setSenderPic] = useState<string>("");
  const [receiverPic,setReceiverPic] = useState<string>("");

  const setupSender = async (_userEmail:string) => {
    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, _userEmail);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      setSenderPic(userSnapshot.data().profilePic);
    }
  }

  const setupReceiver = async (_userEmail:string) => {
    const userRef = collection(db, "User_Info");
    const userDocRef = doc(userRef, _userEmail);
    const userSnapshot = await getDoc(userDocRef);
    if (userSnapshot.exists()) {
      setReceiverPic(userSnapshot.data().profilePic);
    }
  }


  useEffect(() => {
    setupSender(senderEmail);
  }, [senderEmail]);



  useEffect(() => {
    setupReceiver(receiverEmail);
  }, [receiverEmail]);


//retrieveing the chat history from the database
  useEffect(() => {
    const fetchMsgs = async () => {
      const response = await getChats(senderEmail,receiverEmail);
      setMessagesExhanged(response);
     setLastMsg(response[response.length-1].msg);
    }
    fetchMsgs();
  }, [senderEmail,receiverEmail]);


    // Update messagesExchanged when a new message is sent
    useEffect(() => {
      if (sentMessage.msg !== "") {
       setMessagesExhanged(prevState => [...prevState, sentMessage]);
        }
      setLastMsg(sentMessage.msg); 
    }, [sentMessage]);

// Update messagesExchanged when a new message is received
        useEffect(() => {
          if (receivedMessage.msg !== "") {
            setMessagesExhanged(prevState => [...prevState, receivedMessage]);
        }
        setLastMsg(receivedMessage.msg);
        }, [ receivedMessage]);

useEffect(() => {
      // Update database only at the end of the chat
      //We dont push after every new messages we get
      //This saves a lot of costs

        async function updateChatsAsync() {
            await updateChats(senderEmail, receiverEmail, messagesExhanged); 
          }
            window.addEventListener('beforeunload', updateChatsAsync);
       
        return () => {
          window.removeEventListener('beforeunload', updateChatsAsync);
        };
}
, [messagesExhanged, senderEmail, receiverEmail]);
    
//the following is the logic for the Sendbar
const [message, setMessage] = useState<string>("");

      function messageFunc(event: any) {
        setMessage(event.target.value);
      }
    
      const handleSendMessage = () => {
        sendMessageFunction(message);
        setMessage('');
        console.log("Message sent");
      };


  return (
  <div className="flex h-[calc(89%-0px)] flex-col mt-1">
              <div className="flex-1 bg-gray-200 rounded-lg p-4 overflow-scroll">
         { messagesExhanged.length > 0 ? (
            messagesExhanged.map((message, index) => {
              if (message.type === "sent" && message.msg !== "") {
                return (
                  <div className="flex items-start justify-start mt-4" key={index}>
                    <div className="flex justify-start items-start mt-2 w-full h-20 rounded-2xl px-2">
                      <MessageProp1 message={message.msg} msgTime={message.date} profilePic={senderPic}/>
                    </div>
                  </div>
                );
              } else if (message.type === "received" && message.msg !== ""){
                return (
                  <div className="flex items-start justify-start mt-4" key={index}>
                    <div className="flex justify-end items-start mt-2 w-full h-20 rounded-2xl">
                      <MessageProp2 message={message.msg} msgTime={message.date} profilePic={receiverPic}/>
                    </div>
                  </div>
                );
              }
            })
            ) : (
              <div className="flex items-center justify-center h-full">
              <div className="flex flex-col items-center gap-2 text-gray-500 dark:text-gray-400">
                <MessageCircleIcon className="h-10 w-10" />
                <p className="text-xl font-medium">No Messages Yet</p>
                <p className="text-sm text-center max-w-[300px]">
                  Start a conversation by sending your first message. We&apos;ll be here to help you along the way.
                </p>
              </div>
            </div>
            )
         }
              </div>

            
    {/* Sendbar */}
     <div className="h-4 flex flex-row w-full mt-1">
    <div className="w-full bg-gray-200 border-gray-200 rounded-2xl">
      <div className="rounded-xl bg-gray-200 dark:bg-gray-900 py-2 px-6">
        <div className="grid w-full ">
          <input 
          className="text-black bg-gray-200 text-md" 
          placeholder='Type your message here...'
          value={message}
          onChange={messageFunc}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSendMessage();
            }
          }
          }
          />
        </div>
      </div>
    </div>
    <button className="ml-4 h-10 w-10">
      <SmileIcon className="w-6 h-6" />
    </button>
    <button className="ml-4 h-10 w-10 rounded-full">
      <PaperclipIcon className="w-6 h-6" />
    </button>
    <button className="ml-4 h-10 w-10 rounded-full">
      <MicIcon className="w-6 h-6" />
    </button>
    <Button 
    className="ml-4 text-sm h-10 px-6"
    onClick={handleSendMessage}
    >Send</Button>
  </div>
            </div>

  );
}

export default ChatList;

function MicIcon(props: any) {
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
      <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" x2="12" y1="19" y2="22" />
    </svg>
  );
}

function PaperclipIcon(props: any) {
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
      <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
    </svg>
  );
}


function SmileIcon(props: any) {
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
      <circle cx="12" cy="12" r="10" />
      <path d="M8 14s1.5 2 4 2 4-2 4-2" />
      <line x1="9" x2="9.01" y1="9" y2="9" />
      <line x1="15" x2="15.01" y1="9" y2="9" />
    </svg>
  );
}

function MessageCircleIcon(props:any) {
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
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  )
}