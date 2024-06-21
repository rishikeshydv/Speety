"use client";

import React, { use, useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import poppins from "@/font/font";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { auth } from "@/firebase/config";
import { useAuthState } from "react-firebase-hooks/auth";
import Peer, { DataConnection } from "peerjs";
import { collection, getDoc, doc } from "firebase/firestore";
import { db } from "@/firebase/config";
import moment from "moment"; //use moment.js to get time/date in a good format
import LocationRequestPopup from "@/components/location/LocationRequestPopup";
import { MdAddLocationAlt } from "react-icons/md";
import FaceCapture from "@/components/face-detect/FaceCapture";
import LocationComplete from "@/components/location/LocationComplete";
import FaceDeclinedReceiver from "@/components/face-detect/FaceDeclinedSender";
import FaceDeclinedSender from "@/components/face-detect/FaceDeclinedReceiver";
import TimerStartConfirm from "@/components/timer/TimerStartConfirm";
import ComparingImages from "@/components/face-detect/ComparingImages";
import { useRouter } from "next/navigation";

interface LocationData {
  lat: number;
  lng: number;
}
const LocationMap = () => {
  const [user] = useAuthState(auth);
  const [id, setId] = useState<string>("");
  const router = useRouter();
  // if (!user) {
  //   router.push("/auth/login");
  // }

  //handling pop up and location sharing permission
  const [shareAllow, setShareAllow] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(false);

  //handling face detection
  const [destinationReached, setDestinationReached] = useState(false); //to check if the destination is reached or not
  const [faceCapture, setFaceCapture] = useState(false);

  const [capturedImgUrl, setCapturedImgUrl] = useState("");
  const [receiverFaceDeclined, setReceiverFaceDeclined] = useState(false);
  const [senderFaceDeclined, setSenderFaceDeclined] = useState(false);
  const [identityConfirm, setIdentityConfirm] = useState(false);
  const [faceCaptureReceived, setFaceCaptureReceived] = useState(false);

  useEffect(() => {
    if (user) {
      setId(user.email as string);
    }
  }, [user]);

  const params = useParams();
  const email = decodeURIComponent(params["email"] as string);

  const userLocation = useRef<LocationData>({ lat: 0, lng: 0 });
  const markerSender = useRef<google.maps.Marker>();
  const markerReceiver = useRef<google.maps.Marker>();
  const markerDestination = useRef<google.maps.Marker>();
  const googlemap = useRef<HTMLDivElement>();
  const map_ = useRef<google.maps.Map>();
  const position1 = useRef<LocationData>({ lat: 0, lng: 0 }); //retrieving user1's location uponChange
  const position2 = useRef<LocationData>({ lat: 0, lng: 0 }); //retrieving user2's location uponChange
  const destination = useRef<LocationData>({ lat: 0, lng: 0 }); //retrieving user2's location uponChange
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null
  );
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null
  );
  const [isGoogleMapsLoaded, setGoogleMapsLoaded] = useState(false); //to check if the google maps script is loaded or not
  const [senderUser, setSenderUser] = useState<string>("");
  const [receiverUser, setReceiverUser] = useState<string>("");

  const [streetAddress, setStreetAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [country, setCountry] = useState("");
  const [destinationAddress, setDestinationAddress] = useState("");
  const [buttonText, setButtonText] = useState("Submit");
  const [buttonColor, setButtonColor] = useState("bg-black");

  const [myPeer, setMyPeer] = useState<Peer | null>(null);
  const connectionRef = useRef<DataConnection | null>(null);
  const [currentTime, setCurrentTime] = useState(moment());
  const [sentTime, setSentTime] = useState("");
  const [receivedTime, setReceivedTime] = useState("");

  //refresh the page
  const handleRefresh = () => {
    window.location.reload(); // This will refresh the page
  };

  useEffect(() => {
    //function to get each user's name
    const getSenderUserInfo = async (userEmail: string) => {
      const userRef = collection(db, "User_Info");
      const userDocRef = doc(userRef, userEmail as string);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        setSenderUser(userSnapshot.data().name);
      }
    };
    if (id) {
      getSenderUserInfo(id);
    }
  }, [id]);

  useEffect(() => {
    //function to get each user's name
    const getReceiverUserInfo = async () => {
      const userRef = collection(db, "User_Info");
      const userDocRef = doc(userRef, email);
      const userSnapshot = await getDoc(userDocRef);
      if (userSnapshot.exists()) {
        setReceiverUser(userSnapshot.data().name);
      }
    };
    getReceiverUserInfo();
  }, [email]);

  function joinAddress(e: any) {
    e.preventDefault();
    const address = `${streetAddress}, ${city}, ${state}, ${zip}, ${country}`;
    setDestinationAddress(address);
  }

  useEffect(() => {
    const geocodeDestination = async (address: any): Promise<LocationData> => {
      const myGeocoder = new google.maps.Geocoder();
      return new Promise<LocationData>((resolve, reject) => {
        myGeocoder.geocode({ address }, (results, status) => {
          if (status === "OK" && results) {
            const destinationLocation = {
              lat: results[0].geometry.location.lat(),
              lng: results[0].geometry.location.lng(),
            };
            resolve(destinationLocation);
          } else {
            reject(new Error("Geocode request failed."));
          }
        });
      });
    };

    const updateDestination = async () => {
      if (destinationAddress) {
        try {
          const location = await geocodeDestination(destinationAddress);
          destination.current = { lat: location.lat, lng: location.lng };

          if (markerDestination.current) {
            markerDestination.current.setPosition(destination.current);
          }
        } catch (error) {
          console.error("Error updating destination marker:", error);
        }
      }
    };

    updateDestination(); // Call function to update the destination marker when the address changes
  }, [destinationAddress]);

  useEffect(() => {

    const initializeMap = () => {
      if (!google.maps.Map){
        return; 
      }

      const map = new google.maps.Map(googlemap.current as HTMLDivElement, {
        zoom: 4,
        center: position1.current,
        mapId: "LocationTrackingMap",
      });

      //direction service
      const directionsService = new google.maps.DirectionsService();
      const directionsRenderer = new google.maps.DirectionsRenderer();
      directionsRenderer.setMap(map);
      map_.current = map;
      directionsServiceRef.current = directionsService; //storing as a ref
      directionsRendererRef.current = directionsRenderer; //storing as a ref

      setGoogleMapsLoaded(true);

      if (!position1){
        return;
      }
      if (!position2){
        return;
      }

      markerSender.current = new google.maps.Marker({
        position: position1.current,
        map,
        label: {
          text: senderUser,
          color: "blue",
          fontSize: "12px",
          fontWeight: "bold",
          fontFamily: "Arial",
        },
        icon: {
          url: "https://cdn-icons-png.flaticon.com/512/5556/5556468.png",
          scaledSize: new google.maps.Size(40, 40),
        },
      });

      markerReceiver.current = new google.maps.Marker({
        position: position2.current,
        map,
        label: {
          text: receiverUser,
          color: "black",
          fontSize: "12px",
          fontWeight: "bold",
          fontFamily: "Arial",
        },
        icon: {
          url: "https://cdn-icons-png.flaticon.com/512/5556/5556520.png",
          scaledSize: new google.maps.Size(40, 40),
        },
      });

      markerDestination.current = new google.maps.Marker({
        position: destination.current,
        map,
        label: {
          text: "Destination",
          color: "brown",
          fontSize: "12px",
          fontWeight: "bold",
          fontFamily: "Arial",
        },
        icon: {
          url: "https://cdn.iconscout.com/icon/free/png-256/free-home-location-3013087-2510140.png",
          scaledSize: new google.maps.Size(40, 40),
        },
      });
    };
    if (!window.google) {
      const script = document.createElement("script");
      script.type = "text/javascript";
      script.src = `https://maps.googleapis.com/maps/api/js?v=3.57&key=AIzaSyAvamq-1AR2paooKX-Hq7LvyyfIbwNsVVU&loading=async`;
      script.async = true;
      script.defer = true;
      script.addEventListener("load", initializeMap); 
      document.body.appendChild(script);
    } else {
        initializeMap(); // If Google Maps is already loaded
    }
  }, [senderUser, receiverUser, position1, position2]);

  useEffect(() => {
    if (isGoogleMapsLoaded) {
      const renderDirection = (route: any) => {
        if (directionsRendererRef.current) {
          (directionsServiceRef.current as google.maps.DirectionsService).route(
            route,
            (result, status) => {
              if (status === "OK") {
                (
                  directionsRendererRef.current as google.maps.DirectionsRenderer
                ).setDirections(result);
              } else {
                return;
                //console.error("Failed to render directions:", status);
              }
            }
          );
        }
      };

      // Define your routes based on updated positions
      const route1 = {
        origin: position1.current,
        destination: destination.current,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      const route2 = {
        origin: position2.current,
        destination: destination.current,
        travelMode: google.maps.TravelMode.DRIVING,
      };

      renderDirection(route1);
      renderDirection(route2);
    }
  }, [position1, position2, destination, isGoogleMapsLoaded]); // Update directions when these dependencies change

  useEffect(() => {
    if (shareAllow) {
      const intervalId = setInterval(() => {
        if (navigator.geolocation) {
          navigator.geolocation.watchPosition(function (position) {
            const newLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            send(newLocation); // Send the new location to the other user
          });
        }
      }, 3000);
      return () => {
        clearInterval(intervalId);
      };
    } else {
        return;
      //console.log("Location Sharing Permission Denied. Please Retry Request.");
    }
    // Cleanup
  }, [shareAllow]);

  useEffect(() => {
    if (map_.current) {
      // if (markerSender.current) {
      //   markerSender.current.setPosition(position1);
      // }
      // if (markerReceiver.current) {
      //   markerReceiver.current.setPosition(position2);
      // }
      if (markerDestination.current) {
        markerDestination.current.setPosition(destination.current);
        // Optionally re-center the map if the destination changes
      }

      map_.current.setCenter(position1.current);
    }
  }, [position1, destination]);

  useEffect(() => {
    // Function to update the current time every second
    const updateCurrentTime = () => {
      setCurrentTime(moment());
    };

    // Set up an interval to update the time every second
    const intervalId = setInterval(updateCurrentTime, 1000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  //function to send the message
  const send = (message: LocationData) => {
    //setting the position of the sender
    position1.current = message;
    if (!connectionRef.current) {
      connectionRef.current = myPeer?.connect(email.slice(0, email.indexOf("@"))) as DataConnection;
    }
    if (connectionRef.current && connectionRef.current.open) {
      // connectionRef.current.send(message);
      //console.log("connectionRef.current opened, sending message...");
      connectionRef.current.send(message);
    }
    if (markerSender.current) {
      markerSender.current.setPosition(message);
    }
  };

  //function to send the location request
  const locationRequest = () => {
    if (!connectionRef.current) {
      connectionRef.current = myPeer?.connect(email.slice(0, email.indexOf("@"))) as DataConnection;
    }
    if (connectionRef.current && connectionRef.current.open) {
      // connectionRef.current.send(message);
      connectionRef.current.send("location-request");
    //  console.log("Location Request sent");
    }
  };

  //function to send the face capture during face detection
  const faceCaptureSend = (blobUrl: string) => {
    if (!connectionRef.current) {
      connectionRef.current = myPeer?.connect(email.slice(0, email.indexOf("@"))) as DataConnection;
    }
    if (connectionRef.current && connectionRef.current.open) {
      // connectionRef.current.send(message);
      connectionRef.current.send(blobUrl);
      //console.log(blobUrl)
    }
  };

  //function to send the the face varification declined
  const FaceCaptureDeclined = () => {
    if (!connectionRef.current) {
      connectionRef.current = myPeer?.connect(email.slice(0, email.indexOf("@"))) as DataConnection;
    }
    if (connectionRef.current && connectionRef.current.open) {
      // connectionRef.current.send(message);
      connectionRef.current.send("face-capture-declined");
      //console.log("face-capture-declined");
    }
    setFaceCaptureReceived(false);
  };

  //function to send the the face varification verification
  const FaceCaptureConfirmed = () => {
    if (!connectionRef.current) {
      connectionRef.current = myPeer?.connect(email.slice(0, email.indexOf("@"))) as DataConnection;
    }
    if (connectionRef.current && connectionRef.current.open) {
      // connectionRef.current.send(message);
      connectionRef.current.send("face-capture-confirmed");
    //  console.log("face-capture-confirmed");
    }
    setFaceCaptureReceived(false);
  };

  //     useEffect to make a peer connection
  useEffect(() => {
    if (!myPeer && id) {
      const peer = new Peer(id.slice(0, id.indexOf("@")), {
        host: "localhost",
        port: 9000,
        path: "/myapp",
      });

      setMyPeer(peer);

      peer.on("open", (id) => {
        setMyPeer(peer);
      });

      const conn_ = peer.connect(email.slice(0, email.indexOf("@")));
      // The peer that initiates the connection needs to handle data from the peer it connects to.
      conn_.on("open", () => {
       // console.log("Connection to receiver established");
        connectionRef.current = conn_;
      });
      conn_.on("data", (data: any) => {
       // console.log("Data received on receiver:", data);
        if (data === "location-request") {
          setPopUpOpen(true);
        } else if (data === "face-capture-declined") {
          setSenderFaceDeclined(true);
        } else if (data === "face-capture-confirmed") {
          setIdentityConfirm(true);
        } else if (data && data.lat && data.lng) {
          if (markerReceiver.current) {
            markerReceiver.current.setPosition(data);
            position2.current = data;
          }
        }
        //this is the logic for the Blob Url of the face capture
        else if (data.length >= 20) {
          setCapturedImgUrl(data);
          setFaceCaptureReceived(true);
          // console.log('Blob Url Received', data);
        } else {
          return;
          //console.log("No data received");
        }
      });

      peer.on("connection", (conn: any) => {
        //console.log("Receiver connected");
        //The peer that receives a connection request needs to handle data from the initiating peer.
        conn.on("data", (data: any) => {
         // console.log("Data received on receiver:", data);
          if (data === "location-request") {
            setPopUpOpen(!popUpOpen);
          } else if (data === "face-capture-declined") {
            setSenderFaceDeclined(true);
          } else if (data === "face-capture-confirmed") {
            setIdentityConfirm(true);
          } else if (data && data.lat && data.lng) {
            if (markerReceiver.current) {
              markerReceiver.current.setPosition(data);
              position2.current = data;
            }
          }
          //this is the logic for the Blob Url of the face capture
          else if (data.length >= 20) {
            setCapturedImgUrl(data);
            setFaceCaptureReceived(true);
            //console.log('Blob Url Received', data);
          } else {
            return;
           // console.log("No data received");
          }
        });
      });
    }

    return () => {
      if (myPeer) {
        myPeer.destroy();
        setMyPeer(null);
      }
    };
  }, [id, myPeer]);

  //handling faceDetection
  if (
    position1.current == destination.current &&
    position2.current == destination.current
  ) {
    setDestinationReached(true);
  }

  return (
    <div
      className={`flex flex-col px-10 xl:px-0 2xl:px-0 w-full h-screen items-center ${poppins.className} bg-gray-200`}
    >
      {/* location request pop-up */}
      {popUpOpen && (
        <LocationRequestPopup
          email={email}
          shareAllow={shareAllow}
          setShareAllow={setShareAllow}
          popUpOpen={popUpOpen}
          setPopUpOpen={setPopUpOpen}
        />
      )}

      {/* destination reached popup */}
      {destinationReached && (
        <LocationComplete
          destinationReached={destinationReached}
          setDestinationReached={setDestinationReached}
          faceCapture={faceCapture}
          setFaceCapture={setFaceCapture}
        />
      )}

        {/* take a headshot pop up */}
      {faceCapture && (
        <FaceCapture
          faceCaptureSend={faceCaptureSend}
          faceCapture={faceCapture}
          setFaceCapture={setFaceCapture}
        />
      )}

      {/* headshot received at the receiver end pop up */}
      {faceCaptureReceived && (
        <ComparingImages
          userEmail={email}
          blobUrl={capturedImgUrl}
          faceCaptureReceived={faceCaptureReceived}
          setFaceCaptureReceived={setFaceCaptureReceived}
          receiverFaceDeclined={receiverFaceDeclined}
          setReceiverFaceDeclined={setReceiverFaceDeclined}
          faceCaptureDecline={FaceCaptureDeclined}
          faceCaptureConfirm={FaceCaptureConfirmed}
        />
      )}
      {/* pop-up received by the image sender when the sender identity confirmation is declined */}
      {receiverFaceDeclined && <FaceDeclinedReceiver />}

      {/* pop up received by the image receiver when the image receiver declines the sender identity confirmation */}
      {senderFaceDeclined && <FaceDeclinedSender />}

      {/* identity confirm pop-up to start the timer */}
      {identityConfirm && <TimerStartConfirm />}

      <div className="text-center mt-10 py-4 px-10 rounded-full shadow-2xl bg-slate-400">
        <h1
          className="xl:text-3xl 2xl:text-5xl font-bold tracking-tighter"
          onClick={() => setDestinationReached(true)}
        >
          Location Tracker
        </h1>
        <p className="xl:text-sm 2xl:text-md text-gray-500 leading-loose dark:text-gray-400">
          Accessible. Customizable. Open Source.
        </p>
      </div>
      <div className="flex flex-col xl:flex-row 2xl:flex-row xl:gap-6 2xl:gap-80 xl:py-6 2xl:py-28">
        <div className="flex flex-col gap-6 items-center">
          <div className="flex gap-2 xl:gap-6 2xl:gap-40">
            <Button
              className="flex items-center justify-center h-10 xl:w-32 2xl:w-32 mt-6 xl:mt-16 2xl:mt-16 text-xs xl:text-sm 2xl:text-sm font-bold rounded-3xl bg-slate-400/50"
              variant="outline"
              onClick={handleRefresh}
            >
              <img src="/pin1.png" className="mr-2 h-4 w-4" alt="pin" />
              Locate Me
            </Button>
            <Button
              className="flex items-center justify-center h-10 xl:w-60 2xl:w-60 mt-6 xl:mt-16 2xl:mt-16 text-xs xl:text-sm 2xl:text-sm font-bold rounded-3xl bg-slate-400/50"
              variant="outline"
              onClick={() => {
                locationRequest();}}
            >
              <MdAddLocationAlt className="w-6 h-6 mr-2" />
              Request Location Access
            </Button>
          </div>
          {/* Destination Form Start*/}
          <div
            className="mx-auto space-y-2 xl:h-[400px] xl:w-[400px] 2xl:h-[600px] 2xl:w-[600px]  flex flex-col items-center justify-center bg-gray-100 px-4 py-2 xl:px-6 2xl:px-2 rounded-3xl"
          >
            <h1 className="xl:text-lg 2xl:text-2xl font-semibold 2xl:mb-12">
              Enter Destination Location
            </h1>
            <div className="">
              <div className="space-y-2 2xl:mb-4">
                <Label htmlFor="street-address" className="text-sm">
                  Street Address
                </Label>
                <Input
                  id="street-address"
                  placeholder="123 Main St"
                  required
                  className="text-sm"
                  value={streetAddress}
                  onChange={(e) => {
                    setStreetAddress(e.target.value);
                  }}
                />
              </div>
              <div className="grid grid-cols-2 gap-4 2xl:mb-4">
                <div className="space-y-2 mb-4">
                  <Label htmlFor="city" className="text-sm">
                    City
                  </Label>
                  <Input
                    id="city"
                    placeholder="City"
                    required
                    className="text-sm"
                    value={city}
                    onChange={(e) => {
                      setCity(e.target.value);
                    }}
                  />
                </div>
                <div className="space-y-2 2xl:mb-4">
                  <Label htmlFor="state" className="text-sm">
                    State/Province
                  </Label>
                  <Input
                    id="state"
                    placeholder="State"
                    required
                    className="text-sm"
                    value={state}
                    onChange={(e) => {
                      setState(e.target.value);
                    }}
                  />
                </div>
              </div>
              <div className="space-y-2 2xl:mb-4">
                <Label htmlFor="zip" className="text-sm">
                  Postal/ZIP code
                </Label>
                <Input
                  id="zip"
                  placeholder="90210"
                  required
                  className="text-sm"
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                  }}
                />
              </div>
              <div className="space-y-2 2xl:mb-4">
                <Label htmlFor="country" className="text-sm">
                  Country
                </Label>
                <Input
                  id="country"
                  placeholder="Country"
                  required
                  className="text-sm"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
              </div>

              <div className="flex items-center justify-center">
                <Button
                  className={`w-20 text-sm mt-4 ${buttonColor}`}
                  type="submit"
                  onClick={(e) => {
                    joinAddress(e);
                    setButtonText("Submitted");
                    setButtonColor("bg-green-500");
                  }}
                >
                  {buttonText}
                </Button>
              </div>
            </div>
          </div>
          {/* Destination Form End */}
        </div>

        {/* Map Start */}
        <div className="bg-white p-3 xl:p-6 2xl:p-6 rounded-3xl my-10 xl:my-0 2xl:my-0">
          <div
            ref={googlemap as React.RefObject<HTMLDivElement>}
            className=" w-full h-[600px] xl:w-[1000px] xl:h-[550px] 2xl:w-[1700px] 2xl:h-[900px] shadow-2xl"
          ></div>
        </div>
      </div>
    </div>
  );
};

export default LocationMap;
