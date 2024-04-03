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

  const urlLocalizedParamsObject = {
    populate: [`template.${template}`, `template.${template}.media`],
  };

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  // console.log("URL params:", urlParamsObject);

  // Fetch the English page data
  const enResponse = await fetchAPI(path, urlParamsObject, options);
  // console.log("English response:", enResponse);

  if (!enResponse || !enResponse.data || enResponse.data.length === 0) {
    throw new Error("No English page data found.");
  }

  let pageData = enResponse.data[0]; // default to English page data

  if (requestedLocale !== "en") {
    // Find the localized page ID
    const localizationId = pageData.attributes.localizations.data.find(
      (loc: any) => loc.attributes.locale === requestedLocale
    )?.id;

    if (localizationId) {
      // Fetch the localized page data by ID
      const localizedResponse = await fetchAPI(
        `${path}/${localizationId}`,
        urlLocalizedParamsObject,
        options
      );
      if (localizedResponse && localizedResponse.data) {
        pageData = localizedResponse.data;
      }
    }
  }
  // console.log("Page data:", pageData);

  // Return the full response object, replacing the data part with the localized page data
  return { ...enResponse, data: [pageData] }; // Ensure the data is in the same array format as the original response
}
