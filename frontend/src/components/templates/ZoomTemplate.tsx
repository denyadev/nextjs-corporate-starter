"use client";

import MeetingComponent from "../MeetingComponent";

export default function ZoomTemplate({ content }: { content: any }) {
  return (
    <section className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <MeetingComponent meetingNumber={content.meetingnumber} />
      </div>
    </section>
  );
}
