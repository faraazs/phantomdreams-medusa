import { BlogPostMetadata } from "@lib/data/blog"
import BlogCard from "../components/blog-card"

interface BlogListTemplateProps {
  posts: BlogPostMetadata[]
}

export default function BlogListTemplate({ posts }: BlogListTemplateProps) {
  if (posts.length === 0) {
    return (
      <div className="content-container py-12">
        <div className="text-center">
          <h2 className="text-2xl-semi mb-4">No blog posts yet</h2>
          <p className="text-base-regular text-gray-600">
            Check back soon for new content!
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="content-container py-12">
      <div className="mb-12">
        <h1 className="text-3xl-semi mb-4">Blog</h1>
        <p className="text-large-regular text-gray-600">
          Insights, updates, and stories from our team
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
