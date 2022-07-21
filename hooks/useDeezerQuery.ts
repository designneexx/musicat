import React from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { QueryKey } from 'react-query/types/core/types'

import { deezerClient } from '@/utils/common/deezerClient'

export function useDeezerQuery<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
>(
  apiPath: string,
  {
    queryKey,
    options,
  }: UseDeezerQueryOptions<TQueryFnData, TError, TData, TQueryKey>
) {
  const apiPathRef = React.useRef<string>(apiPath)

  React.useMemo(() => {
    apiPathRef.current = apiPath
  }, [apiPath])

  return useQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    async ({ signal }) => {
      try {
        const response = await deezerClient.get(apiPathRef.current, {
          signal,
        })

        if (response.data.error) {
          return Promise.reject(response.data.error)
        }

        return response.data
      } catch (e) {
        return Promise.reject(e)
      }
    },
    options
  )
}

export type UseDeezerQueryOptions<
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey
> = {
  queryKey: TQueryKey
  options: Omit<
    UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
    'queryKey' | 'queryFn'
  >
}
