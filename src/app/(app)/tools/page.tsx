import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import NewsLetter from "@/components/newsletter";
import FAQ from "@/components/faq";
import Canonical from "@/components/seo/Canonical";


import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Directory of 200+ Growth Marketing Tools - Growth Marketing Tools",
  description:"Explore 200+ Growth Marketing Tools for AI writing, social media, design, video editing, and more. Find free, free trial, paid, and premium options to boost your workflow."
};

export default function ToolsPage() {
  const itemPerPageCount = 12;
  return (
    <div className="mb-8 overflow-x-hidden">
      <Canonical />
      <HeroSection />
      <FilterSection />
      <ProductList itemsCount={itemPerPageCount} />
      <FAQ />
      <div className="px-4 md:px-8 lg:px-16 ">
        <NewsLetter />
      </div>
    </div>
  );
}
