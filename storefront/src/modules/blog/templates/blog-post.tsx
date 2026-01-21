import Image from "next/image"
import Link from "next/link"
import { BlogPost } from "@lib/data/blog"
import { MDXRemote } from "next-mdx-remote/rsc"
import { BlogMDXComponents } from "../components/mdx-components"

interface BlogPostTemplateProps {
  post: BlogPost
}

export default function BlogPostTemplate({ post }: BlogPostTemplateProps) {
  return (
    <article className="content-container py-12">
      <Link
        href="/blog"
        className="link--back mb-8"
      >
        <svg
          className="w-4 h-4 mr-2"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Blog
      </Link>

      <header className="mb-8">
        <h1 className="text-3xl-semi mb-4">{post.title}</h1>
        <div className="flex flex-wrap items-center gap-4 text-base-regular text-gray-600">
          <div className="flex items-center gap-2">
            <span>By {post.author}</span>
          </div>
          <span>•</span>
          <time dateTime={post.date}>
            {new Date(post.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>
        </div>
        {post.tags && post.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-4">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="tag tag--base tag--gray"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </header>

      {post.image && (
        <div className="relative w-full aspect-[16/9] mb-8 rounded-lg overflow-hidden">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="img-cover"
            priority
            sizes="(max-width: 1440px) 100vw, 1440px"
          />
        </div>
      )}

      <div className="prose prose-gray max-w-none">
        <MDXRemote source={post.content} components={BlogMDXComponents} />
      </div>

      <footer className="mt-12 pt-8 border-t border-gray-200">
        <Link
          href="/blog"
          className="link--base inline-flex items-center"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          View all posts
        </Link>
      </footer>
    </article>
  )
}
