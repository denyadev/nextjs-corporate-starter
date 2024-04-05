import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { Separator } from "../ui/separator";

export default function SponsorsTemplate({ content }: { content: any }) {
  console.log("SponsorTemplate content", content);
  return (
    <div>
      <div className="pt-4">
        <h1 className="heading tracking-tight underline underline-offset-2 decoration-themePrimary">
          {content.heading}
        </h1>
        <h2 className="text-muted-foreground text-sm">{content.subheading}</h2>
      </div>
      <Separator className="mt-2 mb-4" />
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {content.template[0].sponsor.length === 0 && (
          <div>Please upload some content!</div>
        )}
        {content.template[0].sponsor.map((person: any, index: number) => (
          <div className="relative rounded-lg overflow-hidden shadow-lg group">
            <Image
              src={getStrapiMedia(person.media.data.attributes.url) || "/"}
              width={person.media.data.attributes.width}
              height={person.media.data.attributes.height}
              alt={person.name}
              className="w-full object-contain transition-transform group-hover:scale-105 min-h-[200px]"
              style={{ height: "100%" }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 transition-opacity duration-300 group-hover:bg-opacity-80">
              <p className="text-white text-lg font-medium">{person.name}</p>
              <p className="text-gray-300 text-sm">{person.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
