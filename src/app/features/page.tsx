'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Zap,
  Shield,
  Globe,
  BarChart3,
  Code2,
  Palette,
  Workflow,
  Rocket,
  ArrowRight,
} from 'lucide-react'

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: 'Lightning Fast',
    description:
      'Built on Next.js 16 with React Compiler, millisecond response times, supports Edge deployment.',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: 'Enterprise Security',
    description:
      'Built-in CSRF protection, XSS filtering, content security policy, SOC2 Type II certified.',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Global CDN',
    description:
      '35+ edge locations worldwide, intelligent routing optimization, ensuring fast experience for global users.',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: 'Real-time Analytics',
    description:
      'Built-in user behavior analytics, performance monitoring, error tracking, real-time data visualization.',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'TypeScript Native',
    description:
      '100% TypeScript support, complete type definitions, intelligent code hints and autocompletion.',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: 'Beautiful UI Components',
    description:
      '50+ carefully designed shadcn/ui components, dark mode support, highly customizable themes.',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: 'Automated Workflow',
    description:
      'CI/CD integration, automated testing, code review, making development more efficient.',
    gradient: 'from-rose-500 to-red-500',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: 'One-Click Deploy',
    description:
      'Support one-click deployment to Vercel, AWS, Azure and more platforms, from code to production in minutes.',
    gradient: 'from-emerald-500 to-green-500',
  },
]

const stats = [
  { value: '99.99%', label: 'Uptime' },
  { value: '<50ms', label: 'Avg Response' },
  { value: '10M+', label: 'Daily Requests' },
  { value: '50+', label: 'UI Components' },
]

// Animated counter hook
function useCountUp(
  end: number,
  duration: number = 2000,
  start: boolean = true
) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return

    const animate = (currentTime: number) => {
      if (!startTimeRef.current) {
        startTimeRef.current = currentTime
      }

      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)

      // Easing function (ease-out)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      countRef.current = Math.floor(easeOut * end)
      setCount(countRef.current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [end, duration, start])

  return count
}

// Stat item with count-up animation
function StatItem({
  value,
  label,
  index,
}: {
  value: string
  label: string
  index: number
}) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.5 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [])

  const numericValue = parseFloat(value.replace(/[^0-9.]/g, ''))
  const hasDecimal = value.includes('.')
  const suffix = value.replace(/[0-9.]/g, '')
  const count = useCountUp(numericValue, 2000, isVisible)

  const displayValue = isVisible
    ? `${hasDecimal ? (count / 100).toFixed(2) : count}${suffix}`
    : `0${suffix}`

  return (
    <div
      ref={ref}
      className="animate-fade-in group relative overflow-hidden rounded-2xl border border-slate-200/50 bg-white/80 p-6 text-center backdrop-blur-xl transition-all duration-500 hover:scale-105 hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800/50 dark:bg-slate-900/80"
      style={{ animationDelay: `${index * 100}ms` }}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="text-3xl font-bold text-slate-900 transition-transform duration-300 group-hover:scale-110 dark:text-white">
        {displayValue}
      </div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  )
}

export default function FeaturesPage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const gridRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (
    e: React.MouseEvent<HTMLDivElement>,
    index: number
  ) => {
    const rect = e.currentTarget.getBoundingClientRect()
    setMousePosition({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    })
    setHoveredIndex(index)
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="mesh-gradient absolute inset-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(120,119,198,0.1),transparent)]" />
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="animate-fade-in inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50/80 px-4 py-1.5 text-sm font-medium text-violet-700 backdrop-blur-sm dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400">
              <Zap className="h-4 w-4" />
              Powerful Features
            </span>
            <h1 className="animate-slide-up mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Complete Solution for
              <span className="gradient-text-animated block">
                Modern Development
              </span>
            </h1>
            <p className="animate-slide-up animation-delay-100 mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Everything you need to build modern web applications, from
              development to deployment, from security to analytics.
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid with Spotlight Effect */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div ref={gridRef} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-scale-in spotlight-card group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
              style={
                {
                  'animationDelay': `${200 + index * 100}ms`,
                  '--mouse-x':
                    hoveredIndex === index ? `${mousePosition.x}%` : '50%',
                  '--mouse-y':
                    hoveredIndex === index ? `${mousePosition.y}%` : '50%',
                } as React.CSSProperties
              }
              onMouseMove={e => handleMouseMove(e, index)}
              onMouseLeave={() => setHoveredIndex(null)}>
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-all duration-300 group-hover:rotate-3 group-hover:scale-110`}>
                <span className="text-white">{feature.icon}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-violet-600 opacity-0 transition-all group-hover:opacity-100 dark:text-violet-400">
                <span>Learn More</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section with Counter Animation */}
      <div className="border-y border-slate-200/50 bg-white/50 py-16 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem
                key={index}
                value={stat.value}
                label={stat.label}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="animate-scale-in rounded-3xl border border-slate-200/50 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent p-12 text-center dark:border-slate-800/50">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-slate-600 dark:text-slate-400">
            Experience the development efficiency boost with Scaffold
          </p>
          <div className="mt-8">
            <a
              href="/pricing"
              className="group inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 px-8 py-3 font-medium text-white transition-all hover:-translate-y-0.5 hover:from-violet-700 hover:to-fuchsia-700 hover:shadow-lg hover:shadow-violet-500/25">
              View Pricing
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
