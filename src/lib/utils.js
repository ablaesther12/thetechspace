import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// Join class names (clsx) and resolve Tailwind conflicts (twMerge).
// Used by our own primitives and by shadcn/ui + Shadcn Space components.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
