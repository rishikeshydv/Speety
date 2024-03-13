"use client";

import React, { useEffect, useState } from "react";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
export default function Chat() {
  const [user] = useAuthState(auth);
  var [clicked, setClicked] = useState("");
  var [messages, setMessages] = useState<string[]>([]); // New state variable for messages
  var [inputValue, setInputValue] = useState(""); // New state variable for input box value
  var [myPeer,setMyPeer] = useState<any>(null);
  var [connection,setConnection] = useState<any>(null);

  function userOnClick(clickedUser: string) {
    setClicked(clickedUser);
  }
  useEffect(() => {
    const sendButton = document.getElementById(
      "send-button"
    ) as HTMLButtonElement;
    import("peerjs").then(({ default: Peer }) => {
      if (user && user.email) {
        const peer = new Peer(user.email as string, {
          host: "localhost",
          port: 9000,
          path: "/myapp",
        });
        setMyPeer(peer);
        console.log("Peer Created " + user?.email);
      }
        // If a user is clicked, connect to them
        if (clicked) {
          var conn = myPeer.connect(clicked);
          setConnection(conn);
          console.log("Clicked to: " + clicked);
        }
        if (myPeer !== null) {
          myPeer.on("connection", (conn:any) => {

            console.log("Connected to: " + conn.peer);
  
            conn.on("data", (data: any) => {
              if (data === null) {
                console.log("Nothing reeived on Receiver End");
                return;
              }
              if (typeof data === "string") {
                setMessages((prevMessages) => [...prevMessages, data]); // Update messages state
                return;
              }
            });
          });
        }
          sendButton.addEventListener("click", () => {
            const message = inputValue;
            if (connection !== null && connection !== undefined) {
              console.log(connection);
              connection.send(message);
              setMessages((prevMessages) => [...prevMessages, message]); // Update messages state
              setInputValue(""); // Clear the input box
              console.log("Sent: " + message);
            }
          });
        });
        return () => {
          if (myPeer !== null) {
            myPeer.disconnect(); // Disconnect from the peer server
          }
        };
      }, [clicked, user, inputValue]);


  return (
    <div className="bg-gray-100">
      <div id="text-area">
        {messages.map((message, index) => (
          <p key={index}>{message}</p>
        ))}{" "}
        {/* Display messages */}
      </div>
      <textarea
        id="message-input"
        className="bg-blue-100"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      ></textarea>{" "}
      {/* Bind input box value to state */}
      <button type="submit" id="send-button">
        Submit
      </button>{" "}
      {/* Call sendMessage when button is clicked */}
      <div className="flex flex-col">
        <button
          id="button1"
          value={"heroine@heroine.com"}
          className="bg-red-400"
          onClick={() => {
            userOnClick("heroine@heroine.com");
          }}
        >
          heroine@heroine.com
        </button>
        <button
          id="button2"
          value={"test@test.com"}
          className="bg-green-400 mt-4"
          onClick={() => {
            userOnClick("test@test.com");
          }}
        >
          test@test.com
        </button>
      </div>
      <div
        id="big-rectangle"
        style={{ width: "200px", height: "200px", border: "1px solid black" }}
      ></div>
    </div>
  );
}
