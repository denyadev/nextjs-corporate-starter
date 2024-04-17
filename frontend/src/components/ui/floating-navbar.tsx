"use client";
import React, { useEffect, useState } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
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
  Newspaper,
  PartyPopper,
  Pin,
  Salad,
  Share2,
  Star,
  UserRound,
  Volume2,
  Vote,
} from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import i18nConfig from "../../../i18nConfig";
import { useTheme } from "next-themes";

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

export const FloatingNav = ({
  navItems,
  localization,
  className,
}: {
  navItems: {
    name: string;
    link: string;
    icon?: string; // Changed to string to match the ShowIcon function
  }[];
  localization: any;
  className?: string;
}) => {
  const { scrollYProgress } = useScroll();
  const [visible, setVisible] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname() || "/";
  const { i18n } = useTranslation();
  const currentLocale = i18n.language;
  const router = useRouter();
  const uniqueLocales = getUniqueLocales(localization?.data);
  const { theme, setTheme } = useTheme();

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

  useMotionValueEvent(scrollYProgress, "change", (current) => {
    if (typeof current === "number") {
      let previous = scrollYProgress.getPrevious();
      setVisible(current <= 0.05 || current < previous); // Adjust visibility condition
    }
  });

  const [filteredNavItems, setFilteredNavItems] = useState(
    navItems.filter((item) =>
      ["vote", "agenda", "documents", "support"].includes(item.link)
    ) || []
  );

  return (
    <AnimatePresence mode="wait">
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col items-center fixed inset-x-0 top-0 bg-white dark:bg-black shadow-md h-screen z-50"
        >
          {navItems.map((navItem, idx) => (
            <Link
              key={idx}
              href={navItem.link}
              className="flex items-center p-4 w-full hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <span className="mr-3">{ShowIcon(navItem.icon)}</span>
              <span className="font-medium text-lg">{navItem.name}</span>
            </Link>
          ))}
          <div
            className="w-full"
            onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          >
            <div className="flex items-center p-4 w-full hover:bg-gray-100 dark:hover:bg-gray-800">
              <span className="mr-3">
                <Globe className="text-muted-foreground h-5 w-5" />
              </span>
              <span className="font-medium text-lg">
                {theme === "light" ? "Dark" : "Light"}
              </span>
            </div>
          </div>
          {uniqueLocales.length > 0 && (
            <div
              className="w-full"
              onClick={() =>
                toggleLanguage(currentLocale === "en" ? "fr" : "en")
              }
            >
              <div className="flex items-center p-4 w-full hover:bg-gray-100 dark:hover:bg-gray-800">
                <span className="mr-3">
                  <Globe className="text-muted-foreground h-5 w-5" />
                </span>
                <span className="font-medium text-lg">
                  {currentLocale.toUpperCase()}
                </span>
              </div>
            </div>
          )}
        </motion.div>
      )}
      <motion.div
        initial={{ opacity: 0, y: -100 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        className={cn(
          "lg:hidden flex max-w-fit fixed bottom-1 inset-x-0 mx-auto border border-transparent dark:border-white/[0.2] rounded-full dark:bg-black bg-white shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)] z-[5000] pr-2 pl-8 py-2 items-center justify-center space-x-4",
          className
        )}
      >
        {filteredNavItems.map((navItem, idx) => (
          <Link
            key={`bottom-nav-${idx}`}
            href={navItem.link}
            className="flex items-center space-x-1"
          >
            {ShowIcon(navItem.icon)}
            {/* <span className="text-sm">{navItem.name}</span> */}
          </Link>
        ))}
        <button
          className="border text-sm font-medium relative border-neutral-200 dark:border-white/[0.2] text-black dark:text-white px-4 py-4 rounded-full"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <HamburgerMenuIcon />
        </button>
      </motion.div>
    </AnimatePresence>
  );
};
