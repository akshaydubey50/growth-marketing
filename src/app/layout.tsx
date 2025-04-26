import "./globals.css";
import Navbar from "@/components/common/Navbar";
import Footer from "@/components/common/Footer";
import { Poppins } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Providers from "@/providers/Providers";
import Authprovider from "./Authprovider";
import { GoogleAnalytics,GoogleTagManager,} from "@next/third-parties/google";
import { Toaster } from "@/components/ui/toaster";
import { Metadata } from 'next';
import { APPConf } from "@/conf/conf";

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700", "800"],
});

interface GenerateMetadataProps {
  params: { slug?: string };
  pathname: string;
}

export async function generateMetadata({ 
  params, 
  pathname = '' // provide default value
}: Partial<GenerateMetadataProps>): Promise<Metadata> {
  const canonical = `${APPConf.BASE_URL}${pathname}`;

  return {
    title: "Growth Marketing Tools",
    description: "Directory of 200+ Growth Marketing Tools designed to streamline your process and enhance productivity.",
    metadataBase: new URL(APPConf.BASE_URL),
    alternates: {
      canonical: canonical,
    }
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable}`}>
      <head>
        <link rel="preconnect" href="https://embeds.beehiiv.com" />
        <link
          rel="preload"
          href="https://embeds.beehiiv.com/c8b47983-58f2-410d-9d69-f10d79908089?slim=true"
          as="document"
        />
        <GoogleTagManager gtmId="GTM-P65VN64G" />
        
      </head>
      <body className="flex flex-col min-h-screen font-poppins ">
        <Authprovider>
          <Providers>
            <Toaster />
            <Navbar />
            <main 
            className="flex  justify-center"
            >
              <div className="grow">
              {children}
              </div>
            </main>
            <Footer />
          </Providers>
        </Authprovider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
