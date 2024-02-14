import React, { useState } from "react";
import { auth, db } from "../firebase/config";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const SendMessage = ({ scroll }: { scroll: React.RefObject<HTMLSpanElement> }) => {
  const [message, setMessage] = useState("");

  const sendMessage = async (event: any) => {
    event.preventDefault();
    if (message.trim() === "") {
      alert("Enter valid message");
      return;
    }

    const { uid, displayName } = auth.currentUser ?? {};
    await addDoc(collection(db, "messages"), {
      text: message,
      name: displayName,
      //avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage("");
    if (scroll.current) {
      scroll.current.scrollIntoView({ behavior: "smooth" });
  }
  return null;
  };
  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
