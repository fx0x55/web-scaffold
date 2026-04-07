/**
 * API Client for frontend
 * Standardized HTTP client with error handling
 */

import type { ApiResponse } from '@/lib/api/server'

export interface ApiClientOptions {
  baseUrl?: string
  headers?: Record<string, string>
  timeout?: number
  credentials?: 'include' | 'same-origin' | 'omit' // New: Configurable credentials
}

export class ApiClientError extends Error {
  public status: number
  public code: string
  public details?: Record<string, unknown>

  constructor(
    message: string,
    status: number,
    code: string,
    details?: Record<string, unknown>
  ) {
    super(message)
    this.name = 'ApiClientError'
    this.status = status
    this.code = code
    this.details = details
  }
}

class ApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private timeout: number
  private credentials: 'include' | 'same-origin' | 'omit'

  constructor(options: ApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || process.env.NEXT_PUBLIC_API_URL || ''
    this.defaultHeaders = {
      ...options.headers,
    }
    this.timeout = options.timeout || 30000
    // Default to 'same-origin', won't auto-send cookies for cross-origin requests to avoid CORS issues
    this.credentials = options.credentials || 'same-origin'
  }

  // Update base URL dynamically
  public setBaseUrl(url: string) {
    this.baseUrl = url
  }

  public getBaseUrl(): string {
    return this.baseUrl
  }

  // Update credentials mode
  public setCredentials(mode: 'include' | 'same-origin' | 'omit') {
    this.credentials = mode
  }

  private async request<T>(
    method: string,
    endpoint: string,
    body?: unknown,
    customHeaders?: Record<string, string>
  ): Promise<T> {
    const url = endpoint.startsWith('http')
      ? endpoint
      : `${this.baseUrl}${endpoint}`
    const headers = { ...this.defaultHeaders, ...customHeaders }

    // For GET requests, don't set Content-Type (simplify request, avoid triggering preflight)
    if (method === 'GET' || method === 'HEAD') {
      delete headers['Content-Type']
    }

    // Remove Content-Type for FormData
    if (body instanceof FormData) {
      delete headers['Content-Type']
    }

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)

    // Build request body
    let requestBody: string | FormData | undefined
    if (body instanceof FormData) {
      requestBody = body
    } else if (body) {
      requestBody = JSON.stringify(body)
    } else {
      requestBody = undefined
    }

    try {
      const response = await fetch(url, {
        method,
        headers,
        body: requestBody,
        signal: controller.signal,
        credentials: this.credentials, // Use configurable credentials
        mode: 'cors', // Explicitly set CORS mode
      })

      clearTimeout(timeoutId)

      // Check response type to avoid errors from non-JSON responses
      const contentType = response.headers.get('content-type')
      const isJson = contentType && contentType.includes('application/json')

      let rawData: unknown

      if (isJson) {
        try {
          rawData = await response.json()
        } catch {
          // JSON parsing failed, possibly empty response body
          rawData = null
        }
      } else {
        // Non-JSON response, read as text
        const text = await response.text()
        if (text) {
          // Try to parse as JSON (some APIs may not set correct content-type)
          try {
            rawData = JSON.parse(text)
          } catch {
            // Not JSON, wrap in object and return
            rawData = { _html: text.substring(0, 500) } // Limit length
          }
        } else {
          rawData = null
        }
      }

      // Support two response formats:
      // 1. Standard format: { success: true, data: T, error?: {...} }
      // 2. Direct format: T (external APIs that return data directly)
      let data: T

      if (rawData && typeof rawData === 'object' && 'success' in rawData) {
        // Standard format
        const apiResponse = rawData as ApiResponse<T>
        if (!response.ok || !apiResponse.success) {
          const error = apiResponse.error || {
            code: 'UNKNOWN_ERROR',
            message: 'An unknown error occurred',
          }
          throw new ApiClientError(
            error.message,
            response.status,
            error.code,
            error.details
          )
        }
        data = apiResponse.data as T
      } else {
        // Direct format (external APIs like httpbin.org)
        if (!response.ok) {
          throw new ApiClientError(
            `HTTP ${response.status}: ${response.statusText}`,
            response.status,
            'HTTP_ERROR'
          )
        }
        data = rawData as T
      }

      return data
    } catch (error) {
      clearTimeout(timeoutId)

      if (error instanceof ApiClientError) {
        throw error
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiClientError('Request timeout', 408, 'TIMEOUT')
        }

        // Detect CORS errors
        const errorMsg = error.message.toLowerCase()
        if (
          errorMsg.includes('cors') ||
          errorMsg.includes('cross-origin') ||
          errorMsg.includes('access-control') ||
          // When credentials: include but server doesn't support it, "Failed to fetch" may occur
          (errorMsg.includes('failed to fetch') &&
            this.credentials === 'include')
        ) {
          throw new ApiClientError(
            `CORS error: The server does not allow cross-origin requests with credentials mode '${this.credentials}'. ` +
              `Try using 'omit' for public APIs, or ensure the server sets proper CORS headers.`,
            0,
            'CORS_ERROR'
          )
        }

        throw new ApiClientError(error.message, 0, 'NETWORK_ERROR')
      }

      throw new ApiClientError('Unknown error', 0, 'UNKNOWN_ERROR')
    }
  }

  // HTTP methods
  public async get<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('GET', endpoint, undefined, headers)
  }

  public async post<T>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('POST', endpoint, body, headers)
  }

  public async put<T>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('PUT', endpoint, body, headers)
  }

  public async patch<T>(
    endpoint: string,
    body?: unknown,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('PATCH', endpoint, body, headers)
  }

  public async delete<T>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<T> {
    return this.request<T>('DELETE', endpoint, undefined, headers)
  }
}

// Create singleton instance
export const apiClient = new ApiClient()

// Helper to build full URL
function buildUrl(endpoint: string, baseUrl: string): string {
  if (endpoint.startsWith('http')) return endpoint
  const base = baseUrl.replace(/\/$/, '')
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`
  return `${base}${path}`
}

// Dynamic API endpoints - baseUrl can be set at runtime
export const createApi = (baseUrl: string) => ({
  // Users
  users: {
    list: () =>
      apiClient.get<{ users: unknown[]; meta: { pagination: unknown } }>(
        buildUrl('/api/users', baseUrl)
      ),
    get: (id: string) =>
      apiClient.get<unknown>(buildUrl(`/api/users/${id}`, baseUrl)),
    create: (data: { name: string; email: string; role?: string }) =>
      apiClient.post<unknown>(buildUrl('/api/users', baseUrl), data),
    update: (
      id: string,
      data: { name?: string; email?: string; role?: string }
    ) => apiClient.put<unknown>(buildUrl(`/api/users/${id}`, baseUrl), data),
    delete: (id: string) =>
      apiClient.delete<void>(buildUrl(`/api/users/${id}`, baseUrl)),
  },

  // Health
  health: {
    check: () =>
      apiClient.get<{ status: string; timestamp: string; uptime: number }>(
        buildUrl('/api/health', baseUrl)
      ),
  },
})

// Default API using env variable or empty string
export const api = createApi(process.env.NEXT_PUBLIC_API_URL || '')
