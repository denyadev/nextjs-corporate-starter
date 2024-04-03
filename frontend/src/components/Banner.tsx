import { getStrapiURL } from "@/utils/api-helpers";
import Image from "next/image";

export default function Banner({ banner }: { banner: any }) {
  const bannerUrl = getStrapiURL(banner?.data?.attributes?.url);
  if (!banner) return null;
  return (
    <div className="w-full h-full">
      <Image
        src={bannerUrl}
        alt="banner"
        width={banner?.data?.attributes?.width}
        height={banner?.data?.attributes?.height}
        className="object-cover w-full h-full rounded-lg overflow-hidden"
      />
    </div>
  );
}
