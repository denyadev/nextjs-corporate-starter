"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { formatDate, getStrapiMedia } from "../../utils/api-helpers";
import Image from "next/image";
import Link from "next/link";
import { MapPinned, Volume2 } from "lucide-react";

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
    <div>
      <div className="flex mb-4 flex-wrap">
        {sortedContent.map((day: any, index: number) => (
          <Button
            key={index}
            onClick={() => setSelectedDate(day.Date)}
            variant="ghost"
            className={`font-semibold text-sm py-6 px-6 rounded-none bg-white shadow ${
              selectedDate === day.Date
                ? "border-b-2 text-black border-themePrimary bg-accent"
                : "text-gray-500"
            }`}
          >
            {formatDate(day.Date)}
          </Button>
        ))}
      </div>
      {selectedDate && (
        <Card className="p-2 md:p-4 divide-y">
          {sortedAgenda.map((agenda: any, index: number) => (
            <div key={index} className="mb-4">
              <AgendaItem item={agenda} index={index} />
            </div>
          ))}
        </Card>
      )}
    </div>
  );
}

function AgendaItem({ item, index }: { item: any; index: number }) {
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const hasDescription = !!item.description;
  const toggleDescription = () => {
    if (hasDescription) {
      setIsDescriptionVisible(!isDescriptionVisible);
    }
  };

  console.log(item);

  return (
    <div
      className={`hover:bg-slate-50 p-3 w-full space-y-4 transition duration-200`}
      onClick={toggleDescription}
    >
      <div className="flex flex-row justify-between">
        <div className="flex gap-4 min-w-0">
          <div>
            <span className="border rounded-full w-7 h-7 items-center flex justify-center border-themePrimary">
              {index + 1}
            </span>
          </div>

          <div className="flex flex-col min-w-0">
            <span className="flex-grow font-medium text-base">
              {item?.name}
            </span>
            <div className="text-sm text-gray-500">{item?.description}</div>

            {item?.notes && (
              <div>
                {item.notes.map((note: any, index: number) => (
                  <div key={index}>{renderContent(note)}</div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-1">
          {item?.start_time && (
            <Badge className="hover:bg-white shadow hover:text-black cursor-default min-w-max h-max bg-themePrimary">
              <span className="font-medium text-xs">
                {formatTime(item?.start_time)}
              </span>
            </Badge>
          )}

          {item?.start_time && item?.end_time && (
            <Badge
              variant="secondary"
              className="hover:bg-white shadow hover:text-black cursor-default min-w-max h-max"
            >
              <span className="font-medium text-xs text-muted-foreground">
                {formatTime(item?.end_time)}
              </span>
            </Badge>
          )}
        </div>
      </div>
      <div className="ml-12 flex flex-col space-y-1">
        <div className="flex gap-1">
          {item.locations &&
            item.locations.map((locationList: any, listIndex: number) => (
              <ul key={listIndex} className="flex gap-1">
                {locationList.children.map(
                  (locationItem: any, itemIndex: number) =>
                    locationItem.text !== "" ? (
                      <li key={itemIndex}>
                        <Link href="/floor-plan">
                          <Badge
                            variant="secondary"
                            className="gap-2 text-xs hover:border-l-4 hover:border-l-themePrimary"
                          >
                            <MapPinned className="flex-shrink-0 w-5 h-5 text-themePrimary" />
                            {locationItem.text}
                          </Badge>
                        </Link>
                      </li>
                    ) : null
                )}
              </ul>
            ))}
        </div>
        <div className="flex gap-1">
          {item.speakers &&
            item.speakers.map((speakerList: any, listIndex: number) => (
              <ul key={listIndex}>
                {speakerList.children.map(
                  (speakerItem: any, itemIndex: number) =>
                    speakerItem.text !== "" ? (
                      <li key={itemIndex}>
                        <Link href="/speakers">
                          <Badge
                            variant="secondary"
                            className="gap-2 text-xs hover:border-l-4 hover:border-l-emerald-600"
                          >
                            <Volume2 className="flex-shrink-0 w-5 h-5 text-emerald-600" />
                            {speakerItem.text}
                          </Badge>
                        </Link>
                      </li>
                    ) : null
                )}
              </ul>
            ))}
        </div>

        <div className="flex flex-col md:flex-row gap-1">
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
                <Badge
                  key={index}
                  variant="secondary"
                  className="gap-2 text-xs hover:bg-themePrimary hover:text-white"
                >
                  <Image
                    src={iconPath}
                    width={24}
                    height={24}
                    alt={file.ext.substring(1)}
                    className="max-w-5 max-h-5 object-contain"
                  />
                  {file.name}
                </Badge>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const renderText = (textNode: any) => {
  const baseStyle = "inline text-sm";
  let extraStyle = "";

  if (textNode.bold) {
    extraStyle += " font-bold";
  }
  if (textNode.italic) {
    extraStyle += " italic";
  }
  if (textNode.underline) {
    extraStyle += " underline";
  }
  if (textNode.strikethrough) {
    extraStyle += " line-through";
  }
  if (textNode.code) {
    extraStyle += " bg-gray-200 px-1 py-0.5 rounded";
  }

  return <span className={baseStyle + extraStyle}>{textNode.text}</span>;
};

const renderContent = (note: any) => {
  switch (note.type) {
    case "paragraph":
      return (
        <p className="mb-2">
          {note.children.map((child: any, index: number) =>
            child.type === "text" ? (
              renderText(child)
            ) : (
              <a
                key={index}
                href={child.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:text-blue-700"
              >
                {child.children.map(renderText)}
              </a>
            )
          )}
        </p>
      );

    case "list":
      const ListComponent = note.format === "unordered" ? "ul" : "ol";
      const listStyle =
        note.format === "unordered" ? "list-disc" : "list-decimal";
      return (
        <ListComponent key={note.type} className={`pl-5 ${listStyle}`}>
          {note.children.map((listItem: any, index: number) => (
            <li key={index}>{listItem.children.map(renderText)}</li>
          ))}
        </ListComponent>
      );

    case "heading":
      const headingSizes: { [key: number]: string } = {
        1: "text-3xl",
        2: "text-2xl",
        3: "text-xl",
        4: "text-lg",
        5: "text-md",
        6: "text-sm",
      };
      const headingSize = headingSizes[note.level] + " font-bold mb-2";
      return <div className={headingSize}>{note.children.map(renderText)}</div>;

    case "quote":
      return (
        <blockquote className="border-l-4 border-gray-400 pl-4 italic my-2">
          {note.children.map(renderText)}
        </blockquote>
      );

    case "code":
      return (
        <pre className="bg-gray-100 p-3 rounded my-2">
          {note.children.map(renderText)}
        </pre>
      );

    case "image":
      return (
        <Image
          key={note.type}
          src={getStrapiMedia(note.image.url) || "/"}
          alt={note.image.alternativeText || "image"}
          width={note.image.width}
          height={note.image.height}
          className="my-2"
        />
      );

    default:
      return <span>{note.children.map(renderText)}</span>;
  }
};

function formatTime(time: string): string {
  const [hour, minute] = time.split(":");
  const hourInt = parseInt(hour, 10);
  const suffix = hourInt >= 12 ? "PM" : "AM";
  const formattedHour = ((hourInt + 11) % 12) + 1; // Convert 24hr to 12hr format
  return `${formattedHour}:${minute}${suffix}`;
}
