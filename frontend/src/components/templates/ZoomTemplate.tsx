"use client";
import { useEffect } from "react";
import Meeting from "../MeetingComponent";
import { useZoom } from "@/context/ZoomContext";

export default function ZoomPage() {
  const { setMeetingNumber } = useZoom();
  useEffect(() => {
    setMeetingNumber("82445108777");
  }, [setMeetingNumber]);

  return <Meeting />;
}
