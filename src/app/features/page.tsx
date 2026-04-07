'use client'

import {
  Zap,
  Shield,
  Globe,
  BarChart3,
  Code2,
  Palette,
  Workflow,
  Rocket,
} from 'lucide-react'

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: '极速性能',
    description: '基于 Next.js 16 和 React Compiler 构建，毫秒级响应速度，支持 Edge 边缘计算部署。',
    gradient: 'from-amber-500 to-orange-500',
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: '企业级安全',
    description: '内置 CSRF 保护、XSS 过滤、内容安全策略，通过 SOC2 Type II 认证。',
    gradient: 'from-emerald-500 to-teal-500',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: '全球 CDN',
    description: '35+ 区域节点覆盖，智能路由优化，确保全球用户都能获得极速体验。',
    gradient: 'from-cyan-500 to-blue-500',
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: '实时分析',
    description: '内置用户行为分析、性能监控、错误追踪，数据实时可视化展示。',
    gradient: 'from-violet-500 to-purple-500',
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: 'TypeScript 原生',
    description: '100% TypeScript 支持，完整的类型定义，智能代码提示和自动补全。',
    gradient: 'from-blue-500 to-indigo-500',
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: '精美 UI 组件',
    description: '50+ 精心设计的 shadcn/ui 组件，支持深色模式，可高度自定义主题。',
    gradient: 'from-fuchsia-500 to-pink-500',
  },
  {
    icon: <Workflow className="h-6 w-6" />,
    title: '自动化工作流',
    description: 'CI/CD 集成、自动化测试、代码审查，让开发流程更加高效顺畅。',
    gradient: 'from-rose-500 to-red-500',
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: '一键部署',
    description: '支持 Vercel、AWS、Azure 等多平台一键部署，从代码到上线只需几分钟。',
    gradient: 'from-emerald-500 to-green-500',
  },
]

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50 px-4 py-1.5 text-sm font-medium text-violet-700 dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400">
              <Zap className="h-4 w-4" />
              强大功能
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              为现代开发而生的
              <span className="block gradient-text-animated">全套解决方案</span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              从开发到部署，从安全到分析，我们提供构建现代 Web 应用所需的一切功能。
            </p>
          </div>
        </div>
      </div>

      {/* Features Grid */}
      <div className="mx-auto max-w-7xl px-4 pb-24 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="absolute inset-0 -z-10 bg-gradient-to-br from-violet-500/5 to-fuchsia-500/5 opacity-0 transition-opacity group-hover:opacity-100" />
              <div
                className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${feature.gradient} shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:rotate-3`}
              >
                <span className="text-white">{feature.icon}</span>
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {feature.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="border-y border-slate-200/50 bg-white/50 py-16 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:grid-cols-4">
            {[
              { value: '99.99%', label: '服务可用性' },
              { value: '<50ms', label: '平均响应时间' },
              { value: '10M+', label: '日请求处理' },
              { value: '50+', label: 'UI 组件' },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm text-slate-500">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
