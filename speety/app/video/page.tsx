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
          if (updateType == "ADD") {
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
            // New stream added, start playing the stream.
          } else if (updateType == "DELETE" && zg && streamList[0].streamID) {
            zg.stopPublishingStream(streamList[0].streamID);
            zg.logoutRoom("123");
          }
        }
      );

      await zg.loginRoom(
        "zego-room",
        "token",
        { userID: "123", userName: "kishan" },
        { userUpdate: true }
      );

      const localStream = await zg.createStream({
        camera: {
          audio: true,
          video: true,
        },
      });
      // Get the audio tag.
      const localAudio = document.getElementById("local-video");
      const videoElement = document.createElement("video");
      const td = document.getElementById("audio-local") as HTMLMediaElement;
      videoElement.id = "local-video";
      videoElement.className = "h-28 w-32";
      videoElement.autoplay = true;
      videoElement.muted = false;
      videoElement.playsInline = true;
      localAudio?.appendChild(videoElement);
      td!.srcObject = localStream;
    };
    const streamID = "123" + Date.now();
    zg.startPublishingStream(streamID, localStream);
  }, []);
  return (
    <div>
      <div id="local-video"></div>
      <div id="remote-video"></div>
    </div>
  );
}
