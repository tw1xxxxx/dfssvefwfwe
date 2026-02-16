import dynamic from "next/dynamic";
import { Cases } from "@/components/sections/Cases";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { BundleOffers } from "@/components/sections/BundleOffers";
import { getBundles } from "@/lib/bundles-db";

const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ));
const Insights = dynamic(() => import("@/components/sections/Insights").then((mod) => mod.Insights));
const Contact = dynamic(() => import("@/components/sections/Contact").then((mod) => mod.Contact));

export const revalidate = 60;

export default async function Home() {
  const bundles = await getBundles();

  return (
    <main className="select-none">
      <Hero />
      <BundleOffers bundles={bundles} />
      <Services />
      <Process />
      <Cases />
      {/* <About /> */}
      <FAQ />
      <Insights />
      <Contact />
    </main>
  );
}
