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
    icon: <Zap className="h-5 w-5" />,
    title: 'Lightning Fast',
    description:
      'Built on Next.js 16 with React Compiler, millisecond response times, supports Edge deployment.',
  },
  {
    icon: <Shield className="h-5 w-5" />,
    title: 'Enterprise Security',
    description:
      'Built-in CSRF protection, XSS filtering, content security policy, SOC2 Type II certified.',
  },
  {
    icon: <Globe className="h-5 w-5" />,
    title: 'Global CDN',
    description:
      '35+ edge locations worldwide, intelligent routing optimization, ensuring fast experience for global users.',
  },
  {
    icon: <BarChart3 className="h-5 w-5" />,
    title: 'Real-time Analytics',
    description:
      'Built-in user behavior analytics, performance monitoring, error tracking, real-time data visualization.',
  },
  {
    icon: <Code2 className="h-5 w-5" />,
    title: 'TypeScript Native',
    description:
      '100% TypeScript support, complete type definitions, intelligent code hints and autocompletion.',
  },
  {
    icon: <Palette className="h-5 w-5" />,
    title: 'Beautiful UI Components',
    description:
      '50+ carefully designed shadcn/ui components, dark mode support, highly customizable themes.',
  },
  {
    icon: <Workflow className="h-5 w-5" />,
    title: 'Automated Workflow',
    description:
      'CI/CD integration, automated testing, code review, making development more efficient.',
  },
  {
    icon: <Rocket className="h-5 w-5" />,
    title: 'One-Click Deploy',
    description:
      'Support one-click deployment to Vercel, AWS, Azure and more platforms, from code to production in minutes.',
  },
]

const stats = [
  { value: '99.99%', label: 'Uptime' },
  { value: '<50ms', label: 'Avg Response' },
  { value: '10M+', label: 'Daily Requests' },
  { value: '50+', label: 'UI Components' },
]

function useCountUp(end: number, duration: number = 2000, start: boolean = true) {
  const [count, setCount] = useState(0)
  const countRef = useRef(0)
  const startTimeRef = useRef<number | null>(null)

  useEffect(() => {
    if (!start) return
    const animate = (currentTime: number) => {
      if (!startTimeRef.current) startTimeRef.current = currentTime
      const elapsed = currentTime - startTimeRef.current
      const progress = Math.min(elapsed / duration, 1)
      const easeOut = 1 - Math.pow(1 - progress, 3)
      countRef.current = Math.floor(easeOut * end)
      setCount(countRef.current)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [end, duration, start])

  return count
}

function StatItem({ value, label, index }: { value: string; label: string; index: number }) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsVisible(true); observer.disconnect() } },
      { threshold: 0.5 }
    )
    if (ref.current) observer.observe(ref.current)
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
    <div ref={ref} className="text-center" style={{ animationDelay: `${index * 80}ms` }}>
      <div className="text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-4xl">
        {displayValue}
      </div>
      <div className="mt-1.5 text-sm text-[#86868b]">{label}</div>
    </div>
  )
}

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="mx-auto max-w-[980px] px-6 pt-24 pb-16">
        <div className="text-center">
          <span className="animate-fade-in inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-4 py-1.5 text-xs font-medium text-[#6e6e73]">
            <Zap className="h-3 w-3" />
            Powerful Features
          </span>
          <h1 className="animate-slide-up mt-6 text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
            Complete Solution for
            <span className="block text-[#6e6e73]">Modern Development</span>
          </h1>
          <p className="animate-slide-up animation-delay-200 mx-auto mt-5 max-w-md text-base text-[#6e6e73]">
            Everything you need to build modern web applications, from development to deployment.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-[980px] px-6 pb-24">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="animate-scale-in card-hover group rounded-2xl bg-[#f5f5f7] p-6"
              style={{ animationDelay: `${200 + index * 60}ms` }}>
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1d1d1f] shadow-sm transition-colors duration-300 group-hover:text-[#0071e3]">
                {feature.icon}
              </div>
              <h3 className="mt-4 text-sm font-semibold text-[#1d1d1f]">{feature.title}</h3>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#6e6e73]">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="border-y border-[#d2d2d7]/60 bg-[#f5f5f7]/50 py-16">
        <div className="mx-auto max-w-[980px] px-6">
          <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <StatItem key={index} value={stat.value} label={stat.label} index={index} />
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="mx-auto max-w-[980px] px-6 py-24">
        <div className="animate-scale-in text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f] sm:text-3xl">Ready to Get Started?</h2>
          <p className="mx-auto mt-3 max-w-md text-[#6e6e73]">Experience the development efficiency boost with Scaffold</p>
          <div className="mt-8">
            <a
              href="/pricing"
              className="group inline-flex h-11 items-center gap-2 rounded-full bg-[#0071e3] px-7 text-sm font-medium text-white transition-colors hover:bg-[#0077ed]">
              View Pricing
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
