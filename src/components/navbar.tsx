'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

const navItems: {
  href: '/' | '/features' | '/pricing' | '/api-demo' | '/docs' | '/about'
  label: string
}[] = [
  { href: '/', label: 'Home' },
  { href: '/features', label: 'Features' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/api-demo', label: 'API' },
  { href: '/docs', label: 'Docs' },
  { href: '/about', label: 'About' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-black/[0.06] bg-white/80 backdrop-blur-xl">
      <div className="mx-auto max-w-[980px] px-6">
        <div className="flex h-12 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-[#1d1d1f]">
              <span className="text-[10px] font-bold text-white">S</span>
            </div>
            <span className="text-sm font-semibold tracking-tight text-[#1d1d1f]">
              Scaffold
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center gap-1 md:flex">
            {navItems.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors duration-200 ${
                  pathname === item.href
                    ? 'bg-[#1d1d1f] text-white'
                    : 'text-[#6e6e73] hover:text-[#1d1d1f]'
                }`}>
                {item.label}
              </Link>
            ))}
          </div>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Link
              href="/features"
              className="hidden rounded-full bg-[#0071e3] px-4 py-1.5 text-xs font-medium text-white transition-colors duration-200 hover:bg-[#0077ed] md:inline-flex">
              Get Started
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-md text-[#6e6e73] transition-colors hover:text-[#1d1d1f] md:hidden">
              {mobileMenuOpen ? (
                <X className="h-4 w-4" />
              ) : (
                <Menu className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="animate-slide-down border-t border-black/[0.06] py-3 md:hidden">
            <div className="flex flex-col gap-0.5">
              {navItems.map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-[#f5f5f7] text-[#1d1d1f]'
                      : 'text-[#6e6e73] hover:bg-[#f5f5f7] hover:text-[#1d1d1f]'
                  }`}>
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 border-t border-black/[0.06] pt-3">
                <Link
                  href="/features"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block rounded-full bg-[#0071e3] px-4 py-2.5 text-center text-sm font-medium text-white">
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
