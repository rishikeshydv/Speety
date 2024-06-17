/**
 * v0 by Vercel.
 * @see https://v0.dev/t/oB9uqj6Tlc9
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { useState } from "react"

export default function Test() {
    const [image1, setImage1] = useState<string>('')
    const [image2, setImage2] = useState<string>('')
    const onSubmit = async() => {
        const res = await axios.post('/api/v1/face-rekognition', {
            input1:image1, 
            input2: image2},
            {headers: {
                'Content-Type': 'application/json'
            }
        },
    )
    console.log(res.data)
    }
      return (
    <div className="flex flex-col gap-4 max-w-sm">
      <div>
        <Label htmlFor="name">Image 1</Label>
        <Input id="name" type="text" placeholder="url 1" value={image1} onChange={(e)=>setImage1(e.target.value)}/>
      </div>
      <div>
        <Label htmlFor="email">Image 2</Label>
        <Input id="email" type="email" placeholder="url 2" value={image2} onChange={(e)=>setImage2(e.target.value)}/>
      </div>
      <Button type="submit" onClick={onSubmit}>Submit</Button>
    </div>
  )
}

