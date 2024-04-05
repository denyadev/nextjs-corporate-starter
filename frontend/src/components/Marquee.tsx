"use client";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import MarqueeComponent from "react-fast-marquee";

export default function Marquee({ marquee }: { marquee: any }) {
  return (
    <MarqueeComponent className="pb-2" autoFill speed={20} gradient={false}>
      {marquee.map((item: any, index: number) => (
        <div key={index}>
          {item.marquee_text &&
            item.marquee_text.map((textItem: any, textIndex: number) => (
              <span
                key={`text-${index}-${textIndex}`}
                className="inline-block mx-12 md:mx-24 md:text-lg italic font-bold text-themePrimary"
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
                    className="max-h-12 object-contain w-64 mx-32 inline-block"
                  />
                );
              }
            })}
        </div>
      ))}
    </MarqueeComponent>
  );
}
