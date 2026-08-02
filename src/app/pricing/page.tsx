'use client'

import { useState } from 'react'
import { Check, ArrowRight, Zap } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: 'Starter',
    price: 'Free',
    period: '',
    description: 'Perfect for personal projects and learning',
    features: ['3 projects', 'Basic UI components', 'Community support', '1GB storage', 'Basic analytics'],
    cta: 'Start Free',
    popular: false,
  },
  {
    name: 'Pro',
    price: '$15',
    period: '/month',
    description: 'For professional developers and small teams',
    features: ['Unlimited projects', 'All UI components', 'Priority support', '100GB storage', 'Advanced analytics', 'Custom domain', 'Team collaboration'],
    cta: 'Upgrade Now',
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large teams and enterprise applications',
    features: ['Everything unlimited', 'Dedicated account manager', 'SLA guarantee', 'Unlimited storage', 'Enterprise security', 'Private deployment', 'API access', 'Custom development'],
    cta: 'Contact Sales',
    popular: false,
  },
]

export default function PricingPage() {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly')

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="mx-auto max-w-[980px] px-6 pt-24 pb-16">
        <div className="text-center">
          <span className="animate-fade-in inline-flex items-center gap-2 rounded-full bg-[#f5f5f7] px-4 py-1.5 text-xs font-medium text-[#6e6e73]">
            <Zap className="h-3 w-3" />
            Simple Pricing
          </span>
          <h1 className="animate-slide-up mt-6 text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">
            Choose the Right Plan
          </h1>
          <p className="animate-slide-up animation-delay-200 mx-auto mt-5 max-w-md text-base text-[#6e6e73]">
            Upgrade or downgrade anytime. No hidden fees.
          </p>

          {/* Billing Toggle */}
          <div className="animate-slide-up animation-delay-300 mt-8 inline-flex items-center gap-1 rounded-full bg-[#f5f5f7] p-1">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                billingCycle === 'monthly'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}>
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('yearly')}
              className={`rounded-full px-4 py-1.5 text-[13px] font-medium transition-all duration-200 ${
                billingCycle === 'yearly'
                  ? 'bg-white text-[#1d1d1f] shadow-sm'
                  : 'text-[#6e6e73] hover:text-[#1d1d1f]'
              }`}>
              Yearly
              <span className="ml-1.5 text-[11px] text-[#34c759]">-20%</span>
            </button>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-[980px] px-6 pb-24">
        <div className="grid gap-4 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`animate-scale-in card-hover group relative rounded-2xl p-6 ${
                plan.popular
                  ? 'bg-[#1d1d1f] text-white'
                  : 'bg-[#f5f5f7]'
              }`}
              style={{ animationDelay: `${250 + index * 100}ms` }}>
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-[#0071e3] px-3 py-0.5 text-[11px] font-medium text-white">
                  Most Popular
                </div>
              )}

              <div className="mb-5">
                <h3 className={`text-sm font-semibold ${plan.popular ? 'text-white' : 'text-[#1d1d1f]'}`}>{plan.name}</h3>
                <p className={`mt-1 text-[13px] ${plan.popular ? 'text-white/60' : 'text-[#6e6e73]'}`}>{plan.description}</p>
              </div>

              <div className="mb-5">
                <span className={`text-3xl font-semibold tracking-tight ${plan.popular ? 'text-white' : 'text-[#1d1d1f]'}`}>{plan.price}</span>
                <span className={`text-sm ${plan.popular ? 'text-white/40' : 'text-[#86868b]'}`}>{plan.period}</span>
                {billingCycle === 'yearly' && plan.period && (
                  <p className="mt-1 text-xs text-[#34c759]">${Math.floor(15 * 12 * 0.8)}/year billed annually</p>
                )}
              </div>

              <Button
                className={`h-9 w-full rounded-full text-[13px] font-medium transition-colors duration-200 ${
                  plan.popular
                    ? 'bg-white text-[#1d1d1f] hover:bg-white/90'
                    : 'bg-[#1d1d1f] text-white hover:bg-[#424245]'
                }`}>
                {plan.cta}
                <ArrowRight className="ml-1.5 h-3.5 w-3.5" />
              </Button>

              <ul className="mt-6 space-y-2.5">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center gap-2.5">
                    <div className={`flex h-4 w-4 items-center justify-center rounded-full ${plan.popular ? 'bg-white/10' : 'bg-[#34c759]/10'}`}>
                      <Check className={`h-2.5 w-2.5 ${plan.popular ? 'text-[#34c759]' : 'text-[#34c759]'}`} />
                    </div>
                    <span className={`text-[13px] ${plan.popular ? 'text-white/70' : 'text-[#6e6e73]'}`}>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Trust Badges */}
        <div className="animate-fade-in animation-delay-700 mt-14 flex flex-wrap items-center justify-center gap-8">
          {['Instant Activation', 'Cancel Anytime', '7-Day Money Back'].map((text, index) => (
            <div key={index} className="flex items-center gap-2 text-[13px] text-[#86868b]">
              <span className="h-1 w-1 rounded-full bg-[#0071e3]" />
              {text}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
