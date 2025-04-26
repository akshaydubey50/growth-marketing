import { Metadata, ResolvingMetadata } from "next";
import PromptDetailPage from "./prompt-detail"; // Import client-side component
import { PropmtResourceModel } from "@/models/airtable.model";
import { APPConf } from "@/conf/conf";
import Canonical from "@/components/seo/Canonical";

// Props for generateMetadata
type Props = {
  params: { slug: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Fetch product metadata dynamically
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read route params
  const slug = params.slug;

  // Fetch data from API
  const response = await fetch(`${APPConf.BASE_URL}/api/prompts`);
  const { data } = await response.json();

  // Find the matching product
  const productMatched = data.find((prompt: PropmtResourceModel) => {
    const formattedTitle = prompt?.fields?.Name?.toLowerCase()
      ?.trim()
      ?.replace(/\s/g, "-");
    return formattedTitle === slug; // Changed '!==' to '==='
  });

  // Fallback values
  const fallbackTitle = "Prompts Not Found";
  const fallbackDescription =
    "Sorry, we couldn't find the prompts you're looking for.";

  // Return dynamic metadata
  return {
    title: `${productMatched?.fields?.Name} - Content Prompts` || fallbackTitle,
    description: productMatched?.fields?.Description || fallbackDescription,
    openGraph: {
      title: `${productMatched?.fields?.Name} - Content Prompts` || fallbackTitle,
      description: productMatched?.fields?.Description || fallbackDescription,
      images: productMatched?.fields?.ToolImage
        ? [{ url: productMatched.fields.ToolImage }]
        : [],
    },
  };
}

// Render the client-side component in this server-side component
export default function Page({ params }: Props) {
  return  <>

<Canonical/>
  <PromptDetailPage params={params} />
  
  </>;
}
