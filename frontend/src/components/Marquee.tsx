"use client";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import MarqueeComponent from "react-fast-marquee";

export default function Marquee({ marquee }: { marquee: any }) {
  return (
    <MarqueeComponent
      className="py-4 bg-white border-b"
      autoFill
      speed={20}
      gradient={false}
    >
      {marquee.map((item: any, index: number) => (
        <>
          {item.marquee_text &&
            item.marquee_text.map((textItem: any, textIndex: number) => (
              <span
                key={`text-${index}-${textIndex}`}
                className="inline-block mx-24 text-lg"
              >
                {textItem.text}
              </span>
            ))}
          {item.marquee_image &&
            item.marquee_image.map((imageItem: any, imageIndex: number) => {
              if (imageItem.media && imageItem.media.data) {
                return (
                  <Image
                    key={`image-${index}-${imageIndex}`}
                    src={
                      getStrapiMedia(imageItem.media.data.attributes.url) || "/"
                    }
                    width={imageItem.media.data.attributes.width}
                    height={imageItem.media.data.attributes.height}
                    alt={`Marquee image ${imageIndex + 1}`}
                    className="inline-block mx-24 h-12 w-64 object-contain"
                  />
                );
              }
            })}
        </>
      ))}
    </MarqueeComponent>
  );
}
