import AgendaTemplate from "../components/templates/AgendaTemplate";
import EmbedTemplate from "../components/templates/EmbedTemplate";
import GalleryTemplate from "../components/templates/GalleryTemplate";
import SpeakersTemplate from "../components/templates/SpeakersTemplate";
import SponsorsTemplate from "../components/templates/SponsorsTemplate";

// In your utils/template-renderer.js or .ts
export const templateRenderer = (template: any) => {
  console.log(template.template[0].__component);
  switch (template.template[0].__component) {
    case "template.speaker":
      return <SpeakersTemplate content={template} />;
    case "template.agenda":
      return <AgendaTemplate content={template} />;
    case "template.sponsors":
      return <SponsorsTemplate content={template} />;
    case "template.documents":
      return <EmbedTemplate content={template} />;
    case "template.gallery":
      return <GalleryTemplate content={template} />;
    default:
      return <div>Unknown template type</div>;
  }
};
