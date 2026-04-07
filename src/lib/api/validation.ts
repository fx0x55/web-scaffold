/**
 * Request validation utilities
 * Works with Zod schemas or custom validation functions
 */

export interface ValidationSchema<T = unknown> {
  parse: (data: unknown) => T
  safeParse: (data: unknown) => {
    success: boolean
    data?: T
    error?: { issues: Array<{ path: (string | number)[]; message: string }> }
  }
}

export interface ValidationResult<T> {
  success: boolean
  data?: T
  errors?: Record<string, string[]>
}

/**
 * Validate request data against a schema
 * Compatible with Zod schemas
 */
export function validateRequest<T>(
  schema: ValidationSchema<T>,
  data: unknown
): ValidationResult<T> {
  const result = schema.safeParse(data)

  if (result.success) {
    return {
      success: true,
      data: result.data,
    }
  }

  // Parse error details into a structured format
  const errors: Record<string, string[]> = {}

  if (result.error?.issues) {
    for (const issue of result.error.issues) {
      const path = issue.path.join('.') || 'root'
      if (!errors[path]) {
        errors[path] = []
      }
      errors[path].push(issue.message)
    }
  }

  return {
    success: false,
    errors,
  }
}

/**
 * Parse JSON body from request
 */
export async function parseBody<T = unknown>(
  request: Request
): Promise<T | null> {
  try {
    const text = await request.text()
    if (!text) return null
    return JSON.parse(text) as T
  } catch {
    return null
  }
}

/**
 * Parse query parameters from URL
 */
export function parseQueryParams(request: Request): Record<string, string> {
  const url = new URL(request.url)
  const params: Record<string, string> = {}

  url.searchParams.forEach((value, key) => {
    params[key] = value
  })

  return params
}

/**
 * Get pagination params from query
 */
export function getPaginationParams(
  query: Record<string, string>,
  defaults: { page?: number; limit?: number } = {}
): { page: number; limit: number; offset: number } {
  const page = Math.max(1, parseInt(query.page, 10) || defaults.page || 1)
  const limit = Math.min(
    100,
    Math.max(1, parseInt(query.limit, 10) || defaults.limit || 20)
  )
  const offset = (page - 1) * limit

  return { page, limit, offset }
}

/**
 * Common validation patterns
 */
export const validationPatterns = {
  // Email validation regex
  email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,

  // URL validation regex
  url: /^https?:\/\/.+/,

  // UUID validation regex
  uuid: /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i,

  // Slug validation regex (lowercase letters, numbers, hyphens)
  slug: /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
}
