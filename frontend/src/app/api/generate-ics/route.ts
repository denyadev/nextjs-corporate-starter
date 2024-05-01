import { DateTime, createEvent } from "ics";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { event, eventDate } = await req.json();

  // Parse eventDate and times
  const dateParts = eventDate
    .split("-")
    .map((part: string) => parseInt(part, 10)); // [year, month, day]
  const startTimeParts = event.start_time
    .split(":")
    .map((part: string) => parseInt(part, 10)); // [hour, minute]

  // Check if end time is provided
  const endTimeParts = event.end_time
    ? event.end_time.split(":").map((part: string) => parseInt(part, 10))
    : null; // [hour, minute]

  // Combine date and time parts for start
  const start = [
    dateParts[0], // year
    dateParts[1], // month
    dateParts[2], // day
    startTimeParts[0], // hour
    startTimeParts[1], // minute
  ] as DateTime; // This is treated as a 'floating' time with no timezone conversion

  // Calculate duration in minutes
  let durationMinutes;
  if (endTimeParts) {
    const startDateTime = new Date(`${eventDate}T${event.start_time}`); // No timezone info, treated as floating
    const endDateTime = new Date(`${eventDate}T${event.end_time}`);
    durationMinutes = (endDateTime.getTime() - startDateTime.getTime()) / 60000;
  } else {
    durationMinutes = 60; // Default duration if no end time is provided
  }

  const duration = {
    minutes: durationMinutes,
  };

  // Convert structured text to plain text for description
  const description =
    event.notes
      ?.map((note: any) =>
        note.children.map((item: any) => item.text).join("\n")
      )
      .join("\n") || "";
  const location =
    event.locations
      ?.map((loc: any) => loc.children.map((item: any) => item.text).join(", "))
      .join("\n") || "";

  const { error, value } = createEvent({
    title: event.name,
    description,
    location,
    start,
    duration,
    productId: `dataonthespot/${event.name.replace(/[^a-z0-9]/gi, "_")}/ics`,
    alarms: [
      { action: "display", trigger: { minutes: 30 }, description: "Reminder" },
    ],
  });

  if (error) {
    console.error("ICS creation failed:", error);
    return new Response("Failed to create ICS file", { status: 500 });
  }

  console.log("ICS value", value);
  return new Response(value, {
    headers: {
      "Content-Type": "text/calendar",
      "Content-Disposition": `attachment; filename="${event.name.replace(
        /[^a-z0-9]/gi,
        "_"
      )}.ics"`,
    },
  });
}
