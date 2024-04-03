import Banner from "../../../components/Banner";
import Header from "../../../components/Header";
import ThemeProvider from "@/context/ThemeProvider";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/context/TranslationsProvider";
import Marquee from "@/components/Marquee";
import { getStrapiURL } from "@/utils/api-helpers";

export const revalidate = 0;
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
  // console.log(data.data[0].attributes);
  const bannerData = data?.data[0]?.attributes?.banner;
  const logoData = data?.data[0]?.attributes?.logo;
  const pagesData = data?.data[0]?.attributes?.pages?.data || [];
  const marqueeData = data?.data[0]?.attributes?.marquee;
  const themeData = {
    primary: data?.data[0]?.attributes?.primary_color,
    secondary: data?.data[0]?.attributes?.accent_color,
    radius: data?.data[0]?.attributes?.border_radius,
  };
  //   console.log(data.data[0].attributes);

  return (
    <section>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={lang}
        resources={resources}
      >
        <ThemeProvider theme={themeData}>
          {bannerData?.data && <Banner banner={bannerData} />}
          {marqueeData && marqueeData.length > 0 && (
            <Marquee marquee={marqueeData} />
          )}
          <Header logo={logoData} slug={slug[0]} tabs={pagesData} />
          <div className="container mx-auto px-4 lg:px-0">{children}</div>
        </ThemeProvider>
      </TranslationsProvider>
    </section>
  );
}
