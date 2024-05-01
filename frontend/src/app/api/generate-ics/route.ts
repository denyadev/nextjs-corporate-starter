import { createEvent } from "ics";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { event, eventDate } = await req.json();
  console.log("event", event, eventDate);

  // Parse eventDate and times
  const dateParts = eventDate.split("-").map((part: any) => parseInt(part, 10)); // [year, month, day]
  const startTimeParts = event.start_time
    .split(":")
    .map((part: any) => parseInt(part, 10)); // [hour, minute, second]
  const endTimeParts = event.end_time
    .split(":")
    .map((part: any) => parseInt(part, 10)); // [hour, minute, second]

  // Combine date and time parts for start
  const start = [
    ...dateParts.slice(0, 3),
    ...startTimeParts.slice(0, 2),
  ] as any; // [year, month, day, hour, minute]

  // Calculate duration in minutes
  const startMinutes = startTimeParts[0] * 60 + startTimeParts[1];
  const endMinutes = endTimeParts[0] * 60 + endTimeParts[1];
  const durationMinutes = endMinutes - startMinutes;

  // Construct duration object for ics
  const duration = {
    minutes: durationMinutes,
  };
  console.log(start, duration);

  // Convert structured text to plain text for description
  const description =
    event?.notes
      ?.map((note: any) =>
        note.children.map((item: any) => item.text).join("\n")
      )
      .join("\n") || "";
  console.log("description", description);
  const location =
    event?.locations
      ?.map((loc: any) => loc.children.map((item: any) => item.text).join(", "))
      .join("\n") || "";
  console.log("location", location);

  const { error, value } = createEvent({
    title: event.name,
    description,
    location,
    start,
    duration,
  });
  if (error) {
    console.error("ICS creation failed:", error);
    return new Response("Failed to create ICS file", { status: 500 });
  }
  console.log("value", value);
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
