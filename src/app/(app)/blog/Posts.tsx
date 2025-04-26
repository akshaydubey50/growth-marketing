import BlogPostCard from "@/components/blog/BlogPostCard";
import type { SanityDocument } from "@sanity/client";
import Image from "next/image";
import Link from "next/link";

const Posts = ({ posts = [] }: { posts: SanityDocument[] }) => {

  const convertDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })
  }

  return (
    <div className="mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
        {posts.map((post) => (
          <Link
            key={post._id}
            href={`/blog/${post.slug.current}`}
            className="group block bg-white shadow-md hover:shadow-lg transition-shadow duration-200 rounded-lg overflow-hidden"
          >
            <BlogPostCard key={post._id} post={post}/>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Posts;

