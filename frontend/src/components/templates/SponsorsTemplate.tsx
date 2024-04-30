"use client";
import { getStrapiMedia } from "@/utils/api-helpers";
import { DirectionAwareHover } from "../ui/direction-aware-hover";

export default function SponsorsTemplate({ content }: { content: any }) {
  return (
    <div className="relative grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {content.sponsor.length === 0 && <div>Please upload some content!</div>}
      {content.sponsor.map((sponsor: any, index: number) => (
        <div
          onClick={() => {
            if (sponsor && sponsor.url) {
              window.open(sponsor.url, "_blank", "noopener,noreferrer");
            }
          }}
          className="cursor-pointer"
        >
          <DirectionAwareHover
            imageUrl={getStrapiMedia(sponsor.media.data.attributes.url) || "/"}
            imageWidth={sponsor.media.data.attributes.width}
            imageHeight={sponsor.media.data.attributes.height}
          >
            <p className="font-bold text-xl">{sponsor.name}</p>
            <p className="font-normal text-sm">{sponsor.description}</p>
          </DirectionAwareHover>
        </div>
      ))}
    </div>
  );
}
