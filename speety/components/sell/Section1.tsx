"use client"
import React from 'react'
import Typist from "react-typist-component";
export default function Section1() {
  return (
  //   <div>
  //     <img src="/wide3.jpg" alt="alt" className='aspect-video object-cover object-center w-full xl:h-[500px] 2xl:h-[1000px]'/>
  //       <section className=' flex flex-col items-center justify-center absolute left-20 bottom-2/3 xl:left-1/4 xl:bottom-1/4 2xl:left-1/3 2xl:bottom-1/3'>
        
  // {/* "Selling fast" */}
  // <div className="text-2xl xl:text-7xl 2xl:text-9xl tracking-tighter font-bold flex items-center">
  //   <span className='text-[#16302B]'>Selling your home</span>
  // </div>

  // {/* "Buying smart" with gradient text */}
  // <h1 className="text-2xl xl:text-7xl 2xl:text-9xl tracking-tighter font-bold flex items-center xl:mb-10 2xl:mb-10">
  //   <span className='text-[#16302B]'>with</span>
  //   &nbsp;
  //   <span className="text-transparent bg-gradient-to-r from-[#90A955] to-[#397367] bg-clip-text">
  //     confidence
  //   </span>
  //   <img
  //     src="/svgs/12.png"
  //     className=" ml-1 xl:ml-5 2xl:ml-5 w-8 h-8 xl:w-[140px] xl:h-[140px] 2xl:w-[140px] 2xl:h-[140px]"
  //     alt="Home"
  //   />
  // </h1>
  //       <button className="py-1 px-4 border font-semibold tracking-tighter border-blue-200 border-opacity-20 text-[#16302B] text-[6px] xl:text-[16px] 2xl:text-[16px] mb-10">
  //   <Typist>Scail is making it simpler to sell your home and move forward.</Typist>
  // </button>
  //       </section>
  //   </div>

<div className="flex items-center justify-center gap-6 md:gap-20">

<div className="flex flex-col md:flex-row items-center justify-between gap-4 xl:gap-20 2xl:gap-80 px-4 py-12 md:px-6 md:py-16 lg:px-8 lg:py-20">
<div className="flex-1 space-y-4 max-w-xl">
<div className="text-3xl font-bold sm:text-4xl md:text-6xl xl:text-7xl 2xl:text-9xl text-gray-400">Selling your house with <h1 className="text-[#397367] text-3xl font-bold sm:text-4xl md:text-6xl lg:text-7xl 2xl:text-9xl">confidence</h1></div>
<p className="text-muted-foreground md:text-lg tracking-tight">
Selling a property is a big decision. We are here to help you make the right choice.
  Our website provides you with the best options for selling your home. We have a wide range of properties.
  We help you find the best property that suits your needs. We provide you with the best experience in selling your home.
</p>
</div>
<video className="flex-1 xl:max-w-[550px] 2xl:max-w-[900px] h-full overflow-hidden [background:linear-gradient(45deg,#172033,theme(colors.slate.800)_50%,#172033)_padding-box,conic-gradient(from_var(--border-angle),theme(colors.slate.300/.48)_80%,_theme(colors.green.500)_86%,_theme(colors.green.300)_90%,_theme(colors.green.500)_94%,_theme(colors.green.600/.48))_border-box] rounded-2xl border-4 border-transparent animate-border" autoPlay muted playsInline>
          <source 
                    src="https://firebasestorage.googleapis.com/v0/b/speety-2175.appspot.com/o/frontend-vids%2F2.mp4?alt=media&token=49dbe7b7-30b8-481b-8028-54e2bf00b05f"
          />
        </video>
</div>

</div>
  )
}
