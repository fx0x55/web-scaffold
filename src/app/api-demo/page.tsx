'use client'

import { useState, useCallback, useEffect } from 'react'
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
} from 'lucide-react'

// Example external APIs for demonstration
const EXAMPLE_APIS = [
  { name: 'HTTPBin', url: 'https://httpbin.org', desc: 'HTTP Request & Response Service (Recommended for testing)' },
  { name: 'JSONPlaceholder', url: 'https://jsonplaceholder.typicode.com', desc: 'Free fake API for testing' },
  { name: 'DummyJSON', url: 'https://dummyjson.com', desc: 'Fake data for testing' },
  { name: 'Local API', url: 'http://localhost:3000', desc: 'Your local development server' },
]

export default function ApiDemoPage() {
  // Get initial URL from env or default
  const [apiUrl] = useState(process.env.NEXT_PUBLIC_API_URL || '')
  const [customUrl, setCustomUrl] = useState('')
  const [isConfigured, setIsConfigured] = useState(false)
  const [testEndpoint, setTestEndpoint] = useState('/get')
  const [credentials, setCredentials] = useState<'include' | 'same-origin' | 'omit'>('same-origin')

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
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.15),transparent)]" />

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Header */}
        <header className="mb-12 py-12">
          <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-5xl">
            External API Demo
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-slate-500 dark:text-slate-400">
            Configure and test external API endpoints with CORS support. No backend required.
          </p>
        </header>

        {/* Configuration Section */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* API Configuration Card */}
          <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
                <Globe className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">API Configuration</h2>
                <p className="text-xs text-slate-500">Set your external API base URL</p>
              </div>
            </div>

            {/* Current Status */}
            <div className="mb-6 p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
              <div className="flex items-center gap-2 mb-2">
                <Info className="h-4 w-4 text-slate-400" />
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Environment Variable</span>
              </div>
              <code className="text-xs text-slate-500 break-all">
                NEXT_PUBLIC_API_URL={process.env.NEXT_PUBLIC_API_URL || '(not set)'}
              </code>
            </div>

            {/* Custom URL Input */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  Custom API Base URL
                </label>
                <div className="flex gap-2">
                  <Input
                    placeholder="https://api.example.com"
                    value={customUrl}
                    onChange={(e) => setCustomUrl(e.target.value)}
                    className="flex-1"
                    disabled={isConfigured}
                  />
                  {!isConfigured ? (
                    <Button onClick={applyConfig} disabled={!customUrl && !apiUrl}>
                      <LinkIcon className="h-4 w-4 mr-1" />
                      Connect
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={resetConfig}>
                      <RefreshCw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  )}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  Leave empty to use environment variable
                </p>
              </div>

              {/* Credentials Mode */}
              <div>
                <label className="flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  <Shield className="h-4 w-4" />
                  Credentials Mode
                </label>
                <div className="flex gap-2">
                  {(['omit', 'same-origin', 'include'] as const).map((mode) => (
                    <button
                      key={mode}
                      onClick={() => setCredentials(mode)}
                      disabled={isConfigured}
                      className={`flex-1 px-3 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                        credentials === mode
                          ? 'bg-violet-100 text-violet-700 dark:bg-violet-900/30 dark:text-violet-300'
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100 dark:bg-slate-800/50 dark:text-slate-400'
                      }`}
                    >
                      {mode}
                    </button>
                  ))}
                </div>
                <p className="mt-2 text-xs text-slate-500">
                  <code>omit</code>: 不带 cookies | <code>same-origin</code>: 同域带 cookies | <code>include</code>: 跨域带 cookies (需要服务器支持)
                </p>
              </div>
              {isConfigured && (
                <div className="space-y-2">
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-emerald-50 dark:bg-emerald-900/20">
                    <CheckCircle className="h-4 w-4 text-emerald-500" />
                    <span className="text-sm text-emerald-700 dark:text-emerald-400">
                      Connected to: {apiClient.getBaseUrl()}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20">
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
          <div className="rounded-2xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-cyan-500">
                <ExternalLink className="h-5 w-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-slate-900 dark:text-white">Example APIs</h2>
                <p className="text-xs text-slate-500">Click to use these test APIs</p>
              </div>
            </div>

            <div className="space-y-2">
              {EXAMPLE_APIS.map((api) => (
                <button
                  key={api.url}
                  onClick={() => {
                    setCustomUrl(api.url)
                    setIsConfigured(false)
                  }}
                  disabled={isConfigured}
                  className="w-full flex items-center justify-between p-3 rounded-xl bg-slate-50 hover:bg-slate-100 dark:bg-slate-800/50 dark:hover:bg-slate-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white text-sm">{api.name}</p>
                      <p className="text-xs text-slate-500">{api.desc}</p>
                    </div>
                  </div>
                  <code className="text-xs text-slate-400">{api.url}</code>
                </button>
              ))}
            </div>

            <div className="mt-4 p-3 rounded-lg bg-amber-50 dark:bg-amber-900/20 flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-500 mt-0.5" />
              <p className="text-xs text-amber-700 dark:text-amber-400">
                Note: External APIs must support CORS for browser requests.
                If you get CORS errors, the API server needs to allow cross-origin requests.
              </p>
            </div>
          </div>
        </div>

        {/* API Testing Section */}
        {isConfigured && (
          <div className="mt-6 rounded-2xl border border-slate-200/50 bg-white/80 p-6 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
            <div className="flex items-center gap-3 mb-6">
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
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Test Endpoint
              </label>
              <div className="flex gap-2">
                <Input
                  placeholder="/get"
                  value={testEndpoint}
                  onChange={(e) => setTestEndpoint(e.target.value)}
                  className="flex-1 font-mono text-sm"
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

        {/* Usage Guide */}
        <section className="mt-12 rounded-2xl border border-slate-200/50 bg-white/80 p-8 backdrop-blur-xl dark:border-slate-800/50 dark:bg-slate-900/80">
          <div className="flex items-center gap-3 mb-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500">
              <Code className="h-5 w-5 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">Usage Guide</h2>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">1. Environment Variable (Recommended)</h3>
              <p className="text-sm text-slate-500 mb-2">
                Set the API URL in your <code className="text-xs bg-slate-100 dark:bg-slate-800 px-1 rounded">.env.local</code> file:
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-50 text-xs overflow-x-auto">
NEXT_PUBLIC_API_URL=https://api.example.com
              </pre>
            </div>

            {/* Step 2 */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">2. Dynamic Configuration</h3>
              <p className="text-sm text-slate-500 mb-2">
                Or set the base URL dynamically in your component:
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-50 text-xs overflow-x-auto">
{`import { apiClient } from '@/lib/api/client-exports'

// Set base URL
apiClient.setBaseUrl('https://api.example.com')

// Now all requests use this base URL
const data = await apiClient.get('/posts')`}
              </pre>
            </div>

            {/* Step 3 */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">3. Using React Hooks</h3>
              <p className="text-sm text-slate-500 mb-2">
                Use the hooks with dynamic base URL:
              </p>
              <pre className="p-4 rounded-xl bg-slate-950 text-slate-50 text-xs overflow-x-auto">
{`import { useApi } from '@/lib/api/client-exports'

function MyComponent() {
  const { data, loading, error } = useApi('/posts', 'https://api.example.com')

  if (loading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return <pre>{JSON.stringify(data, null, 2)}</pre>
}`}
              </pre>
            </div>

            {/* Step 4 */}
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white mb-2">4. Credentials Mode</h3>
              <p className="text-sm text-slate-500 mb-2">
                Choose how cookies are sent with cross-origin requests:
              </p>
              <ul className="list-disc list-inside text-sm text-slate-500 space-y-1">
                <li><code>omit</code> - Never send cookies (most permissive, works with most APIs)</li>
                <li><code>same-origin</code> - Only send cookies for same-origin requests (default)</li>
                <li><code>include</code> - Always send cookies (requires server to set Access-Control-Allow-Credentials: true)</li>
              </ul>
              <pre className="mt-2 p-4 rounded-xl bg-slate-950 text-slate-50 text-xs overflow-x-auto">
{`// For public APIs without authentication, use 'omit'
apiClient.setCredentials('omit')

// For APIs that need cookies/session, use 'include'
apiClient.setCredentials('include')`}
              </pre>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}

// API Test Component - Manual trigger mode
function ApiTest({ baseUrl, endpoint, credentials }: { baseUrl: string; endpoint: string; credentials?: 'include' | 'same-origin' | 'omit' }) {
  const fullUrl = `${baseUrl.replace(/\/$/, '')}${endpoint.startsWith('/') ? endpoint : `/${endpoint}`}`
  const { data, loading, error, execute, reset } = useManualApi()

  // Reset when baseUrl or credentials change
  useEffect(() => {
    if (baseUrl) {
      apiClient.setBaseUrl(baseUrl)
    }
    if (credentials) {
      apiClient.setCredentials(credentials)
    }
    reset()
  }, [baseUrl, credentials, reset])

  const handleSendRequest = () => {
    if (endpoint) {
      execute(endpoint, 'GET')
    }
  }

  return (
    <div className="space-y-4">
      {/* Request Info */}
      <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50">
        <div className="flex items-center gap-2 mb-2">
          <Server className="h-4 w-4 text-slate-400" />
          <span className="text-sm font-medium text-slate-700 dark:text-slate-300">Request URL</span>
        </div>
        <code className="text-xs text-slate-500 break-all">{fullUrl}</code>
      </div>

      {/* Send Button */}
      <div className="flex gap-2">
        <Button onClick={handleSendRequest} disabled={loading || !endpoint} variant="outline">
          <RefreshCw className={`h-4 w-4 mr-1 ${loading ? 'animate-spin' : ''}`} />
          {loading ? 'Loading...' : 'Send Request'}
        </Button>
      </div>

      {/* Response */}
      <div className="relative">
        <div className="absolute top-2 right-2 flex items-center gap-2">
          {Boolean(data) && (
            <span className="flex items-center gap-1 text-xs text-emerald-500">
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

        <pre className="p-4 rounded-xl bg-slate-950 text-slate-50 text-xs overflow-auto max-h-96">
          {loading && 'Loading...'}
          {error && JSON.stringify({
            error: error.message,
            code: error.code,
            status: error.status,
          }, null, 2)}
          {data ? JSON.stringify(data, null, 2) : null}
          {!loading && !error && !data && 'Click "Send Request" to test the API endpoint'}
        </pre>
      </div>

      {/* Error Help */}
      {(error?.code === 'NETWORK_ERROR' || error?.code === 'CORS_ERROR') && (
        <div className="p-4 rounded-lg bg-rose-50 dark:bg-rose-900/20 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-rose-500 mt-0.5" />
          <div className="text-sm text-rose-700 dark:text-rose-400">
            <p className="font-medium">CORS Error</p>
            <p className="text-xs mt-1">
              The browser blocked this request due to CORS policy. Common causes:
            </p>
            <ul className="list-disc list-inside text-xs mt-1 space-y-1">
              <li>
                <strong>Credentials mismatch:</strong> Using &quot;include&quot; but server doesn&apos;t allow credentials.
                <br />
                <span className="text-rose-600">→ Solution: Set Credentials to &quot;omit&quot;</span>
              </li>
              <li>
                <strong>Origin not allowed:</strong> Server doesn&apos;t allow requests from {typeof window !== 'undefined' ? window.location.origin : 'this domain'}.
                <br />
                <span className="text-rose-600">→ Solution: Contact API provider to add your domain to CORS whitelist</span>
              </li>
              <li>
                <strong>Missing CORS headers:</strong> Server doesn&apos;t send Access-Control-Allow-Origin.
                <br />
                <span className="text-rose-600">→ Solution: The API server needs to enable CORS</span>
              </li>
            </ul>
            <p className="text-xs mt-2 font-medium">
              Quick fix: Try using Credentials = &quot;omit&quot; for public APIs
            </p>
          </div>
        </div>
      )}
    </div>
  )
}
