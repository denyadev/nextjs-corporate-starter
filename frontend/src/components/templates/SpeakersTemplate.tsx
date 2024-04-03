import { ScrollArea } from "@/components/ui/scroll-area";
import { getStrapiURL } from "@/utils/api-helpers";
import Image from "next/image";

export default function SpeakersTemplate({ content }: { content: any }) {
  return (
    <div>
      <div className="my-4">
        <h1 className="heading">{content.heading}</h1>
        <h2 className="text-muted-foreground">{content.subheading}</h2>
      </div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {content.template[0].speaker.map((person: any, index: number) => (
          <div
            key={index}
            className="relative rounded-lg overflow-hidden shadow-lg group cursor-pointer"
          >
            <Image
              src={getStrapiURL(person.media.data.attributes.url)}
              width={person.media.data.attributes.width}
              height={person.media.data.attributes.height}
              alt={person.name}
              className="object-cover w-full h-full rounded-lg overflow-hidden transition-transform group-hover:scale-110"
              style={{ height: "100%" }}
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4 transition-opacity duration-300 group-hover:bg-opacity-90">
              <p className="text-white text-lg font-medium">{person.name}</p>
              <p className="text-gray-300 text-sm">{person.title}</p>
            </div>

            <div className="absolute inset-0 bg-black bg-opacity-0 opacity-0 group-hover:opacity-100 group-hover:bg-opacity-90 transition-opacity duration-300 flex justify-center items-center p-4">
              <ScrollArea className="h-full pr-4">
                <p className="text-white text-sm font-normal">{person.bio}</p>
              </ScrollArea>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
