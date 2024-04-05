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
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {content.template[0].sponsor.length === 0 && (
          <div>Please upload some content!</div>
        )}
        {content.template[0].sponsor.map((sponsor: any, index: number) => (
          <div className="group relative block bg-black select-none h-[200px]">
            <Image
              src={getStrapiMedia(sponsor.media.data.attributes.url) || "/"}
              width={sponsor.media.data.attributes.width}
              height={sponsor.media.data.attributes.height}
              alt={sponsor.name}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <div className="mt-12">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white font-bold">{sponsor.name}</p>
                  <p className="text-sm text-white">{sponsor.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
