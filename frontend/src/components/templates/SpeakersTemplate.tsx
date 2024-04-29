"use client";
import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";
import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export default function SpeakersTemplate({ content }: { content: any }) {
  return (
    <div className="grid md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
      {content.speaker.map((person: any, index: number) => (
        <SpeakerDialog person={person}>
          <div className="group relative block bg-black select-none min-h-[260px]">
            <Image
              src={getStrapiMedia(person.media.data.attributes.url) || "/"}
              width={person.media.data.attributes.width}
              height={person.media.data.attributes.height}
              alt={person.name}
              className="absolute inset-0 h-full w-full object-contain opacity-75 transition-opacity group-hover:opacity-50"
            />

            <div className="relative p-4 sm:p-6 lg:p-8">
              <p className="text-sm font-medium uppercase tracking-widest text-themePrimary">
                {person.title}
              </p>

              <p className="text-lg font-bold text-white sm:text-xl">
                {person.name}
              </p>

              <div className="mt-12">
                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100 space-y-4">
                  <p className="text-sm text-white line-clamp-3">
                    {person.bio}
                  </p>
                  <p className="font-bold text-primary">Read More...</p>
                </div>
              </div>
            </div>
          </div>
        </SpeakerDialog>
      ))}
    </div>
  );
}

export function SpeakerDialog({
  children,
  person,
}: {
  children: any;
  person: any;
}) {
  const [open, setOpen] = React.useState(false);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>
              <p className="text-sm font-medium uppercase tracking-widest text-themePrimary">
                {person.title}
              </p>

              <p className="text-lg font-bold text-muted-foreground sm:text-xl">
                {person.name}
              </p>
            </DialogTitle>
            <DialogDescription>{person.bio}</DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="pb-32">
        <DrawerHeader className="text-left ">
          <DrawerTitle>
            <p className="text-sm font-medium uppercase tracking-widest text-themePrimary">
              {person.title}
            </p>
            <p className="text-lg font-bold text-muted-foreground sm:text-xl">
              {person.name}
            </p>
          </DrawerTitle>
          <DrawerDescription>{person.bio}</DrawerDescription>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  );
}

function useMediaQuery(query: string) {
  const [value, setValue] = React.useState(false);

  React.useEffect(() => {
    function onChange(event: MediaQueryListEvent) {
      setValue(event.matches);
    }

    const result = matchMedia(query);
    result.addEventListener("change", onChange);
    setValue(result.matches);

    return () => result.removeEventListener("change", onChange);
  }, [query]);

  return value;
}
