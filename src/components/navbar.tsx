'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sparkles, Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const navItems: { href: '/' | '/features' | '/pricing' | '/api-demo' | '/docs' | '/about'; label: string }[] = [
  { href: '/', label: '首页' },
  { href: '/features', label: '功能' },
  { href: '/pricing', label: '价格' },
  { href: '/api-demo', label: 'API' },
  { href: '/docs', label: '文档' },
  { href: '/about', label: '关于' },
]

export function Navbar() {
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-slate-200/50 bg-white/80 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-950/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="text-lg font-bold text-slate-900 dark:text-white">
              Scaffold
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:gap-1">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative px-4 py-2 text-sm font-medium transition-colors ${
                  pathname === item.href
                    ? 'text-violet-600 dark:text-violet-400'
                    : 'text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute bottom-0 left-1/2 h-0.5 w-4 -translate-x-1/2 rounded-full bg-violet-500" />
                )}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden md:flex md:items-center md:gap-4">
            <Button
              size="sm"
              className="rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 font-medium text-white hover:from-violet-700 hover:to-fuchsia-700"
            >
              开始使用
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 dark:border-slate-800 md:hidden"
          >
            {mobileMenuOpen ? (
              <X className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            ) : (
              <Menu className="h-4 w-4 text-slate-600 dark:text-slate-400" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="border-t border-slate-200/50 py-4 md:hidden dark:border-slate-800/50">
            <div className="flex flex-col gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                    pathname === item.href
                      ? 'bg-violet-50 text-violet-600 dark:bg-violet-900/20 dark:text-violet-400'
                      : 'text-slate-600 hover:bg-slate-50 dark:text-slate-400 dark:hover:bg-slate-800/50'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
              <div className="mt-2 px-4">
                <Button className="w-full rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 font-medium text-white">
                  开始使用
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
