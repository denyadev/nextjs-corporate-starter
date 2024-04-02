import Image from "next/image";

export default function Banner({ banner }: { banner: any }) {
    if (!banner) return null;
    return (
        <div className="w-full h-full">
            <Image
                src={banner?.data?.attributes?.url}
                alt="banner"
                width={banner?.data?.attributes?.width}
                height={banner?.data?.attributes?.height}
                className="h-[120px] md:h-[210px] lg:h-[240px] w-full object-cover"
            />
        </div>
    );
}
