import type { MDXComponents } from "mdx/types"
import Image, { ImageProps } from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  InputInput,
  CheckboxCheckbox,
  ModalModal,
  DividerSeparator,
  InteractiveLinkLink,
} from "@modules/common/components"

/**
 * This file is required for Next.js App Router to work with MDX.
 * It defines custom React components for HTML elements rendered from MDX.
 * 
 * New shadcn-based components are available for use in MDX files:
 * - Button: <Button variant="default">Click me</Button>
 * - InputInput: <InputInput label="Email" name="email" type="email" />
 * - CheckboxCheckbox: <CheckboxCheckbox label="Accept terms" />
 * - ModalModal: Complex modal dialogs
 * - DividerSeparator: <DividerSeparator />
 * - InteractiveLinkLink: <InteractiveLinkLink href="/path">Link text</InteractiveLinkLink>
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Custom shadcn-based components available in MDX
    Button,
    InputInput,
    CheckboxCheckbox,
    ModalModal,
    DividerSeparator,
    InteractiveLinkLink,
    // Headings
    h1: ({ children }) => (
      <h1 className="text-3xl-semi mb-6 mt-8 first:mt-0">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl-semi mb-4 mt-8">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl-semi mb-3 mt-6">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-large-semi mb-2 mt-4">{children}</h4>
    ),
    h5: ({ children }) => (
      <h5 className="text-base-semi mb-2 mt-4">{children}</h5>
    ),
    h6: ({ children }) => (
      <h6 className="text-small-semi mb-2 mt-4">{children}</h6>
    ),

    // Paragraphs and text
    p: ({ children }) => (
      <p className="text-base-regular mb-4 leading-relaxed text-gray-700">
        {children}
      </p>
    ),

    // Links
    a: ({ href, children }) => (
      <Link
        href={href as string}
        className="link--base"
      >
        {children}
      </Link>
    ),

    // Lists
    ul: ({ children }) => (
      <ul className="list-disc list-inside mb-4 space-y-2 text-base-regular text-gray-700">
        {children}
      </ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal list-inside mb-4 space-y-2 text-base-regular text-gray-700">
        {children}
      </ol>
    ),
    li: ({ children }) => <li className="ml-4">{children}</li>,

    // Blockquotes
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-gray-300 pl-4 py-2 mb-4 italic text-gray-600 bg-gray-50">
        {children}
      </blockquote>
    ),

    // Code
    code: ({ children, className }) => {
      // Inline code (no className means inline)
      if (!className) {
        return (
          <code className="bg-gray-100 text-pink-600 px-1.5 py-0.5 rounded text-sm font-mono">
            {children}
          </code>
        )
      }
      // Block code (className indicates language)
      return (
        <code className={className}>
          {children}
        </code>
      )
    },
    pre: ({ children }) => (
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto mb-4 text-sm">
        {children}
      </pre>
    ),

    // Tables
    table: ({ children }) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border-collapse border border-gray-300">
          {children}
        </table>
      </div>
    ),
    thead: ({ children }) => (
      <thead className="bg-gray-100">{children}</thead>
    ),
    tbody: ({ children }) => <tbody>{children}</tbody>,
    tr: ({ children }) => (
      <tr className="border-b border-gray-300">{children}</tr>
    ),
    th: ({ children }) => (
      <th className="px-4 py-2 text-left text-base-semi border border-gray-300">
        {children}
      </th>
    ),
    td: ({ children }) => (
      <td className="px-4 py-2 text-base-regular border border-gray-300">
        {children}
      </td>
    ),

    // Images
    img: (props) => (
      <Image
        {...(props as ImageProps)}
        alt={props.alt || ""}
        width={1200}
        height={630}
        className="rounded-lg mb-4 w-full h-auto"
      />
    ),

    // Horizontal rule
    hr: () => <hr className="my-8 border-t border-gray-300" />,

    // Strong and emphasis
    strong: ({ children }) => (
      <strong className="font-semibold text-gray-900">{children}</strong>
    ),
    em: ({ children }) => <em className="italic">{children}</em>,

    // Delete (strikethrough)
    del: ({ children }) => (
      <del className="line-through text-gray-500">{children}</del>
    ),

    // Allow custom components to be passed in
    ...components,
  }
}
