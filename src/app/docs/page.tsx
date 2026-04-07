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
    icon: <Zap className="h-5 w-5" />,
    items: [
      { title: 'Installation', href: '#', desc: 'Get started in 5 minutes' },
      {
        title: 'Project Structure',
        href: '#',
        desc: 'Understand directory organization',
      },
      { title: 'First Page', href: '#', desc: 'Create Hello World' },
    ],
  },
  {
    title: 'Core Concepts',
    icon: <Book className="h-5 w-5" />,
    items: [
      { title: 'Routing', href: '#', desc: 'App Router deep dive' },
      { title: 'Data Fetching', href: '#', desc: 'Server & Client Components' },
      { title: 'Styling', href: '#', desc: 'Tailwind CSS configuration' },
    ],
  },
  {
    title: 'Components',
    icon: <Layers className="h-5 w-5" />,
    items: [
      { title: 'Basic Components', href: '#', desc: 'Button, Input, Card' },
      { title: 'Form Components', href: '#', desc: 'Form, Select, Checkbox' },
      { title: 'Layout Components', href: '#', desc: 'Grid, Flex, Container' },
    ],
  },
  {
    title: 'API Reference',
    icon: <Code className="h-5 w-5" />,
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
  {
    version: 'v1.9.0',
    date: '2025-02-28',
    title: 'Improved build performance',
  },
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearchFocused, setIsSearchFocused] = useState(false)
  const [hoveredSection, setHoveredSection] = useState<string | null>(null)

  // Filter sections based on search
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
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="mesh-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(120,119,198,0.1),transparent)]" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="animate-slide-up text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Documentation
            </h1>
            <p className="animate-slide-up animation-delay-100 mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Master every detail of Scaffold from beginner to advanced
            </p>

            {/* Search Bar with Animation */}
            <div className="animate-slide-up animation-delay-200 mx-auto mt-8 max-w-xl">
              <div
                className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-105' : ''}`}>
                <Search
                  className={`absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 transition-colors ${isSearchFocused ? 'text-violet-500' : 'text-slate-400'}`}
                />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  className="w-full rounded-2xl border border-slate-200 bg-white/80 py-4 pl-12 pr-4 text-slate-900 shadow-sm backdrop-blur-xl transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-slate-800 dark:bg-slate-900/80 dark:text-white"
                />
                {/* Search suggestions dropdown */}
                {isSearchFocused && searchQuery && (
                  <div className="absolute left-0 right-0 top-full mt-2 rounded-xl border border-slate-200 bg-white/95 p-2 shadow-xl backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/95">
                    {filteredSections.length > 0 ? (
                      filteredSections.map(section => (
                        <div key={section.title} className="mb-2">
                          <div className="px-3 py-1 text-xs font-semibold text-slate-400">
                            {section.title}
                          </div>
                          {section.items.map(item => (
                            <a
                              key={item.title}
                              href={item.href}
                              className="flex items-center justify-between rounded-lg px-3 py-2 text-sm text-slate-700 transition-colors hover:bg-violet-50 dark:text-slate-300 dark:hover:bg-violet-900/20">
                              <div>
                                <span className="font-medium">
                                  {item.title}
                                </span>
                                <span className="ml-2 text-slate-400">
                                  {item.desc}
                                </span>
                              </div>
                              <ChevronRight className="h-4 w-4 text-slate-400" />
                            </a>
                          ))}
                        </div>
                      ))
                    ) : (
                      <div className="px-3 py-4 text-center text-sm text-slate-500">
                        No documentation found
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div className="animate-fade-in">
                <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
                  Recent Updates
                </h3>
                <div className="space-y-3">
                  {recentUpdates.map((update, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer rounded-xl border border-slate-200/50 bg-white/80 p-3 backdrop-blur-xl transition-all hover:border-violet-300 hover:shadow-md dark:border-slate-800/50 dark:bg-slate-900/80"
                      style={{
                        animation: `fade-in 0.5s ease ${index * 100}ms forwards`,
                        opacity: 0,
                      }}>
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                          {update.version}
                        </span>
                        <span className="text-xs text-slate-400">
                          {update.date}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-700 transition-colors group-hover:text-violet-600 dark:text-slate-300 dark:group-hover:text-violet-400">
                        {update.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Doc Grid */}
          <div className="lg:col-span-3">
            <div className="grid gap-6 sm:grid-cols-2">
              {docSections.map((section, index) => (
                <div
                  key={index}
                  className="animate-scale-in group overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredSection(section.title)}
                  onMouseLeave={() => setHoveredSection(null)}>
                  <div className="mb-4 flex items-center gap-3">
                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 transition-all duration-300 ${hoveredSection === section.title ? 'rotate-3 scale-110' : ''}`}>
                      {section.icon}
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-2">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href={item.href}
                          className="group/item flex items-start justify-between rounded-xl p-3 transition-all hover:bg-slate-50 dark:hover:bg-slate-800/50">
                          <div>
                            <p className="font-medium text-slate-900 transition-colors group-hover/item:text-violet-600 dark:text-white dark:group-hover/item:text-violet-400">
                              {item.title}
                            </p>
                            <p className="text-sm text-slate-500">
                              {item.desc}
                            </p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover/item:translate-x-1" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="animate-fade-in animation-delay-400 mt-8 rounded-3xl border border-slate-200/50 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent p-8 dark:border-slate-800/50">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 hover:rotate-3 hover:scale-110">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    Can&apos;t find the documentation you need?
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Check out our GitHub repository or join our Discord
                    community for help
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="group inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-all hover:-translate-y-0.5 hover:bg-slate-800 hover:shadow-lg dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100">
                    <ExternalLink className="h-4 w-4" />
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-all hover:bg-slate-50 hover:shadow-md dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800">
                    Discord
                  </a>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-fade-in animation-delay-500 mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                {
                  title: 'API Docs',
                  icon: <Code className="h-4 w-4" />,
                  href: '/api-demo',
                },
                {
                  title: 'Components',
                  icon: <Layers className="h-4 w-4" />,
                  href: '/features',
                },
                {
                  title: 'Pricing',
                  icon: <Zap className="h-4 w-4" />,
                  href: '/pricing',
                },
                {
                  title: 'About Us',
                  icon: <Book className="h-4 w-4" />,
                  href: '/about',
                },
              ].map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="group flex items-center gap-3 rounded-xl border border-slate-200/50 bg-white/50 p-4 transition-all hover:border-violet-300 hover:bg-white hover:shadow-md dark:border-slate-800/50 dark:bg-slate-900/50 dark:hover:border-violet-700 dark:hover:bg-slate-900">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100 text-violet-600 transition-colors group-hover:bg-violet-500 group-hover:text-white dark:bg-violet-900/30 dark:text-violet-400">
                    {link.icon}
                  </span>
                  <span className="text-sm font-medium text-slate-700 transition-colors group-hover:text-violet-600 dark:text-slate-300 dark:group-hover:text-violet-400">
                    {link.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
