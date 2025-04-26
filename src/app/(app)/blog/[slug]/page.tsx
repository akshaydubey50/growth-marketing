import { SanityDocument } from "@sanity/client";
import { postQuery } from "@/sanity/lib/queries";
import { sanityFetch } from "@/sanity/lib/fetch";
import Post from "./Post";
import { Card } from "@/components/ui/card";
import Canonical from "@/components/seo/Canonical";

// Set dynamic rendering
export const dynamic = 'force-dynamic';

// Remove generateStaticParams since we don't need static generation anymore

interface PageProps {
  params: {
    slug: string;
  };
}

const PostPage = async ({ params }: PageProps) => {
  const post = await sanityFetch<SanityDocument>({ query: postQuery, params });
  
  if (!post) {
    return (
      <Card>
        <h1>Post not found</h1>
      </Card>
    );
  }

  return (
    <>
      <Canonical path={`/blog/${params.slug}`} />
      <Post post={post} />
    </>
  );
}

export default PostPage;
