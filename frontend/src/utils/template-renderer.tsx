import { Separator } from "@/components/ui/separator";
import AgendaTemplate from "../components/templates/AgendaTemplate";
import EmbedTemplate from "../components/templates/EmbedTemplate";
import GalleryTemplate from "../components/templates/GalleryTemplate";
import SpeakersTemplate from "../components/templates/SpeakersTemplate";
import SponsorsTemplate from "../components/templates/SponsorsTemplate";
import MarkdownTemplate from "@/components/templates/MarkdownTemplate";
import ZoomTemplate from "@/components/templates/ZoomTemplate";
import MGEUTemplate from "@/components/templates/MGEUTemplate";

export const templateRenderer = (page: any) => {
  const { template } = page;

  // Separate agenda items from other templates
  const agendaItems = template.filter(
    (item: any) => item.__component === "template.agenda"
  );
  const otherTemplates = template.filter(
    (item: any) => item.__component !== "template.agenda"
  );

  return (
    <div>
      {otherTemplates.map((templateItem: any, index: number) => (
        <div key={index}>
          {index > 0 && <Separator className="my-4" />}
          {(() => {
            switch (templateItem.__component) {
              case "template.speaker":
                return <SpeakersTemplate content={templateItem} />;
              case "template.sponsors":
                return <SponsorsTemplate content={templateItem} />;
              case "template.documents":
                return <EmbedTemplate content={templateItem} />;
              case "template.gallery":
                return <GalleryTemplate content={templateItem} />;
              case "template.markdown":
                return <MarkdownTemplate content={templateItem} />;
              case "template.mgeu-template":
                return <MGEUTemplate content={templateItem} />;
              case "template.zoom":
                return null;
              default:
                return <div>Unknown template type</div>;
            }
          })()}
        </div>
      ))}
      {agendaItems.length > 0 && otherTemplates.length > 0 && (
        <Separator className="my-4" />
      )}
      {agendaItems.length > 0 && <AgendaTemplate content={agendaItems} />}
    </div>
  );
};
