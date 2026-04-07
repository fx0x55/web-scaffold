'use client'

import { useState, useCallback, useEffect, useLayoutEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { apiClient, useManualApi } from '@/lib/api/client-exports'
import {
  Server,
  Globe,
  CheckCircle,
  XCircle,
  RefreshCw,
  Link as LinkIcon,
  AlertCircle,
  Info,
  Code,
  ExternalLink,
  Shield,
  ChevronRight,
  Play,
  Zap,
} from 'lucide-react'

// Example external APIs for demonstration
const EXAMPLE_APIS = [
  { name: 'HTTPBin', url: 'https://httpbin.org', desc: 'HTTP Request & Response Service (Recommended for testing)' },
  { name: 'JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com', desc: 'Free fake API for testing' },
  { name: 'DummyJSON', url: 'https://dummyjson.com', desc: 'Fake data for testing' },
  { name: 'Local API', url: 'http://localhost:3000', desc: 'Your local development server' },
]

// Typewriter hook
function useTypewriter(texts: string[], speed: number = 50) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const textsRef = useRef(texts)

  // Update ref when texts change
  useEffect(() => {
    textsRef.current = texts
  }, [texts])

  useEffect(() => {
    const currentText = textsRef.current[textIndex]
    let charIndex = 0
    const timer = setInterval(() => {
      if (charIndex <= currentText.length) {
        setDisplayText(currentText.slice(0, charIndex))
        charIndex++
      } else {
        clearInterval(timer)
        setTimeout(() => {
          setTextIndex((prev) => (prev + 1) % textsRef.current.length)
        }, 2000)
      }
    }, speed)

    return () => clearInterval(timer)
  }, [speed, textIndex])

  return displayText
}

export default function ApiDemoPage() {
  const [apiUrl] = useState(process.env.NEXT_PUBLIC_API_URL || '')
  const [customUrl, setCustomUrl] = useState('')
  const [isConfigured, setIsConfigured] = useState(false)
  const [testEndpoint, setTestEndpoint] = useState('/get')
  const [credentials, setCredentials] = useState<'include' | 'same-origin' | 'omit'>('same-origin')
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  // Animated typing effect for title
  const animatedTitle = useTypewriter([
    'Configure your API',
    'Test endpoints',
    'Explore possibilities',
  ], 60)

  // Apply API URL configuration
  const applyConfig = useCallback(() => {
    const url = customUrl || apiUrl
    if (url) {
      apiClient.setBaseUrl(url)
      apiClient.setCredentials(credentials)
      setIsConfigured(true)
    }
  }, [customUrl, apiUrl, credentials])

  // Reset configuration
  const resetConfig = useCallback(() => {
    apiClient.setBaseUrl(process.env.NEXT_PUBLIC_API_URL || '')
    apiClient.setCredentials('same-origin')
    setIsConfigured(false)
    setCustomUrl('')
    setCredentials('same-origin')
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 mesh-gradient" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-10%,rgba(120,119,198,0.12),transparent)]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 py-12">
          <div className="animate-slide-up text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-violet-200 bg-violet-50/80 px-4 py-1.5 text-sm font-medium text-violet-700 backdrop-blur-sm dark:border-violet-800 dark:bg-violet-900/20 dark:text-violet-400">
              <Zap className="h-4 w-4" />
              API Playground
            </span>
            <h1 className="mt-6 text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
              <span className="gradient-text-animated">{animatedTitle}</span>
            </h1>
            <p className="animate-slide-up animation-delay-100 mx-auto mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
              Configure and test external API endpoints with CORS support. No backend required.
            </p>
          </div>
        </header>

        {/* Configuration Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* API Configuration Card */}
          <div
            className="animate-scale-in group rounded-2xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
            style={{ animationDelay: '200ms' }}
            onMouseEnter={() => setHoveredCard(0)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 transition-transform duration-300 group-hover:scale-110">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">API Configuration</h2>
                <p className="text-xs text-slate-500">Set your external API base URL</p>
              </div>
            </div>

            {/* Current Status with pulse effect */}
            <div className="mb-6 rounded-xl bg-slate-50 p-4 transition-colors dark:bg-slate-800/50">
              <div className="mb-2 flex items-center gap-2">
                <Info className={`h-4 w-4 transition-colors ${isConfigured ? 'text-emerald-500' : 'text-slate-400'}`} />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Environment Variable</span>
              </div>
              <code className="break-all text-xs text-slate-500">
                NEXT_PUBLIC_API_URL={process.env.NEXT_PUBLIC_API_URL || '(not set)'}
              </code>
            </div>

            {/* Custom URL Input with animation */}
            <div className="space-y-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Custom API Base URL
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://api.example.com"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1 transition-all focus:ring-2 focus:ring-violet-500/20"
                    disabled={isConfigured}
                  />
                  {!isConfigured ? (
                    <Button
                      onClick={applyConfig}
                      disabled={!customUrl && !apiUrl}
                      className="group/btn transition-all hover:shadow-lg hover:shadow-violet-500/25"
                    >
                      <LinkIcon className="mr-1 h-4 w-4 transition-transform group-hover/btn:rotate-12" />
                      Connect
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={resetConfig} className="transition-all hover:bg-rose-50 hover:text-rose-600">
                      <RefreshCw className="mr-1 h-4 w-4" />
                      Reset
                    </Button>
                  )}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Leave empty to use environment variable
                </p>
              </div>

              {/* Credentials Mode with animated selection */}
              <div>
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300">
                  <Shield className="h-4 w-4" />
                  Credentials Mode
                </label>
                <div className="flex gap-2">
                  {(['omit', 'same-origin', 'include'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCredentials(mode)}
                      disabled={isConfigured}
                      className={`flex-1 rounded-lg px-3 py-2 text-sm font-medium transition-all disabled:cursor-not-allowed disabled:opacity-50 ${
                        credentials === mode
                          ? 'scale-105 bg-violet-100 text-violet-700 shadow-md dark:bg-violet-900/30 dark:text-violet-300'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  <code>omit</code>: No cookies | <code>same-origin</code>: Send cookies for same-origin | <code>include</code>: Send cookies cross-origin (requires server support)
                </p>
              </div>

              {isConfigured && (
                <div className="animate-scale-in space-y-2">
                  <div className="flex items-center gap-2 rounded-lg bg-emerald-50 p-3 dark:bg-emerald-900/20">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-700 dark:text-emerald-400">
                      Connected to: {apiClient.getBaseUrl()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-lg bg-blue-50 p-3 dark:bg-blue-900/20">
                    <Shield className="h-4 w-4 text-blue-500" />
                    <span className="text-sm text-blue-700 dark:text-blue-400">
                      Credentials: <code>{credentials}</code>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Example APIs Card */}
          <div
            className="animate-scale-in group rounded-2xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl transition-all duration-500 hover:shadow-xl dark:border-slate-800/50 dark:bg-slate-900/80"
            style={{ animationDelay: '300ms' }}
            onMouseEnter={() => setHoveredCard(1)}
            onMouseLeave={() => setHoveredCard(null)}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500 transition-transform duration-300 group-hover:scale-110">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">Example APIs</h2>
                <p className="text-xs text-slate-500">Click to use these test APIs</p>
              </div>
            </div>

            <div className="space-y-2">
              {EXAMPLE_APIS.map((api, index) => (
                <button
                  key={api.url}
                  onClick={() => {
                    setCustomUrl(api.url)
                    setIsConfigured(false)
                  }}
                  disabled={isConfigured}
                  className="group/api w-full rounded-xl bg-slate-50 p-3 transition-all hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-slate-800/50 dark:hover:bg-slate-800"
                  style={{
                    animation: `slide-up 0.3s ease ${index * 50}ms forwards`,
                    opacity: 0,
                    transform: 'translateY(10px)',
                  }}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="h-2 w-2 rounded-full bg-emerald-500 transition-transform group-hover/api:scale-125" />
                      <div>
                        <p className="text-sm font-medium text-slate-900 transition-colors group-hover/api:text-violet-600 dark:text-white dark:group-hover/api:text-violet-400">
                          {api.name}
                        </p>
                        <p className="text-xs text-slate-500">{api.desc}</p>
                      </div>
                    </div>
                    <code className="text-xs text-slate-400 transition-colors group-hover/api:text-slate-600">
                      {api.url}
                    </code>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 dark:bg-amber-900/20">
              <AlertCircle className="mt-0.5 h-4 w-4 text-amber-500" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Note: External APIs must support CORS for browser requests.
                If you get CORS errors, the API server needs to allow cross-origin requests.
              </p>
            </div>
          </div>
        </div>

        {/* API Testing Section */}
        {isConfigured && (
          <div
            className="animate-scale-in mt-6 rounded-2xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80"
            style={{ animationDelay: '400ms' }}
          >
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-500 to-teal-500">
                <Code className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">API Testing</h2>
                <p className="text-xs text-slate-500">Test your configured API endpoint</p>
              </div>
            </div>

            {/* Test Endpoint Input */}
            <div className="mb-6">
              <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300">
                Test Endpoint
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="/get"
                  value={testEndpoint}
                  onChange={(e) => setTestEndpoint(e.target.value)}
                  className="flex-1 font-mono text-sm transition-all focus:ring-2 focus:ring-violet-500/20"
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                Try: /get, /post, /headers, /ip (for HTTPBin) or /posts, /users (for JSONPlaceholder)
              </p>
            </div>

            {/* Live Test Component */}
            <ApiTest baseUrl={apiClient.getBaseUrl()} endpoint={testEndpoint} credentials={credentials} />
          </div>
        )}

        {/* Usage Guide with animated cards */}
        <section className="animate-fade-in animation-delay-500 mt-12 rounded-2xl border border-slate-200/50 bg-white/80 p-8 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Play className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Usage Guide</h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Step cards with hover effects */}
            {[
              {
                title: 'Environment Variable',
                desc: 'Set the API URL in your .env.local file',
                code: 'NEXT_PUBLIC_API_URL=https://api.example.com',
              },
              {
                title: 'Dynamic Configuration',
                desc: 'Set the base URL dynamically in your component',
                code: `apiClient.setBaseUrl('https://api.example.com')
const data = await apiClient.get('/posts')`,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="group rounded-xl border border-slate-200/50 bg-slate-50/50 p-4 transition-all hover:border-violet-300 hover:shadow-md dark:border-slate-800/50 dark:bg-slate-800/50"
              >
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-violet-500 text-xs font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="font-semibold text-slate-900 dark:text-white">{step.title}</h3>
                </div>
                <p className="mb-2 text-sm text-slate-500">{step.desc}</p>
                <pre className="overflow-x-auto rounded-lg bg-slate-950 p-3 text-xs text-slate-50 transition-shadow group-hover:shadow-inner">
                  {step.code}
                </pre>
              </div>
            ))}
          </div>

          {/* Credentials info */}
          <div className="mt-6 rounded-xl border border-slate-200/50 bg-gradient-to-r from-violet-500/5 to-fuchsia-500/5 p-4 dark:border-slate-800/50">
            <h3 className="mb-2 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
              <Shield className="h-4 w-4 text-violet-500" />
              Credentials Mode Explained
            </h3>
            <ul className="list-disc space-y-1 pl-5 text-sm text-slate-500">
              <li><code className="rounded bg-slate-100 px-1 dark:bg-slate-800">omit</code> - Never send cookies (most permissive, works with most APIs)</li>
              <li><code className="rounded bg-slate-100 px-1 dark:bg-slate-800">same-origin</code> - Only send cookies for same-origin requests (default)</li>
              <li><code className="rounded bg-slate-100 px-1 dark:bg-slate-800">include</code> - Always send cookies (requires server to set Access-Control-Allow-Credentials: true)</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

// API Test Component with animations
function ApiTest({ baseUrl, endpoint, credentials }: { baseUrl: string; endpoint: string; credentials?: 'include' | 'same-origin' | 'omit' }) {
  const fullUrl = `${baseUrl.replace(/\/$/, '')}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  const { data, loading, error, execute } = useManualApi()
  const [responseVisible, setResponseVisible] = useState(false)

  // Update client config when baseUrl or credentials change
  useLayoutEffect(() => {
    if (baseUrl) {
      apiClient.setBaseUrl(baseUrl)
    }
    if (credentials) {
      apiClient.setCredentials(credentials)
    }
  }, [baseUrl, credentials])

  const handleSendRequest = () => {
    if (endpoint) {
      setResponseVisible(true)
      execute(endpoint, 'GET')
    }
  }

  return (
    <div className="space-y-4">
      {/* Request Info with typing effect */}
      <div className="rounded-xl bg-slate-50 p-4 transition-colors dark:bg-slate-800/50">
        <div className="mb-2 flex items-center gap-2">
          <Server className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Request URL</span>
        </div>
        <code className="break-all text-xs text-slate-500">{fullUrl}</code>
      </div>

      {/* Send Button with hover effect */}
      <div className="flex gap-2">
        <Button
          onClick={handleSendRequest}
          disabled={loading || !endpoint}
          variant="outline"
          className="group/btn transition-all hover:border-violet-300 hover:text-violet-600"
        >
          <RefreshCw className={`mr-1 h-4 w-4 ${loading ? 'animate-spin' : 'transition-transform group-hover/btn:rotate-180'}`} />
          {loading ? 'Loading...' : 'Send Request'}
        </Button>
      </div>

      {/* Response with fade animation */}
      {responseVisible && (
        <div className={`relative transition-all duration-500 ${data || error ? 'opacity-100' : 'opacity-50'}`}>
          <div className="absolute right-2 top-2 flex items-center gap-2">
            {Boolean(data) && (
              <span className="flex animate-bounce items-center gap-1 text-xs text-emerald-500">
                <CheckCircle className="h-3 w-3" />
                Success
              </span>
            )}
            {error && (
              <span className="flex items-center gap-1 text-xs text-rose-500">
                <XCircle className="h-3 w-3" />
                Error
              </span>
            )}
          </div>

          <pre className="max-h-96 overflow-auto rounded-xl bg-slate-950 p-4 text-xs text-slate-50 transition-shadow hover:shadow-inner">
            {loading && (
              <span className="flex items-center gap-2">
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500 animation-delay-100" />
                <span className="h-2 w-2 animate-pulse rounded-full bg-violet-500 animation-delay-200" />
                Loading...
              </span>
            )}
            {error && JSON.stringify({
              error: error.message,
              code: error.code,
              status: error.status,
            }, null, 2)}
            {data ? JSON.stringify(data, null, 2) : null}
            {!loading && !error && !data && 'Click "Send Request" to test the API endpoint'}
          </pre>
        </div>
      )}

      {/* Error Help with animation */}
      {(error?.code === 'NETWORK_ERROR' || error?.code === 'CORS_ERROR') && (
        <div className="animate-slide-up rounded-lg bg-rose-50 p-4 dark:bg-rose-900/20">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-4 w-4 text-rose-500" />
            <div className="text-sm text-rose-700 dark:text-rose-400">
              <p className="font-medium">CORS Error</p>
              <p className="mt-1 text-xs">
                The browser blocked this request due to CORS policy.
              </p>
              <div className="mt-2 space-y-1 text-xs">
                <p className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  Try using <strong>Credentia ls = &quot;omit&quot;</strong>
                </p>
                <p className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  Check if the API supports CORS
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
