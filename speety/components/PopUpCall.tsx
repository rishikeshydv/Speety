import React, { useState } from 'react';
import {MediaConnection} from 'peerjs';
import Video from '@/app/video/page';
export default function IncomingCallPopup(call:MediaConnection){
  const [showPopup, setShowPopup] = useState(false);

  const handleAcceptCall = () => {
    console.log('Accepting call...');
    // Replace with your call accepting logic
    var getUserMedia = navigator.mediaDevices.getUserMedia;
    getUserMedia({ video: true, audio: true }).then(
            (stream: MediaStream) => {
              call.answer(stream);
              call.on("stream", function (remoteStream) {
                // receiverVideo.srcObject = stream;
                // try {
                //   receiverVideo.play();
                // } catch (error) {
                //   console.log("Error playing the caller video", error);
            
                // }
            //we cant access the video canvas of the /video page here
            //we will pass the stream as an argument to the page Video
            Video(stream)
              });
            }
          );
      
    setShowPopup(false);
  };

  const handleDeclineCall = () => {
    console.log('Declining call...');
    // Replace with your call declining logic
    setShowPopup(false);
  };

  return (
    <div>
      <button onClick={() => setShowPopup(true)}>Incoming Call</button>
      {showPopup && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            zIndex: 9999, // Ensure highest z-index to overlay content
          }}
        >
          <div
            style={{
              backgroundColor: 'white',
              padding: '20px',
              borderRadius: '5px',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <p>Incoming call</p>
            <p>From: Unknown Caller (Replace with caller info)</p>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button onClick={handleAcceptCall}>Accept</button>
              <button onClick={handleDeclineCall}>Decline</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

