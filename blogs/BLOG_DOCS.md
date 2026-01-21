# Blog Documentation

This document explains how to create and manage blog posts for the Phantom Dreams website.

## Overview

Our blog system uses **MDX (Markdown + JSX)** files to create blog posts. MDX allows you to write standard Markdown with the ability to embed React components for rich, interactive content.

## Directory Structure

```
phantomdreamsmedusa/
├── blogs/                          # All blog post MDX files go here
│   ├── template.mdx                # Template for new posts
│   ├── my-first-blog.mdx           # Example blog post
│   └── BLOG_DOCS.md                # This file
└── storefront/
    ├── public/
    │   └── images/
    │       └── blog/               # Blog post images go here
    └── src/
        ├── app/
        │   └── blog/               # Blog routes
        └── lib/
            └── data/
                └── blog.ts         # Blog data fetching logic
```

## Creating a New Blog Post

### Step 1: Copy the Template

1. Navigate to the `blogs/` folder
2. Copy `template.mdx` and rename it using kebab-case
   - Good: `my-awesome-post.mdx`, `product-launch-2026.mdx`
   - Bad: `My Awesome Post.mdx`, `product_launch.mdx`

### Step 2: Update Frontmatter

At the top of your MDX file, update the frontmatter (the section between `---` markers):

```yaml
---
title: "Your Blog Post Title"
date: "2026-01-21"
description: "A brief 1-2 sentence description of your post"
author: "Author Name"
tags: ["tag1", "tag2", "tag3"]
image: "/images/blog/your-image.jpg"
---
```

#### Frontmatter Field Descriptions

| Field | Required | Description | Example |
|-------|----------|-------------|---------|
| `title` | ✅ Yes | The title of your blog post | `"Introducing Our New Feature"` |
| `date` | ✅ Yes | Publication date in YYYY-MM-DD format | `"2026-01-21"` |
| `description` | ✅ Yes | Brief summary for SEO and preview cards | `"Learn about our latest feature that helps you..."` |
| `author` | ✅ Yes | Name of the post author | `"Jane Doe"` or `"Phantom Dreams Team"` |
| `tags` | ✅ Yes | Array of relevant tags/categories | `["announcement", "features", "tutorial"]` |
| `image` | ⚠️ Optional | Path to featured image (must be in `/public`) | `"/images/blog/feature-launch.jpg"` |

### Step 3: Write Your Content

Below the frontmatter, write your blog post content using Markdown syntax.

#### Basic Markdown Syntax

**Headings:**
```markdown
# Heading 1
## Heading 2
### Heading 3
```

**Text Formatting:**
```markdown
**bold text**
*italic text*
~~strikethrough~~
```

**Lists:**
```markdown
- Unordered item 1
- Unordered item 2

1. Ordered item 1
2. Ordered item 2
```

**Links:**
```markdown
[Link text](https://example.com)
```

**Images:**
```markdown
![Alt text describing the image](/images/blog/my-image.jpg)
```

**Code:**
```markdown
Inline `code` with backticks

```javascript
// Code block with syntax highlighting
function example() {
  return "Hello World";
}
```
```

**Blockquotes:**
```markdown
> This is a blockquote
> It can span multiple lines
```

**Tables:**
```markdown
| Column 1 | Column 2 | Column 3 |
|----------|----------|----------|
| Data 1   | Data 2   | Data 3   |
```

## Adding Images

### Step 1: Add Image File

1. Place your image in `storefront/public/images/blog/`
2. Use web-optimized formats: JPG, PNG, or WebP
3. Recommended dimensions: 1200x630px for featured images

### Step 2: Reference in MDX

```markdown
![Descriptive alt text](/images/blog/your-image.jpg)
```

**Important:** 
- Always start paths with `/images/blog/`
- Include descriptive alt text for accessibility
- Don't use relative paths like `../images/`

## File Naming Conventions

### MDX Files (in `/blogs`)

- Use **kebab-case**: lowercase with hyphens
- Be descriptive but concise
- Include date if relevant

**Good Examples:**
- `introducing-new-features.mdx`
- `2026-year-in-review.mdx`
- `how-to-optimize-checkout.mdx`

**Bad Examples:**
- `Post1.mdx` (not descriptive)
- `My New Blog Post.mdx` (spaces)
- `new_features.mdx` (underscores)

### Image Files (in `/storefront/public/images/blog`)

- Use descriptive names
- Include post slug in filename for organization
- Use lowercase with hyphens

**Good Examples:**
- `new-features-hero.jpg`
- `checkout-optimization-diagram.png`
- `team-photo-2026.jpg`

## Testing Your Blog Post

### Local Development

1. Start the development server:
   ```bash
   cd storefront
   pnpm dev
   ```

2. Navigate to:
   - All posts: `http://localhost:3000/blog`
   - Your post: `http://localhost:3000/blog/your-post-slug`

3. Check:
   - ✅ Frontmatter displays correctly
   - ✅ Images load properly
   - ✅ Links work
   - ✅ Code blocks have syntax highlighting
   - ✅ Formatting looks good on mobile and desktop

### Common Issues

**Issue: Post doesn't appear**
- Check filename is `.mdx` not `.md`
- Verify file is in `/blogs` directory
- Ensure frontmatter is valid YAML
- Check for syntax errors

**Issue: Images don't load**
- Verify image exists in `/storefront/public/images/blog/`
- Check path starts with `/images/blog/`
- Ensure filename matches exactly (case-sensitive)

**Issue: Syntax highlighting doesn't work**
- Ensure code fence has language specified: ` ```javascript `
- Supported languages: javascript, typescript, python, bash, css, html, json, etc.

## SEO Best Practices

1. **Title:** Keep under 60 characters
2. **Description:** 120-160 characters, include key terms
3. **Tags:** Use 3-5 relevant tags
4. **Image:** Always include a featured image (1200x630px)
5. **Content:** Aim for 800+ words for better SEO
6. **Headings:** Use proper heading hierarchy (H1 → H2 → H3)
7. **Links:** Include relevant internal and external links
8. **Alt Text:** Always add descriptive alt text to images

## Content Guidelines

### Writing Style

- Write in a conversational, friendly tone
- Keep paragraphs short (2-4 sentences)
- Use headings to break up content
- Include examples and screenshots where helpful
- Proofread for spelling and grammar

### Post Structure

A well-structured blog post typically includes:

1. **Introduction** - Hook the reader and preview what's coming
2. **Main Content** - Break into logical sections with subheadings
3. **Conclusion** - Summarize key points and include a call-to-action
4. **Metadata** - Author, date, tags

### Code Examples

When including code:
- Keep examples concise and focused
- Add comments to explain complex logic
- Use proper syntax highlighting
- Test that code actually works

## Publishing Workflow

1. **Create** - Copy template and write content
2. **Review** - Check spelling, links, images
3. **Test** - View locally at `/blog/your-slug`
4. **Commit** - Add to git and push changes
5. **Deploy** - Changes go live automatically

## Advanced MDX Features

While our blog currently uses standard Markdown, MDX supports advanced features:

- Import and use React components
- Add interactive elements
- Create custom layouts
- Embed external content

These features can be added in the future as needed.

## Need Help?

If you encounter issues or have questions:

1. Check this documentation first
2. Review `template.mdx` for examples
3. Look at `my-first-blog.mdx` for a complete example
4. Test locally before committing

## Quick Reference

### Creating a New Post (Checklist)

- [ ] Copy `template.mdx` with new kebab-case filename
- [ ] Update all frontmatter fields
- [ ] Write engaging content with proper headings
- [ ] Add relevant images to `/storefront/public/images/blog/`
- [ ] Include alt text for all images
- [ ] Test locally at `/blog/your-slug`
- [ ] Review on mobile and desktop
- [ ] Commit and push changes

---

**Last Updated:** January 21, 2026
