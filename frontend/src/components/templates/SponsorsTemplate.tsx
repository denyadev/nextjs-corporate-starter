import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import { Card } from "../ui/card";

export default function SponsorsTemplate({ content }: { content: any }) {
  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {content.sponsor.length === 0 && <div>Please upload some content!</div>}
        {content.sponsor.map((sponsor: any, index: number) => (
          <Card className="group relative block hover:bg-black select-none min-h-[200px]">
            <Image
              src={getStrapiMedia(sponsor.media.data.attributes.url) || "/"}
              width={sponsor.media.data.attributes.width}
              height={sponsor.media.data.attributes.height}
              alt={sponsor.name}
              className="p-8 absolute inset-0 h-full w-full object-contain transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <div className="mt-12">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white font-bold">{sponsor.name}</p>
                  <p className="text-sm text-white">{sponsor.description}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
