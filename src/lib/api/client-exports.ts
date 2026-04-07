/**
 * Client-side API utilities
 * For use in React components
 */

// Client
export {
  ApiClientError,
  apiClient,
  api,
  createApi,
  type ApiClientOptions,
} from './client'

// Hooks
export {
  useApi,
  useManualApi,
  useMutation,
  usePaginated,
  type UseApiReturn,
  type UseMutationReturn,
  type UsePaginatedReturn,
} from './hooks'
