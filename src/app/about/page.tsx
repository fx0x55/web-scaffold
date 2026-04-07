'use client'

import {
  Users,
  Target,
  Heart,
  Globe,
  Github,
  Twitter,
  Mail,
  MapPin,
} from 'lucide-react'

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: '追求卓越',
    description: '我们不满足于平庸，每一个像素、每一行代码都力求完美。',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: '用户至上',
    description: '以用户为中心，打造真正解决实际问题的产品。',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: '热爱驱动',
    description: '对技术的热爱是我们前进的动力，也是我们产品的灵魂。',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: '开放共享',
    description: '拥抱开源，相信协作和分享能让世界变得更美好。',
  },
]

const team = [
  { name: '张明', role: '创始人 & CEO', avatar: 'bg-gradient-to-br from-violet-400 to-fuchsia-400' },
  { name: '李华', role: '技术负责人', avatar: 'bg-gradient-to-br from-blue-400 to-cyan-400' },
  { name: '王芳', role: '产品设计师', avatar: 'bg-gradient-to-br from-rose-400 to-pink-400' },
  { name: '陈伟', role: '全栈工程师', avatar: 'bg-gradient-to-br from-amber-400 to-orange-400' },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-violet-500/5 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              关于 Scaffold
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              我们是一个充满激情的团队，致力于让 Web 开发变得更简单、更快速、更愉悦。
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="border-y border-slate-200/50 bg-white/50 py-16 dark:border-slate-800/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              我们的使命
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              Scaffold 诞生于一个简单的想法：开发者应该专注于创造，而不是重复造轮子。
              我们相信，优秀的工具和框架能够释放创造力，让每个人都能构建出令人惊叹的 Web 应用。
              从个人项目到企业级应用，我们希望成为你最可靠的开发伙伴。
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            我们的价值观
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <div
              key={index}
              className="group overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 text-center backdrop-blur-xl transition-all duration-500 hover:scale-[1.02] hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
            >
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white shadow-lg shadow-violet-500/25 transition-transform duration-300 group-hover:scale-110">
                {value.icon}
              </div>
              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                {value.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white/50 py-24 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              核心团队
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              一群热爱技术的极客，为同一个梦想而努力
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="group overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 text-center backdrop-blur-xl transition-all duration-500 hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
              >
                <div
                  className={`mx-auto h-20 w-20 rounded-full ${member.avatar} transition-transform duration-300 group-hover:scale-110`}
                />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-500">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-8 text-center sm:p-12">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            想要加入我们？
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-violet-100">
            我们始终寻找优秀的人才加入团队。如果你热爱技术，渴望创造，欢迎联系我们。
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a
              href="mailto:hello@scaffold.dev"
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-violet-600 transition-colors hover:bg-violet-50"
            >
              <Mail className="h-4 w-4" />
              hello@scaffold.dev
            </a>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-12 flex items-center justify-center gap-6">
          <a
            href="#"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-violet-300 hover:text-violet-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
          >
            <Github className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-violet-300 hover:text-violet-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a
            href="#"
            className="flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:border-violet-300 hover:text-violet-600 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>中国 · 上海</span>
          </div>
        </div>
      </div>
    </div>
  )
}
