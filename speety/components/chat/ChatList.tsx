
import React, { useEffect, useState } from "react";
import MessageProp1 from "@/services/chat/MessageProp1";
import MessageProp2 from "@/services/chat/MessageProp2";
import { getChats,updateChats } from "@/queries/chatSystem";

interface eachMessage {
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
}

const ChatList:React.FC<ChatListProps>=({sentMessage,sentTime, receivedMessage,receivedTime, senderEmail, receiverEmail }) => {
  //write a logic to retrieve the chatHistory or chatLists of sender and receiver
  //these are retrieved from the database
  const [senderMsgs,setSenderMsgs] = useState<eachMessage[]>([]);
  const [receiverMsgs,setReceiverMsgs] = useState<eachMessage[]>([]);

  useEffect(() => {
    const fetchMsgs = async () => {
      const response = await getChats(senderEmail,receiverEmail);
      setSenderMsgs(response.sentMessages)
      setReceiverMsgs(response.receivedMessages)
    }
    fetchMsgs();
  }, [senderEmail,receiverEmail]);

    // Update senderMsgs when a new message is sent
    useEffect(() => {
      if (sentMessage) {
        setSenderMsgs(prevState => [...prevState, sentMessage]);
      }
    }, [sentMessage]);
  
    // Update receiverMsgs when a new message is received
    useEffect(() => {
      if (receivedMessage) {
        setReceiverMsgs(prevState => [...prevState, receivedMessage]);
      }
    }, [receivedMessage]);

      // Update database upon peerjs
      useEffect(() => {
        
        async function updateChatsAsync() {
          await updateChats(senderEmail, receiverEmail, sentMessage, receivedMessage);
        }
        updateChatsAsync();
      }, [sentMessage, receivedMessage, senderEmail, receiverEmail]);


        const compareMessages = (a: eachMessage, b: eachMessage) => {
          const timeA = new Date(a.date).getTime();
          const timeB = new Date(b.date).getTime();
          return timeA - timeB;
        };    

        senderMsgs.sort(compareMessages);
        receiverMsgs.sort(compareMessages);

      const combinedMessages = [...senderMsgs, ...receiverMsgs].sort((a, b) => {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
    

  return (
    <div>
    {combinedMessages.map((message, index) => (
      <div key={index} className="absolute flex bg-gray-200 rounded-3xl shadow-sm top-28 right-6 bottom-24 left-1/3">
        <div className="flex justify-center items-center mt-4 ml-3 w-80 h-20 rounded-2xl px-2">
          <MessageProp1 message={message.msg} msgTime={message.date} />
        </div>
        {index < receiverMsgs.length && (
          <div className="flex justify-center items-center mt-20 ml-80 w-80 h-20 rounded-2xl">
            <MessageProp2 message={message.msg} msgTime={message.date} />
          </div>
        )}
      </div>
    ))}
  </div>

  );
}

export default ChatList;
