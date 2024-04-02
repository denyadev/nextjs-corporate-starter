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

  const baseUrl = `http://localhost:1337`;
  const url = `${baseUrl}/api/pages?filters[organization][slug][$eq]=${organizationSlug}&filters[url]=${pageSlug}&populate[0]=template.${template}&populate[1]=template.${template}.media`;
  console.log("Fetching URL:", url);

  const response = await fetch(url);
  const data = await response.json();
  return data;
}
