"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { formatDate, getStrapiMedia } from "../../utils/api-helpers";
import Link from "next/link";
import { MapPinned, PlusCircleIcon, Volume2 } from "lucide-react";
import { createEvent } from "ics";
import { renderContent } from "@/utils/rich-text-renderer";

export default function AgendaTemplate({ content }: { content: any }) {
  // Sort the content by date and then set the initial selected date to the first one
  const sortedContent = content.sort(
    (a: any, b: any) => new Date(a.Date).getTime() - new Date(b.Date).getTime()
  );

  const [selectedDate, setSelectedDate] = useState<string | null>(
    sortedContent[0]?.Date
  );

  // Filter and sort the agenda items for the selected date
  const filteredAgenda =
    sortedContent.find((item: any) => item.Date === selectedDate)?.agenda || [];
  const sortedAgenda = filteredAgenda.sort((a: any, b: any) =>
    a.start_time.localeCompare(b.start_time)
  );

  return (
    <div className="">
      <div className="grid grid-cols-4 md:flex mb-4 flex-wrap gap-2">
        {sortedContent.map((day: any, index: number) => (
          <Button
            key={index}
            onClick={() => setSelectedDate(day.Date)}
            variant="outline"
            className={`font-semibold text-xs rounded-sm shadow-sm ${
              selectedDate === day.Date
                ? "border-b-2 text-secondary-foreground border-themePrimary bg-accent"
                : "text-gray-500"
            }`}
          >
            {formatDate(day.Date)}
          </Button>
        ))}
      </div>
      {selectedDate && (
        <div>
          {sortedAgenda.map((agenda: any, index: number) => (
            <div key={index} className="mb-2">
              <AgendaItem
                item={agenda}
                index={index}
                eventDate={selectedDate}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AgendaItem({
  item,
  index,
  eventDate,
}: {
  item: any;
  index: number;
  eventDate: string | null;
}) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const hasDescription = !!item.description;

  const toggleDescription = () => {
    if (hasDescription) {
      setIsDescriptionVisible(!isDescriptionVisible);
    }
  };

  function downloadIcs(event: any) {
    fetch("/api/generate-ics", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ event: event, eventDate: eventDate }),
    })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${event.name}.ics`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        window.URL.revokeObjectURL(url);
      })
      .catch((error) => console.error("Error downloading ICS:", error));
  }

  return (
    <div className="flex space-x-4 min-h-24">
      {/* Left */}
      <div className="flex flex-col gap-1">
        {item?.start_time && (
          <div className="w-16">
            <Badge className="hover:bg-white shadow hover:text-black cursor-default h-max bg-themePrimary">
              <span className="font-medium text-xs">
                {formatTime(item?.start_time)}
              </span>
            </Badge>
          </div>
        )}

        {item?.start_time && item?.end_time && (
          <div className="w-16">
            <Badge
              variant="secondary"
              className="hover:bg-white shadow hover:text-black cursor-default h-max"
            >
              <span className="font-medium text-xs text-muted-foreground">
                {formatTime(item?.end_time)}
              </span>
            </Badge>
          </div>
        )}
      </div>

      {/* Right */}
      <div className="border-l-4 space-y-2 md:space-y-0 border border-l-themePrimary w-full rounded-sm hover:bg-accent hover:border-l-themeAccent flex flex-col md:flex-row md:items-center justify-between px-4 relative">
        {/* Add to Calendar */}
        <div
          onClick={() => downloadIcs(item)}
          className="absolute border-l right-0 text-xs text-muted-foreground gap-1 flex flex-col items-center bg-accent h-full justify-center px-1 hover:bg-themeAccent group hover:text-white cursor-pointer"
        >
          <PlusCircleIcon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-white" />
        </div>
        <div className="flex items-center md:justify-center gap-4 h-full mr-2">
          {/* <div className="border-2 p-0 m-0 rounded-full min-w-8 min-h-8 text-sm items-center flex justify-center border-themePrimary">
            {index + 1}
          </div> */}
          <div className="">
            <span className="flex-grow font-medium text-lg">{item?.name}</span>
            {item?.notes && (
              <div className="text-muted-foreground">
                {item.notes.map((note: any, index: number) => (
                  <div key={index}>{renderContent(note)}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:justify-end md:text-right md:items-end pr-6 py-2 md:m-0">
          <div className="flex flex-col md:flex-row md:gap-1">
            {item.speakers &&
              item.speakers.map((speakerList: any, listIndex: number) => (
                <ul key={listIndex} className="flex">
                  {speakerList.children.map(
                    (speakerItem: any, itemIndex: number) =>
                      speakerItem.text !== "" ? (
                        <li key={itemIndex}>
                          {/* <Link href="/speakers"> */}
                          <div>
                            <Badge
                              variant="secondary"
                              className="gap-2 text-xs hover:border-l-4 hover:border-themeAccent font-normal"
                            >
                              <Volume2 className="flex-shrink-0 w-4 h-4 text-themeAccent" />
                              {speakerItem.text}
                            </Badge>
                          </div>
                          {/* </Link> */}
                        </li>
                      ) : null
                  )}
                </ul>
              ))}
          </div>
          <div className="flex flex-col md:flex-row md:gap-1 w-full">
            {item.locations &&
              item.locations.map((locationList: any, listIndex: number) => (
                <ul key={listIndex} className="flex">
                  {locationList.children.map(
                    (locationItem: any, itemIndex: number) =>
                      locationItem.text !== "" ? (
                        <li key={itemIndex}>
                          {/* <Link href="/floor-plan"> */}
                          <div>
                            <Badge
                              variant="secondary"
                              className="gap-2 text-xs hover:border-l-4 hover:border-themePrimary font-normal w-full"
                            >
                              <MapPinned className="flex-shrink-0 w-4 h-4 text-themePrimary" />
                              {locationItem.text}
                            </Badge>
                          </div>
                          {/* </Link> */}
                        </li>
                      ) : null
                  )}
                </ul>
              ))}
          </div>

          <div className="flex flex-col">
            {item.media?.data?.map((fileWrapper: any, index: number) => {
              const file = fileWrapper.attributes;
              let iconPath;

              // Use file extension to determine the icon
              switch (file.ext) {
                case ".pdf":
                  iconPath = "/icons/pdf.svg";
                  break;
                case ".doc":
                case ".docx":
                  iconPath = "/icons/doc.svg";
                  break;
                case ".xls":
                case ".xlsx":
                case ".csv":
                  iconPath = "/icons/xls.svg";
                  break;
                case ".ppt":
                case ".pptx":
                  iconPath = "/icons/ppt.svg";
                  break;
                default:
                  iconPath = "/icons/default.svg"; // A default icon for unsupported extensions
              }

              return (
                <Link
                  href={getStrapiMedia(file.url) || ""} // Construct the URL using getStrapiURL for local files
                  target="_blank"
                  rel="noopener noreferrer"
                  key={index}
                >
                  <div>
                    <Badge
                      key={index}
                      variant="secondary"
                      className="gap-2 text-xs hover:bg-themePrimary hover:text-white font-normal"
                    >
                      <img
                        src={iconPath}
                        width={24}
                        height={24}
                        alt={file.ext.substring(1)}
                        className="max-w-4 max-h-4 object-contain"
                      />
                      {file.name}
                    </Badge>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

function formatTime(time: string): string {
  const [hour, minute] = time.split(":");
  const hourInt = parseInt(hour, 10);
  const suffix = hourInt >= 12 ? "PM" : "AM";
  const formattedHour = ((hourInt + 11) % 12) + 1; // Convert 24hr to 12hr format
  return `${formattedHour}:${minute}${suffix}`;
}
