export function PageHeader({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string
  title: string
  children?: React.ReactNode
}) {
  return (
    <div className="mx-auto max-w-7xl px-4 pt-12 pb-8 md:px-6 md:pt-16">
      <p className="text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
      <h1 className="mt-3 max-w-3xl text-balance font-serif text-3xl leading-tight text-foreground md:text-5xl">
        {title}
      </h1>
      {children && (
        <div className="mt-4 max-w-2xl text-pretty leading-relaxed text-muted-foreground">{children}</div>
      )}
    </div>
  )
}
