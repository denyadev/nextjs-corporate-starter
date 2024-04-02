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

    const baseUrl = `https://pretty-harmony-b2c4339f8a.strapiapp.com`;
    const url = `${baseUrl}/api/pages?filters[organization][slug][$eq]=${organizationSlug}&filters[url]=${pageSlug}&populate[0]=template.${template}&populate[1]=template.${template}.media`;
    console.log("Fetching URL:", url);

    const response = await fetch(url);
    const data = await response.json();
    return data;
}
