import { getStrapiMedia } from "@/utils/api-helpers";
import Image from "next/image";

export default function Banner({ banner }: { banner: any }) {
  const bannerUrl = getStrapiMedia(banner?.data?.attributes?.url) || "";
  if (!banner) return null;
  return (
    <div className="w-full h-full pt-2 md:pt-4">
      <Image
        src={bannerUrl}
        alt="banner"
        width={banner?.data?.attributes?.width}
        height={banner?.data?.attributes?.height}
        className="object-cover w-full h-[160px] md:h-[240px] rounded-lg overflow-hidden"
      />
    </div>
  );
}
