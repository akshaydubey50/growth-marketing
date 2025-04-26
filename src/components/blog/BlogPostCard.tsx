import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { Avatar, AvatarImage } from "@/components/ui/avatar"
import type { SanityDocument } from "@sanity/client";
// import { AvatarGroup } from "@/components/ui/avatar"

export default function BlogPostCard({post}: {post: any}) {
console.log("post", post)

  return (
    <Card className="max-w-md overflow-hidden bg-gray-50/50 h-full">
      <div className="p-6 space-y-4">
        {/* Image Container */}
        <div className="flex justify-center  bg-gray-100 rounded-lg">
          <Image
            src={post?.imageURL ||""}
            alt="Text Editor Icon"
            width={1366}
            height={768}
            className="text-blue-600 rounded-lg object-fit"
          />
        </div>

        {/* Content */}
        <div className="space-y-4">
          {/* <div className="text-sm text-gray-500 uppercase tracking-wide">
            Blog Post
          </div> */}
          
          <h2 className="text-2xl font-bold tracking-tight">
           {post?.title}
          </h2>

          <Badge variant="secondary" className="bg-gray-100 text-gray-600 hover:bg-gray-100">
            PRODUCT
          </Badge>

          <p className="text-gray-600 leading-relaxed">
            The Portable Text Editor is a powerful, customizable editor for
            authoring rich text and block...
          </p>

          {/* Authors */}
          {/* <div className="flex items-center gap-3 pt-2">
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="Author 1" />
              </Avatar>
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="Author 2" />
              </Avatar>
              <Avatar>
                <AvatarImage src="/placeholder.svg" alt="Author 3" />
              </Avatar>
            <span className="text-sm text-gray-600">
              Knut Melvær and 2 others
            </span>
          </div> */}
        </div>
      </div>
    </Card>
  )
}

