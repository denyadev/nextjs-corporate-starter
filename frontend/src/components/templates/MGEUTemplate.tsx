"use client";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { useEffect, useState } from "react";

export default function ({ content }: { content: any }) {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getAspectRatio = () => {
    if (windowWidth <= 640) {
      // Mobile
      return 9 / 18;
    } else if (windowWidth <= 1024) {
      // iPad
      return 5 / 4;
    } else {
      // Desktop
      return 9 / 15.172;
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 mx-2 md:mx-4 space-y-4 lg:space-y-0 py-4">
      <div className="col-span-3">
        <AspectRatio ratio={16 / 9}>
          <iframe
            src={content.video}
            width="100%"
            height="100%"
            allow="autoplay; fullscreen"
          ></iframe>
        </AspectRatio>
      </div>
      <div className="col-span-1">
        <AspectRatio ratio={getAspectRatio()}>
          <iframe src={content.formsite} width="100%" height="100%"></iframe>
        </AspectRatio>{" "}
      </div>
    </div>
  );
}
