"use client";

import { renderContent } from "@/utils/rich-text-renderer";

export default function MarkdownTemplate({ content }: { content: any }) {
  return (
    <div>
      {content?.text && (
        <div>
          {content.text.map((note: any, index: number) => (
            <div key={index}>{renderContent(note)}</div>
          ))}
        </div>
      )}
    </div>
  );
}
