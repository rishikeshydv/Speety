import React from "react";

//imports for video call
import PopoverTriggerComponent from "@/components/video/PopOverTriggerComponent";
import PopOverComponent from "@/components/video/PopOverComponent";
import LocationTrigger from "../location/formPop/LocationTrigger";

interface TopRightProps {
callerRef:any
receiverRef:any
videoOnClick:any
mapInitialiser:any,
addressConverter:any
senderLoc:any
receiverLoc:any
}

const TopRight:React.FC<TopRightProps> = ({callerRef,receiverRef,videoOnClick,mapInitialiser,addressConverter,senderLoc,receiverLoc}) => {
  //use realtime firebase to get the status
  var onlineStatus = "•Online";
  //parse these personal information while clicking on them on the left side
  //no need to hardcode them
  var user = "Mary";
  var imageUrl = "/old-woman.png";
  return (
    <div className="flex justify-between bg-gray-200 rounded-2xl mt-2 h-20 px-6">
    <div className="flex items-center space-x-2">
      <button>
        <img
          src="/user.png"
          alt="Image description"
          className="w-12 h-12 rounded-full ml-3"
        />
      </button>
      <div>
        <div className="font-semibold text-xl ml-4">Mary</div>
        <div className="text-sm text-green-500 font-bold ml-4">
          Online
        </div>
      </div>
    </div>

    <div className="flex items-center space-x-2">
    <PopoverTriggerComponent src="/facetime.png" _className="w-24 h-12 rounded-full" content={<PopOverComponent callerVideoRef={callerRef} receiverVideoRef={receiverRef} callerUser="Mary" receiverUser="John"/>} videoOnClick={videoOnClick}/>
<LocationTrigger 
src="/map.png" 
_className="w-12 h-12 rounded-full ml-3" 
mapInitialiser={mapInitialiser}
addressConverter={addressConverter}
senderLoc={senderLoc}
receiverLoc={receiverLoc}/>

      <button>
        <img
          src="/about.png"
          alt="Image description"
          className="w-26 h-12 rounded-full ml-6"
        />
      </button>

      <a href="/buy">
        <img
          src="/cross.png"
          alt="Image description"
          className="w-26 h-12 rounded-full ml-6"
        />
      </a>
    </div>
  </div>



  );
}


export default TopRight;