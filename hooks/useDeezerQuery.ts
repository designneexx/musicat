import React, { useCallback } from 'react'
import { useQuery, UseQueryOptions } from 'react-query'
import { QueryKey } from 'react-query/types/core/types'

import { fetchDeezerApi } from '@/helpers/fetchDeezerApi'

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

  const queryFn = useCallback(async () => {
    return fetchDeezerApi<TQueryFnData>(apiPathRef.current)
  }, [])

  return useQuery<TQueryFnData, TError, TData, TQueryKey>(
    queryKey,
    queryFn,
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
