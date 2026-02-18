import { Suspense } from "react";
import dynamic from "next/dynamic";
import { Cases } from "@/components/sections/Cases";
import { Hero } from "@/components/sections/Hero";
import { Process } from "@/components/sections/Process";
import { Services } from "@/components/sections/Services";
import { BundleOffersSection } from "@/components/sections/BundleOffersSection";
import { BundleOffersSkeleton } from "@/components/skeletons/BundleOffersSkeleton";

const FAQ = dynamic(() => import("@/components/sections/FAQ").then((mod) => mod.FAQ));
const Insights = dynamic(() => import("@/components/sections/Insights").then((mod) => mod.Insights));
const Contact = dynamic(() => import("@/components/sections/Contact").then((mod) => mod.Contact));

export const revalidate = 60;

export default function Home() {
  return (
    <main className="select-none">
      <Hero />
      <Suspense fallback={<BundleOffersSkeleton />}>
        <BundleOffersSection />
      </Suspense>
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
