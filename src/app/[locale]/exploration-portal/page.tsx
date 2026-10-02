import MiningSitesPage, { generateMetadata as baseMetadata } from "../mining-sites/page";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata(props: any) {
  return baseMetadata(props);
}

export default async function ExplorationPortalPage(props: any) {
  return <MiningSitesPage {...props} />;
}
