'use client'

import { useEffect, useRef, useState } from 'react'
import {
  Users,
  Target,
  Heart,
  Globe,
  Mail,
  MapPin,
  Sparkles,
} from 'lucide-react'

// Brand icons as inline SVG (lucide-react v1.x removed brand icons)
const GithubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
)

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
)

const values = [
  {
    icon: <Target className="h-6 w-6" />,
    title: 'Pursuit of Excellence',
    description:
      'We are never satisfied with mediocrity. Every pixel and line of code strives for perfection.',
    gradient: 'from-violet-500 to-fuchsia-500',
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: 'User First',
    description:
      'User-centered design, creating products that truly solve real problems.',
    gradient: 'from-blue-500 to-cyan-500',
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: 'Driven by Passion',
    description:
      'Passion for technology is our driving force and the soul of our product.',
    gradient: 'from-rose-500 to-pink-500',
  },
  {
    icon: <Globe className="h-6 w-6" />,
    title: 'Open & Shared',
    description:
      'Embracing open source, believing collaboration and sharing can make the world better.',
    gradient: 'from-emerald-500 to-teal-500',
  },
]

const team = [
  {
    name: 'John Smith',
    role: 'Founder & CEO',
    avatar: 'from-violet-400 to-fuchsia-400',
  },
  {
    name: 'Mike Johnson',
    role: 'Tech Lead',
    avatar: 'from-blue-400 to-cyan-400',
  },
  {
    name: 'Sarah Lee',
    role: 'Product Designer',
    avatar: 'from-rose-400 to-pink-400',
  },
  {
    name: 'David Chen',
    role: 'Full Stack Engineer',
    avatar: 'from-amber-400 to-orange-400',
  },
]

// Typewriter effect hook
function useTypewriter(
  text: string,
  speed: number = 50,
  start: boolean = true
) {
  const [displayText, setDisplayText] = useState('')
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (!start) return

    let index = 0
    const timer = setInterval(() => {
      if (index < text.length) {
        setDisplayText(text.slice(0, index + 1))
        index++
      } else {
        setIsComplete(true)
        clearInterval(timer)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [text, speed, start])

  return { displayText, isComplete }
}

// Intersection Observer hook
function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.disconnect()
        }
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [threshold])

  return { ref, isInView }
}

export default function AboutPage() {
  const { ref: missionRef, isInView: missionInView } = useInView()
  const [hoveredTeam, setHoveredTeam] = useState<number | null>(null)

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
              Our Story
            </span>
            <h1 className="animate-slide-up mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl lg:text-6xl">
              About Scaffold
            </h1>
            <p className="animate-slide-up animation-delay-100 mx-auto mt-6 max-w-2xl text-lg text-slate-600 dark:text-slate-400">
              We are a passionate team dedicated to making web development
              simpler, faster, and more enjoyable.
            </p>
          </div>
        </div>
      </div>

      {/* Mission Section with Typewriter */}
      <div
        ref={missionRef}
        className="border-y border-slate-200/50 bg-white/50 py-16 dark:border-slate-800/50 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Our Mission
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
              {missionInView && (
                <TypewriterText text="Scaffold was born from a simple idea: developers should focus on creating, not reinventing the wheel. We believe that excellent tools and frameworks can unleash creativity, enabling everyone to build amazing web applications." />
              )}
            </p>
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Our Values
          </h2>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white/50 py-24 dark:bg-slate-900/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Core Team
            </h2>
            <p className="mt-4 text-slate-600 dark:text-slate-400">
              A group of tech enthusiasts working toward the same dream
            </p>
          </div>
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div
                key={index}
                className="animate-scale-in group relative overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 text-center backdrop-blur-xl transition-all duration-500 hover:scale-[1.03] hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
                style={{ animationDelay: `${index * 100}ms` }}
                onMouseEnter={() => setHoveredTeam(index)}
                onMouseLeave={() => setHoveredTeam(null)}>
                {/* Animated gradient border on hover */}
                <div
                  className="absolute inset-0 -z-10 rounded-3xl bg-gradient-to-r from-violet-500 via-fuchsia-500 to-violet-500 opacity-0 transition-opacity group-hover:opacity-100"
                  style={{ padding: '1px' }}>
                  <div className="h-full w-full rounded-3xl bg-white dark:bg-slate-900" />
                </div>

                <div
                  className={`mx-auto h-20 w-20 rounded-full bg-gradient-to-br ${member.avatar} transition-all duration-500 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-violet-500/25`}
                  style={{
                    transform:
                      hoveredTeam === index
                        ? 'scale(1.1) rotate(5deg)'
                        : 'scale(1) rotate(0deg)',
                  }}
                />
                <h3 className="mt-4 text-lg font-semibold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
                  {member.name}
                </h3>
                <p className="text-sm text-slate-500">{member.role}</p>

                {/* Social icons on hover */}
                <div className="mt-4 flex items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800 dark:hover:bg-violet-900/30">
                    <TwitterIcon className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 transition-colors hover:bg-violet-100 hover:text-violet-600 dark:bg-slate-800 dark:hover:bg-violet-900/30">
                    <GithubIcon className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 lg:px-8">
        <div className="animate-scale-in relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 p-8 text-center sm:p-12">
          {/* Animated background circles */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-white/10"
                style={{
                  width: `${100 + i * 50}px`,
                  height: `${100 + i * 50}px`,
                  left: `${20 + i * 25}%`,
                  top: `${30 + i * 10}%`,
                  animation: `pulse-slow ${4 + i}s ease-in-out infinite`,
                  animationDelay: `${i * 1}s`,
                }}
              />
            ))}
          </div>

          <div className="relative z-10">
            <h2 className="text-2xl font-bold text-white sm:text-3xl">
              Want to Join Us?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-violet-100">
              We are always looking for talented people to join our team. If you
              love technology and are eager to create, welcome to contact us.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="mailto:hello@scaffold.dev"
                className="group flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-medium text-violet-600 transition-all hover:-translate-y-0.5 hover:bg-violet-50 hover:shadow-lg">
                <Mail className="h-4 w-4 transition-transform group-hover:scale-110" />
                hello@scaffold.dev
              </a>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="animate-fade-in animation-delay-200 mt-12 flex items-center justify-center gap-6">
          {[
            {
              icon: <GithubIcon className="h-5 w-5" />,
              href: '#',
              label: 'GitHub',
            },
            {
              icon: <TwitterIcon className="h-5 w-5" />,
              href: '#',
              label: 'Twitter',
            },
            { icon: <Mail className="h-5 w-5" />, href: '#', label: 'Email' },
          ].map((social, index) => (
            <a
              key={index}
              href={social.href}
              className="group flex h-12 w-12 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition-all hover:-translate-y-1 hover:border-violet-300 hover:text-violet-600 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400 dark:hover:border-violet-700 dark:hover:text-violet-400"
              aria-label={social.label}>
              <span className="transition-transform duration-300 group-hover:scale-110">
                {social.icon}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-8 text-center text-sm text-slate-500">
          <div className="flex items-center justify-center gap-2">
            <MapPin className="h-4 w-4" />
            <span>San Francisco, CA</span>
          </div>
        </div>
      </div>
    </div>
  )
}

// Typewriter text component
function TypewriterText({ text }: { text: string }) {
  const { displayText, isComplete } = useTypewriter(text, 30, true)

  return (
    <span>
      {displayText}
      {!isComplete && (
        <span className="inline-block h-5 w-0.5 animate-pulse bg-violet-500 align-middle" />
      )}
    </span>
  )
}

// Value card with hover effects
function ValueCard({
  value,
  index,
}: {
  value: (typeof values)[0]
  index: number
}) {
  const { ref, isInView } = useInView(0.3)

  return (
    <div
      ref={ref}
      className="group overflow-hidden rounded-3xl border border-slate-200/50 bg-white/80 p-6 text-center backdrop-blur-xl transition-all duration-500 hover:scale-[1.03] hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 100}ms, transform 0.6s ease ${index * 100}ms`,
      }}>
      <div
        className={`mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br ${value.gradient} text-white shadow-lg shadow-violet-500/25 transition-all duration-500 group-hover:rotate-6 group-hover:scale-110`}>
        {value.icon}
      </div>
      <h3 className="mt-4 text-lg font-semibold text-slate-900 transition-colors group-hover:text-violet-600 dark:text-white dark:group-hover:text-violet-400">
        {value.title}
      </h3>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
        {value.description}
      </p>
    </div>
  )
}
