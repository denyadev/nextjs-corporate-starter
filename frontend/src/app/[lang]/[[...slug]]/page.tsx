import { templateRenderer } from "@/app/[lang]/utils/template-renderer";
import { getPageBySlug } from "@/app/[lang]/utils/get-page-by-slug";

export const revalidate = 0;

export default async function PageRoute({
    params,
}: {
    params: { lang: string; slug?: string[] };
}) {
    console.log("Received params", params);

    const { lang, slug } = params;

    if (!slug || slug.length === 0) {
        console.error("Slug is not provided or incomplete.");
        return <div>Page not found.</div>;
    }

    const organizationSlug = slug[0];
    const pageSlug = slug[1];

    const data = await getPageBySlug(organizationSlug, pageSlug, lang);
    console.log("Data received", data);

    if (!data || !data.data || data.data.length === 0) {
        return <div>Page not found.</div>;
    }

    const page = data.data[0]?.attributes;

    if (!page || !page.template || page.template.length === 0) {
        return <div>No content available</div>;
    }

    //   console.log(page);

    return <div>{templateRenderer(page)}</div>;
}
