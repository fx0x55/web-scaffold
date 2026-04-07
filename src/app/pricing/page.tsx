'use client'

import { useState } from 'react'
import { Check, Sparkles, ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for personal projects and learning',
    features: [
      '3 projects',
      'Basic UI components',
      'Community support',
      '1GB storage',
      'Basic analytics',
    ],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$15',
    period: '/month',
    description: 'For professional developers and small teams',
    features: [
      'Unlimited projects',
      'All UI components',
      'Priority support',
      '100GB storage',
      'Advanced analytics',
      'Custom domain',
      'Team collaboration',
    ],
    cta: 'Upgrade Now',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large teams and enterprise applications',
    features: [
      'Everything unlimited',
      'Dedicated account manager',
      'SLA guarantee',
      'Unlimited storage',
      'Enterprise security',
      'Private deployment',
      'API access',
      'Custom development',
    ],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingPage() {
  const [hoveredPlan, setHoveredPlan] = useState<number | null>(null)
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>(
    'monthly'
  )

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
              <Sparkles className="h-4 w-4" />
              Simple & Transparent Pricing
            </span>
            <h1 className="animate-slide-up mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              Choose the Right Plan for You
            </h1>
            <p className="animate-slide-up animation-delay-100 mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              Whether you&apos;re an individual developer or a large enterprise,
              we have a plan that fits your needs. Upgrade or downgrade anytime,
              no hidden fees.
            </p>

            {/* Billing Toggle */}
            <div className="animate-slide-up animation-delay-200 mt-8 flex items-center justify-center gap-4">
              <span
                className={`text-sm font-medium transition-colors ${billingCycle === 'monthly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                Monthly
              </span>
              <button
                onClick={() =>
                  setBillingCycle(
                    billingCycle === 'monthly' ? 'yearly' : 'monthly'
                  )
                }
                className="relative h-7 w-12 rounded-full bg-slate-200 transition-colors dark:bg-slate-700">
                <span
                  className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow-md transition-all dark:bg-slate-200 ${
                    billingCycle === 'yearly' ? 'left-[22px]' : 'left-0.5'
                  }`}
                />
              </button>
              <span
                className={`text-sm font-medium transition-colors ${billingCycle === 'yearly' ? 'text-slate-900 dark:text-white' : 'text-slate-400'}`}>
                Yearly
                <span className="ml-1 text-xs text-emerald-500">Save 20%</span>
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`animate-scale-in group relative overflow-hidden rounded-3xl border bg-white/80 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] dark:bg-slate-900/80 ${
                plan.popular
                  ? 'border-violet-500 shadow-xl shadow-violet-500/10'
                  : 'border-slate-200/50 hover:shadow-xl dark:border-slate-800/50'
              }`}
              style={{ animationDelay: `${300 + index * 100}ms` }}
              onMouseEnter={() => setHoveredPlan(index)}
              onMouseLeave={() => setHoveredPlan(null)}>
              {plan.popular && (
                <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-12 py-1 text-xs font-semibold text-white">
                  Most Popular
                </div>
              )}

              {/* Floating particles effect on hover */}
              <div className="absolute inset-0 -z-10 overflow-hidden opacity-0 transition-opacity group-hover:opacity-100">
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute h-2 w-2 rounded-full bg-violet-500/20"
                    style={{
                      left: `${20 + i * 30}%`,
                      top: `${30 + i * 20}%`,
                      animation: `float-slow ${3 + i}s ease-in-out infinite`,
                      animationDelay: `${i * 0.5}s`,
                    }}
                  />
                ))}
              </div>

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500">
                  {plan.description}
                </p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-slate-500">{plan.period}</span>
                {billingCycle === 'yearly' && plan.period && (
                  <p className="mt-1 text-xs text-emerald-500">
                    Yearly only ${Math.floor(15 * 12 * 0.8)}/year
                  </p>
                )}
              </div>

              <Button
                className={`group/btn w-full rounded-xl font-medium transition-all duration-300 ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700 hover:shadow-lg hover:shadow-violet-500/25'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
                }`}>
                {plan.cta}
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
              </Button>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li
                    key={featureIndex}
                    className="flex items-start gap-3 transition-transform duration-300"
                    style={{
                      transform:
                        hoveredPlan === index
                          ? `translateX(${featureIndex * 2}px)`
                          : 'translateX(0)',
                    }}>
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 transition-transform duration-300 group-hover:scale-110 dark:bg-emerald-900/30">
                      <Check className="h-3 w-3 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="animate-fade-in animation-delay-700 mt-16 flex flex-wrap items-center justify-center gap-8">
          {[
            { icon: <Zap className="h-5 w-5" />, text: 'Instant Activation' },
            { icon: <Check className="h-5 w-5" />, text: 'Cancel Anytime' },
            {
              icon: <Sparkles className="h-5 w-5" />,
              text: '7-Day Money Back',
            },
          ].map((badge, index) => (
            <div
              key={index}
              className="flex items-center gap-2 text-sm text-slate-500 transition-colors hover:text-slate-700 dark:hover:text-slate-300">
              <span className="text-violet-500">{badge.icon}</span>
              <span>{badge.text}</span>
            </div>
          ))}
        </div>

        {/* FAQ Link */}
        <div className="animate-fade-in animation-delay-800 mt-8 text-center">
          <p className="text-slate-500">
            Still have questions?{' '}
            <a
              href="#"
              className="group inline-flex items-center gap-1 font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400">
              View FAQ
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </a>{' '}
            or{' '}
            <a
              href="#"
              className="group inline-flex items-center gap-1 font-medium text-violet-600 transition-colors hover:text-violet-500 dark:text-violet-400">
              Contact Us
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
