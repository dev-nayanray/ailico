export default function Loading() {
  return (
    <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-24" role="status" aria-label="Loading page">
      <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-accent [animation-duration:1.2s]" />
      <span className="ml-1.5 h-2.5 w-2.5 animate-pulse rounded-full bg-accent [animation-delay:150ms] [animation-duration:1.2s]" />
      <span className="ml-1.5 h-2.5 w-2.5 animate-pulse rounded-full bg-accent [animation-delay:300ms] [animation-duration:1.2s]" />
      <span className="sr-only">Loading…</span>
    </div>
  );
}
