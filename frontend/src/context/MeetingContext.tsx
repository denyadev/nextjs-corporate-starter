"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import { generateSignature } from "@/lib/generateSignature";

interface MeetingContextProps {
  client: any;
  isConnected: boolean;
  joinMeeting: (meetingNumber: string, userName: string) => void;
  leaveMeeting: () => void;
}

const MeetingContext = createContext<MeetingContextProps | undefined>(
  undefined
);

export const MeetingProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [client, setClient] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [meetingInfo, setMeetingInfo] = useState<{
    meetingNumber: string;
    userName: string;
  } | null>(null);

  useEffect(() => {
    const storedMeetingInfo = sessionStorage.getItem("meetingInfo");
    if (storedMeetingInfo) {
      const parsedInfo = JSON.parse(storedMeetingInfo);
      setMeetingInfo(parsedInfo);
      setIsConnected(true);
    }
  }, []);

  const joinMeeting = async (meetingNumber: string, userName: string) => {
    if (client) return;

    try {
      const ZoomEmbed = (await import("@zoomus/websdk/embedded")).default;
      const zoomClient = ZoomEmbed.createClient();
      const signature = generateSignature(meetingNumber);

      const initializeZoom = () => {
        let meetingSDKElement = document.getElementById("meetingSDKElement");
        if (meetingSDKElement) {
          zoomClient.init({
            language: "en-US",
            zoomAppRoot: meetingSDKElement,
            customize: {
              video: {
                viewSizes: {
                  default: {
                    width: 1370,
                    height: 800,
                  },
                },
              },
            },
          });

          zoomClient.join({
            sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID,
            signature: signature,
            meetingNumber,
            userName,
          });

          setClient(zoomClient);
          setIsConnected(true);
          setMeetingInfo({ meetingNumber, userName });
          sessionStorage.setItem(
            "meetingInfo",
            JSON.stringify({ meetingNumber, userName })
          );
        } else {
          console.error("meetingSDKElement not found");
        }
      };

      // Initialize Zoom client
      initializeZoom();
    } catch (error) {
      console.error("Error during Zoom meeting initialization:", error);
    }
  };

  const leaveMeeting = () => {
    if (client) {
      client.leave();
      setClient(null);
      setIsConnected(false);
      setMeetingInfo(null);
      sessionStorage.removeItem("meetingInfo");
    }
  };

  useEffect(() => {
    if (isConnected && meetingInfo) {
      const reinitializeZoom = async () => {
        try {
          const ZoomEmbed = (await import("@zoomus/websdk/embedded")).default;
          const zoomClient = ZoomEmbed.createClient();
          const signature = generateSignature(meetingInfo.meetingNumber);

          const initializeZoom = () => {
            let meetingSDKElement =
              document.getElementById("meetingSDKElement");
            if (meetingSDKElement) {
              zoomClient.init({
                language: "en-US",
                zoomAppRoot: meetingSDKElement,
                customize: {
                  video: {
                    viewSizes: {
                      default: {
                        width: 1370,
                        height: 800,
                      },
                    },
                  },
                },
              });

              zoomClient.join({
                sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID,
                signature: signature,
                meetingNumber: meetingInfo.meetingNumber,
                userName: meetingInfo.userName,
              });

              setClient(zoomClient);
            } else {
              console.error("meetingSDKElement not found");
            }
          };

          // Reinitialize Zoom client
          initializeZoom();
        } catch (error) {
          console.error("Error during Zoom meeting reinitialization:", error);
        }
      };

      reinitializeZoom();
    }
  }, [isConnected, meetingInfo]);

  return (
    <MeetingContext.Provider
      value={{ client, isConnected, joinMeeting, leaveMeeting }}
    >
      {children}
    </MeetingContext.Provider>
  );
};

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error("useMeeting must be used within a MeetingProvider");
  }
  return context;
};
