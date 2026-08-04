'use client'

import { useState } from 'react'
import {
  Book,
  Code,
  Layers,
  Zap,
  ArrowRight,
  Search,
  FileText,
  ExternalLink,
  ChevronRight,
} from 'lucide-react'

const docSections = [
  {
    title: 'Quick Start',
    icon: <Zap className="h-4 w-4" />,
    items: [
      { title: 'Installation', href: '#', desc: 'Get started in 5 minutes' },
      { title: 'Project Structure', href: '#', desc: 'Understand directory organization' },
      { title: 'First Page', href: '#', desc: 'Create Hello World' },
    ],
  },
  {
    title: 'Core Concepts',
    icon: <Book className="h-4 w-4" />,
    items: [
      { title: 'Routing', href: '#', desc: 'App Router deep dive' },
      { title: 'Data Fetching', href: '#', desc: 'Server & Client Components' },
      { title: 'Styling', href: '#', desc: 'Tailwind CSS configuration' },
    ],
  },
  {
    title: 'Components',
    icon: <Layers className="h-4 w-4" />,
    items: [
      { title: 'Basic Components', href: '#', desc: 'Button, Input, Card' },
      { title: 'Form Components', href: '#', desc: 'Form, Select, Checkbox' },
      { title: 'Layout Components', href: '#', desc: 'Grid, Flex, Container' },
    ],
  },
  {
    title: 'API Reference',
    icon: <Code className="h-4 w-4" />,
    items: [
      { title: 'Configuration', href: '#', desc: 'next.config.ts' },
      { title: 'CLI Commands', href: '#', desc: 'All available commands' },
      { title: 'Type Definitions', href: '#', desc: 'TypeScript types' },
    ],
  },
]

const recentUpdates = [
  { version: 'v2.1.0', date: '2025-04-01', title: 'Added dark mode support' },
  { version: 'v2.0.0', date: '2025-03-15', title: 'Upgraded to Next.js 16' },
  { version: 'v1.9.0', date: '2025-02-28', title: 'Improved build performance' },
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)

  const filteredSections = docSections
    .map(section => ({
      ...section,
      items: section.items.filter(
        item =>
          searchQuery === '' ||
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.desc.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter(section => section.items.length > 0)

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="border-b border-[#d2d2d7]/60">
        <div className="mx-auto max-w-[980px] px-6 py-16">
          <div className="text-center">
            <h1 className="animate-slide-up text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-4xl">Documentation</h1>
            <p className="animate-slide-up animation-delay-100 mx-auto mt-3 max-w-md text-base text-[#6e6e73]">
              Master every detail of Scaffold
            </p>

            {/* Search */}
            <div className="animate-slide-up animation-delay-200 mx-auto mt-8 max-w-md">
              <div className="relative">
                <Search className="absolute top-1/2 left-3.5 h-4 w-4 -translate-y-1/2 text-[#86868b]" />
                <input
                  type="text"
                  placeholder="Search docs..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="h-10 w-full rounded-full border border-[#d2d2d7] bg-[#f5f5f7] pl-10 pr-4 text-sm text-[#1d1d1f] transition-all duration-200 placeholder:text-[#86868b] focus:border-[#0071e3] focus:bg-white focus:ring-2 focus:ring-[#0071e3]/10 focus:outline-none"
                />
                {isSearchFocused && searchQuery && (
                  <div className="animate-slide-down absolute top-full right-0 left-0 z-10 mt-2 rounded-xl border border-[#d2d2d7] bg-white p-1.5 shadow-lg shadow-black/5">
                    {filteredSections.length > 0 ? (
                      filteredSections.map(section => (
                        <div key={section.title} className="mb-1">
                          <div className="px-2.5 py-1 text-[11px] font-medium tracking-wide text-[#86868b] uppercase">{section.title}</div>
                          {section.items.map(item => (
                            <a key={item.title} href={item.href} className="flex items-center justify-between rounded-lg px-2.5 py-2 text-sm text-[#1d1d1f] transition-colors hover:bg-[#f5f5f7]">
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{item.title}</span>
                                <span className="text-xs text-[#86868b]">{item.desc}</span>
                              </div>
                              <ChevronRight className="h-3.5 w-3.5 text-[#d2d2d7]" />
                            </a>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-center text-sm text-[#86868b]">No results found</div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-[980px] px-6 py-12">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-20">
              <h3 className="mb-3 text-[11px] font-medium tracking-wide text-[#86868b] uppercase">Recent Updates</h3>
              <div className="space-y-2">
                {recentUpdates.map((update, index) => (
                  <div key={index} className="animate-fade-in card-hover group cursor-pointer rounded-xl bg-[#f5f5f7] p-3" style={{ animationDelay: `${index * 80}ms` }}>
                    <div className="flex items-center gap-2">
                      <span className="rounded-md bg-[#0071e3]/10 px-1.5 py-0.5 text-[11px] font-medium text-[#0071e3]">{update.version}</span>
                      <span className="text-[11px] text-[#86868b]">{update.date}</span>
                    </div>
                    <p className="mt-1.5 text-[13px] text-[#6e6e73] transition-colors group-hover:text-[#1d1d1f]">{update.title}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Doc Grid */}
          <div className="lg:col-span-3">
            <div className="grid gap-4 sm:grid-cols-2">
              {docSections.map((section, index) => (
                <div key={index} className="animate-scale-in card-hover group rounded-2xl bg-[#f5f5f7] p-5" style={{ animationDelay: `${index * 60}ms` }}>
                  <div className="mb-4 flex items-center gap-2.5">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1d1d1f] shadow-sm transition-colors duration-300 group-hover:text-[#0071e3]">
                      {section.icon}
                    </div>
                    <h2 className="text-sm font-semibold text-[#1d1d1f]">{section.title}</h2>
                  </div>
                  <ul className="space-y-0.5">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a href={item.href} className="group/item flex items-center justify-between rounded-lg px-2.5 py-2 transition-colors hover:bg-white">
                          <div>
                            <p className="text-[13px] font-medium text-[#1d1d1f] transition-colors group-hover/item:text-[#0071e3]">{item.title}</p>
                            <p className="text-xs text-[#86868b]">{item.desc}</p>
                          </div>
                          <ArrowRight className="h-3.5 w-3.5 text-[#d2d2d7] opacity-0 transition-all duration-200 group-hover/item:translate-x-0.5 group-hover/item:opacity-100" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="animate-fade-in animation-delay-400 mt-6 flex flex-col items-center gap-4 rounded-2xl bg-[#f5f5f7] p-6 sm:flex-row">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-[#0071e3] shadow-sm">
                <FileText className="h-5 w-5" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-sm font-semibold text-[#1d1d1f]">Can&apos;t find what you need?</h3>
                <p className="text-[13px] text-[#6e6e73]">Check our GitHub or join the Discord community</p>
              </div>
              <div className="flex gap-2">
                <a href="#" className="inline-flex h-8 items-center gap-1.5 rounded-full bg-[#0071e3] px-3.5 text-xs font-medium text-white transition-colors hover:bg-[#0077ed]">
                  <ExternalLink className="h-3 w-3" /> GitHub
                </a>
                <a href="#" className="inline-flex h-8 items-center rounded-full border border-[#d2d2d7] px-3.5 text-xs font-medium text-[#6e6e73] transition-colors hover:border-[#1d1d1f] hover:text-[#1d1d1f]">
                  Discord
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-fade-in animation-delay-500 mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {[
                { title: 'API Docs', icon: <Code className="h-3.5 w-3.5" />, href: '/api-demo' },
                { title: 'Components', icon: <Layers className="h-3.5 w-3.5" />, href: '/features' },
                { title: 'Pricing', icon: <Zap className="h-3.5 w-3.5" />, href: '/pricing' },
                { title: 'About Us', icon: <Book className="h-3.5 w-3.5" />, href: '/about' },
              ].map((link, index) => (
                <a key={index} href={link.href} className="group flex items-center gap-2.5 rounded-xl bg-[#f5f5f7] p-3 transition-all duration-200 hover:bg-[#e8e8ed]">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[#1d1d1f] shadow-sm transition-colors group-hover:text-[#0071e3]">
                    {link.icon}
                  </span>
                  <span className="text-xs font-medium text-[#6e6e73] transition-colors group-hover:text-[#1d1d1f]">{link.title}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
