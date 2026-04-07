'use client'

import { Check, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'

const plans = [
  {
    name: '入门版',
    price: '免费',
    period: '',
    description: '适合个人项目和学习使用',
    features: [
      '3 个项目',
      '基础 UI 组件',
      '社区支持',
      '1GB 存储空间',
      '基础分析功能',
    ],
    cta: '免费开始',
    popular: false,
  },
  {
    name: '专业版',
    price: '¥99',
    period: '/月',
    description: '适合专业开发者和中小团队',
    features: [
      '无限项目',
      '全部 UI 组件',
      '优先技术支持',
      '100GB 存储空间',
      '高级分析功能',
      '自定义域名',
      '团队协作',
    ],
    cta: '立即升级',
    popular: true,
  },
  {
    name: '企业版',
    price: '定制',
    period: '',
    description: '适合大型团队和企业级应用',
    features: [
      '无限一切',
      '专属客户经理',
      'SLA 保障',
      '无限存储空间',
      '企业级安全',
      '私有化部署',
      'API 访问',
      '定制开发',
    ],
    cta: '联系销售',
    popular: false,
  },
]

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400">
              <Sparkles className="h-4 w-4" />
              简单透明的定价
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              选择适合你的方案
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              无论你是个人开发者还是大型企业，我们都有适合你的方案。随时升级或降级，无隐藏费用。
            </p>
          </div>
        </div>
      </div>

      {/* Pricing Cards */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative overflow-hidden rounded-3xl border bg-white/80 p-8 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] dark:bg-slate-900/80 ${
                plan.popular
                  ? 'border-violet-500 shadow-xl shadow-violet-500/10'
                  : 'border-slate-200/50 dark:border-slate-800/50 hover:shadow-xl'
              }`}
            >
              {plan.popular && (
                <div className="absolute -right-12 top-6 rotate-45 bg-gradient-to-r from-violet-600 to-fuchsia-600 px-12 py-1 text-xs font-semibold text-white">
                  最受欢迎
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white">
                  {plan.name}
                </h3>
                <p className="mt-2 text-sm text-slate-500">{plan.description}</p>
              </div>

              <div className="mb-6">
                <span className="text-4xl font-bold text-slate-900 dark:text-white">
                  {plan.price}
                </span>
                <span className="text-slate-500">{plan.period}</span>
              </div>

              <Button
                className={`w-full rounded-xl font-medium ${
                  plan.popular
                    ? 'bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700'
                    : 'bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700'
                }`}
              >
                {plan.cta}
              </Button>

              <ul className="mt-8 space-y-4">
                {plan.features.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-start gap-3">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/30">
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

        {/* FAQ Link */}
        <div className="mt-16 text-center">
          <p className="text-slate-500">
            还有疑问？{' '}
            <a
              href="#"
              className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400"
            >
              查看常见问题
            </a>
            {' '}或{' '}
            <a
              href="#"
              className="font-medium text-violet-600 hover:text-violet-500 dark:text-violet-400"
            >
              联系我们
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
