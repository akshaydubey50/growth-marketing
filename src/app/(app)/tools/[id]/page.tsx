import { Metadata, ResolvingMetadata } from "next";
import ProductDetail from "./product-detail"; // Import client-side component
import { AirtableModel } from "@/models/airtable.model";
import { APPConf } from "@/conf/conf";
import Canonical from "@/components/seo/Canonical";

// Props for generateMetadata
type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};

// Fetch product metadata dynamically
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  // Read route params
  const id = params.id;

  // Fetch data from API
  const response = await fetch(`${APPConf.BASE_URL}/api/tools`);
  const { data } = await response.json();

  // Find the matching product
  const productMatched = data.find((product: AirtableModel) => {
    const formattedTitle = product?.fields?.Name?.toLowerCase()
      ?.trim()
      ?.replace(/\s/g, "-");
    return formattedTitle === id;
  });

  // Fallback values
  const fallbackTitle = "Product Not Found";
  const fallbackDescription =
    "Sorry, we couldn't find the product you're looking for.";

  // Return dynamic metadata
  return {
    title: `${productMatched?.fields?.Name} - Growth Marketing ToolsTools` || fallbackTitle,
    description: productMatched?.fields?.Description || fallbackDescription,
    openGraph: {
      title: `${productMatched?.fields?.Name} - Growth Marketing ToolsTools` || fallbackTitle,
      description: productMatched?.fields?.Description || fallbackDescription,
      images: productMatched?.fields?.ToolImage
        ? [{ url: productMatched.fields.ToolImage }]
        : [],
    },
  };
}

// Render the client-side component in this server-side component
export default function Page({ params }: Props) {
  return <>
  <Canonical/>
  <ProductDetail params={params} />
  </>;
}
