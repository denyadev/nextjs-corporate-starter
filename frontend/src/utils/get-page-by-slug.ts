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
    locale: requestedLocale,
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

  return response;
}
