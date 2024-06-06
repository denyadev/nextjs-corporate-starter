// "use client";

// import React, { useEffect, useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { useZoom } from "@/context/ZoomContext";

// const Meeting: React.FC = () => {
//   const { initializeZoom, zoomContainerRef, isInitialized } = useZoom();
//   const [userName, setUserName] = useState<string>("User");

//   const handleJoinClick = () => {
//     if (!isInitialized && userName) {
//       initializeZoom("86322258133", userName);
//     }
//   };

//   return (
//     <div className="relative p-0 m-0 w-full max-w-screen flex flex-col items-center justify-center">
//       <Button>Zoom</Button>
//       <div className="flex gap-2">
//         <Input
//           placeholder="Name"
//           value={userName}
//           onChange={(e) => setUserName(e.target.value)}
//         />
//         <Button onClick={handleJoinClick} variant="outline">
//           Join Meeting
//         </Button>
//       </div>
//       <div ref={zoomContainerRef} id="meetingSDKElement"></div>
//     </div>
//   );
// };

// Meeting.displayName = "Zoom Component View";

// export default Meeting;

"use client";

import { useZoom } from "@/context/ZoomContext";
import React, { useEffect } from "react";

const Meeting: React.FC = () => {
  const { zoomContainerRef, setMeetingNumber } = useZoom();

  useEffect(() => {
    setMeetingNumber("86322258133");
  }, [setMeetingNumber]);
  return (
    <div className="relative p-0 m-0 w-full max-w-screen flex flex-col items-center justify-center">
      <div ref={zoomContainerRef} id="meetingSDKElement"></div>
    </div>
  );
};

Meeting.displayName = "Zoom Component View";

export default Meeting;
