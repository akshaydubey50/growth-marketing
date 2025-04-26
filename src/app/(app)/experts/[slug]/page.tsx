// app/expert/[slug]/page.js
import { Metadata, ResolvingMetadata } from "next";
import { ExpertModel } from "@/models/airtable.model";
import { APPConf } from "@/conf/conf";
import Canonical from "@/components/seo/Canonical";
import ExpertsDetail from "@/components/experts/ExpertsDetail";

// Props for generateMetadata
type Props = {
    params: { slug: string };
    searchParams: { [key: string]: string | string[] | undefined };
};

// Fetch expert by slug
async function fetchExpertBySlug(slug: string) {
    try {
        const response = await fetch(`${APPConf.BASE_URL}/api/experts?slug=${encodeURIComponent(slug)}`, {
            next: { revalidate: 3600 }, // Cache the response for 1 hour
        });
        if (!response.ok) {
            throw new Error("Failed to fetch expert data");
        }
        const { data } = await response.json();
        return data.find((expert: ExpertModel) => {
            const formattedUsername = expert?.fields?.Username?.toLowerCase()
                ?.trim()
                ?.replace(/\s/g, "-");
            return formattedUsername === slug;
        });
    } catch (error) {
        console.error("Error fetching expert:", error);
        return null;
    }
}

// Fetch expert metadata dynamically
export async function generateMetadata(
    { params }: Props,
    parent: ResolvingMetadata
): Promise<Metadata> {
    const slug = params.slug;

    // Fetch the matching expert
    const expertMatched = await fetchExpertBySlug(slug);

    // Fallback values
    const fallbackTitle = "Expert Not Found";
    const fallbackDescription =
        "Sorry, we couldn't find the expert you're looking for.";

    // Return dynamic metadata
    return {
        title: `${expertMatched?.fields["First Name"]} ${expertMatched?.fields["Last Name"]} - Expert Profile` || fallbackTitle,
        description: expertMatched?.fields["Professional Bio"] || fallbackDescription,
        openGraph: {
            title: `${expertMatched?.fields["First Name"]} ${expertMatched?.fields["Last Name"]} - Expert Profile` || fallbackTitle,
            description: expertMatched?.fields["Professional Bio"] || fallbackDescription,
            images: expertMatched?.fields["Portfolio"]
                ? [{ url: expertMatched.fields["Portfolio"] }]
                : [],
        },
    };
}

// Render the client-side component in this server-side component
export default async function Page({ params }: Props) {
    // Fetch the expert data
    const expert = await fetchExpertBySlug(params.slug);

    // If the expert is not found, return a 404 message
    if (!expert) {
        return (
            <div className="text-center mt-10">
                <h2 className="text-lg font-semibold">Expert not found</h2>
                <p className="text-gray-500">We couldn’t find the expert you’re looking for.</p>
            </div>
        );
    }

    return (
        <>
            <Canonical />
            <ExpertsDetail expert={expert} /> {/* Pass the expert data as a prop */}
        </>
    );
}