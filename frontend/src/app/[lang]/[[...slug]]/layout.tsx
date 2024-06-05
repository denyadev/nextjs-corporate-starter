import Banner from "../../../components/Banner";
import Header from "../../../components/Header";
import ThemeProvider from "@/context/ThemeProvider";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/context/TranslationsProvider";
import Marquee from "@/components/Marquee";
import { getStrapiURL } from "@/utils/api-helpers";
import Error from "@/components/Error";
import { cookies } from "next/headers";
import { FloatingNav } from "@/components/ui/floating-navbar";
import { MeetingProvider } from "@/context/MeetingContext";

export const dynamic = "force-dynamic";

const i18nNamespaces = ["default"];

export default async function MainLayout({
  children,
  params: { lang, slug },
}: {
  children: React.ReactNode;
  params: { lang: string; slug?: string[] };
}) {
  const { resources } = await initTranslations(lang, i18nNamespaces);

  if (!slug || !slug[0]) {
    return null;
  }

  const url = `${getStrapiURL(
    `/api/organizations?filters[slug][$eq]=${slug[0]}&populate=logo,pages,banner,localizations,marquee.marquee_text,marquee.marquee_image,marquee.marquee_image.media&locale=${lang}`
  )}`;
  const response = await fetch(url);

  const data = await response.json();

  if (!data || !data.data || data.data.length === 0) {
    return <Error />;
  }

  const correctPassword = data?.data[0]?.attributes?.password;
  const orgName = data?.data[0]?.attributes?.name;
  const bannerData = data?.data[0]?.attributes?.banner;
  const logoData = data?.data[0]?.attributes?.logo;
  const pagesData = data?.data[0]?.attributes?.pages?.data || [];
  // console.log(pagesData);
  const marqueeData = data?.data[0]?.attributes?.marquee;
  const localizationData = data?.data[0]?.attributes?.localizations;
  const themeData = {
    primary: data?.data[0]?.attributes?.primary_color,
    secondary: data?.data[0]?.attributes?.accent_color,
    radius: data?.data[0]?.attributes?.border_radius,
  };

  async function verifyPassword(formData: FormData) {
    "use server";
    try {
      const password = formData.get("password") as string;
      if (password === correctPassword) {
        cookies().set("pw", password);
      } else {
        return { errors: "Password is incorrect." };
      }
      return password === correctPassword;
    } catch (e) {
      return { errors: "Password is incorrect." };
    }
  }
  const auth = cookies().get("pw")?.value;

  if (correctPassword !== null && auth !== correctPassword) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="p-4 bg-white shadow-lg rounded-lg">
          <h1 className="text-2xl font-bold text-center">
            This site is password protected.
          </h1>
          <p className="text-center">Please enter the password to proceed.</p>
          <form action={verifyPassword} className="mt-4">
            <input
              type="password"
              name="password"
              className="w-full p-2 border border-gray-300 rounded-md"
              placeholder="Enter password"
            />
            <button className="w-full mt-4 p-2 bg-themePrimary text-white rounded-md">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  const transformedTabs = pagesData.map((tab: any) => ({
    name: tab.attributes.tab_name,
    link: tab.attributes.url,
    icon: tab.attributes.icon,
  }));

  return (
    <section>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={lang}
        resources={resources}
      >
        <ThemeProvider theme={themeData}>
          <MeetingProvider>
            {/* {bannerData?.data && <Banner banner={bannerData} />} */}{" "}
            <div className="relative w-full h-full z-50">
              <FloatingNav
                navItems={transformedTabs}
                localization={localizationData}
                bannerData={bannerData}
              />
            </div>
            <Header
              logo={logoData}
              slug={slug[0]}
              tabs={pagesData}
              localization={localizationData}
            />
            <div className="container mx-auto px-4 mb-16 md:mb-4 lg:px-0">
              {slug.length > 0 && bannerData?.data && (
                <Banner banner={bannerData} />
              )}
              {marqueeData && marqueeData.length > 0 && (
                <Marquee marquee={marqueeData} />
              )}
              {slug.length === 1 && data?.data[0] && (
                <div className="mt-4">
                  <h1 className="heading text-6xl">
                    Welcome to the{" "}
                    <span className="text-themePrimary">{orgName}</span>.
                  </h1>
                </div>
              )}
              {children}
            </div>
          </MeetingProvider>
        </ThemeProvider>
      </TranslationsProvider>
    </section>
  );
}
