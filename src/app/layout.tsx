import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/site/Footer";
import { Header } from "@/components/site/Header";
import { Background } from "@/components/site/Background";
import { LeadModalProvider } from "@/components/site/LeadModalProvider";
import { PageLoader } from "@/components/ui/PageLoader";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { MobileFloatingButton } from "@/components/ui/MobileFloatingButton";
import { Suspense } from "react";
import { getSiteConfig } from "@/lib/site-config";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export async function generateMetadata(): Promise<Metadata> {
  const config = await getSiteConfig();
  
  return {
    title: config.title,
    description: config.description,
    keywords: config.keywords,
    openGraph: {
      title: config.title,
      description: config.description,
      images: config.ogImage ? [config.ogImage] : [],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className="font-sans antialiased bg-[#05070b]">
        <Suspense fallback={null}>
          <SmoothScroll />
        </Suspense>
        <Suspense fallback={null}>
          <PageLoader />
        </Suspense>
        <LeadModalProvider>
          <Background />
          <Header />
          {children}
          <Footer />
          <MobileFloatingButton />
        </LeadModalProvider>
      </body>
    </html>
  );
}
