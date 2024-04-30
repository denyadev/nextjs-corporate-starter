import { createEvent } from "ics";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { event, eventDate } = await req.json();
  console.log("event", event, eventDate);

  // Parse eventDate and times
  const dateParts = eventDate
    .split("-")
    .map((part: string) => parseInt(part, 10)); // [year, month, day]
  const startTimeParts = event.start_time
    .split(":")
    .map((part: string) => parseInt(part, 10)); // [hour, minute, second]
  const endTimeParts = event.end_time
    .split(":")
    .map((part: string) => parseInt(part, 10)); // [hour, minute, second]

  const start = [
    dateParts[0],
    dateParts[1],
    dateParts[2],
    startTimeParts[0],
    startTimeParts[1],
  ] as any;
  const end = [
    dateParts[0],
    dateParts[1],
    dateParts[2],
    endTimeParts[0],
    endTimeParts[1],
  ] as any;

  // Convert structured text to plain text
  const description = event.notes
    .map((note: any) => note.children.map((item: any) => item.text).join("\n"))
    .join("\n");
  const location = event.locations
    .map((loc: any) => loc.children.map((item: any) => item.text).join(", "))
    .join("\n");

  const { error, value } = createEvent({
    start,
    end,
    title: event.name,
    description: description,
    location: location,
  });

  if (error) {
    console.error("ICS creation failed:", error);
    return new Response("Failed to create ICS file", { status: 500 });
  }
  return new Response(value, {
    headers: {
      "Content-Type": "text/calendar",
    },
  });
}
