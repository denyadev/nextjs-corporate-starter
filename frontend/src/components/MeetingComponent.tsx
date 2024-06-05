// MeetingComponent.tsx
"use client";

import { useState, useEffect } from "react";
import { Input } from "./ui/input";
import { Button } from "@/components/ui/button";
import { useMeeting } from "@/context/MeetingContext";
import { generateSignature } from "@/lib/generateSignature";

const MeetingComponent = ({ meetingNumber }: { meetingNumber: string }) => {
  const [name, setName] = useState("");
  const { isConnected, joinMeeting } = useMeeting();

  useEffect(() => {
    if (isConnected) {
      const initializeZoom = async () => {
        try {
          const ZoomEmbed = (await import("@zoomus/websdk/embedded")).default;
          const client = ZoomEmbed.createClient();
          const signature = generateSignature(meetingNumber);
          let meetingSDKElement = document.getElementById("meetingSDKElement");

          if (meetingSDKElement) {
            client.init({
              language: "en-US",
              zoomAppRoot: meetingSDKElement,
            });

            client.join({
              sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID,
              signature: signature,
              meetingNumber,
              userName: name,
            });
          } else {
            console.error("meetingSDKElement not found");
          }
        } catch (error) {
          console.error("Error during Zoom meeting initialization:", error);
        }
      };

      initializeZoom();
    }
  }, [isConnected, meetingNumber, name]);

  return (
    <div className="relative p-0 m-0 w-full max-w-screen flex flex-col justify-center">
      {!isConnected && (
        <div className="flex gap-2 max-w-sm">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <Button
            onClick={() => joinMeeting(meetingNumber, name)}
            variant="outline"
          >
            Join Meeting
          </Button>
        </div>
      )}

      {isConnected && <div className="relative" id="meetingSDKElement"></div>}
    </div>
  );
};

MeetingComponent.displayName = "Zoom Component View";

export default MeetingComponent;
