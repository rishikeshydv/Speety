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
import { Progress } from "@/components/ui/progress"

export default function Timer() {
    const [seconds, setSeconds] = useState(0);
    const [mins, setMins] = useState(0);
    const [targetDate, setTargetDate] = useState<Date>(new Date(new Date().getTime() + 30 * 60 * 1000));
    const [timerComplete, setTimerComplete] = useState(false); // set to true when user hits end timer
    const [timerExhausted, setTimerExhausted] = useState(false); // set to true when timer reaches 0
    const [timerIncreaseCount, setTimerIncreaseCount] = useState(0);

    //takes care of progress bar value
    const [progressValue, setProgressValue] = useState(0);

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
            setProgressValue(((30*60)-(m*60+s))/18)
        }, 1000);
    
        return () => clearInterval(interval);
      }, [targetDate]);

  return (
    <div className={`${poppins.className}`}>       
      <Header />
      {
        timerExhausted && <Warning />
      }

<section className="w-full py-10 xl:py-20 2xl:py-40 bg-white flex flex-col items-center justify-center ">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6 ">
            <div className="space-y-3 bg-gray-100 p-4 md:p-10 xl:p-28 2xl:p-60 [background:linear-gradient(90deg,#397367,theme(colors.green.200)_50%,#397367)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.300/.48)_80%,_theme(colors.green.500)_86%,_theme(colors.green.300)_90%,_theme(colors.green.500)_94%,_theme(colors.green.600/.48))_border-box] rounded-2xl border-4 border-transparent animate-border">
              <h2 className="xl:text-3xl 2xl:text-6xl font-bold tracking-tighter md:text-4xl/tight"> ⏳&nbsp;&nbsp;Time is Running Out!</h2>
              <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl/relaxed lg:text-base/relaxed xl:text-md 2xl:text-xl/relaxed dark:text-gray-400">
                The trip ends in:
              </p>
              <div className="flex justify-center gap-4">
                <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 rounded-md px-2 py-4 xl:px-4 xl:py-2 2xl:px-4 2xl:py-2 xl:text-4xl  2xl:text-4xl font-bold">
                  <span>00</span>
                  <span className="xl:text-sm 2xl:text-sm text-[10px] font-medium">Days</span>
                </div>
                <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 rounded-md px-2 py-4 xl:px-4 xl:py-2 2xl:px-4 2xl:py-2 xl:text-4xl 2xl:text-4xl font-bold">
                  <span>00</span>
                  <span className="xl:text-sm 2xl:text-sm text-[10px] font-medium">Hours</span>
                </div>
                <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 rounded-md px-2 py-4 xl:px-4 xl:py-2 2xl:px-4 2xl:py-2 xl:text-4xl 2xl:text-4xl font-bold">
                  <span>{mins}</span>
                  <span className="xl:text-sm 2xl:text-sm text-[10px] font-medium">Minutes</span>
                </div>
                <div className="bg-gray-900 text-gray-50 dark:bg-gray-50 dark:text-gray-900 rounded-md px-2 py-4 xl:px-4 xl:py-2 2xl:px-4 2xl:py-2 xl:text-4xl 2xl:text-4xl font-bold">
                  <span>{seconds}</span>
                  <span className="xl:text-sm 2xl:text-sm text-[10px] font-medium">Seconds</span>
                </div>
              </div>
            </div>
          </div>
          {/* Progress Bar */}

          <Progress value={progressValue} indicatorColor="bg-gradient-to-r from-[#90A955] to-[#397367]" className="mt-4 md:mt-8 h-2 w-1/2 md:h-5 text-[#397367]"/>
          
          <div className="flex items-center justify-center space-x-4 mt-2 md:mt-6">
            <Button
              className="bg-[#A2D3C2] dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100"
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
        </section>

<section>
  
</section>

    <Footer />
    </div>
  )
}