import "./globals.css";
import { Poppins } from "next/font/google";
import { themeInitScript } from "@/lib/themeScript";
import { siteConfig, brandAssets, defaultKeywords } from "@/lib/seo/metadata";
import RootClientLayout from "@/components/layout/RootClientLayout";

const poppins = Poppins({
  weight: ["400", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: `${siteConfig.name} - ${siteConfig.tagline}`,
  description: siteConfig.description,
  openGraph: {
    title: `${siteConfig.name} - ${siteConfig.tagline}`,
    description: siteConfig.description,
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og.png"],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={poppins.className} suppressHydrationWarning>
      <head>
        {/* CRITICAL: Prevent flash of wrong theme */}
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body suppressHydrationWarning>
        <RootClientLayout>{children}</RootClientLayout>
      </body>
    </html>
  );
}
