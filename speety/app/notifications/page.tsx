"use client";

import React, { useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import rejectHandler from "@/services/requestHandle/rejectHandler";
import acceptHandler from "@/services/requestHandle/acceptHandler";
import { realtimeDatabase, db, auth } from "@/firebase/config";
import { ref, onValue } from "firebase/database";
import { useAuthState } from "react-firebase-hooks/auth";

interface _notification {
  uniqueId: string;
  age: "NEW" | "OLD";
  notificationType: "CHAT" | "VIDEO" | "LOCATION";
  receiverEmail: string;
  senderEmail: string;
  status: "PENDING" | "ACCEPTED" | "DENIED";
  date_time: string;
}
const notificationList: _notification[] = [];
const Dashboard = () => {
  const [user] = useAuthState(auth);
  // Change notification logo dynamically
  const notificationLogo = document.getElementById(
    "notify_logo"
  ) as HTMLImageElement;

  const [sender, setSender] = useState("");
  //retrieve the sender of the notification
  async function senderGet() {
    const q = query(
      collection(db, "latestRequest"),
      where("receipient", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setSender(doc.data().sender);
    });
  }

  //function statusChat(_senderEmail: string, _receiverEmail: string) {
  const notificationReference = ref(
    realtimeDatabase,
    //here, the notification will only be shown to the receiver end
    //therefore, we will use user?.email as the 2nd argument
    `notifications/${sender}${user?.email}`
  );
  const valueLookup = onValue(notificationReference, (snapshot) => {
    const chatStat = snapshot.val().status;
    if (chatStat === "PENDING") {
      //write a function to make a change to the notification icon
      //what can you do is, if there is anything 'pending', just change the
      //notification
      //also if user is still in session, make a popup UI
      notificationLogo.src = "speety/public/active.png";
    } else {
      notificationLogo.src = "speety/public/active.png";
    }
  });
  //  }

  const [showNotifications, setShowNotifications] = useState(false);

  async function getNotifications() {
    const q = query(collection(db, "notifications"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      //console.log(doc.data().uniqueId)
      const notificationData = doc.data();
      const notification: _notification = {
        uniqueId: notificationData.uniqueId as string,
        age: notificationData.age,
        notificationType: notificationData.notificationType,
        receiverEmail: notificationData.receiverEmail,
        senderEmail: notificationData.senderEmail,
        status: notificationData.status,
        date_time: notificationData.date_time as string,
      };
      notificationList.push(notification);
      //    console.log(notificationList)
    });
  }

  getNotifications();

  //const notifications = ['Notification 1', 'Notification 2', 'Notification 3']; // Example notifications, replace with your own data

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <nav>
        <ul>
          <li>
            <button onClick={toggleNotifications}>
              <img id="notify_logo" src="" alt="notifications" />
            </button>
          </li>
          {/* Add more options/buttons here */}
        </ul>
      </nav>

      {showNotifications && (
        <div className="notification-popup">
          <div className="notification-popup-content">
            <h2>Notifications</h2>
            <ul>
              {notificationList.map((notification, index) => (
                <li key={index}>
                  {notification.senderEmail +
                    "sent a " +
                    notification.notificationType +
                    " request"}
                  <button
                    id="accept1"
                    className="border"
                    onClick={() =>
                      acceptHandler(sender, user?.email as string)
                    }
                  >
                    Accept
                  </button>
                  <button
                    id="reject1"
                    className="border"
                    onClick={() => rejectHandler(notification.uniqueId)}
                  >
                    Reject
                  </button>
                </li>
              ))}
            </ul>
            <button onClick={toggleNotifications}>Close</button>
          </div>
        </div>
      )}

      <style jsx>{`
        .notification-popup {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .notification-popup-content {
          background-color: white;
          padding: 20px;
          border-radius: 5px;
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
