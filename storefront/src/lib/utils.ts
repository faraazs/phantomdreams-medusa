import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

/**
 * Combines class names using clsx and tailwind-merge
 * This utility function merges Tailwind CSS classes intelligently,
 * removing duplicate and conflicting classes
 * 
 * @param inputs - Class values to merge
 * @returns Merged class string
 * 
 * @example
 * cn("px-4 py-2", "px-6") // Returns: "py-2 px-6"
 * cn("text-red-500", someCondition && "text-blue-500") // Conditionally applies classes
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
