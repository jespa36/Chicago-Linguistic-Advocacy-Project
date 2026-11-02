'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { NAV, SITE } from '@/lib/site'
import { cn } from '@/lib/utils'
import { StarMark } from './star-mark'

export function SiteHeader() {
  const pathname = usePathname() ?? '/'
  const [open, setOpen] = useState(false)
  const isActive = (href: string) => pathname.startsWith(href)

  return (
    <header className="sticky top-0 z-[1100] border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-4 py-3 md:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <StarMark className="size-7 text-accent" />
          <span className="flex flex-col leading-none">
            <span className="font-serif text-lg text-foreground">{SITE.name}</span>
            <span className="text-[11px] text-muted-foreground">{SITE.tagline}</span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-1 text-sm md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(item.href) ? 'page' : undefined}
              className={cn(
                'rounded-md px-3 py-1.5 transition-colors',
                isActive(item.href)
                  ? 'bg-secondary font-medium text-foreground'
                  : 'text-muted-foreground hover:text-foreground',
              )}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/contribute/"
            className="ml-2 rounded-md bg-accent px-3.5 py-1.5 font-semibold text-accent-foreground transition-colors hover:bg-accent/90"
          >
            Contribute
          </Link>
        </nav>

        <button
          type="button"
          className="rounded-md p-2 text-foreground md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav aria-label="Mobile" className="border-t border-border bg-background px-4 pb-4 pt-2 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'block rounded-md px-3 py-2.5 text-sm',
                    isActive(item.href) ? 'bg-secondary font-medium text-foreground' : 'text-muted-foreground',
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/contribute/"
                onClick={() => setOpen(false)}
                className="mt-1 block rounded-md bg-accent px-3 py-2.5 text-center text-sm font-semibold text-accent-foreground"
              >
                Contribute a photo
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  )
}
