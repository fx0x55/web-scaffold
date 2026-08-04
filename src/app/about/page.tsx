'use client'

import { useEffect, useRef, useState } from 'react'
import { Users, Target, Heart, Globe, Mail, MapPin } from 'lucide-react'

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
  { icon: <Target className="h-5 w-5" />, title: 'Pursuit of Excellence', description: 'Every pixel and line of code strives for perfection.' },
  { icon: <Users className="h-5 w-5" />, title: 'User First', description: 'User-centered design, creating products that solve real problems.' },
  { icon: <Heart className="h-5 w-5" />, title: 'Driven by Passion', description: 'Passion for technology is our driving force.' },
  { icon: <Globe className="h-5 w-5" />, title: 'Open & Shared', description: 'Embracing open source and collaboration.' },
]

const team = [
  { name: 'John Smith', role: 'Founder & CEO', initials: 'JS' },
  { name: 'Mike Johnson', role: 'Tech Lead', initials: 'MJ' },
  { name: 'Sarah Lee', role: 'Product Designer', initials: 'SL' },
  { name: 'David Chen', role: 'Full Stack Engineer', initials: 'DC' },
]

function useInView(threshold = 0.2) {
  const ref = useRef<HTMLDivElement>(null)
  const [isInView, setIsInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setIsInView(true); observer.disconnect() } },
      { threshold }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, isInView }
}

export default function AboutPage() {
  const { ref: missionRef, isInView: missionInView } = useInView()

  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <div className="mx-auto max-w-[980px] px-6 pt-24 pb-16">
        <div className="text-center">
          <h1 className="animate-slide-up text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-5xl">About Scaffold</h1>
          <p className="animate-slide-up animation-delay-200 mx-auto mt-5 max-w-md text-base text-[#6e6e73]">
            A passionate team dedicated to making web development simpler, faster, and more enjoyable.
          </p>
        </div>
      </div>

      {/* Mission */}
      <div ref={missionRef} className="border-y border-[#d2d2d7]/60 bg-[#f5f5f7]/50 py-16">
        <div className="mx-auto max-w-[980px] px-6">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-[11px] font-medium tracking-widest text-[#86868b] uppercase">Our Mission</h2>
            <p className="mt-4 text-lg leading-relaxed text-[#6e6e73] transition-all duration-700" style={{ opacity: missionInView ? 1 : 0, transform: missionInView ? 'translateY(0)' : 'translateY(12px)' }}>
              Scaffold was born from a simple idea: developers should focus on creating, not reinventing the wheel. We believe that excellent tools can unleash creativity.
            </p>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="mx-auto max-w-[980px] px-6 py-20">
        <h2 className="text-center text-[11px] font-medium tracking-widest text-[#86868b] uppercase">Our Values</h2>
        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((value, index) => (
            <ValueCard key={index} value={value} index={index} />
          ))}
        </div>
      </div>

      {/* Team */}
      <div className="border-y border-[#d2d2d7]/60 bg-[#f5f5f7]/50 py-20">
        <div className="mx-auto max-w-[980px] px-6">
          <h2 className="text-center text-[11px] font-medium tracking-widest text-[#86868b] uppercase">Core Team</h2>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member, index) => (
              <div key={index} className="animate-scale-in card-hover group rounded-2xl bg-white p-5 text-center shadow-sm" style={{ animationDelay: `${index * 80}ms` }}>
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#f5f5f7] text-sm font-semibold text-[#1d1d1f] transition-colors duration-300 group-hover:bg-[#0071e3]/10 group-hover:text-[#0071e3]">
                  {member.initials}
                </div>
                <h3 className="mt-3.5 text-sm font-semibold text-[#1d1d1f]">{member.name}</h3>
                <p className="mt-0.5 text-[13px] text-[#6e6e73]">{member.role}</p>
                <div className="mt-3 flex items-center justify-center gap-1.5 opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <button className="flex h-7 w-7 items-center justify-center rounded-full text-[#86868b] transition-colors hover:bg-[#f5f5f7] hover:text-[#1d1d1f]">
                    <TwitterIcon className="h-3.5 w-3.5" />
                  </button>
                  <button className="flex h-7 w-7 items-center justify-center rounded-full text-[#86868b] transition-colors hover:bg-[#f5f5f7] hover:text-[#1d1d1f]">
                    <GithubIcon className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="mx-auto max-w-[980px] px-6 py-20">
        <div className="animate-scale-in text-center">
          <h2 className="text-2xl font-semibold tracking-tight text-[#1d1d1f]">Want to Join Us?</h2>
          <p className="mx-auto mt-3 max-w-md text-[#6e6e73]">We are always looking for talented people who love technology.</p>
          <div className="mt-8">
            <a href="mailto:hello@scaffold.dev" className="group inline-flex h-10 items-center gap-2 rounded-full bg-[#0071e3] px-6 text-sm font-medium text-white transition-colors hover:bg-[#0077ed]">
              <Mail className="h-3.5 w-3.5" /> hello@scaffold.dev
            </a>
          </div>
        </div>

        <div className="animate-fade-in animation-delay-300 mt-12 flex items-center justify-center gap-3">
          {[
            { icon: <GithubIcon className="h-4 w-4" />, href: '#', label: 'GitHub' },
            { icon: <TwitterIcon className="h-4 w-4" />, href: '#', label: 'Twitter' },
            { icon: <Mail className="h-4 w-4" />, href: '#', label: 'Email' },
          ].map((social, index) => (
            <a key={index} href={social.href} aria-label={social.label} className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f5f7] text-[#6e6e73] transition-all duration-200 hover:bg-[#e8e8ed] hover:text-[#1d1d1f]">
              {social.icon}
            </a>
          ))}
        </div>

        <div className="mt-8 flex items-center justify-center gap-1.5 text-xs text-[#86868b]">
          <MapPin className="h-3 w-3" /> <span>San Francisco, CA</span>
        </div>
      </div>
    </div>
  )
}

function ValueCard({ value, index }: { value: (typeof values)[0]; index: number }) {
  const { ref, isInView } = useInView(0.3)
  return (
    <div
      ref={ref}
      className="card-hover group rounded-2xl bg-[#f5f5f7] p-6"
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(12px)',
        transition: `opacity 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 60}ms, transform 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 60}ms`,
      }}>
      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-[#1d1d1f] shadow-sm transition-colors duration-300 group-hover:text-[#0071e3]">
        {value.icon}
      </div>
      <h3 className="mt-4 text-sm font-semibold text-[#1d1d1f]">{value.title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-[#6e6e73]">{value.description}</p>
    </div>
  )
}
