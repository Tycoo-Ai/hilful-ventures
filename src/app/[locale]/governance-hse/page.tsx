import { redirect } from "@/i18n/routing";

export default async function GovernanceHseAlias({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  redirect({ href: "/hse", locale });
}
