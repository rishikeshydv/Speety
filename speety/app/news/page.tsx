"use client"
import { db } from '@/firebase/config'
import { collection, getDocs } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'

interface NewsProps{
    date:string,
    header:string,
    paragraph1:string,
    paragraph2:string,
    paragraph3:string,
    source:string,
    imgUrl:string
}
export default function News() {
const [news, setNews] = useState<NewsProps[]>([])
useEffect(() => {
    async function getNews() {
        const querySnapshot = await getDocs(collection(db, "newsletters"));
        querySnapshot.forEach((doc) => {
            setNews((prev) => [...prev, doc.data() as NewsProps]);
        });
    }
    getNews()
}
, [])
  return (
    <div>
        {/* Need the UI to use the data in 'news' variable */}
    </div>
  )
}
