import { fetchAPI } from "./fetch-api";

export const revalidate = 0;

export async function getPageBySlug(
  organizationSlug: string,
  pageSlug: string,
  lang: string
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
    populate: [`template.${template}`, `template.${template}.media`],
    locale: lang,
  };

  const options = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  // Use fetchAPI to make the request
  return await fetchAPI(path, urlParamsObject, options);
}
