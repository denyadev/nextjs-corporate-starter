export async function getPageBySlug(
    organizationSlug: string,
    pageSlug: string,
    lang: string
) {
    const baseUrl = `http://localhost:1337`;
    const url = `${baseUrl}/api/pages?filters[organization][slug][$eq]=${organizationSlug}&filters[url]=${pageSlug}&populate[template][populate]=*`;
    console.log("Fetching URL:", url);
    const response = await fetch(url);
    const data = await response.json();
    return data;
}
