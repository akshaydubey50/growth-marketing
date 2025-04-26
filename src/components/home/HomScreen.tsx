"use client"
import ProductList from "@/components/card/ProductList";
import HeroSection from "@/components/herosection/HeroSection";
import FilterSection from "@/components/filter/FilterSection";
import NewsLetter from "@/components/newsletter";
import { useRouter } from "next/navigation";


export default function HomScreen() {
    const router = useRouter();

    const allToolsClickHandler = () => {
        router.push("/tools");
    };
    const itemPerPageCount = 6;

    return (
        <div className="mb-8 overflow-x-hidden">
            <HeroSection />
            <FilterSection />
            <ProductList itemsCount={itemPerPageCount} />
            <div className="flex items-center justify-center">
                <button className="px-12 py-3 mt-4 text-lg font-semibold text-white border-2 rounded-full border-DarkOrange bg-DarkOrange hover:bg-green-300 focus:bg-DarkOrange" onClick={allToolsClickHandler}>
                    All Tools
                </button>
            </div>
            <div className="px-16">
                <NewsLetter />
            </div>
        </div>
    )
}
