import React from 'react';

const LeftmostBar = () => {
  return (
  //   <aside className="w-60 bg-black text-white">
  //         <div className={`absolute flex flex-col h-screen left-4`}> 
  //   <div className="flex-grow bg-black w-36 h-auto mx-auto my-5 rounded-2xl shadow-lg">
  //       <div className='mt-40'>
  //   <a href="/buy"><img
  //           src="/speety_logo_revert.png"
  //           alt="Speety Logo"
  //           width={100}
  //           height={100}
  //           className="ml-4 mt-10"
  //         /></a>
  //         <div>
  //           <img src="/profile.png" alt="user_profile" className='mt-10 ml-7' width={80} height={80} />
  //         </div>
  //         <div className='flex flex-col items-center mt-10 py-10'>
  //           <div><img src="/speech-balloon.png" alt="chat" width={50} height={50} /><h1 className='text-white ml-2'>Chat</h1></div>
  //           <div className='mt-10'><img src="/people.png" alt="people" width={50} height={50}  /><h1 className='text-white'>People</h1></div>
  //           <div className='mt-10'><img src="/hourglass-not-done.png" alt="requests" width={50} height={50}  /><h1 className='text-white'>Request</h1></div>
  //           <div></div>
  //         </div>
  //         </div>
  //   </div>
  // </div>
  //   </aside>

<aside className="w-60 bg-black text-white rounded-3xl m-6">
        <div className="flex items-center justify-center h-40 border-b border-gray-800">
          <a href="/buy">
            <img
              src="/speety_logo_revert.png"
              alt="Speety Logo"
              width={200}
              height={200}
              className="ml-4 mt-10"
            />
          </a>
        </div>
        <nav className="flex flex-col p-2">
          <div className="ml-9">
            <img
              src="/profile.png"
              alt="user_profile"
              className="mt-10 ml-7"
              width={80}
              height={80}
            />
          </div>
          <div className="flex flex-col items-center mt-10 py-10">
            <div>
              <img
                src="/speech-balloon.png"
                alt="chat"
                width={50}
                height={50}
              />
              <h1 className="text-white ml-2">Chat</h1>
            </div>
            <div className="mt-10">
              <img src="/people.png" alt="people" width={50} height={50} />
              <h1 className="text-white">People</h1>
            </div>
            <div className="mt-10">
              <img
                src="/hourglass-not-done.png"
                alt="requests"
                width={50}
                height={50}
              />
              <h1 className="text-white">Request</h1>
            </div>
          </div>
        </nav>
      </aside>


  );
};

export default LeftmostBar;
