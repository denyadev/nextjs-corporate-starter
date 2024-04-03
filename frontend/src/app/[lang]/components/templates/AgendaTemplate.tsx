"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import React, { useState } from "react";
import { formatDate } from "../../utils/api-helpers";

export default function AgendaTemplate({ content }: { content: any }) {
  const [selectedDate, setSelectedDate] = useState<string | null>(
    content.template[0].Date
  );

  //   console.log("AgendaTemplate content", content);

  // Filter agenda items based on the selected date
  const filteredAgenda = selectedDate
    ? content.template.filter((day: any) => day.Date === selectedDate)[0]
        ?.agenda || []
    : [];

  return (
    <div>
      <div className="my-4">
        <h1 className="heading">{content.heading}</h1>
        <h2 className="text-muted-foreground">{content.subheading}</h2>
      </div>

      <Card className="grid grid-cols-3 md:flex md:w-max flex-wrap mb-4">
        {content.template.map((day: any, index: number) => (
          <Button
            key={index}
            onClick={() => setSelectedDate(day.Date)}
            variant="ghost"
            className={`font-semibold text-sm py-2 px-4 rounded-none ${
              selectedDate === day.Date
                ? "border-b-2 text-black border-themePrimary bg-accent"
                : "text-gray-500"
            }`}
          >
            {formatDate(day.Date)}
          </Button>
        ))}
      </Card>
      {selectedDate && (
        <Card className="p-2 md:p-4 divide-y">
          {filteredAgenda.map((agenda: any, index: number) => (
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
  //   const { t, i18n } = useTranslation();
  //   const currentLocale = i18n.language;
  const [isDescriptionVisible, setIsDescriptionVisible] = useState(false);

  const hasDescription = !!item.description;
  const toggleDescription = () => {
    if (hasDescription) {
      setIsDescriptionVisible(!isDescriptionVisible);
    }
  };

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
            {/* {event?.notes && (
              <ul className="list-disc pl-5 mt-2 space-y-1">
                {event?.notes?.map(
                  (note: { en: string; fr: string }, index: number) => (
                    <li key={index} className="text-sm text-muted-foreground">
                      {note?.en}
                    </li>
                  )
                )}
              </ul>
            )} */}
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-1">
          {item?.start_time && (
            <Badge className="hover:bg-white shadow hover:text-black cursor-default min-w-max h-max bg-themePrimary">
              <span className="font-medium text-xs">{item?.start_time}</span>
            </Badge>
          )}

          {item?.start_time && item?.end_time && (
            <Badge
              variant="secondary"
              className="hover:bg-white shadow hover:text-black cursor-default min-w-max h-max"
            >
              <span className="font-medium text-xs text-muted-foreground">
                {item?.end_time}
              </span>
            </Badge>
          )}
        </div>
      </div>

      {/* <div className="ml-12">
        <div className="flex gap-1">
          {event?.location &&
            event?.location?.length > 0 &&
            event?.location?.map((loc: string, index: number) => (
              <Link key={index} href="/floor-plan">
                <Badge
                  variant="secondary"
                  className="gap-1 text-xs hover:border-l-4 hover:border-l-themePrimary"
                >
                  <MapPinned className="flex-shrink-0 w-5 h-5 text-themePrimary" />
                  {loc}
                </Badge>
              </Link>
            ))}
        </div> */}
      {/* <div className="flex gap-1">
          {event?.speakers &&
            event?.speakers?.length > 0 &&
            event?.speakers?.map((speaker: string, index: number) => (
              <Link key={index} href="/speakers">
                <Badge
                  variant="secondary"
                  className="gap-1 text-xs hover:border-l-4 hover:border-l-emerald-600"
                >
                  <Volume2 className="flex-shrink-0 w-5 h-5 text-emerald-600" />
                  {speaker}
                </Badge>
              </Link>
            ))}
        </div> */}
      {/* <div className="flex flex-col md:flex-row gap-1">
          {event?.files?.map((file: any, index: number) => {
            let iconPath;
            switch (file?.extension) {
              case "pdf":
                iconPath = "/icons/pdf.svg";
                break;
              case "doc":
              case "docx":
                iconPath = "/icons/doc.svg";
                break;
              case "xls":
              case "xlsx":
              case "csv":
                iconPath = "/icons/xls.svg";
                break;
              case "ppt":
              case "pptx":
                iconPath = "/icons/ppt.svg";
                break;
              default:
                iconPath = "/icons/default.svg"; // A default icon in case of no match
            }

            return (
              <a
                href={file?.url} // Assuming you have a direct link or you might need to construct the URL
                target="_blank"
                rel="noopener noreferrer"
                key={index}
              >
                <Badge
                  key={index}
                  variant="secondary"
                  className="gap-2 text-xs hover:bg-themePrimary hover:text-white"
                >
                  <img
                    src={iconPath}
                    alt={file?.extension}
                    className="max-w-5 max-h-5 object-contain"
                  />
                  {file?.originalFilename}
                </Badge>
              </a>
            );
          })}
        </div> */}
    </div>
  );
}
