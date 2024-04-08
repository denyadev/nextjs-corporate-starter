"use client";
import { Card } from "@/components/ui/card";
import { getStrapiMedia } from "../../utils/api-helpers";
import Image from "next/image";

export default function MarkdownTemplate({ content }: { content: any }) {
  return (
    <div>
      {content?.text && (
        <Card className="p-2 md:p-4">
          {content.text.map((note: any, index: number) => (
            <div key={index}>{renderContent(note)}</div>
          ))}
        </Card>
      )}
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
          className="my-2 object-contain max-h-[300px] w-full"
        />
      );

    default:
      return <span>{note.children.map(renderText)}</span>;
  }
};
