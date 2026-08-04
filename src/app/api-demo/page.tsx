'use client'

import {
  useState,
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
} from 'react'
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
} from 'lucide-react'

// Example external APIs for demonstration
const EXAMPLE_APIS = [
  {
    name: 'HTTPBin',
    url: 'https://httpbin.org',
    desc: 'HTTP Request & Response Service',
  },
  {
    name: 'JSONPlaceholder',
    url: 'https://jsonplaceholder.typicode.com',
    desc: 'Free fake API for testing',
  },
  {
    name: 'DummyJSON',
    url: 'https://dummyjson.com',
    desc: 'Fake data for testing',
  },
  {
    name: 'Local API',
    url: 'http://localhost:3000',
    desc: 'Your local development server',
  },
]

// Typewriter hook
function useTypewriter(texts: string[], speed: number = 50) {
  const [displayText, setDisplayText] = useState('')
  const [textIndex, setTextIndex] = useState(0)
  const textsRef = useRef(texts)

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
          setTextIndex(prev => (prev + 1) % textsRef.current.length)
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
  const [credentials, setCredentials] = useState<
    'include' | 'same-origin' | 'omit'
  >('same-origin')

  const animatedTitle = useTypewriter(
    ['Configure your API', 'Test endpoints', 'Explore possibilities'],
    60
  )

  const applyConfig = useCallback(() => {
    const url = customUrl || apiUrl
    if (url) {
      apiClient.setBaseUrl(url)
      apiClient.setCredentials(credentials)
      setIsConfigured(true)
    }
  }, [customUrl, apiUrl, credentials])

  const resetConfig = useCallback(() => {
    apiClient.setBaseUrl(process.env.NEXT_PUBLIC_API_URL || '')
    apiClient.setCredentials('same-origin')
    setIsConfigured(false)
    setCustomUrl('')
    setCredentials('same-origin')
  }, [])

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-[980px] px-6 py-8">
        {/* Header */}
        <header className="mb-10 py-10 text-center">
          <h1 className="animate-slide-up text-3xl font-semibold tracking-tight text-[#1d1d1f] sm:text-4xl">
            {animatedTitle}
            <span className="inline-block h-5 w-0.5 animate-pulse bg-[#0071e3] align-middle" />
          </h1>
          <p className="animate-slide-up animation-delay-100 mx-auto mt-3 max-w-md text-base text-[#6e6e73]">
            Configure and test external API endpoints with CORS support.
          </p>
        </header>

        {/* Configuration Section */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          {/* API Configuration Card */}
          <div className="animate-scale-in rounded-2xl bg-[#f5f5f7] p-5"
            style={{ animationDelay: '150ms' }}>
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1d1d1f] shadow-sm">
                <Globe className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#1d1d1f]">
                  API Configuration
                </h2>
                <p className="text-xs text-[#86868b]">
                  Set your external API base URL
                </p>
              </div>
            </div>

            {/* Current Status */}
            <div className="mb-5 rounded-xl bg-white p-3.5 shadow-sm">
              <div className="mb-1.5 flex items-center gap-2">
                <Info
                  className={`h-3.5 w-3.5 ${isConfigured ? 'text-[#34c759]' : 'text-[#86868b]'}`}
                />
                <span className="text-xs font-medium text-[#1d1d1f]">
                  Environment Variable
                </span>
              </div>
              <code className="text-[11px] break-all text-[#86868b]">
                NEXT_PUBLIC_API_URL=
                {process.env.NEXT_PUBLIC_API_URL || '(not set)'}
              </code>
            </div>

            {/* Custom URL Input */}
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-[#1d1d1f]">
                  Custom API Base URL
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://api.example.com"
                    value={customUrl}
                    onChange={e => setCustomUrl(e.target.value)}
                    className="h-9 flex-1 rounded-full border-[#d2d2d7] bg-white text-sm focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/10"
                    disabled={isConfigured}
                  />
                  {!isConfigured ? (
                    <Button
                      onClick={applyConfig}
                      disabled={!customUrl && !apiUrl}
                      className="h-9 rounded-full bg-[#0071e3] px-4 text-[13px] text-white transition-colors hover:bg-[#0077ed]">
                      <LinkIcon className="mr-1.5 h-3.5 w-3.5" />
                      Connect
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      onClick={resetConfig}
                      className="h-9 rounded-full border-[#d2d2d7] px-4 text-[13px] transition-colors hover:border-[#ff3b30] hover:bg-[#ff3b30]/5 hover:text-[#ff3b30]">
                      <RefreshCw className="mr-1.5 h-3.5 w-3.5" />
                      Reset
                    </Button>
                  )}
                </div>
                <p className="mt-1.5 text-[11px] text-[#86868b]">
                  Leave empty to use environment variable
                </p>
              </div>

              {/* Credentials Mode */}
              <div>
                <label className="mb-1.5 flex items-center gap-1.5 text-xs font-medium text-[#1d1d1f]">
                  <Shield className="h-3.5 w-3.5" />
                  Credentials Mode
                </label>
                <div className="flex gap-1.5">
                  {(['omit', 'same-origin', 'include'] as const).map(mode => (
                    <button
                      key={mode}
                      onClick={() => setCredentials(mode)}
                      disabled={isConfigured}
                      className={`flex-1 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 ${
                        credentials === mode
                          ? 'bg-[#0071e3] text-white shadow-sm'
                          : 'bg-white text-[#6e6e73] hover:text-[#1d1d1f]'
                      }`}>
                      {mode}
                    </button>
                  ))}
                </div>
                <p className="mt-1.5 text-[11px] leading-relaxed text-[#86868b]">
                  <code>omit</code>: No cookies · <code>same-origin</code>: Same-origin cookies · <code>include</code>: Cross-origin cookies
                </p>
              </div>

              {isConfigured && (
                <div className="animate-scale-in space-y-2">
                  <div className="flex items-center gap-2 rounded-xl bg-[#34c759]/10 px-3 py-2.5">
                    <CheckCircle className="h-3.5 w-3.5 text-[#34c759]" />
                    <span className="text-xs text-[#1d1d1f]">
                      Connected to: {apiClient.getBaseUrl()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 rounded-xl bg-[#0071e3]/10 px-3 py-2.5">
                    <Shield className="h-3.5 w-3.5 text-[#0071e3]" />
                    <span className="text-xs text-[#1d1d1f]">
                      Credentials: <code>{credentials}</code>
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Example APIs Card */}
          <div className="animate-scale-in rounded-2xl bg-[#f5f5f7] p-5"
            style={{ animationDelay: '220ms' }}>
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1d1d1f] shadow-sm">
                <ExternalLink className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#1d1d1f]">
                  Example APIs
                </h2>
                <p className="text-xs text-[#86868b]">
                  Click to use these test APIs
                </p>
              </div>
            </div>

            <div className="space-y-1.5">
              {EXAMPLE_APIS.map((api, index) => (
                <button
                  key={api.url}
                  onClick={() => {
                    setCustomUrl(api.url)
                    setIsConfigured(false)
                  }}
                  disabled={isConfigured}
                  className="group/api w-full rounded-xl bg-white p-3 text-left shadow-sm transition-all duration-200 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-50"
                  style={{
                    animation: `slide-up 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${index * 50}ms forwards`,
                    opacity: 0,
                  }}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#34c759]" />
                      <div>
                        <p className="text-[13px] font-medium text-[#1d1d1f] transition-colors group-hover/api:text-[#0071e3]">
                          {api.name}
                        </p>
                        <p className="text-[11px] text-[#86868b]">{api.desc}</p>
                      </div>
                    </div>
                    <code className="text-[10px] text-[#d2d2d7]">
                      {api.url}
                    </code>
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#ff9500]/10 px-3 py-2.5">
              <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff9500]" />
              <p className="text-[11px] leading-relaxed text-[#1d1d1f]">
                External APIs must support CORS for browser requests.
              </p>
            </div>
          </div>
        </div>

        {/* API Testing Section */}
        {isConfigured && (
          <div className="animate-scale-in mt-4 rounded-2xl bg-[#f5f5f7] p-5">
            <div className="mb-5 flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1d1d1f] shadow-sm">
                <Code className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-semibold text-[#1d1d1f]">
                  API Testing
                </h2>
                <p className="text-xs text-[#86868b]">
                  Test your configured API endpoint
                </p>
              </div>
            </div>

            {/* Test Endpoint Input */}
            <div className="mb-5">
              <label className="mb-1.5 block text-xs font-medium text-[#1d1d1f]">
                Test Endpoint
              </label>
              <Input
                placeholder="/get"
                value={testEndpoint}
                onChange={e => setTestEndpoint(e.target.value)}
                className="h-9 rounded-full border-[#d2d2d7] bg-white font-mono text-sm focus:border-[#0071e3] focus:ring-2 focus:ring-[#0071e3]/10"
              />
              <p className="mt-1.5 text-[11px] text-[#86868b]">
                Try: /get, /post, /headers (HTTPBin) or /posts, /users (JSONPlaceholder)
              </p>
            </div>

            <ApiTest
              baseUrl={apiClient.getBaseUrl()}
              endpoint={testEndpoint}
              credentials={credentials}
            />
          </div>
        )}

        {/* Usage Guide */}
        <section className="animate-fade-in animation-delay-500 mt-8 rounded-2xl bg-[#f5f5f7] p-6">
          <div className="mb-5 flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white text-[#1d1d1f] shadow-sm">
              <Play className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-[#1d1d1f]">
              Usage Guide
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {[
              {
                title: 'Environment Variable',
                desc: 'Set the API URL in your .env.local file',
                code: 'NEXT_PUBLIC_API_URL=https://api.example.com',
              },
              {
                title: 'Dynamic Configuration',
                desc: 'Set the base URL dynamically in your component',
                code: `apiClient.setBaseUrl('https://api.example.com')\nconst data = await apiClient.get('/posts')`,
              },
            ].map((step, index) => (
              <div
                key={index}
                className="rounded-xl bg-white p-4 shadow-sm">
                <div className="mb-2 flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#1d1d1f] text-[10px] font-bold text-white">
                    {index + 1}
                  </span>
                  <h3 className="text-[13px] font-semibold text-[#1d1d1f]">
                    {step.title}
                  </h3>
                </div>
                <p className="mb-2 text-xs text-[#86868b]">{step.desc}</p>
                <pre className="overflow-x-auto rounded-lg bg-[#1d1d1f] p-3 text-[11px] leading-relaxed text-white/80">
                  {step.code}
                </pre>
              </div>
            ))}
          </div>

          {/* Credentials info */}
          <div className="mt-5 rounded-xl bg-white p-4 shadow-sm">
            <h3 className="mb-2 flex items-center gap-1.5 text-[13px] font-semibold text-[#1d1d1f]">
              <Shield className="h-3.5 w-3.5 text-[#0071e3]" />
              Credentials Mode Explained
            </h3>
            <ul className="space-y-1 text-xs text-[#6e6e73]">
              <li className="flex items-start gap-1.5">
                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[#d2d2d7]" />
                <span><code className="rounded bg-[#f5f5f7] px-1">omit</code> - Never send cookies (most permissive)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[#d2d2d7]" />
                <span><code className="rounded bg-[#f5f5f7] px-1">same-origin</code> - Only same-origin cookies (default)</span>
              </li>
              <li className="flex items-start gap-1.5">
                <ChevronRight className="mt-0.5 h-3 w-3 shrink-0 text-[#d2d2d7]" />
                <span><code className="rounded bg-[#f5f5f7] px-1">include</code> - Always send cookies (requires server support)</span>
              </li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  )
}

// API Test Component
function ApiTest({
  baseUrl,
  endpoint,
  credentials,
}: {
  baseUrl: string
  endpoint: string
  credentials?: 'include' | 'same-origin' | 'omit'
}) {
  const fullUrl = `${baseUrl.replace(/\/$/, '')}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  const { data, loading, error, execute } = useManualApi()
  const [responseVisible, setResponseVisible] = useState(false)

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
      {/* Request Info */}
      <div className="rounded-xl bg-white p-3.5 shadow-sm">
        <div className="mb-1.5 flex items-center gap-2">
          <Server className="h-3.5 w-3.5 text-[#86868b]" />
          <span className="text-xs font-medium text-[#1d1d1f]">
            Request URL
          </span>
        </div>
        <code className="text-[11px] break-all text-[#86868b]">{fullUrl}</code>
      </div>

      {/* Send Button */}
      <Button
        onClick={handleSendRequest}
        disabled={loading || !endpoint}
        variant="outline"
        className="h-9 rounded-full border-[#d2d2d7] px-4 text-[13px] transition-all hover:border-[#0071e3] hover:text-[#0071e3]">
        <RefreshCw
          className={`mr-1.5 h-3.5 w-3.5 ${loading ? 'animate-spin' : ''}`}
        />
        {loading ? 'Loading...' : 'Send Request'}
      </Button>

      {/* Response */}
      {responseVisible && (
        <div className="relative">
          <div className="absolute top-2.5 right-3 flex items-center gap-2">
            {Boolean(data) && (
              <span className="flex items-center gap-1 text-[11px] text-[#34c759]">
                <CheckCircle className="h-3 w-3" />
                Success
              </span>
            )}
            {error && (
              <span className="flex items-center gap-1 text-[11px] text-[#ff3b30]">
                <XCircle className="h-3 w-3" />
                Error
              </span>
            )}
          </div>

          <pre className="max-h-80 overflow-auto rounded-xl bg-[#1d1d1f] p-4 text-[11px] leading-relaxed text-white/80">
            {loading && (
              <span className="flex items-center gap-2 text-white/50">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#0071e3]" />
                <span className="animation-delay-100 h-1.5 w-1.5 animate-pulse rounded-full bg-[#0071e3]" />
                <span className="animation-delay-200 h-1.5 w-1.5 animate-pulse rounded-full bg-[#0071e3]" />
                Loading...
              </span>
            )}
            {error &&
              JSON.stringify(
                {
                  error: error.message,
                  code: error.code,
                  status: error.status,
                },
                null,
                2
              )}
            {data ? JSON.stringify(data, null, 2) : null}
            {!loading &&
              !error &&
              !data &&
              'Click "Send Request" to test the API endpoint'}
          </pre>
        </div>
      )}

      {/* Error Help */}
      {(error?.code === 'NETWORK_ERROR' || error?.code === 'CORS_ERROR') && (
        <div className="animate-slide-up rounded-xl bg-[#ff3b30]/10 p-3.5">
          <div className="flex items-start gap-2">
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#ff3b30]" />
            <div className="text-xs text-[#1d1d1f]">
              <p className="font-medium">CORS Error</p>
              <p className="mt-1 text-[11px] text-[#6e6e73]">
                The browser blocked this request due to CORS policy.
              </p>
              <div className="mt-2 space-y-1 text-[11px] text-[#6e6e73]">
                <p className="flex items-center gap-1">
                  <ChevronRight className="h-3 w-3" />
                  Try Credentials = &quot;omit&quot;
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
