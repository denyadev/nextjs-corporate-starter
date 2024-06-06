"use client";
import { useEffect } from "react";
import Meeting from "../MeetingComponent";
import { useZoom } from "@/context/ZoomContext";

export default function ZoomPage() {
  const { setMeetingNumber } = useZoom();
  useEffect(() => {
    setMeetingNumber("86322258133");
  }, [setMeetingNumber]);

  return <Meeting />;
}
