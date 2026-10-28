import type { MDXComponents } from "mdx/types";
import Link from "next/link";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    a: ({ href, children }) => {
      if (!href) return <a>{children}</a>;
      if (href.startsWith("/")) {
        return (
          <Link
            href={href}
            className="font-medium text-accent underline decoration-accent-line underline-offset-2 hover:text-accent-strong"
          >
            {children}
          </Link>
        );
      }
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-accent underline decoration-accent-line underline-offset-2 hover:text-accent-strong"
        >
          {children}
        </a>
      );
    },
  };
}
