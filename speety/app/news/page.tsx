"use client"
import { db } from '@/firebase/config'
import { doc, getDoc } from 'firebase/firestore'
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
const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
useEffect(() => {
    async function getNews() {
        const date = new Date();
        const month = date.getMonth();
        const querySnapshot = await getDoc(doc(db, "newsletters","january"));
        if (querySnapshot.exists()) {
            const newsData = querySnapshot.data();
            const newsKeys = Object.keys(newsData);
            const newsTemp: NewsProps[] = [];
            for (let i = 0; i < newsKeys.length; i++) {
                newsTemp.push(newsData[newsKeys[i]]);
            } 
            setNews(newsTemp);
        }
    }
    getNews()
}
, [])
  return (
    <div>
        {/* Need the UI to use the data in 'news' variable */}
        {
            news.map((newsItem, index) => {
                return (
                    <div key={index}>
                        <h1>{newsItem.header}</h1>
                        <p>{newsItem.paragraph1}</p>
                        <p>{newsItem.paragraph2}</p>
                        <p>{newsItem.paragraph3}</p>
                        <p>{newsItem.source}</p>
                        <img src={newsItem.imgUrl} alt="news image"/>
                    </div>
                )
            })
        }
    </div>
  )
}
