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
  Award,
  BadgeHelp,
  BookOpen,
  Building,
  BusFront,
  CalendarDays,
  CandlestickChart,
  Car,
  CircleParking,
  Contact,
  Files,
  FolderLock,
  GalleryHorizontalEnd,
  Gift,
  Globe,
  GraduationCap,
  Landmark,
  LayoutDashboardIcon,
  Megaphone,
  MessageSquare,
  MonitorPlay,
  MoonIcon,
  Newspaper,
  PartyPopper,
  Pin,
  Salad,
  Share2,
  Star,
  SunIcon,
  UserRound,
  Volume2,
  Vote,
} from "lucide-react";
import { DashboardIcon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { usePathname, useRouter } from "next/navigation";
import { Separator } from "@/components/ui/separator";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../i18nConfig";
import { getStrapiMedia } from "@/utils/api-helpers";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

type IconMap = {
  [key: string]: JSX.Element;
};

const iconMap: IconMap = {
  Calendar: <CalendarDays className="text-muted-foreground h-5 w-5" />,
  Pin: <Pin className="text-muted-foreground h-5 w-5" />,
  Gallery: <GalleryHorizontalEnd className="text-muted-foreground h-5 w-5" />,
  Volume: <Volume2 className="text-muted-foreground h-5 w-5" />,
  Dashboard: <LayoutDashboardIcon className="text-muted-foreground h-5 w-5" />,
  Files: <Files className="text-muted-foreground h-5 w-5" />,
  Parking: <CircleParking className="text-muted-foreground h-5 w-5" />,
  Contacts: <Contact className="text-muted-foreground h-5 w-5" />,
  CandlestickChart: (
    <CandlestickChart className="text-muted-foreground h-5 w-5" />
  ),
  Graduation: <GraduationCap className="text-muted-foreground h-5 w-5" />,
  Building: <Building className="text-muted-foreground h-5 w-5" />,
  Landmark: <Landmark className="text-muted-foreground h-5 w-5" />,
  Gift: <Gift className="text-muted-foreground h-5 w-5" />,
  Award: <Award className="text-muted-foreground h-5 w-5" />,
  Share: <Share2 className="text-muted-foreground h-5 w-5" />,
  Message: <MessageSquare className="text-muted-foreground h-5 w-5" />,
  User: <UserRound className="text-muted-foreground h-5 w-5" />,
  Book: <BookOpen className="text-muted-foreground h-5 w-5" />,
  Salad: <Salad className="text-muted-foreground h-5 w-5" />,
  Bus: <BusFront className="text-muted-foreground h-5 w-5" />,
  Car: <Car className="text-muted-foreground h-5 w-5" />,
  Party: <PartyPopper className="text-muted-foreground h-5 w-5" />,
  FolderLock: <FolderLock className="text-muted-foreground h-5 w-5" />,
  //
  Newspaper: <Newspaper className="text-muted-foreground h-5 w-5" />,
  BadgeHelp: <BadgeHelp className="text-muted-foreground h-5 w-5" />,
  Star: <Star className="text-muted-foreground h-5 w-5" />,
  MonitorPlay: <MonitorPlay className="text-muted-foreground h-5 w-5" />,
  Megaphone: <Megaphone className="text-muted-foreground h-5 w-5" />,
  Vote: <Vote className="text-muted-foreground h-5 w-5" />,
};

const ShowIcon = (icon: string) => {
  const IconComponent = iconMap[icon] || null; // Fallback to null if no icon matches

  return <>{IconComponent}</>;
};

function getUniqueLocales(dataArray: any) {
  const localesSet = new Set();

  dataArray.forEach((item: any) => {
    const locale = item.attributes?.locale;
    if (locale) {
      localesSet.add(locale);
    }
  });

  return Array.from(localesSet);
}

export default function Header({
  logo,
  tabs,
  slug,
  localization,
}: {
  logo: any;
  tabs: any;
  slug: string;
  localization: any;
}) {
  const pathname = usePathname() || "/";
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const uniqueLocales = getUniqueLocales(localization?.data);
  const { theme, setTheme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) return null;

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
    <header className="flex bg-card w-full h-full  sticky top-0 z-40 shadow-md rounded-sm">
      <div className="flex justify-between items-center w-full container mx-auto px-4 lg:px-0">
        <div className="py-4 lg:py-0">
          {logo?.data?.attributes?.url ? (
            // <Link href={`/${slug}`} legacyBehavior passHref>
            <img
              src={logoUrl}
              alt="logo"
              width={logo?.data?.attributes?.width}
              height={logo?.data?.attributes?.height}
              className="object-contain cursor-pointer w-full max-h-16"
            />
          ) : (
            // </Link>
            <div>Logo Goes Here</div>
          )}
        </div>
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
                    className={`${navigationMenuTriggerStyle()} rounded-none lg:py-5 h-full w-full hover:border-b-2 ${
                      normalizePathname(pathname) === `/${tab.attributes.url}`
                        ? "border-b-2 border-themePrimary bg-accent"
                        : ""
                    }`}
                  >
                    <div className="flex flex-col justify-center items-center gap-1 min-w-16">
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
              onClick={() => setTheme(theme === "light" ? "dark" : "light")}
            >
              <NavigationMenuLink
                className={`${navigationMenuTriggerStyle()} border-b-2 rounded-none lg:py-5 h-full w-full bg-accent cursor-pointer`}
              >
                <div className="flex flex-col w-12 justify-center items-center gap-1">
                  {theme === "light" ? (
                    <SunIcon className="text-muted-foreground h-5 w-5" />
                  ) : (
                    <MoonIcon className="text-muted-foreground h-5 w-5" />
                  )}
                  <span className="font-medium text-xs text-center">
                    {theme === "dark" ? "Dark" : "Light"}
                  </span>
                </div>
              </NavigationMenuLink>
            </NavigationMenuItem>
            {uniqueLocales.length > 0 && (
              <NavigationMenuItem
                key={"language"}
                className="w-full"
                onClick={() =>
                  toggleLanguage(currentLocale === "en" ? "fr" : "en")
                }
              >
                <NavigationMenuLink
                  className={`${navigationMenuTriggerStyle()} border-b-2 rounded-none lg:py-5 h-full w-full bg-accent cursor-pointer`}
                >
                  <div className="flex flex-col w-12 justify-center items-center gap-1">
                    <Globe className="text-muted-foreground h-5 w-5" />
                    <span className="font-medium text-xs text-center">
                      {currentLocale.toUpperCase()}
                    </span>
                  </div>
                </NavigationMenuLink>
              </NavigationMenuItem>
            )}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    </header>
  );
}
