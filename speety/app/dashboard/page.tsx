"use client"

import React, { useState } from 'react';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '@/firebase/config';
import rejectHandler from "@/services/requestHandle/rejectHandler"

interface _notification {
  uniqueId:string,
  age: "NEW"|"OLD",
  notificationType: "CHAT"|"VIDEO"|"LOCATION",
  receiverEmail: string,
  senderEmail: string,
  status: "PENDING"|"ACCEPTED"|"DENIED",
  date_time:string
}
const notificationList: _notification[] = [];
const Dashboard = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  
  async function getNotifications(){
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
        date_time: notificationData.date_time as string
      };
      notificationList.push(notification);
  //    console.log(notificationList)
    })
  }

  getNotifications()
  
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
              {notificationList.map((notification, index) => (
                <li key={index}>
                  {notification.senderEmail + "sent a "+ notification.notificationType + " request"}
                  <button id="accept1" className='border'>Accept</button>
                  <button id="reject1" className='border' onClick={()=>rejectHandler(notification.uniqueId)}>Reject</button>
                  
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
