'use client'

import {
  Book,
  Code,
  Layers,
  Zap,
  ArrowRight,
  Search,
  FileText,
} from 'lucide-react'
import { useState } from 'react'

const docSections = [
  {
    title: '快速开始',
    icon: <Zap className="h-5 w-5" />,
    items: [
      { title: '安装指南', href: '#', desc: '5 分钟快速上手' },
      { title: '项目结构', href: '#', desc: '了解目录组织' },
      { title: '第一个页面', href: '#', desc: '创建 Hello World' },
    ],
  },
  {
    title: '核心概念',
    icon: <Book className="h-5 w-5" />,
    items: [
      { title: '路由系统', href: '#', desc: 'App Router 详解' },
      { title: '数据获取', href: '#', desc: 'Server & Client 组件' },
      { title: '样式方案', href: '#', desc: 'Tailwind CSS 配置' },
    ],
  },
  {
    title: '组件库',
    icon: <Layers className="h-5 w-5" />,
    items: [
      { title: '基础组件', href: '#', desc: 'Button, Input, Card' },
      { title: '表单组件', href: '#', desc: 'Form, Select, Checkbox' },
      { title: '布局组件', href: '#', desc: 'Grid, Flex, Container' },
    ],
  },
  {
    title: 'API 参考',
    icon: <Code className="h-5 w-5" />,
    items: [
      { title: '配置选项', href: '#', desc: 'next.config.ts' },
      { title: 'CLI 命令', href: '#', desc: '所有可用命令' },
      { title: '类型定义', href: '#', desc: 'TypeScript 类型' },
    ],
  },
]

const recentUpdates = [
  { version: 'v2.1.0', date: '2025-04-01', title: '新增深色模式支持' },
  { version: 'v2.0.0', date: '2025-03-15', title: '升级到 Next.js 16' },
  { version: 'v1.9.0', date: '2025-02-28', title: '优化构建性能' },
]

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden border-b border-slate-200/50 dark:border-slate-800/50">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              文档中心
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              从入门到精通，全面掌握 Scaffold 的每一个细节
            </p>

            {/* Search Bar */}
            <div className="mx-auto mt-8 max-w-xl">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="搜索文档..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-2xl border border-slate-200 bg-white py-4 pl-12 pr-4 text-slate-900 shadow-sm transition-all focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-900 dark:text-white">
                  最近更新
                </h3>
                <div className="space-y-3">
                  {recentUpdates.map((update, index) => (
                    <div
                      key={index}
                      className="group cursor-pointer rounded-xl border border-slate-200/50 bg-white p-3 transition-all hover:border-violet-300 dark:border-slate-800/50 dark:bg-slate-900"
                    >
                      <div className="flex items-center gap-2">
                        <span className="rounded-md bg-violet-100 px-2 py-0.5 text-xs font-medium text-violet-700 dark:bg-violet-900/30 dark:text-violet-400">
                          {update.version}
                        </span>
                        <span className="text-xs text-slate-400">
                          {update.date}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-slate-700 dark:text-slate-300">
                        {update.title}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Doc Grid */}
          <div className="lg:col-span-3">
            <div className="grid gap-6 sm:grid-cols-2">
              {docSections.map((section, index) => (
                <div
                  key={index}
                  className="group overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25">
                      {section.icon}
                    </div>
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
                      {section.title}
                    </h2>
                  </div>
                  <ul className="space-y-3">
                    {section.items.map((item, itemIndex) => (
                      <li key={itemIndex}>
                        <a
                          href={item.href}
                          className="group/item flex items-start justify-between rounded-xl p-3 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800/50"
                        >
                          <div>
                            <p className="font-medium text-slate-900 dark:text-white">
                              {item.title}
                            </p>
                            <p className="text-sm text-slate-500">{item.desc}</p>
                          </div>
                          <ArrowRight className="h-4 w-4 text-slate-400 transition-transform group-hover/item:translate-x-1" />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* CTA */}
            <div className="mt-8 rounded-3xl border border-slate-200/50 bg-gradient-to-br from-violet-500/5 via-fuchsia-500/5 to-transparent p-8 dark:border-slate-800/50">
              <div className="flex flex-col items-center gap-4 text-center sm:flex-row sm:text-left">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg">
                  <FileText className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                    找不到需要的文档？
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    查看我们的 GitHub 仓库或加入 Discord 社区获取帮助
                  </p>
                </div>
                <div className="flex gap-3">
                  <a
                    href="#"
                    className="rounded-xl bg-slate-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-slate-800 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
                  >
                    GitHub
                  </a>
                  <a
                    href="#"
                    className="rounded-xl border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
