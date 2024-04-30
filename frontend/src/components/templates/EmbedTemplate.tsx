export default function EmbedTemplate({ content }: { content: any }) {
  return (
    <div>
      <iframe
        src={content.url}
        style={{ width: "100%", height: "90vh", border: "none" }}
        title={content.heading}
        // name="htmlComp-iframe"
        // sandbox="allow-same-origin allow-forms allow-popups allow-scripts allow-pointer-lock"
      />
    </div>
  );
}
