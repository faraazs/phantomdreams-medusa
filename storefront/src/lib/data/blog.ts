import fs from "fs"
import path from "path"
import matter from "gray-matter"

export interface BlogPostMetadata {
  title: string
  date: string
  description: string
  author: string
  tags: string[]
  image?: string
  slug: string
}

export interface BlogPost extends BlogPostMetadata {
  content: string
}

// Get the path to the blogs directory at project root
const BLOGS_PATH = path.join(process.cwd(), "..", "blogs")

/**
 * Get all MDX files from the blogs directory
 */
function getBlogFiles(): string[] {
  try {
    const files = fs.readdirSync(BLOGS_PATH)
    return files.filter((file) => file.endsWith(".mdx"))
  } catch (error) {
    console.error("Error reading blogs directory:", error)
    return []
  }
}

/**
 * Get metadata from all blog posts, sorted by date (newest first)
 */
export async function getAllBlogPosts(): Promise<BlogPostMetadata[]> {
  const files = getBlogFiles()

  const posts = files.map((filename) => {
    const slug = filename.replace(/\.mdx$/, "")
    const filePath = path.join(BLOGS_PATH, filename)
    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data } = matter(fileContents)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      description: data.description || "",
      author: data.author || "Anonymous",
      tags: data.tags || [],
      image: data.image,
    } as BlogPostMetadata
  })

  // Sort by date, newest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime()
    const dateB = new Date(b.date).getTime()
    return dateB - dateA
  })
}

/**
 * Get a single blog post by slug with full content
 */
export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    const filePath = path.join(BLOGS_PATH, `${slug}.mdx`)
    
    if (!fs.existsSync(filePath)) {
      return null
    }

    const fileContents = fs.readFileSync(filePath, "utf8")
    const { data, content } = matter(fileContents)

    return {
      slug,
      title: data.title || "Untitled",
      date: data.date || new Date().toISOString().split("T")[0],
      description: data.description || "",
      author: data.author || "Anonymous",
      tags: data.tags || [],
      image: data.image,
      content,
    }
  } catch (error) {
    console.error(`Error reading blog post ${slug}:`, error)
    return null
  }
}

/**
 * Get all blog post slugs for static generation
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  const files = getBlogFiles()
  return files.map((filename) => filename.replace(/\.mdx$/, ""))
}

/**
 * Get blog posts filtered by tag
 */
export async function getBlogPostsByTag(tag: string): Promise<BlogPostMetadata[]> {
  const allPosts = await getAllBlogPosts()
  return allPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  )
}

/**
 * Get all unique tags from all blog posts
 */
export async function getAllTags(): Promise<string[]> {
  const allPosts = await getAllBlogPosts()
  const tagsSet = new Set<string>()
  
  allPosts.forEach((post) => {
    post.tags.forEach((tag) => tagsSet.add(tag))
  })
  
  return Array.from(tagsSet).sort()
}
