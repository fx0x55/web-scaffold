'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Sparkles,
  CreditCard,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Mail,
  Lock,
  User,
  Bell,
  Moon,
  Sun,
  ArrowRight,
  Star,
} from 'lucide-react'

export default function Home() {
  const [isDark, setIsDark] = useState(false)
  const gridRef = useRef<HTMLDivElement>(null)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  // Spotlight effect handler
  useEffect(() => {
    const cards = document.querySelectorAll('.spotlight-card')

    const handleMouseMove = (e: MouseEvent, card: Element) => {
      const rect = card.getBoundingClientRect()
      const x = ((e.clientX - rect.left) / rect.width) * 100
      const y = ((e.clientY - rect.top) / rect.height) * 100
      ;(card as HTMLElement).style.setProperty('--mouse-x', `${x}%`)
      ;(card as HTMLElement).style.setProperty('--mouse-y', `${y}%`)
    }

    cards.forEach(card => {
      card.addEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, card))
    })

    return () => {
      cards.forEach(card => {
        card.removeEventListener('mousemove', (e) => handleMouseMove(e as MouseEvent, card))
      })
    }
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      {/* Animated Mesh Gradient Background */}
      <div className="fixed inset-0 -z-10 mesh-gradient" />
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),transparent)]" />

      {/* Animated Grid Pattern */}
      <div className="fixed inset-0 -z-10 opacity-[0.03] dark:opacity-[0.02]">
        <div className="h-full w-full" style={{
          backgroundImage: `
            linear-gradient(rgba(120,119,198,0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(120,119,198,0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }} />
      </div>

      {/* Main Container - Modern Bento Layout */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 flex flex-col gap-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                <Sparkles className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900 dark:text-white">
                Scaffold
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl magnetic">
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              Modern{' '}
              <span className="gradient-text-animated">UI System</span>
            </h1>
            <p className="max-w-2xl text-lg font-medium text-slate-500 dark:text-slate-400">
              Next.js 16 + Tailwind CSS v4 + shadcn/ui — Built for the future of web design
            </p>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Hero Card - Spans 2 columns */}
          <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/10 dark:border-slate-800/50 dark:bg-slate-900/80 sm:col-span-2 lg:row-span-2">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex h-full flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Authentication</h3>
                  <p className="text-sm text-slate-500">Secure access control</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <Label className="font-medium text-slate-700 dark:text-slate-300">Email address</Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input placeholder="name@example.com" type="email" className="pl-10 rounded-xl border-slate-200 dark:border-slate-800" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-medium text-slate-700 dark:text-slate-300">Password</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <Input type="password" className="pl-10 rounded-xl border-slate-200 dark:border-slate-800" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white hover:from-violet-700 hover:to-fuchsia-700">
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full rounded-xl font-medium">
                  Create account
                </Button>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <SpotlightCard className="col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">¥45,231</span>
              <span className="text-sm font-medium text-emerald-500">+20.1% from last month</span>
            </div>
            <div className="flex items-end gap-1">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500/20 to-emerald-500/40 transition-all duration-300 group-hover:from-emerald-500/30 group-hover:to-emerald-500/50"
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
          </SpotlightCard>

          {/* Users Card */}
          <SpotlightCard className="col-span-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Users</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <User className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">2,350</span>
              <span className="text-sm font-medium text-blue-500">+180 this week</span>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-fuchsia-400 dark:border-slate-800"
                />
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400">
                +99
              </div>
            </div>
          </SpotlightCard>

          {/* Feature Cards */}
          <FeatureBentoCard
            icon={<Zap className="h-5 w-5" />}
            title="Lightning Fast"
            description="Millisecond response speed with edge caching"
            gradient="from-amber-500 to-orange-500"
            className="col-span-1"
          />

          <FeatureBentoCard
            icon={<CreditCard className="h-5 w-5" />}
            title="Bank Security"
            description="Enterprise-grade encryption for all transactions"
            gradient="from-violet-500 to-purple-500"
            className="col-span-1"
          />

          <FeatureBentoCard
            icon={<Bell className="h-5 w-5" />}
            title="Real-time Sync"
            description="Instant updates across all connected devices"
            gradient="from-rose-500 to-pink-500"
            className="col-span-1"
          />

          {/* Stats Row - Spans full width */}
          <div className="col-span-1 grid grid-cols-3 gap-4 rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80 sm:col-span-2 lg:col-span-4">
            <StatItem label="Uptime" value="99.99%" />
            <StatItem label="Latency" value="12ms" />
            <StatItem label="Requests" value="2.4M" />
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-12 rounded-3xl border border-slate-200/50 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent p-8 backdrop-blur-xl dark:border-slate-800/50 sm:p-12">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400" />
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Trusted by 10,000+ developers</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Ready to build something amazing?
            </h2>
            <p className="max-w-xl text-slate-500 dark:text-slate-400">
              Get started with our modern stack and deploy your next project in minutes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white hover:from-violet-700 hover:to-fuchsia-700">
                Get Started
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl font-medium">
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 flex flex-col items-center gap-4 text-center">
          <div className="flex items-center gap-4 text-sm font-medium text-slate-400 dark:text-slate-500">
            <span>Next.js 16</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>Tailwind v4</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span>shadcn/ui</span>
          </div>
          <p className="text-xs text-slate-300 dark:text-slate-600">
            © 2025 Scaffold. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

// Spotlight Card Component
function SpotlightCard({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`group spotlight-card relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800/50 dark:bg-slate-900/80 ${className}`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="flex h-full flex-col gap-4">
        {children}
      </div>
    </div>
  )
}

// Feature Bento Card Component
function FeatureBentoCard({
  icon,
  title,
  description,
  gradient,
  className,
}: {
  icon: React.ReactNode
  title: string
  description: string
  gradient: string
  className?: string
}) {
  return (
    <div className={`group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800/50 dark:bg-slate-900/80 ${className}`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg transition-transform duration-300 group-hover:scale-110`}>
        <span className="text-white">{icon}</span>
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <h4 className="font-semibold text-slate-900 dark:text-white">{title}</h4>
        <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
      </div>
    </div>
  )
}

// Stat Item Component
function StatItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-bold text-slate-900 dark:text-white">{value}</span>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  )
}
