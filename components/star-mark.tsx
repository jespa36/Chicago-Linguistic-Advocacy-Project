/** A six-pointed star, used as the site's brand mark (a nod to Chicago's four-star motif). */
export function StarMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className={className} fill="currentColor">
      <polygon points="12,1.5 22,19 2,19" />
      <polygon points="12,22.5 2,5 22,5" />
    </svg>
  )
}
