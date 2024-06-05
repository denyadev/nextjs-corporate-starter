// components/ZoomPortal.tsx
"use client";
import React, { useRef, useEffect } from "react";

const ZoomPortal: React.FC<{ showVideo: boolean }> = ({ showVideo }) => {
  const zoomMeetingDiv = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (zoomMeetingDiv.current) {
      zoomMeetingDiv.current.style.display = showVideo ? "block" : "none";
    }
  }, [showVideo]);

  return (
    <div ref={zoomMeetingDiv} id="meetingSDKElement">
      <div id="zmmtg-root"></div>
      <div id="aria-notify-area"></div>
    </div>
  );
};

export default ZoomPortal;
