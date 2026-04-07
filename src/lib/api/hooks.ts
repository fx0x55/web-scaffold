/**
 * React Hooks for API calls
 * Simple hooks for data fetching with loading and error states
 */

import { useState, useEffect, useCallback, useRef } from 'react'
import { apiClient, ApiClientError } from './client'

export interface UseApiState<T> {
  data: T | null
  loading: boolean
  error: ApiClientError | null
}

export interface UseApiActions<T> {
  refetch: () => void
  mutate: (data: T) => void
}

export type UseApiReturn<T> = UseApiState<T> & UseApiActions<T>

/**
 * Hook for GET requests with configurable base URL and credentials
 * @example
 * const { data, loading, error, refetch } = useApi('/api/users', 'https://api.example.com', 'omit')
 */
export function useApi<T>(
  url: string | null,
  baseUrl?: string,
  credentials?: 'include' | 'same-origin' | 'omit'
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    loading: false,
    error: null,
  })

  // Use ref to track if component is mounted
  const mountedRef = useRef(false)

  // Update baseUrl and credentials if provided
  useEffect(() => {
    if (baseUrl) {
      apiClient.setBaseUrl(baseUrl)
    }
    if (credentials) {
      apiClient.setCredentials(credentials)
    }
  }, [baseUrl, credentials])

  const performFetch = useCallback(() => {
    if (!url) return

    // Only set loading if mounted
    if (mountedRef.current) {
      setState(prev => ({ ...prev, loading: true, error: null }))
    }

    apiClient
      .get<T>(url)
      .then(data => {
        if (mountedRef.current) {
          setState({ data, loading: false, error: null })
        }
      })
      .catch(error => {
        if (mountedRef.current) {
          setState({
            data: null,
            loading: false,
            error:
              error instanceof ApiClientError
                ? error
                : new ApiClientError('Unknown error', 0, 'UNKNOWN'),
          })
        }
      })
  }, [url])

  // Initial mount handling
  useEffect(() => {
    mountedRef.current = true
    performFetch()

    return () => {
      mountedRef.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]) // Re-run when URL changes

  const mutate = useCallback((data: T) => {
    setState(prev => ({ ...prev, data }))
  }, [])

  const refetch = useCallback(() => {
    performFetch()
  }, [performFetch])

  return {
    ...state,
    refetch,
    mutate,
  }
}

/**
 * Hook for mutation operations (POST, PUT, DELETE)
 * @example
 * const { mutate, loading, error } = useMutation('/api/users', 'POST')
 * const handleSubmit = (data) => mutate(data)
 */
export interface UseMutationReturn<T, R> {
  mutate: (data?: T) => Promise<R | null>
  loading: boolean
  error: ApiClientError | null
  data: R | null
}

type HttpMethod = 'POST' | 'PUT' | 'PATCH' | 'DELETE'

export function useMutation<T = unknown, R = unknown>(
  url: string,
  method: HttpMethod = 'POST',
  baseUrl?: string,
  credentials?: 'include' | 'same-origin' | 'omit'
): UseMutationReturn<T, R> {
  const [state, setState] = useState<{
    loading: boolean
    error: ApiClientError | null
    data: R | null
  }>({
    loading: false,
    error: null,
    data: null,
  })

  // Update baseUrl and credentials if provided
  useEffect(() => {
    if (baseUrl) {
      apiClient.setBaseUrl(baseUrl)
    }
    if (credentials) {
      apiClient.setCredentials(credentials)
    }
  }, [baseUrl, credentials])

  const mutate = useCallback(
    async (data?: T): Promise<R | null> => {
      setState({ loading: true, error: null, data: null })

      try {
        let result: R

        switch (method) {
          case 'POST':
            result = await apiClient.post<R>(url, data)
            break
          case 'PUT':
            result = await apiClient.put<R>(url, data)
            break
          case 'PATCH':
            result = await apiClient.patch<R>(url, data)
            break
          case 'DELETE':
            result = await apiClient.delete<R>(url)
            break
          default:
            throw new Error(`Unsupported method: ${method}`)
        }

        setState({ loading: false, error: null, data: result })
        return result
      } catch (error) {
        const apiError =
          error instanceof ApiClientError
            ? error
            : new ApiClientError('Unknown error', 0, 'UNKNOWN')
        setState({ loading: false, error: apiError, data: null })
        return null
      }
    },
    [url, method]
  )

  return {
    mutate,
    ...state,
  }
}

/**
 * Hook for paginated data
 * @example
 * const { data, pagination, loading, nextPage, prevPage } = usePaginated('/api/users')
 */
export interface PaginationInfo {
  page: number
  limit: number
  total: number
  totalPages: number
  hasMore: boolean
}

interface PaginatedResponse<T> {
  data: T[]
  meta: {
    pagination: PaginationInfo
  }
}

export interface UsePaginatedReturn<T> {
  data: T[]
  pagination: PaginationInfo | null
  loading: boolean
  error: ApiClientError | null
  nextPage: () => void
  prevPage: () => void
  goToPage: (page: number) => void
  setLimit: (limit: number) => void
  refetch: () => void
}

/**
 * Hook for manual API calls (no auto-fetch on mount)
 * Useful when you want to trigger requests manually, e.g., after user input
 * @example
 * const { data, loading, error, execute } = useManualApi()
 * const handleClick = () => execute('/posts', 'GET')
 */
export function useManualApi() {
  const [state, setState] = useState<UseApiState<unknown>>({
    data: null,
    loading: false,
    error: null,
  })

  const execute = useCallback(
    async <T = unknown>(
      endpoint: string,
      method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'GET',
      body?: unknown
    ): Promise<T | null> => {
      setState({ data: null, loading: true, error: null })

      try {
        let result: T
        switch (method) {
          case 'GET':
            result = await apiClient.get<T>(endpoint)
            break
          case 'POST':
            result = await apiClient.post<T>(endpoint, body)
            break
          case 'PUT':
            result = await apiClient.put<T>(endpoint, body)
            break
          case 'PATCH':
            result = await apiClient.patch<T>(endpoint, body)
            break
          case 'DELETE':
            result = await apiClient.delete<T>(endpoint)
            break
          default:
            throw new Error(`Unsupported method: ${method}`)
        }
        setState({ data: result, loading: false, error: null })
        return result
      } catch (error) {
        const apiError =
          error instanceof ApiClientError
            ? error
            : new ApiClientError('Unknown error', 0, 'UNKNOWN')
        setState({ data: null, loading: false, error: apiError })
        return null
      }
    },
    []
  )

  const reset = useCallback(() => {
    setState({ data: null, loading: false, error: null })
  }, [])

  return {
    ...state,
    execute,
    reset,
  }
}

export function usePaginated<T>(
  baseUrl: string,
  endpoint: string,
  initialLimit: number = 10,
  credentials?: 'include' | 'same-origin' | 'omit'
): UsePaginatedReturn<T> {
  const [page, setPage] = useState(1)
  const [limit, setLimitState] = useState(initialLimit)

  // Update baseUrl and credentials
  useEffect(() => {
    if (baseUrl) {
      apiClient.setBaseUrl(baseUrl)
    }
    if (credentials) {
      apiClient.setCredentials(credentials)
    }
  }, [baseUrl, credentials])

  const url = `${endpoint}?page=${page}&limit=${limit}`
  const {
    data,
    loading,
    error,
    refetch: originalRefetch,
  } = useApi<PaginatedResponse<T>>(url)

  const nextPage = useCallback(() => {
    if (data?.meta.pagination.hasMore) {
      setPage(p => p + 1)
    }
  }, [data?.meta.pagination.hasMore])

  const prevPage = useCallback(() => {
    setPage(p => Math.max(1, p - 1))
  }, [])

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, newPage))
  }, [])

  const setLimit = useCallback((newLimit: number) => {
    setLimitState(newLimit)
    setPage(1)
  }, [])

  return {
    data: data?.data || [],
    pagination: data?.meta.pagination || null,
    loading,
    error,
    nextPage,
    prevPage,
    goToPage,
    setLimit,
    refetch: originalRefetch,
  }
}
