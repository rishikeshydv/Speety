"use client"

import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase/config';

interface _notification {
  uniqueId:string,
  age: "NEW",
  notificationType: "CHAT",
  receiverEmail: "rishikeshadh4@gmail.com",
  senderEmail: "ryadav@caldwell.edu",
  status: "PENDING",
}
const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);

  async function getNotifications(){
    const q = query(collection(db, "cities"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
    })
  }
  
  const notifications = ['Notification 1', 'Notification 2', 'Notification 3']; // Example notifications, replace with your own data

  const toggleNotifications = () => {
    setShowNotifications(!showNotifications);
  };

  return (
    <div>
      <h1>User Dashboard</h1>
      <nav>
        <ul>
          <li>
            <button onClick={toggleNotifications}>Notifications</button>
          </li>
          {/* Add more options/buttons here */}
        </ul>
      </nav>

      {showNotifications && (
        <div className="notification-popup">
          <div className="notification-popup-content">
            <h2>Notifications</h2>
            <ul>
              {notifications.map((notification, index) => (
                <li key={index}>{notification}</li>
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
