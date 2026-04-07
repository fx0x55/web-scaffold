/**
 * Server-side API utilities
 * For use in API routes and server components
 */

// CORS
export {
  setCorsHeaders,
  createCorsMiddleware,
  corsPresets,
  type CorsOptions,
} from './cors'

// Response helpers
export {
  success,
  created,
  noContent,
  error,
  errors,
  jsonResponse,
  createPaginationMeta,
  apiResponses,
  withErrorHandler,
  type ApiResponse,
  type ApiError,
  type ApiMeta,
  type PaginationMeta,
  type HttpStatusCode,
} from './response'

// Validation
export {
  validateRequest,
  parseBody,
  parseQueryParams,
  getPaginationParams,
  validationPatterns,
  type ValidationSchema,
  type ValidationResult,
} from './validation'
