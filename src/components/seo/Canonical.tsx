'use client';

import { APPConf } from "@/conf/conf";
import { usePathname } from "next/navigation";
import Script from "next/script";

interface CanonicalProps {
  path?: string;
}

const Canonical = ({ path }: CanonicalProps) => {
  const pathname = usePathname();
  const url = `${APPConf.BASE_URL}${path || pathname}`;

  console.log("canonical url",url)

  return (
    <Script id="canonical-tag" strategy="afterInteractive">
      {`
        const link = document.createElement('link');
        link.rel = 'canonical';
        link.href = '${url}';
        document.head.appendChild(link);
      `}
    </Script>
  );
};

export default Canonical; 