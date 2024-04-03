import { templateRenderer } from "@/utils/template-renderer";
import { getPageBySlug } from "@/utils/get-page-by-slug";

export default async function PageRoute({
  params,
}: {
  params: { lang: string; slug?: string[] };
}) {
  // console.log("Received params", params);

  const { lang, slug } = params;

  if (!slug || slug.length === 0) {
    console.error("Slug is not provided or incomplete.");
    return <div>Page not found.</div>;
  }

  const organizationSlug = slug[0];
  const pageSlug = slug[1];

  const data = await getPageBySlug(organizationSlug, pageSlug, lang);

  if (!data || !data.data || data.data.length === 0) {
    return <div>Page not found.</div>;
  }

  const page = data.data[0]?.attributes;

  if (!page || !page.template || page.template.length === 0) {
    return <div>No content available</div>;
  }

  return <div>{templateRenderer(page)}</div>;
}
