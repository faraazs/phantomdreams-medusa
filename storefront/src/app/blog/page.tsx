import { Metadata } from "next"
import { getAllBlogPosts } from "@lib/data/blog"
import BlogListTemplate from "@modules/blog/templates/blog-list"

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Read our latest insights, updates, and stories from the Phantom Dreams team.",
}

export default async function BlogPage() {
  const posts = await getAllBlogPosts()

  return <BlogListTemplate posts={posts} />
}
