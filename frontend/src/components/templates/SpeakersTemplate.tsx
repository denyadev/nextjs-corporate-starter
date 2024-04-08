import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";

export default function SpeakersTemplate({ content }: { content: any }) {
  return (
    <div>
      <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4">
        {content.speaker.map((person: any, index: number) => (
          <div className="group relative block bg-black select-none min-h-[360px]">
            <Image
              src={getStrapiMedia(person.media.data.attributes.url) || "/"}
              width={person.media.data.attributes.width}
              height={person.media.data.attributes.height}
              alt={person.name}
              className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-themePrimary">
                {person.title}
              </p>

              <p className="text-lg font-bold text-white sm:text-xl">
                {person.name}
              </p>

              <div className="mt-12">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-sm text-white">{person.bio}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
