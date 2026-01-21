import Link from "next/link"

export default function BlogNotFound() {
  return (
    <div className="content-container py-12">
      <div className="text-center max-w-xl mx-auto">
        <h1 className="text-3xl-semi mb-4">Blog Post Not Found</h1>
        <p className="text-base-regular text-gray-600 mb-8">
          Sorry, we couldn't find the blog post you're looking for. It may have
          been removed or the URL might be incorrect.
        </p>
        <Link
          href="/blog"
          className="inline-block px-6 py-3 bg-black text-white rounded-full hover:bg-gray-800 transition-colors"
        >
          Back to Blog
        </Link>
      </div>
    </div>
  )
}
