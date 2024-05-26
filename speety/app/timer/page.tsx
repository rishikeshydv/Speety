/**
 * v0 by Vercel.
 * @see https://v0.dev/t/HhKmXgdOjhN
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
"use client"
import { Button } from "@/components/ui/button"
import poppins from "@/font/font"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import Warning from "@/components/timer/Warning"

export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [mins, setMins] = useState(0);
    const [targetDate, setTargetDate] = useState<Date>(new Date(new Date().getTime() + 30 * 60 * 1000));
    const [timerComplete, setTimerComplete] = useState(false); // set to true when user hits end timer
    const [timerExhausted, setTimerExhausted] = useState(false); // set to true when timer reaches 0
    const [timerIncreaseCount, setTimerIncreaseCount] = useState(0);

    const router = useRouter();

    function AddFifteen(){
        var newTarget = targetDate.getTime() + 15 * 60 * 1000;
        var newDummy = new Date(newTarget);
        setTargetDate(newDummy);
        setTimerIncreaseCount(timerIncreaseCount + 1);

    }


    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date();

            const difference = targetDate.getTime() - now.getTime();

            const m = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
            setMins(m);

            const s = Math.floor((difference % (1000 * 60)) / 1000);
            setSeconds(s);

            if (m <= 0 && s <= 0 && !timerComplete) {
                setTimerExhausted(true);
                // write function to call 911 with location
                //call broker
            }
        }, 1000);
    
        return () => clearInterval(interval);
      }, [targetDate]);

  return (
    <div>       
      <Header />
      {
        timerExhausted && <Warning />
      }

    <div className={`flex flex-col items-center justify-center p-20 bg-gray-100 dark:bg-gray-900 ${poppins.className}`}>
      <h1 className="text-xl tracking-tight font-semibold p-4">Please complete the property visit before the countdown ends.</h1>
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-8 w-full max-w-2xl">
        <div className="flex flex-col items-center justify-center space-y-8">
          <div className="text-8xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
            <span id="timer" className="tracking-tighter">00:{mins}:{seconds}</span>
          </div>
          <div className="flex space-x-4">
            <Button
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
              id="add-15-btn"
              size="lg"
              variant="outline"
              onClick={()=>{
                timerIncreaseCount < 1 ? AddFifteen() : alert("You can only add 15 mins once."); 
                }}
            >
              Add 15 mins
            </Button>
            <Button
              className="bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
              id="reset-btn"
              size="lg"
              variant="outline"
              onClick={()=>{
                setTimerComplete(true);
                router.push("/timer/successful");
              }}
            >
              End Timer
            </Button>
          </div>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  )
}