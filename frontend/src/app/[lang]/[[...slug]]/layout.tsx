import Banner from "../../../components/Banner";
import Header from "../../../components/Header";
import ThemeProvider from "@/context/ThemeProvider";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/context/TranslationsProvider";
import Marquee from "@/components/Marquee";
import { getStrapiURL } from "@/utils/api-helpers";
import Error from "@/components/Error";

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

  if (!data || !data.data || data.data.length === 0) {
    return <Error />;
  }

  const bannerData = data?.data[0]?.attributes?.banner;
  const logoData = data?.data[0]?.attributes?.logo;
  const pagesData = data?.data[0]?.attributes?.pages?.data || [];
  const marqueeData = data?.data[0]?.attributes?.marquee;
  const localizationData = data?.data[0]?.attributes?.localizations;
  const themeData = {
    primary: data?.data[0]?.attributes?.primary_color,
    secondary: data?.data[0]?.attributes?.accent_color,
    radius: data?.data[0]?.attributes?.border_radius,
  };

  return (
    <section>
      <TranslationsProvider
        namespaces={i18nNamespaces}
        locale={lang}
        resources={resources}
      >
        <ThemeProvider theme={themeData}>
          {/* {bannerData?.data && <Banner banner={bannerData} />} */}
          <Header
            logo={logoData}
            slug={slug[0]}
            tabs={pagesData}
            localization={localizationData}
          />
          <div className="container mx-auto px-4 lg:px-0 pb-8 mt-2">
            {marqueeData && marqueeData.length > 0 && (
              <Marquee marquee={marqueeData} />
            )}
            {slug.length > 0 && bannerData?.data && (
              <Banner banner={bannerData} />
            )}
            {slug.length === 1 && data?.data[0] && (
              <div className="mt-4">
                <h1 className="heading text-6xl">
                  Welcome to{" "}
                  <span className="text-themePrimary">{slug[0]}</span>.
                </h1>
              </div>
            )}
            {children}
          </div>
        </ThemeProvider>
      </TranslationsProvider>
    </section>
  );
}
