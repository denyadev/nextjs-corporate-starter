"use client";
import { getStrapiMedia } from "@/utils/api-helpers";
import * as React from "react";
import { DirectionAwareHover } from "../ui/direction-aware-hover";
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
import { renderContent } from "@/utils/rich-text-renderer";
import { ScrollArea } from "../ui/scroll-area";

export default function SpeakersTemplate({ content }: { content: any }) {
  return (
    <div className="relative grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {content.speaker.map((person: any, index: number) => (
        <SpeakerDialog person={person}>
          <div>
            <DirectionAwareHover
              imageUrl={getStrapiMedia(person.media.data.attributes.url) || "/"}
              imageWidth={person.media.data.attributes.width}
              imageHeight={person.media.data.attributes.height}
              className="h-64 cursor-pointer"
              imageClassName="object-cover p-0"
            >
              <p className="text-sm font-bold uppercase tracking-widest text-themeAccent">
                {person.title}
              </p>
              <p className="font-bold text-xl">{person.name}</p>

              <div className="space-y-2">
                {person?.bio && (
                  <div className="hidden sm:line-clamp-2">
                    {person.bio.map((bio: any, index: number) => (
                      <div key={index}>{renderContent(bio)}</div>
                    ))}
                  </div>
                )}
                <p className="font-bold text-themePrimary">Read Bio...</p>
              </div>
            </DirectionAwareHover>
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>
              <p className="text-sm font-medium uppercase tracking-widest text-themePrimary">
                {person.title}
              </p>

              <p className="text-lg font-bold text-muted-foreground sm:text-xl">
                {person.name}
              </p>
            </DialogTitle>
            <ScrollArea className="max-h-[500px]">
              <DialogDescription>
                {person?.bio && (
                  <div className="text-muted-foreground">
                    {person.bio.map((bio: any, index: number) => (
                      <div key={index}>{renderContent(bio)}</div>
                    ))}
                  </div>
                )}
              </DialogDescription>
            </ScrollArea>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent className="pb-24">
        <DrawerHeader className="text-left">
          <DrawerTitle>
            <p className="text-sm font-medium uppercase tracking-widest text-themePrimary">
              {person.title}
            </p>
            <p className="text-lg font-bold text-muted-foreground sm:text-xl">
              {person.name}
            </p>
          </DrawerTitle>
          <ScrollArea className="max-h-[500px]">
            <DrawerDescription>
              {person?.bio && (
                <div className="text-muted-foreground">
                  {person.bio.map((bio: any, index: number) => (
                    <div key={index}>{renderContent(bio)}</div>
                  ))}
                </div>
              )}
            </DrawerDescription>
          </ScrollArea>
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
