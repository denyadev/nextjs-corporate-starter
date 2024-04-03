import Banner from "../../../components/Banner";
import Header from "../../../components/Header";
import ThemeProvider from "@/context/ThemeProvider";
import initTranslations from "@/app/i18n";
import TranslationsProvider from "@/context/TranslationsProvider";

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

  const response = await fetch(
    `https://pretty-harmony-b2c4339f8a.strapiapp.com/api/organizations?filters[slug][$eq]=${slug[0]}&populate=*`
  );
  const data = await response.json();
  console.log(data.data[0].attributes);
  const bannerData = data?.data[0]?.attributes?.banner;
  const logoData = data?.data[0]?.attributes?.logo;
  const pagesData = data?.data[0]?.attributes?.pages?.data || [];
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
          <Banner banner={bannerData} />
          <Header logo={logoData} slug={slug[0]} tabs={pagesData} />
          <div className="container mx-auto px-4 lg:px-0">{children}</div>
        </ThemeProvider>
      </TranslationsProvider>
    </section>
  );
}
