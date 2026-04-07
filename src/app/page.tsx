'use client'

import { Button } from '@/components/ui/button'
import {
  Zap,
  Shield,
  Globe,
  ArrowRight,
  Sparkles,
} from 'lucide-react'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(120,119,198,0.12),transparent)]" />
      </div>

      {/* Hero Section */}
      <main className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Badge */}
          <div className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50/80 px-4 py-1.5 text-sm font-medium text-violet-700 backdrop-blur-sm dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400">
            <Sparkles className="h-4 w-4" />
            <span>Modern Web Scaffold</span>
          </div>

          {/* Title */}
          <h1 className="animate-slide-up mt-8 text-5xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-6xl lg:text-7xl">
            Build faster with{' '}
            <span className="gradient-text-animated">modern stack</span>
          </h1>

          {/* Subtitle */}
          <p className="animate-slide-up animation-delay-200 mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
            Next.js 16 + Tailwind CSS v4 + shadcn/ui. Everything you need to build
            production-ready web applications.
          </p>

          {/* CTA Buttons */}
          <div className="animate-slide-up animation-delay-300 mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/features">
              <Button
                size="lg"
                className="group rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 text-white hover:from-violet-700 hover:to-fuchsia-700 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5 transition-all duration-300"
              >
                Explore Features
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                size="lg"
                variant="outline"
                className="rounded-full px-8 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all duration-300"
              >
                Documentation
              </Button>
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="mt-24 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Link
              key={feature.title}
              href={feature.href}
              className="group animate-scale-in overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:border-violet-300/50 hover:shadow-xl hover:shadow-violet-500/5 dark:border-slate-800/60 dark:bg-slate-900/70 dark:hover:border-violet-700/30"
              style={{ animationDelay: `${400 + index * 100}ms` }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/20 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-violet-600 opacity-0 transition-opacity group-hover:opacity-100 dark:text-violet-400">
                <span>Learn more</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>

        {/* Tech Stack */}
        <div className="animate-fade-in animation-delay-700 mt-24 rounded-2xl border border-slate-200/60 bg-white/50 p-8 backdrop-blur-xl dark:border-slate-800/60 dark:bg-slate-900/50">
          <p className="text-center text-sm font-medium text-slate-500 dark:text-slate-400">
            Powered by modern technologies
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="group flex items-center gap-2 text-slate-400 transition-colors hover:text-slate-600 dark:hover:text-slate-300"
              >
                <span className="transition-transform duration-300 group-hover:scale-110">
                  {tech.icon}
                </span>
                <span className="text-sm font-medium">{tech.name}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="animate-fade-in animation-delay-800 mt-20 pb-8 text-center">
        <p className="text-sm text-slate-400 dark:text-slate-600">
          © 2025 Scaffold. Built with care.
        </p>
      </footer>
    </div>
  )
}

import { CheckSquare } from 'lucide-react'

const features = [
  {
    icon: <Zap className="h-5 w-5" />,
    title: 'Lightning Fast',
    description: 'Next.js 16 with React Compiler enabled for optimal performance. Edge-ready deployment.',
    href: '/features' as const,
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Type Safe',
    description: 'Built with TypeScript in strict mode. Full type safety across your entire application.',
    href: '/features' as const,
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Beautiful UI',
    description: '50+ shadcn/ui components with Tailwind CSS v4. Dark mode support out of the box.',
    href: '/features' as const,
  },
  {
    icon: <CheckSquare className="h-5 w-5" />,
    title: 'Todo Demo',
    description: 'Check out the demo app: Task list, learn how to use components, state management, and styling.',
    href: '/todo' as const,
  },
]

const techStack = [
  {
    name: 'Next.js 16',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm-1.5 15V9l6.5 8h-1.5v-3.5L10.5 17z" />
      </svg>
    ),
  },
  {
    name: 'React 19',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 10.11c.56 0 1.01.45 1.01 1.01s-.45 1.01-1.01 1.01-1.01-.45-1.01-1.01.45-1.01 1.01-1.01m3.18 2.17c0-.74-.58-1.34-1.31-1.39.17-.65.65-1.19 1.29-1.42.65-.23 1.37-.1 1.87.35.51.45.71 1.12.52 1.76-.19.64-.68 1.13-1.32 1.27-.65.14-1.32-.1-1.74-.55-.19-.22-.31-.49-.31-.77m-6.36 0c0 .28-.12.55-.31.77-.42.45-1.09.69-1.74.55-.64-.14-1.13-.63-1.32-1.27-.19-.64.01-1.31.52-1.76.5-.45 1.22-.58 1.87-.35.64.23 1.12.77 1.29 1.42-.73.05-1.31.65-1.31 1.39M12 6.35c2.07 0 3.97.77 5.43 2.04-.54.5-1.24.84-2.01.98-.39-1.11-1.42-1.9-2.6-1.9-1.18 0-2.21.79-2.6 1.9-.77-.14-1.47-.48-2.01-.98 1.46-1.27 3.36-2.04 5.43-2.04m-6.6 3.07c.35-.35.77-.63 1.23-.82.27.74.78 1.38 1.44 1.83-.66.45-1.17 1.09-1.44 1.83-.46-.19-.88-.47-1.23-.82-.78-.78-1.17-1.8-1.17-2.83s.39-2.05 1.17-2.83m13.2 0c.78.78 1.17 1.8 1.17 2.83s-.39 2.05-1.17 2.83c-.35.35-.77.63-1.23.82-.27-.74-.78-1.38-1.44-1.83.66-.45 1.17-1.09 1.44-1.83.46.19.88.47 1.23.82M12 17.65c-2.07 0-3.97-.77-5.43-2.04.54-.5 1.24-.84 2.01-.98.39 1.11 1.42 1.9 2.6 1.9 1.18 0 2.21-.79 2.6-1.9.77.14 1.47.48 2.01.98-1.46 1.27-3.36 2.04-5.43 2.04z" />
      </svg>
    ),
  },
  {
    name: 'Tailwind v4',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 6c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.31.74 1.91 1.35.98 1 2.09 2.15 4.59 2.15 2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C15.61 7.15 14.51 6 12 6zM7 12c-2.67 0-4.33 1.33-5 4 1-1.33 2.17-1.83 3.5-1.5.76.19 1.3.74 1.91 1.35C8.39 16.85 9.49 18 12 18c2.67 0 4.33-1.33 5-4-1 1.33-2.17 1.83-3.5 1.5-.76-.19-1.3-.74-1.91-1.35C10.61 12.15 9.51 11 7 11z" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M3 3h18v18H3V3zm10.5 10.5h-1.8v-1.5h5.1v1.5h-1.8v6h-1.5v-6zm-4.5 1.5c0-.8.7-1.3 1.5-1.3s1.2.4 1.4.9l1.2-.7c-.4-.9-1.4-1.5-2.6-1.5-1.7 0-3 1-3 2.6 0 1.6 1.3 2 3 2.5 1.2.4 1.5.6 1.5 1.2 0 .5-.4.9-1.2.9-.9 0-1.5-.4-1.8-1.1l-1.2.8c.5 1.1 1.6 1.7 3 1.7 1.8 0 3.2-.9 3.2-2.6 0-1.8-1.4-2.2-2.9-2.6-.9-.3-1.5-.4-1.5-1.1z" />
      </svg>
    ),
  },
]
