"use client";
import Link from "next/link";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import Image from "next/image";
import {
  CalendarDays,
  CandlestickChart,
  CircleParking,
  Contact,
  Files,
  GalleryHorizontalEnd,
  Globe,
  Pin,
  Volume2,
} from "lucide-react";
import { DashboardIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../i18nConfig";
import { getStrapiMedia } from "@/utils/api-helpers";

type IconMap = {
  [key: string]: JSX.Element;
};

const iconMap: IconMap = {
  Calendar: <CalendarDays className="w-5 h-5" />,
  Speaker: <Pin className="w-5 h-5" />,
  Sponsor: <GalleryHorizontalEnd className="w-5 h-5" />,
  File: <Volume2 className="w-5 h-5" />,
  caucus: <DashboardIcon className="w-5 h-5" />,
  documents: <Files className="w-5 h-5" />,
  parking: <CircleParking className="w-5 h-5" />,
  contacts: <Contact className="w-5 h-5" />,
  tradeShow: <CandlestickChart className="w-5 h-5" />, // Assuming you have a TradeIcon component
};

const ShowIcon = (icon: string) => {
  const IconComponent = iconMap[icon] || null; // Fallback to null if no icon matches

  return <>{IconComponent}</>;
};

export default function Header({
  logo,
  tabs,
  slug,
}: {
  logo: any;
  tabs: any;
  slug: string;
}) {
  const pathname = usePathname() || "/";
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();

  const normalizePathname = (path: string) => {
    const locales = ["en", "fr"]; // List of supported locales
    const pathSegments = path.split("/").filter(Boolean); // Split the pathname into segments and remove empty strings

    // If the first segment is a locale, we remove it along with the dataset (assuming the second segment is the dataset)
    if (locales.includes(pathSegments[0])) {
      return `/${pathSegments.slice(2).join("/")}`;
    }

    // If the first segment is not a locale, we assume it's the dataset and remove it
    return `/${pathSegments.slice(1).join("/")}`;
  };

  const toggleLanguage = (locale: string) => {
    const newLocale = locale;

    // set cookie for next-i18n-router
    const days = 30;
    const date = new Date();
    date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
    const expires = date.toUTCString();
    document.cookie = `NEXT_LOCALE=${newLocale};expires=${expires};path=/`;

    // redirect to the new locale path
    if (
      currentLocale === i18nConfig.defaultLocale &&
      !i18nConfig.prefixDefault
    ) {
      router.push("/" + newLocale + pathname);
    } else {
      router.push(pathname.replace(`/${currentLocale}`, `/${newLocale}`));
    }

    router.refresh();
  };

  const logoUrl = getStrapiMedia(logo?.data?.attributes?.url) || "";

  return (
    <header className="flex bg-white w-full h-full shadow-sm sticky top-0 z-50">
      <div className="flex justify-between items-center w-full container mx-auto px-4 lg:px-0">
        <div>
          {logo?.data?.attributes?.url ? (
            <Link href={`/${slug}`} legacyBehavior passHref>
              <Image
                src={logoUrl}
                alt="logo"
                width={logo?.data?.attributes?.width}
                height={logo?.data?.attributes?.height}
                className="h-12 w-full object-contain cursor-pointer"
              />
            </Link>
          ) : (
            <div>Logo Goes Here</div>
          )}
        </div>

        <Sheet>
          <SheetTrigger className="lg:hidden">
            <NavigationMenu>
              <NavigationMenuList className="flex flex-col w-full gap-0 space-x-0">
                <NavigationMenuItem key={"language"} className="w-full">
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} border-b-4 rounded-none lg:py-6 h-full w-full bg-accent cursor-pointer`}
                  >
                    <div className="flex flex-col items-center gap-1 w-4">
                      <HamburgerMenuIcon className="w-5 h-5" />
                      <span className="font-medium text-xs text-center">
                        Menu
                      </span>
                    </div>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </SheetTrigger>
          <SheetContent className="w-full">
            <SheetHeader>
              <SheetTitle>
                <div className="flex py-4">
                  {logo?.data?.attributes?.url ? (
                    <Link href={`/${slug}`} legacyBehavior passHref>
                      <Image
                        src={logoUrl}
                        alt="logo"
                        width={logo?.data?.attributes?.width}
                        height={logo?.data?.attributes?.height}
                        className="h-12 w-full object-contain cursor-pointer"
                      />
                    </Link>
                  ) : (
                    <div>Logo Goes Here</div>
                  )}
                </div>
              </SheetTitle>
              <SheetDescription className="w-full">
                <NavigationMenu className="w-full">
                  <NavigationMenuList className="flex flex-col w-full gap-0 space-x-0">
                    {tabs?.map((tab: any) => (
                      <NavigationMenuItem
                        key={tab.attributes.url}
                        className="flex items-start justify-start w-full"
                      >
                        <Link
                          href={`/${slug}/${tab.attributes.url}`}
                          legacyBehavior
                          passHref
                        >
                          <NavigationMenuLink
                            className={`${navigationMenuTriggerStyle()} border-l-2 rounded-none py-4 h-full w-full ${
                              normalizePathname(pathname) ===
                              `/${tab.attributes.url}`
                                ? "border-themePrimary bg-accent"
                                : ""
                            }`}
                          >
                            <SheetClose asChild>
                              <div className="flex items-center gap-1 w-full">
                                {ShowIcon(tab.attributes.icon)}
                                <span className="font-medium text-xs">
                                  {tab.attributes.tab_name}
                                </span>
                              </div>
                            </SheetClose>
                          </NavigationMenuLink>
                        </Link>
                      </NavigationMenuItem>
                    ))}
                    <Separator className="my-1" />
                    <NavigationMenuItem
                      key={"language"}
                      className="flex w-full"
                    >
                      <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()}  border-l-2 rounded-none py-4 h-full w-full bg-accent cursor-pointer`}
                        onClick={() =>
                          toggleLanguage(currentLocale === "en" ? "fr" : "en")
                        }
                      >
                        <div className="flex items-center gap-1 w-full">
                          <Globe className="w-5 h-5" />
                          <span className="font-medium text-xs ">
                            {currentLocale.toUpperCase()}
                          </span>
                        </div>
                      </NavigationMenuLink>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>

        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex flex-col lg:flex-row space-x-0">
            {tabs?.map((tab: any) => (
              <NavigationMenuItem key={tab.attributes.url} className="w-full">
                <Link
                  href={`/${slug}/${tab.attributes.url}`}
                  legacyBehavior
                  passHref
                >
                  <NavigationMenuLink
                    className={`${navigationMenuTriggerStyle()} border-b-4 rounded-none lg:py-6 h-full w-full ${
                      normalizePathname(pathname) === `/${tab.attributes.url}`
                        ? "border-themePrimary bg-accent"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1 w-24">
                      {ShowIcon(tab.attributes.icon)}
                      <span className="font-medium text-xs text-center">
                        {tab.attributes.tab_name}
                      </span>
                    </div>
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            ))}
            <NavigationMenuItem
              key={"language"}
              className="w-full"
              onClick={() =>
                toggleLanguage(currentLocale === "en" ? "fr" : "en")
              }
            >
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} border-b-4 rounded-none lg:py-6 h-full w-full bg-accent cursor-pointer`}
              >
                <div className="flex flex-col items-center gap-1 w-24">
                  <Globe className="w-5 h-5" />
                  <span className="font-medium text-xs text-center">
                    {currentLocale.toUpperCase()}
                  </span>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
