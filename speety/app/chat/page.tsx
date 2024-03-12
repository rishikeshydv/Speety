import React from 'react'
import poppins from "@/font/font";
import LeftmostBar from '@/components/chat/LeftmostBar';
import TopLeft from '@/components/chat/TopLeft';
import TopRight from '@/components/chat/TopRight';
import UserList from '@/components/chat/UserList';
import ChatList from '@/components/chat/ChatList';
import SendBar from '@/components/chat/SendBar';

export default function page() {
  return (
    <div className={poppins.className}>
<LeftmostBar />
<TopLeft />
 <TopRight />
<UserList />  
<ChatList />
<SendBar />


    </div>
  )
}
