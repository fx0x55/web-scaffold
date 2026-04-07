/**
 * CORS Configuration for API routes
 * Supports cross-origin requests with configurable options
 */

export interface CorsOptions {
  origin?: string | string[] | ((origin: string) => boolean)
  methods?: string[]
  allowedHeaders?: string[]
  exposedHeaders?: string[]
  credentials?: boolean
  maxAge?: number
  preflightContinue?: boolean
}

const defaultOptions: CorsOptions = {
  origin: '*',
  methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'X-Requested-With',
    'Accept',
    'Origin',
    'X-CSRF-Token',
  ],
  exposedHeaders: ['Content-Length', 'X-Request-Id'],
  credentials: true,
  maxAge: 86400, // 24 hours
}

/**
 * Set CORS headers on response
 */
export function setCorsHeaders(
  response: Response,
  options: CorsOptions = {}
): Response {
  const opts = { ...defaultOptions, ...options }
  const headers = response.headers

  // Handle origin
  if (opts.origin) {
    if (typeof opts.origin === 'string') {
      headers.set('Access-Control-Allow-Origin', opts.origin)
    } else if (Array.isArray(opts.origin)) {
      // For multiple origins, handle in middleware based on request origin
      headers.set('Access-Control-Allow-Origin', opts.origin[0])
    }
  }

  // Handle credentials
  if (opts.credentials) {
    headers.set('Access-Control-Allow-Credentials', 'true')
  }

  // Handle methods
  if (opts.methods) {
    headers.set('Access-Control-Allow-Methods', opts.methods.join(','))
  }

  // Handle allowed headers
  if (opts.allowedHeaders) {
    headers.set('Access-Control-Allow-Headers', opts.allowedHeaders.join(','))
  }

  // Handle exposed headers
  if (opts.exposedHeaders) {
    headers.set('Access-Control-Expose-Headers', opts.exposedHeaders.join(','))
  }

  // Handle max age
  if (opts.maxAge) {
    headers.set('Access-Control-Max-Age', opts.maxAge.toString())
  }

  return response
}

/**
 * Create CORS middleware for Next.js API routes
 */
export function createCorsMiddleware(options: CorsOptions = {}) {
  const opts = { ...defaultOptions, ...options }

  return async function corsMiddleware(
    request: Request,
    handler: () => Promise<Response>
  ): Promise<Response> {
    const origin = request.headers.get('origin') || '*'

    // Check if origin is allowed
    let allowOrigin = '*'
    if (opts.origin) {
      if (typeof opts.origin === 'string') {
        allowOrigin = opts.origin
      } else if (Array.isArray(opts.origin)) {
        allowOrigin = opts.origin.includes(origin) ? origin : opts.origin[0]
      } else if (typeof opts.origin === 'function') {
        allowOrigin = opts.origin(origin) ? origin : ''
      }
    }

    // Handle preflight request
    if (request.method === 'OPTIONS') {
      const response = new Response(null, { status: 204 })
      response.headers.set('Access-Control-Allow-Origin', allowOrigin)

      if (opts.credentials) {
        response.headers.set('Access-Control-Allow-Credentials', 'true')
      }

      if (opts.methods) {
        response.headers.set('Access-Control-Allow-Methods', opts.methods.join(','))
      }

      if (opts.allowedHeaders) {
        response.headers.set('Access-Control-Allow-Headers', opts.allowedHeaders.join(','))
      }

      if (opts.maxAge) {
        response.headers.set('Access-Control-Max-Age', opts.maxAge.toString())
      }

      return response
    }

    // Handle actual request
    const response = await handler()
    response.headers.set('Access-Control-Allow-Origin', allowOrigin)

    if (opts.credentials) {
      response.headers.set('Access-Control-Allow-Credentials', 'true')
    }

    if (opts.exposedHeaders) {
      response.headers.set('Access-Control-Expose-Headers', opts.exposedHeaders.join(','))
    }

    return response
  }
}

/**
 * Preset configurations for common use cases
 */
export const corsPresets = {
  // Allow all origins (development)
  development: {
    origin: '*',
    credentials: false,
  } as CorsOptions,

  // Strict production config
  production: {
    origin: (origin: string) => {
      // Add your production domains here
      const allowedOrigins = [
        process.env.NEXT_PUBLIC_APP_URL,
        process.env.NEXT_PUBLIC_API_URL,
      ].filter(Boolean)
      return allowedOrigins.includes(origin) || origin.includes('your-domain.com')
    },
    credentials: true,
  } as CorsOptions,

  // Common development ports
  localDev: {
    origin: [
      'http://localhost:3000',
      'http://localhost:3001',
      'http://localhost:8080',
      'http://127.0.0.1:3000',
    ],
    credentials: true,
  } as CorsOptions,
}
