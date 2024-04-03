export default function EmbedTemplate({ content }: { content: any }) {
  return (
    <div>
      <div className="my-4">
        <h1 className="heading">{content.heading}</h1>
        <h2 className="text-muted-foreground">{content.subheading}</h2>
      </div>
      <iframe
        src={content.template[0].url}
        style={{ width: "100%", height: "90vh", border: "none" }}
        title={content.heading}
      />
    </div>
  );
}
