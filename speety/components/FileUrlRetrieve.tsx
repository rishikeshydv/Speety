//This components returns your the URL in console.log after you upload a video file.
//this is very easy to use and can be used in any project.

"use client"
import getVideoUrl from '@/queries/ImgVidUrls/getVideoUrl'
import { set } from 'date-fns'
import React, { useEffect, useState } from 'react'

export default function Page() {
    const [vid, setVid] = useState<File|null>(null)
    const [url_, setUrl] = useState<string|null>(null)
    console.log(url_)
    useEffect(()=>{
        if(vid){
            getVideoUrl(vid).then((url)=>{
                setUrl(url)
            }
    )} 

    },[vid])
    return (
        <div>
                <input type="file" onChange={(e)=>setVid(e.target.files ? e.target.files[0] : null)}/>
                <button>submit</button>
        </div>
    )
}
