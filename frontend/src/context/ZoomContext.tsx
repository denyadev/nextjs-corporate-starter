"use client";
// // src/contexts/ZoomContext.tsx
// import React, {
//   createContext,
//   useContext,
//   useState,
//   ReactNode,
//   useRef,
//   useEffect,
// } from "react";
// import { generateSignature } from "@/lib/generateSignature";

// interface ZoomContextProps {
//   meetingNumber: string | null;
//   setMeetingNumber: (meetingNumber: string | null) => void;
//   initializeZoom: (meetingNumber: string, userName: string) => void;
//   zoomContainerRef: React.RefObject<HTMLDivElement>;
//   isInitialized: boolean;
//   setIsInitialized: (isInitialized: boolean) => void;
// }

// const ZoomContext = createContext<ZoomContextProps | undefined>(undefined);

// export const useZoom = (): ZoomContextProps => {
//   const context = useContext(ZoomContext);
//   if (!context) {
//     throw new Error("useZoom must be used within a ZoomProvider");
//   }
//   return context;
// };

// interface ZoomProviderProps {
//   children: ReactNode;
// }

// export const ZoomProvider: React.FC<ZoomProviderProps> = ({ children }) => {
//   const [meetingNumber, setMeetingNumber] = useState<string | null>(null);
//   const [isInitialized, setIsInitialized] = useState<boolean>(false);
//   const zoomContainerRef = useRef<HTMLDivElement>(null);
//   const clientRef = useRef<any>(null);

//   const initializeZoom = async (meetingNumber: string, userName: string) => {
//     if (!zoomContainerRef.current || isInitialized) return;

//     try {
//       const ZoomEmbed = (await import("@zoomus/websdk/embedded")).default;
//       const client = ZoomEmbed.createClient();
//       const signature = generateSignature(meetingNumber);

//       client.init({
//         language: "en-US",
//         zoomAppRoot: zoomContainerRef.current,
//       });
//       console.log(meetingNumber, userName);
//       client.join({
//         sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID!,
//         signature: signature,
//         meetingNumber,
//         userName,
//       });

//       clientRef.current = client;
//       setIsInitialized(true);
//     } catch (error) {
//       console.error("Error during Zoom meeting initialization:", error);
//     }
//   };

//   useEffect(() => {
//     if (meetingNumber) {
//       initializeZoom(meetingNumber, "Default User");
//     }
//   }, [meetingNumber]);

//   return (
//     <ZoomContext.Provider
//       value={{
//         meetingNumber,
//         setMeetingNumber,
//         initializeZoom,
//         zoomContainerRef,
//         isInitialized,
//         setIsInitialized,
//       }}
//     >
//       {children}
//     </ZoomContext.Provider>
//   );
// };

// src/contexts/ZoomContext.tsx
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useRef,
  useEffect,
} from "react";
import { generateSignature } from "@/lib/generateSignature";

interface ZoomContextProps {
  meetingNumber: string | null;
  setMeetingNumber: (meetingNumber: string | null) => void;
  initializeZoom: (meetingNumber: string, userName: string) => void;
  zoomContainerRef: React.RefObject<HTMLDivElement>;
  isInitialized: boolean;
  setIsInitialized: (isInitialized: boolean) => void;
}

const ZoomContext = createContext<ZoomContextProps | undefined>(undefined);

export const useZoom = (): ZoomContextProps => {
  const context = useContext(ZoomContext);
  if (!context) {
    throw new Error("useZoom must be used within a ZoomProvider");
  }
  return context;
};

interface ZoomProviderProps {
  children: ReactNode;
}

export const ZoomProvider: React.FC<ZoomProviderProps> = ({ children }) => {
  const [meetingNumber, setMeetingNumber] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);
  const zoomContainerRef = useRef<HTMLDivElement>(null);
  const clientRef = useRef<any>(null);

  const initializeZoom = async (meetingNumber: string, userName: string) => {
    if (!zoomContainerRef.current || isInitialized) return;

    try {
      const ZoomEmbed = (await import("@zoomus/websdk/embedded")).default;
      const client = ZoomEmbed.createClient();
      const signature = generateSignature(meetingNumber);

      client.init({
        language: "en-US",
        zoomAppRoot: zoomContainerRef.current,
      });

      client.join({
        sdkKey: process.env.NEXT_PUBLIC_ZOOM_CLIENT_ID!,
        signature: signature,
        meetingNumber,
        userName,
      });

      clientRef.current = client;
      setIsInitialized(true);
    } catch (error) {
      console.error("Error during Zoom meeting initialization:", error);
    }
  };

  useEffect(() => {
    if (meetingNumber && !isInitialized) {
      initializeZoom(meetingNumber, "Test");
    }
  }, [meetingNumber, isInitialized]);

  return (
    <ZoomContext.Provider
      value={{
        meetingNumber,
        setMeetingNumber,
        initializeZoom,
        zoomContainerRef,
        isInitialized,
        setIsInitialized,
      }}
    >
      {children}
    </ZoomContext.Provider>
  );
};
