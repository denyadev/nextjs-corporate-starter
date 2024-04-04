import { fetchAPI } from "./fetch-api";

export async function getPageBySlug(
  organizationSlug: string,
  pageSlug: string,
  requestedLocale: string
) {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/pages`;
  const urlParamsObject = {
    filters: {
      organization: { slug: { $eq: organizationSlug } },
      url: pageSlug,
    },
    populate: {
      template: {
        populate: {
          speaker: {
            populate: {
              media: "*",
            },
          },
          gallery: {
            populate: {
              media: "*",
            },
          },
          sponsor: {
            populate: {
              media: "*",
            },
          },
          agenda: {
            populate: {
              media: "*",
            },
          },
        },
      },
      localizations: true,
      organization: true,
    },
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
