"use client";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { Separator } from "../ui/separator";

export default function GalleryTemplate({ content }: { content: any }) {
  return (
    <div>
      <div className="pt-4 text-center space-y-1">
        <h1 className="heading tracking-tight">{content.heading}</h1>
        <h2 className="text-muted-foreground text-sm">{content.subheading}</h2>
      </div>
      <Separator className="my-4" />
      {content.template[0].gallery.length === 0 && (
        <div>Please upload some content!</div>
      )}
      <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
        <Masonry columnsCount={3} gutter="10px">
          {content.template[0].gallery.map((image: any, index: number) => (
            <GalleryItem key={index} image={image} />
          ))}
        </Masonry>
      </ResponsiveMasonry>
    </div>
  );
}

function GalleryItem({ image }: { image: any }) {
  return (
    <div className="relative group w-full">
      <Image
        src={getStrapiMedia(image?.media?.data?.attributes?.url) || "/"}
        width={image?.media?.data?.attributes?.width}
        height={image?.media?.data?.attributes?.height}
        alt={image?.name || "Gallery Image"}
        className="object-cover w-full h-full overflow-hidden block rounded-lg"
      />
      {(image.title || image.description) && (
        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-lg">
          {image.name && <p className="font-medium text-lg">{image.name}</p>}
          {image.description && (
            <p className="text-sm text-gray-300">{image.description}</p>
          )}
        </div>
      )}
    </div>
  );
}
