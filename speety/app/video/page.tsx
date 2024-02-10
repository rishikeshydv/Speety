"use client";
import React, { useEffect } from "react";
import { ZegoExpressEngine } from "zego-express-engine-webrtc";

export default function Video() {
  useEffect(() => {
    const initializeApp = async () => {
      const zg = new ZegoExpressEngine(
        35175772,
        "3b9a16d0c18201494db1dfb8be80d1bd"
      );

      zg.on(
        "roomStreamUpdate",
        async (roomID, updateType, streamList, extendedData) => {
          if (updateType === "ADD") {
            const rmVideo = document.getElementById("remote-video");
            const vd = document.createElement("video");
            vd.id = streamList[0].streamID;
            vd.autoplay = true;
            vd.playsInline = true;
            vd.muted = false;
            if (rmVideo) {
              rmVideo.appendChild(vd);
            }
            zg.startPlayingStream(streamList[0].streamID, {
              audio: true,
              video: true,
            }).then((stream) => {
              vd.srcObject = stream;
            });
          } else if (updateType === "DELETE" && zg && streamList[0].streamID) {
            zg.stopPlayingStream(streamList[0].streamID); // Fixed method name
            zg.logoutRoom("zego-room"); // Changed hard-coded roomID to "zego-room"
          }
        }
      );

      await zg.loginRoom(
        "zego-room",
        "token",
        { userID: "123", userName: "Rishi" },
        { userUpdate: true }
      );

      const localStream = await zg.createStream({
        camera: {
          audio: true,
          video: true,
        },
      });

      const localAudio = document.getElementById("local-video");

      const videoElement = document.createElement("video");
      videoElement.id = "local-video";
      videoElement.className = "h-28 w-32";
      videoElement.autoplay = true;
      videoElement.muted = false;

      videoElement.playsInline = true;
      
      localAudio?.appendChild(videoElement);
      videoElement.srcObject = localStream;

      const streamID = "123" + Date.now();
      zg.startPublishingStream(streamID, localStream);
    };

    initializeApp(); // Call the initialization function

    // Clean up function
    return () => {
      // Perform any cleanup, e.g., disconnect from Zego
    };
  }, []); // Dependency array is empty, effect runs only once

  return (
    <div>
      <div id="local-video"></div>
      <div id="remote-video"></div>
    </div>
  );
}
