/**
 * v0 by Vercel.
 * @see https://v0.dev/t/CoUFTY2BAIf
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { auth, db } from "@/firebase/config"
import { useAuthState } from "react-firebase-hooks/auth"
import { useEffect, useState } from "react"
import { collection, doc, getDoc,getDocs,setDoc } from "firebase/firestore"
import { useRouter } from "next/navigation"
import getImageUrl from "@/queries/ImgVidUrls/getImageUrl"
import { uuidv4 } from "@firebase/util";  
import axios from "axios"


interface NewsType {
    date: string,
    source: string,
    header: string,
    paragraph1: string,
    paragraph2: string,
    paragraph3: string,
    image: string
}

export default function NewsPost() {
    const [user] = useAuthState(auth)
    const [role, setRole] = useState<string>("")
    const router = useRouter()
    const uuid = uuidv4()

  //   if (role){
  //     if (role !== "admin") {
  //         router.push("/auth/login")
  //     }
  // }

    //form-data
    const [date, setDate] = useState<string>("")
    const [source, setSource] = useState<string>("")
    const [header, setHeader] = useState<string>("")
    const [paragraph1, setParagraph1] = useState<string>("")
    const [paragraph2, setParagraph2] = useState<string>("")
    const [paragraph3, setParagraph3] = useState<string>("")
    const [image, setImage] = useState<File|null>(null)
    const [imgUrl, setImgUrl] = useState<string>("")
    const [month, setMonth] = useState<string>("")
    const [news, setNews] = useState<NewsType[]>([])
    const [emails, setEmails] = useState<string[]>([])

    useEffect(() => {
        async function getRole() {
            if (user) {
                const docRef = doc(db, "User_Info", user.email || "")
                const userData = await getDoc(docRef)
                if (userData.exists()) {
                    setRole(userData.data().role)
                }
            }
        }
        getRole()
    }
    , [user])

    async function publishNews(month:string) {

        const docData = {
            date: date,
            source: source,
            header: header,
            paragraph1: paragraph1,
            paragraph2: paragraph2,
            paragraph3: paragraph3,
            image: imgUrl
        }
        const docRef = doc(db, "newsletters", month);
        await setDoc(docRef, {
            [`${uuid}`]: docData
        })
    }


    //getting all the latest news and all the emails associated with the newsletters subscription
    useEffect(() => {
    const getNews = async() => {
      if (month === "") {
          return
      }
        const docRef = doc(db, "newsletters", month)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()) {
            const docData = docSnap.data()
            const dataKeys = Object.keys(docData)
            for (let i = 0; i < dataKeys.length; i++) {
                setNews((prev) => {
                    return [...prev, docData[dataKeys[i]]]
                })
            }
        }
         else {
            console.log("No such document!");
        }
    }

    const getEmails = async() => {
        const docRef = collection(db, "newslettersEmails")
        await getDocs(docRef).then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
                setEmails((prev) => {
                    return [...prev, doc.data().email]
                })
            });
        })
    }
    getNews();
    getEmails();
    }
    , [])

    //send newsletters to users
    async function sendNewsletters() {
        for (let i = 0; i < emails.length; i++) {
            await axios.post("https://localhost:3000/api/v1/newsletters-email", {
                emails: emails,
                news: news
            })
        }
    }
                
  return (
    <Card className="max-w-4xl mx-auto p-6 sm:p-8 md:p-10">
      <CardHeader>
        <CardTitle className="text-3xl font-bold">Publish News Article</CardTitle>
        <CardDescription>Fill out the fields below to create a new article.</CardDescription>
      </CardHeader>
      <CardContent>
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
          <div className="grid gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="date" className="text-sm font-medium">
                  Date
                </Label>
                <Input id="date" type="date" onChange={(e)=>setDate(e.target.value)}/>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="source" className="text-sm font-medium">
                  Source
                </Label>
                <Input id="source" placeholder="https://example.com" onChange={(e)=>setSource(e.target.value)}/>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="header" className="text-sm font-medium">
                Headline
              </Label>
              <Input id="header" placeholder="Breaking News: Earthquake Hits California" onChange={(e)=>setHeader(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paragraph1" className="text-sm font-medium">
                Paragraph 1
              </Label>
              <Textarea id="paragraph1" rows={3} placeholder="Describe the news event in detail..." onChange={(e)=>setParagraph1(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paragraph2" className="text-sm font-medium">
                Paragraph 2
              </Label>
              <Textarea id="paragraph2" rows={3} placeholder="Provide additional context..." onChange={(e)=>setParagraph2(e.target.value)}/>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="paragraph3" className="text-sm font-medium">
                Paragraph 3
              </Label>
              <Textarea id="paragraph3" rows={3} placeholder="Summarize the key points..." onChange={(e)=>setParagraph3(e.target.value)}/>
            </div>
          </div>
        <Input id="image" type="file" onChange={(e)=>{
          const file = e.target.files![0]
          setImage(file)
          getImageUrl(file).then((url)=>{
            setImgUrl(url)
          })
        }}/>
        <div className="grid gap-2">
              <Label htmlFor="header" className="text-sm font-medium">
               Month of the News
              </Label>
              <Input id="header" placeholder="July" onChange={(e)=>setMonth(e.target.value)}/>
            </div>
        </form>
      </CardContent>
      <CardFooter>
        <div className="flex gap-6 justify-end">
          <Button onClick={(e)=>{
            publishNews(month)
          }}>Publish</Button>  
          <Button onClick={sendNewsletters}>Send Newsletters</Button>
        </div>
      </CardFooter>
    </Card>
  )
}