import { fetchAPI } from "./fetch-api";

export async function getPageBySlug(
  organizationSlug: string,
  pageSlug: string,
  requestedLocale: string
) {
  let template = "";
  switch (pageSlug) {
    case "speakers":
      template = "speaker";
      break;
    case "sponsors":
      template = "sponsor";
      break;
    case "agenda":
      template = "agenda";
      break;
    case "gallery":
      template = "gallery";
      break;
    default:
      template = "default";
  }

  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/pages`;
  const urlParamsObject = {
    filters: {
      organization: { slug: { $eq: organizationSlug } },
      url: pageSlug,
    },
    populate: [
      `template.${template}`,
      `template.${template}.media`,
      "localizations",
    ],
    locale: "en", // Always fetch the English version first, which includes localizations
  };

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  const response = await fetchAPI(path, urlParamsObject, options);

  if (!response || !response.data || response.data.length === 0) {
    throw new Error("No page data found.");
  }

  const pageData = response.data[0];

  if (
    requestedLocale !== "en" &&
    pageData.attributes.localizations.data.length > 0
  ) {
    const localizationFound = pageData.attributes.localizations.data.find(
      (loc: any) => loc.attributes.locale === requestedLocale
    );

    if (localizationFound) {
      Object.assign(pageData.attributes, localizationFound.attributes);
    }
  }

  // Remove the 'localizations' field to simplify the returned object
  delete pageData.attributes.localizations;

  // Return the response in its original structure but with updated attributes
  return response;
}
