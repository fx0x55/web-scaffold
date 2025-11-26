'use client'

import { useState } from 'react'
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
} from 'lucide-react'

export default function Home() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className="min-h-screen bg-slate-50 transition-colors duration-300 dark:bg-slate-950">
      {/* Background Pattern */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.08),transparent)]" />

      {/* Main Container - Mobile First */}
      <div className="mx-auto max-w-md px-4 py-8 sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl">
        {/* Header */}
        <header className="mb-8 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 dark:bg-white">
                <Sparkles className="h-5 w-5 text-white dark:text-slate-900" />
              </div>
              <span className="text-xl font-semibold text-slate-900 dark:text-white">
                Scaffold
              </span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-xl">
              {isDark ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>

          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-semibold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
              Modern UI system
            </h1>
            <p className="text-base font-medium text-slate-500 dark:text-slate-400">
              Next.js 16 + Tailwind CSS v4 + shadcn/ui - Modern UI system
            </p>
          </div>
        </header>

        {/* Cards Section */}
        <section className="flex flex-col gap-6">
          {/* Auth Card */}
          <div className="glass flex flex-col gap-6 rounded-2xl p-6 transition-all duration-200 hover:scale-105">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Sign in to your account
                </h3>
              </div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                Enter your credentials to access your account
              </p>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="email"
                  className="font-medium text-slate-700 dark:text-slate-300">
                  Email address
                </Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input
                    id="email"
                    placeholder="name@example.com"
                    type="email"
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="password"
                  className="font-medium text-slate-700 dark:text-slate-300">
                  Password
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                  <Input id="password" type="password" className="pl-10" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <Button className="w-full font-semibold">
                Sign in
                <ChevronRight className="h-4 w-4" />
              </Button>
              <Button variant="outline" className="w-full font-medium">
                Register new account
              </Button>
            </div>
          </div>

          {/* Stats Row */}
          <div className="flex flex-col gap-6 sm:flex-row">
            {/* Revenue Card */}
            <div className="glass flex flex-1 flex-col gap-4 rounded-2xl p-6 transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Total revenue
                </span>
                <TrendingUp className="h-4 w-4 text-emerald-500" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-semibold text-slate-900 dark:text-white">
                  ¥45,231
                </span>
                <span className="text-sm font-medium text-emerald-500">
                  +20.1% last month
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-xl bg-slate-100 dark:bg-slate-800">
                <div className="h-full w-3/4 rounded-xl bg-gradient-to-r from-emerald-400 to-emerald-500" />
              </div>
            </div>

            {/* Users Card */}
            <div className="glass flex flex-1 flex-col gap-4 rounded-2xl p-6 transition-all duration-200 hover:scale-105">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-slate-500 dark:text-slate-400">
                  Active users
                </span>
                <User className="h-4 w-4 text-blue-500" />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-3xl font-semibold text-slate-900 dark:text-white">
                  2,350
                </span>
                <span className="text-sm font-medium text-blue-500">
                  +180 new users this week
                </span>
              </div>
              <div className="flex gap-1">
                {[40, 65, 45, 80, 55, 90, 70].map((h, i) => (
                  <div
                    key={i}
                    className="flex-1 rounded-xl bg-blue-500/20 dark:bg-blue-400/20"
                    style={{ height: `${h}px` }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex flex-col gap-6 sm:flex-row">
            <FeatureCard
              icon={<Zap className="h-5 w-5" />}
              title="Fast response"
              description="Millisecond response speed, providing a smooth experience"
              color="amber"
            />
            <FeatureCard
              icon={<CreditCard className="h-5 w-5" />}
              title="Secure payment"
              description="Bank-level encryption, ensuring your transaction security"
              color="violet"
            />
            <FeatureCard
              icon={<Bell className="h-5 w-5" />}
              title="Real-time notifications"
              description="Get important information"
              color="rose"
            />
          </div>
        </section>
        {/* Footer */}
        <footer className="mt-8 flex flex-col items-center gap-2 text-center">
          <p className="text-sm font-medium text-slate-400 dark:text-slate-500">
            Built with Next.js 16 · Tailwind CSS v4 · shadcn/ui
          </p>
          <p className="text-xs font-medium text-slate-300 dark:text-slate-600">
            © 2025 Scaffold. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  )
}

// Feature Card Component
interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string
  color: 'amber' | 'violet' | 'rose'
}

function FeatureCard({ icon, title, description, color }: FeatureCardProps) {
  const colorClasses = {
    amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
    rose: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  }

  return (
    <div className="glass flex flex-1 flex-col gap-4 rounded-2xl p-6 transition-all duration-200 hover:scale-105">
      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl ${colorClasses[color]}`}>
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h4 className="text-lg font-semibold text-slate-900 dark:text-white">
          {title}
        </h4>
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
          {description}
        </p>
      </div>
    </div>
  )
}
