// context/MeetingContext.tsx
"use client";
import React, { createContext, useContext, useState } from "react";

interface MeetingContextProps {
  isConnected: boolean;
  joinMeeting: (meetingNumber: string, userName: string) => void;
}

const MeetingContext = createContext<MeetingContextProps | undefined>(
  undefined
);

export const useMeeting = () => {
  const context = useContext(MeetingContext);
  if (!context) {
    throw new Error("useMeeting must be used within a MeetingProvider");
  }
  return context;
};

export const MeetingProvider: React.FC = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);

  const joinMeeting = (meetingNumber: string, userName: string) => {
    // Add your join meeting logic here, for now we just set isConnected to true
    setIsConnected(true);
  };

  return (
    <MeetingContext.Provider value={{ isConnected, joinMeeting }}>
      {children}
    </MeetingContext.Provider>
  );
};
