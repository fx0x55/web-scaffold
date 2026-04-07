/**
 * Standardized API Response utilities
 * Provides consistent response format across all API endpoints
 */

export interface ApiResponse<T = unknown> {
  success: boolean
  data?: T
  error?: ApiError
  meta?: ApiMeta
}

export interface ApiError {
  code: string
  message: string
  details?: Record<string, unknown>
  stack?: string // Only in development
}

export interface ApiMeta {
  timestamp: string
  requestId?: string
  pagination?: PaginationMeta
  [key: string]: unknown
}

export interface PaginationMeta {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}

export type HttpStatusCode =
  | 200 // OK
  | 201 // Created
  | 204 // No Content
  | 400 // Bad Request
  | 401 // Unauthorized
  | 403 // Forbidden
  | 404 // Not Found
  | 409 // Conflict
  | 422 // Unprocessable Entity
  | 429 // Too Many Requests
  | 500 // Internal Server Error
  | 503 // Service Unavailable

// Success response helpers
export function success<T>(data: T, meta?: Partial<ApiMeta>): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  }
}

export function created<T>(data: T, meta?: Partial<ApiMeta>): ApiResponse<T> {
  return {
    success: true,
    data,
    meta: {
      timestamp: new Date().toISOString(),
      ...meta,
    },
  }
}

export function noContent(): ApiResponse<null> {
  return {
    success: true,
    data: null,
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
}

// Error response helpers
export function error(
  code: string,
  message: string,
  details?: Record<string, unknown>
): ApiResponse<null> {
  return {
    success: false,
    error: {
      code,
      message,
      details,
    },
    meta: {
      timestamp: new Date().toISOString(),
    },
  }
}

// Predefined error responses
export const errors = {
  badRequest: (message = 'Bad request', details?: Record<string, unknown>) =>
    error('BAD_REQUEST', message, details),

  unauthorized: (message = 'Unauthorized') =>
    error('UNAUTHORIZED', message),

  forbidden: (message = 'Forbidden') =>
    error('FORBIDDEN', message),

  notFound: (resource = 'Resource') =>
    error('NOT_FOUND', `${resource} not found`),

  conflict: (message = 'Resource already exists') =>
    error('CONFLICT', message),

  validation: (details: Record<string, unknown>) =>
    error('VALIDATION_ERROR', 'Validation failed', details),

  internal: (message = 'Internal server error') =>
    error('INTERNAL_ERROR', message),

  methodNotAllowed: (message = 'Method not allowed') =>
    error('METHOD_NOT_ALLOWED', message),

  tooManyRequests: (message = 'Too many requests') =>
    error('RATE_LIMIT_EXCEEDED', message),
}

// Create JSON response with status code
export function jsonResponse<T>(
  data: ApiResponse<T>,
  status: HttpStatusCode = 200,
  headers?: Record<string, string>
): Response {
  const responseHeaders = new Headers(headers)
  responseHeaders.set('Content-Type', 'application/json')

  return new Response(JSON.stringify(data), {
    status,
    headers: responseHeaders,
  })
}

// Pagination helper
export function createPaginationMeta(
  page: number,
  limit: number,
  total: number
): PaginationMeta {
  const totalPages = Math.ceil(total / limit)
  return {
    page,
    limit,
    total,
    totalPages,
    hasMore: page < totalPages,
  }
}

// Common response creators
export const apiResponses = {
  // 2xx Success
  ok: <T>(data: T, meta?: Partial<ApiMeta>) =>
    jsonResponse(success(data, meta), 200),

  created: <T>(data: T, meta?: Partial<ApiMeta>) =>
    jsonResponse(success(data, meta), 201),

  noContent: () =>
    jsonResponse(noContent(), 204),

  // 4xx Client Errors
  badRequest: (message?: string, details?: Record<string, unknown>) =>
    jsonResponse(errors.badRequest(message, details), 400),

  unauthorized: (message?: string) =>
    jsonResponse(errors.unauthorized(message), 401),

  forbidden: (message?: string) =>
    jsonResponse(errors.forbidden(message), 403),

  notFound: (resource?: string) =>
    jsonResponse(errors.notFound(resource), 404),

  conflict: (message?: string) =>
    jsonResponse(errors.conflict(message), 409),

  validation: (details: Record<string, unknown>) =>
    jsonResponse(errors.validation(details), 422),

  tooManyRequests: (message?: string) =>
    jsonResponse(errors.tooManyRequests(message), 429),

  // 5xx Server Errors
  internal: (message?: string) =>
    jsonResponse(errors.internal(message), 500),
}

// Helper to wrap async handlers with error handling
export function withErrorHandler<T = Request>(
  handler: (request: T) => Promise<Response>
): (request: T) => Promise<Response> {
  return async (request: T): Promise<Response> => {
    try {
      return await handler(request)
    } catch (err) {
      console.error('API Error:', err)

      const isDev = process.env.NODE_ENV === 'development'

      let errorMessage: string
      if (isDev) {
        if (err instanceof Error) {
          errorMessage = err.message
        } else {
          errorMessage = 'Unknown error'
        }
      } else {
        errorMessage = 'Internal server error'
      }

      let stack: string | undefined
      if (isDev && err instanceof Error) {
        stack = err.stack
      }

      const errorResponse: ApiResponse<null> = {
        success: false,
        error: {
          code: 'INTERNAL_ERROR',
          message: errorMessage,
          ...(stack ? { stack } : {}),
        },
        meta: {
          timestamp: new Date().toISOString(),
        },
      }

      return jsonResponse(errorResponse, 500)
    }
  }
}
