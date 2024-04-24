
import React, { use, useEffect, useState } from "react";
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

interface eachMessage {
      type: string;
      msg: string;
      date: string;
}

interface ChatListProps {
  sentMessage: eachMessage;
  sentTime:string;
  receivedMessage: eachMessage;
  receivedTime:string;
  senderEmail: string;
  receiverEmail: string;
  sendMessageFunction:(textMessage:string)=>void;
}

// {sendMessageFunction}:{sendMessageFunction:(textMessage:string)=>void}

const ChatList:React.FC<ChatListProps>=({sentMessage,sentTime, receivedMessage,receivedTime, senderEmail, receiverEmail,sendMessageFunction }) => {
  //write a logic to retrieve the chatHistory or chatLists of sender and receiver
  //these are retrieved from the database
  const [messagesExhanged,setMessagesExhanged] = useState<eachMessage[]>([]);
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



  // useEffect(() => {
  //   const fetchMsgs = async () => {
  //     const response = await getChats(senderEmail,receiverEmail);
  //     setSenderMsgs(response.sentMessages)
  //     setReceiverMsgs(response.receivedMessages)
  //   }
  //   fetchMsgs();
  // }, [senderEmail,receiverEmail]);

    // Update messagesExchanged when a new message is sent
    useEffect(() => {
      if (sentMessage.msg !== "") {
        setMessagesExhanged(prevState => [...prevState, sentMessage]);
      }
    }, [sentMessage]);

// Update messagesExchanged when a new message is received
        useEffect(() => {
          if (receivedMessage.msg !== "") {
            setMessagesExhanged(prevState => [...prevState, receivedMessage]);
          }
        }, [ receivedMessage]);

    
  

      // Update database upon peerjs
      // useEffect(() => {
        
      //   async function updateChatsAsync() {
      //     await updateChats(senderEmail, receiverEmail, sentMessage, receivedMessage);
      //   }
      //   updateChatsAsync();
      // }, [sentMessage, receivedMessage, senderEmail, receiverEmail]);

    
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
  <div className="flex h-[calc(100%-80px)] flex-col mt-3 py-1">
              <div className="flex-1 bg-gray-200 rounded-xl p-4 overflow-scroll">
         {
            messagesExhanged.map((message, index) => {
              if (message.type === "sent") {
                return (
                  <div className="flex items-start justify-start" key={index}>
                    <div className="flex justify-start items-start mt-4 w-full h-20 rounded-2xl px-2">
                      <MessageProp1 message={message.msg} msgTime={sentTime} profilePic={senderPic}/>
                    </div>
                  </div>
                );
              } else {
                return (
                  <div className="flex items-start justify-start" key={index}>
                    <div className="flex justify-end items-start mt-6 w-full mr-8 h-20 rounded-2xl">
                      <MessageProp2 message={message.msg} msgTime={receivedTime} profilePic={receiverPic}/>
                    </div>
                  </div>
                );
              }
            })
         }
              </div>

            
    {/* Sendbar */}
     <div className="h-16 flex flex-row w-full mt-3">
    <div className="w-full bg-gray-200 border-gray-200 rounded-2xl">
      <div className="rounded-xl bg-gray-200 dark:bg-gray-900 py-4 px-6">
        <div className="grid w-full text-sm ">
          <input 
          className="text-black bg-gray-200 text-xl" 
          placeholder='Type your message here...'
          value={message}
          onChange={messageFunc}
          />
        </div>
      </div>
    </div>
    <Button className="ml-4 h-15 w-16 rounded-full" variant="outline">
      <SmileIcon className="w-10 h-10" />
    </Button>
    <Button className="ml-4 h-15 w-16 rounded-full" variant="outline">
      <PaperclipIcon className="w-10 h-10" />
    </Button>
    <Button className="ml-4 h-15 w-16 rounded-full" variant="outline">
      <MicIcon className="w-10 h-10" />
    </Button>
    <Button 
    className="ml-4 mr-12 text-xl h-14 px-10 py-1"
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
