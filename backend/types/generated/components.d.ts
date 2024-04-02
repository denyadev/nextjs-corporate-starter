import type { Schema, Attribute } from '@strapi/strapi';

export interface ElementsAgendaItem extends Schema.Component {
  collectionName: 'components_elements_agenda_items';
  info: {
    displayName: 'Agenda Item';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    start_time: Attribute.Time & Attribute.Required;
    end_time: Attribute.Time;
    media: Attribute.Media;
    notes: Attribute.Blocks;
  };
}

export interface ElementsGalleryItem extends Schema.Component {
  collectionName: 'components_elements_gallery_items';
  info: {
    displayName: 'Gallery Item';
    icon: 'landscape';
    description: '';
  };
  attributes: {
    media: Attribute.Media;
    name: Attribute.String;
    description: Attribute.String;
  };
}

export interface ElementsSpeaker extends Schema.Component {
  collectionName: 'components_elements_speakers';
  info: {
    displayName: 'Speaker';
    icon: 'user';
    description: '';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    title: Attribute.String;
    bio: Attribute.Text;
    media: Attribute.Media;
  };
}

export interface ElementsSponsor extends Schema.Component {
  collectionName: 'components_elements_sponsors';
  info: {
    displayName: 'Sponsor';
    icon: 'heart';
  };
  attributes: {
    name: Attribute.String & Attribute.Required;
    description: Attribute.Text;
    media: Attribute.Media;
  };
}

export interface TemplateAgenda extends Schema.Component {
  collectionName: 'components_template_agenda';
  info: {
    displayName: 'Agenda';
    icon: 'calendar';
    description: '';
  };
  attributes: {
    agenda: Attribute.Component<'elements.agenda-item', true>;
    Date: Attribute.Date & Attribute.Required;
  };
}

export interface TemplateDocuments extends Schema.Component {
  collectionName: 'components_template_documents';
  info: {
    displayName: 'Documents';
    icon: 'filePdf';
  };
  attributes: {
    url: Attribute.String;
  };
}

export interface TemplateGallery extends Schema.Component {
  collectionName: 'components_template_galleries';
  info: {
    displayName: 'Gallery';
    icon: 'picture';
    description: '';
  };
  attributes: {
    gallery: Attribute.Component<'elements.gallery-item', true>;
  };
}

export interface TemplateSpeaker extends Schema.Component {
  collectionName: 'components_template_speakers';
  info: {
    displayName: 'Speakers';
    icon: 'volumeUp';
    description: '';
  };
  attributes: {
    speaker: Attribute.Component<'elements.speaker', true>;
  };
}

export interface TemplateSponsors extends Schema.Component {
  collectionName: 'components_template_sponsors';
  info: {
    displayName: 'Sponsors';
    icon: 'heart';
  };
  attributes: {
    sponsor: Attribute.Component<'elements.sponsor', true>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'elements.agenda-item': ElementsAgendaItem;
      'elements.gallery-item': ElementsGalleryItem;
      'elements.speaker': ElementsSpeaker;
      'elements.sponsor': ElementsSponsor;
      'template.agenda': TemplateAgenda;
      'template.documents': TemplateDocuments;
      'template.gallery': TemplateGallery;
      'template.speaker': TemplateSpeaker;
      'template.sponsors': TemplateSponsors;
    }
  }
}
