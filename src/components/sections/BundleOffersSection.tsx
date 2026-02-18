import { getBundles } from "@/lib/bundles-db";
import { BundleOffers } from "./BundleOffers";

export async function BundleOffersSection() {
  const bundles = await getBundles();
  return <BundleOffers bundles={bundles} />;
}
