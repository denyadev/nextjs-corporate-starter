import { createEvent } from "ics";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest, res: NextResponse) {
  const { event, eventDate } = await req.json();

  const startDateTime = new Date(`${eventDate}T${event.start_time}Z`) as any; // Ensures UTC
  const endDateTime = new Date(`${eventDate}T${event.end_time}Z`) as any; // Ensures UTC

  const start = [
    startDateTime.getUTCFullYear(),
    startDateTime.getUTCMonth() + 1,
    startDateTime.getUTCDate(),
    startDateTime.getUTCHours(),
    startDateTime.getUTCMinutes(),
  ] as any;

  const durationMinutes = (endDateTime - startDateTime) / (1000 * 60);

  // Construct duration object for ics
  const duration = {
    minutes: durationMinutes,
  };

  // Convert structured text to plain text for description
  const description =
    event?.notes
      ?.map((note: any) =>
        note.children.map((item: any) => item.text).join("\n")
      )
      .join("\n") || "";

  const location =
    event?.locations
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
