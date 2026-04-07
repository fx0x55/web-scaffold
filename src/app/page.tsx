'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  CreditCard,
  TrendingUp,
  Shield,
  Zap,
  ChevronRight,
  Mail,
  Lock,
  User,
  Bell,
  ArrowRight,
  Star,
  BarChart3,
  Globe,
  Layers,
  Rocket,
  Heart,
  CheckCircle2,
  ArrowUpRight,
  Code2,
  Palette,
  Database,
  Workflow,
  MessageSquare,
  Play,
  Pause,
  Settings,
  Clock,
} from 'lucide-react'

export default function Home() {
  const [isDark] = useState(false)
  const [isPlaying, setIsPlaying] = useState(true)
  const gridRef = useRef<HTMLDivElement>(null)

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

      {/* Floating Orbs Background */}
      <div className="fixed inset-0 -z-5 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-violet-500/10 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-40 right-20 w-96 h-96 bg-fuchsia-500/10 rounded-full blur-3xl animate-float-medium" />
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl animate-float-fast" />
      </div>

      {/* Main Container - Modern Bento Layout */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <header className="mb-12 flex flex-col gap-8 py-12 animate-fade-in">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl animate-slide-up">
              Modern{' '}
              <span className="gradient-text-animated">UI System</span>
            </h1>
            <p className="max-w-2xl text-lg font-medium text-slate-500 dark:text-slate-400 animate-slide-up animation-delay-100">
              Next.js 16 + Tailwind CSS v4 + shadcn/ui — Built for the future of web design
            </p>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div ref={gridRef} className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {/* Hero Card - Spans 2 columns */}
          <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-violet-500/10 dark:border-slate-800/50 dark:bg-slate-900/80 sm:col-span-2 lg:row-span-2 animate-scale-in">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 rounded-full blur-2xl group-hover:animate-pulse-slow" />
            <div className="flex h-full flex-col gap-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
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
                  <div className="relative group/input">
                    <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/input:text-violet-500" />
                    <Input placeholder="name@example.com" type="email" className="pl-10 rounded-xl border-slate-200 dark:border-slate-800 transition-all focus:ring-2 focus:ring-violet-500/20" />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <Label className="font-medium text-slate-700 dark:text-slate-300">Password</Label>
                  <div className="relative group/input">
                    <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400 transition-colors group-focus-within/input:text-violet-500" />
                    <Input type="password" className="pl-10 rounded-xl border-slate-200 dark:border-slate-800 transition-all focus:ring-2 focus:ring-violet-500/20" />
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button className="w-full rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-0.5">
                  Sign in
                  <ArrowRight className="h-4 w-4" />
                </Button>
                <Button variant="outline" className="w-full rounded-xl font-medium transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                  Create account
                </Button>
              </div>
            </div>
          </div>

          {/* Revenue Card */}
          <SpotlightCard className="col-span-1 animate-fade-in animation-delay-200">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Revenue</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                <TrendingUp className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">¥45,231</span>
              <span className="text-sm font-medium text-emerald-500 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +20.1% from last month
              </span>
            </div>
            <div className="flex items-end gap-1">
              {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-emerald-500/20 to-emerald-500/40 transition-all duration-500 group-hover:from-emerald-500/30 group-hover:to-emerald-500/50"
                  style={{ height: `${h}px`, animationDelay: `${i * 100}ms` }}
                />
              ))}
            </div>
          </SpotlightCard>

          {/* Users Card */}
          <SpotlightCard className="col-span-1 animate-fade-in animation-delay-300">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Active Users</span>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <User className="h-4 w-4" />
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">2,350</span>
              <span className="text-sm font-medium text-blue-500 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3" />
                +180 this week
              </span>
            </div>
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 rounded-full border-2 border-white bg-gradient-to-br from-violet-400 to-fuchsia-400 dark:border-slate-800 transition-transform duration-300 hover:scale-110 hover:z-10"
                />
              ))}
              <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-white bg-slate-100 text-xs font-medium text-slate-600 dark:border-slate-800 dark:bg-slate-800 dark:text-slate-400 transition-transform duration-300 hover:scale-110">
                +99
              </div>
            </div>
          </SpotlightCard>

          {/* Feature Cards Row */}
          <FeatureBentoCard
            icon={<Zap className="h-5 w-5" />}
            title="Lightning Fast"
            description="Millisecond response speed with edge caching"
            gradient="from-amber-500 to-orange-500"
            className="col-span-1 animate-fade-in animation-delay-400"
          />

          <FeatureBentoCard
            icon={<CreditCard className="h-5 w-5" />}
            title="Bank Security"
            description="Enterprise-grade encryption for all transactions"
            gradient="from-violet-500 to-purple-500"
            className="col-span-1 animate-fade-in animation-delay-500"
          />

          <FeatureBentoCard
            icon={<Bell className="h-5 w-5" />}
            title="Real-time Sync"
            description="Instant updates across all connected devices"
            gradient="from-rose-500 to-pink-500"
            className="col-span-1 animate-fade-in animation-delay-600"
          />

          {/* NEW: Analytics Card */}
          <SpotlightCard className="col-span-1 sm:col-span-2 lg:col-span-2 animate-fade-in animation-delay-700">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-indigo-400">
                  <BarChart3 className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Analytics Overview</span>
              </div>
              <div className="flex gap-2">
                <span className="px-2 py-1 rounded-full bg-emerald-500/10 text-emerald-600 text-xs font-medium">Live</span>
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">89.2%</span>
                <span className="text-xs text-slate-500">Engagement</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">4m 12s</span>
                <span className="text-xs text-slate-500">Avg. Session</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-2xl font-bold text-slate-900 dark:text-white">12.5%</span>
                <span className="text-xs text-slate-500">Conversion</span>
              </div>
            </div>
            {/* Mini Chart */}
            <div className="h-16 flex items-end gap-1">
              {[30, 45, 35, 55, 40, 60, 50, 70, 55, 80, 65, 75].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-indigo-500/30 to-indigo-500/50 transition-all duration-300"
                  style={{ height: `${h}%`, animationDelay: `${i * 50}ms` }}
                />
              ))}
            </div>
          </SpotlightCard>

          {/* NEW: Global Presence Card */}
          <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800/50 dark:bg-slate-900/80 animate-fade-in animation-delay-800">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-500 shadow-lg shadow-cyan-500/25 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Global CDN</h3>
                <p className="text-xs text-slate-500">35+ regions</p>
              </div>
            </div>
            {/* Animated Globe Dots */}
            <div className="relative h-24 w-full rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 overflow-hidden">
              <div className="absolute inset-0 opacity-30">
                {[...Array(12)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-2 h-2 rounded-full bg-cyan-500 animate-pulse-dot"
                    style={{
                      left: `${15 + (i % 4) * 25}%`,
                      top: `${20 + Math.floor(i / 4) * 30}%`,
                      animationDelay: `${i * 200}ms`
                    }}
                  />
                ))}
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold text-slate-700 dark:text-slate-300">99.9%</span>
              </div>
            </div>
            <div className="mt-3 flex items-center gap-2 text-xs text-cyan-600 dark:text-cyan-400">
              <CheckCircle2 className="h-3 w-3" />
              <span>All systems operational</span>
            </div>
          </div>

          {/* NEW: Tech Stack Card */}
          <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800/50 dark:bg-slate-900/80 animate-fade-in animation-delay-900">
            <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
                <Layers className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Tech Stack</h3>
                <p className="text-xs text-slate-500">Modern & fast</p>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              {[
                { icon: <Code2 className="h-3 w-3" />, name: 'Next.js 16', color: 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300' },
                { icon: <Palette className="h-3 w-3" />, name: 'Tailwind v4', color: 'bg-cyan-100 text-cyan-700 dark:bg-cyan-900/30 dark:text-cyan-300' },
                { icon: <Database className="h-3 w-3" />, name: 'PostgreSQL', color: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' },
                { icon: <Workflow className="h-3 w-3" />, name: 'shadcn/ui', color: 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300' },
              ].map((tech, i) => (
                <div
                  key={i}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-300 hover:translate-x-1 cursor-pointer"
                  style={{ animationDelay: `${i * 100}ms` }}
                >
                  <span className={`flex items-center justify-center w-6 h-6 rounded-md ${tech.color}`}>
                    {tech.icon}
                  </span>
                  <span className="text-sm font-medium text-slate-700 dark:text-slate-300">{tech.name}</span>
                </div>
              ))}
            </div>
          </div>

          {/* NEW: Deployment Card */}
          <SpotlightCard className="col-span-1 animate-fade-in animation-delay-1000">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-rose-500 to-orange-500">
                  <Rocket className="h-4 w-4 text-white" />
                </div>
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Deployments</span>
              </div>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800 transition-colors hover:bg-slate-200"
              >
                {isPlaying ? (
                  <Pause className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                ) : (
                  <Play className="h-3 w-3 text-slate-600 dark:text-slate-400" />
                )}
              </button>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">1,284</span>
              <span className="text-sm text-slate-500">This month</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex-1 h-2 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                <div
                  className={`h-full rounded-full bg-gradient-to-r from-rose-500 to-orange-500 transition-all duration-1000 ${isPlaying ? 'animate-progress' : ''}`}
                  style={{ width: '78%' }}
                />
              </div>
              <span className="text-xs font-medium text-slate-500">78%</span>
            </div>
          </SpotlightCard>

          {/* NEW: Testimonials Card */}
          <div className="group relative col-span-1 sm:col-span-2 overflow-hidden rounded-3xl border border-slate-200/50 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.01] dark:border-slate-800/50 animate-fade-in animation-delay-1100">
            <div className="absolute top-4 right-4">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-4 w-4 fill-amber-400 text-amber-400 animate-pulse-star" style={{ animationDelay: `${star * 100}ms` }} />
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3 mb-4">
              <div className="relative">
                <div className="h-12 w-12 rounded-full bg-gradient-to-br from-violet-400 to-fuchsia-400" />
                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-emerald-500 border-2 border-white dark:border-slate-900" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Sarah Chen</h3>
                <p className="text-xs text-slate-500">Engineering Lead @ TechCorp</p>
              </div>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
              &ldquo;This scaffold has transformed how we build products. The DX is incredible, and the performance gains are real. We&apos;ve cut our development time in half.&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <Heart className="h-3 w-3 text-rose-500 fill-rose-500" />
                <span>2.4k likes</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-slate-500">
                <MessageSquare className="h-3 w-3" />
                <span>128 replies</span>
              </div>
            </div>
          </div>

          {/* NEW: Activity Timeline Card */}
          <div className="group relative col-span-1 overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] dark:border-slate-800/50 dark:bg-slate-900/80 animate-fade-in animation-delay-1200">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500 shadow-lg shadow-emerald-500/25 transition-transform duration-300 group-hover:scale-110">
                <Clock className="h-5 w-5 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-white">Activity</h3>
                <p className="text-xs text-slate-500">Last 24 hours</p>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { time: '2m ago', text: 'New deployment', color: 'bg-emerald-500' },
                { time: '1h ago', text: 'Database backup', color: 'bg-blue-500' },
                { time: '3h ago', text: 'Security patch', color: 'bg-violet-500' },
                { time: '5h ago', text: 'Cache cleared', color: 'bg-amber-500' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 group/item">
                  <div className={`w-2 h-2 rounded-full ${item.color} transition-transform duration-300 group-hover/item:scale-150`} />
                  <div className="flex-1">
                    <p className="text-sm text-slate-700 dark:text-slate-300">{item.text}</p>
                    <p className="text-xs text-slate-400">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* NEW: Settings Quick Access */}
          <SpotlightCard className="col-span-1 animate-fade-in animation-delay-1300">
            <div className="flex items-center gap-2 mb-4">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 dark:bg-slate-800">
                <Settings className="h-4 w-4 text-slate-600 dark:text-slate-400" />
              </div>
              <span className="text-sm font-medium text-slate-500 dark:text-slate-400">Quick Settings</span>
            </div>
            <div className="flex flex-col gap-3">
              {[
                { label: 'Auto-deploy', active: true },
                { label: 'Notifications', active: true },
                { label: 'Dark mode', active: isDark },
                { label: 'Analytics', active: false },
              ].map((setting, i) => (
                <div key={i} className="flex items-center justify-between">
                  <span className="text-sm text-slate-700 dark:text-slate-300">{setting.label}</span>
                  <div className={`w-8 h-4 rounded-full transition-colors duration-300 ${setting.active ? 'bg-violet-500' : 'bg-slate-300 dark:bg-slate-600'}`}>
                    <div className={`w-4 h-4 rounded-full bg-white shadow-sm transition-transform duration-300 ${setting.active ? 'translate-x-4' : 'translate-x-0'}`} />
                  </div>
                </div>
              ))}
            </div>
          </SpotlightCard>

          {/* Stats Row - Spans full width */}
          <div className="col-span-1 grid grid-cols-3 gap-4 rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80 sm:col-span-2 lg:col-span-4 animate-fade-in animation-delay-1400">
            <StatItem label="Uptime" value="99.99%" />
            <StatItem label="Latency" value="12ms" />
            <StatItem label="Requests" value="2.4M" />
          </div>
        </div>

        {/* CTA Section */}
        <section className="mt-12 rounded-3xl border border-slate-200/50 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent p-8 backdrop-blur-xl dark:border-slate-800/50 sm:p-12 animate-fade-in animation-delay-1500">
          <div className="flex flex-col items-center gap-6 text-center">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-amber-400 animate-spin-slow" />
              <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">Trusted by 10,000+ developers</span>
            </div>
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white sm:text-4xl">
              Ready to build something amazing?
            </h2>
            <p className="max-w-xl text-slate-500 dark:text-slate-400">
              Get started with our modern stack and deploy your next project in minutes.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button size="lg" className="rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 font-semibold text-white hover:from-violet-700 hover:to-fuchsia-700 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/25 hover:-translate-y-1">
                Get Started
                <ChevronRight className="h-4 w-4 animate-bounce-right" />
              </Button>
              <Button size="lg" variant="outline" className="rounded-xl font-medium transition-all duration-300 hover:bg-slate-100 dark:hover:bg-slate-800">
                View Documentation
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-12 flex flex-col items-center gap-4 text-center animate-fade-in animation-delay-1600">
          <div className="flex items-center gap-4 text-sm font-medium text-slate-400 dark:text-slate-500">
            <span className="hover:text-violet-500 transition-colors cursor-pointer">Next.js 16</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="hover:text-violet-500 transition-colors cursor-pointer">Tailwind v4</span>
            <span className="h-1 w-1 rounded-full bg-slate-300 dark:bg-slate-600" />
            <span className="hover:text-violet-500 transition-colors cursor-pointer">shadcn/ui</span>
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
    <div className={`group spotlight-card relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800/50 dark:bg-slate-900/80 ${className}`}>
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
    <div className={`group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-xl hover:shadow-violet-500/10 dark:border-slate-800/50 dark:bg-slate-900/80 ${className}`}>
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
      <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}>
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
    <div className="flex flex-col items-center gap-1 group">
      <span className="text-2xl font-bold text-slate-900 dark:text-white transition-transform duration-300 group-hover:scale-110">{value}</span>
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
    </div>
  )
}
