import { Separator } from "../ui/separator";

export default function EmbedTemplate({ content }: { content: any }) {
  return (
    <div>
      <div className="pt-4">
        <h1 className="heading tracking-tight underline underline-offset-2 decoration-themePrimary">
          {content.heading}
        </h1>
        <h2 className="text-muted-foreground text-sm">{content.subheading}</h2>
      </div>
      <Separator className="mt-2 mb-4" />
      <iframe
        src={content.template[0].url}
        style={{ width: "100%", height: "90vh", border: "none" }}
        title={content.heading}
      />
    </div>
  );
}
