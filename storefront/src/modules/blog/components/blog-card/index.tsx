import Link from "next/link"
import Image from "next/image"
import { BlogPostMetadata } from "@lib/data/blog"

interface BlogCardProps {
  post: BlogPostMetadata
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="card--blog"
    >
      <div className="relative w-full aspect-[16/9] bg-gray-100">
        {post.image ? (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="img-cover--hover"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <span className="text-gray-400 text-4xl">📝</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 text-small-regular text-gray-500 mb-2">
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
          <span>•</span>
          <span>{post.author}</span>
        </div>
        <h3 className="text-large-semi mb-2 group-hover:text-blue-600 transition-colors">
          {post.title}
        </h3>
        <p className="text-base-regular text-gray-600 line-clamp-3">
          {post.description}
        </p>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-3">
            {post.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="tag tag--sm tag--gray"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
