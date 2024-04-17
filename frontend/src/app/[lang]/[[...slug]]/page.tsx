import { templateRenderer } from "@/utils/template-renderer";
import { getPageBySlug } from "@/utils/get-page-by-slug";
import { Separator } from "@/components/ui/separator";
import { Card } from "@/components/ui/card";

export default async function PageRoute({
  params,
}: {
  params: { lang: string; slug?: string[] };
}) {
  const { lang, slug } = params;

  if (!slug || slug.length === 0) {
    console.error("Slug is not provided or incomplete.");
    return <div>Page not found.</div>;
  }

  if (slug.length < 2) {
    console.error("Slug is not complete.");
    return null;
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

  return (
    <Card className="p-4 mt-4">
      <div>
        <h1 className="heading text-secondary-foreground tracking-tight underline underline-offset-2 decoration-themePrimary">
          {page.heading}
        </h1>
        <h2 className="text-muted-foreground text-sm">{page.subheading}</h2>
      </div>
      <Separator className="mt-2 mb-4" />
      {templateRenderer(page)}
    </Card>
  );
}
