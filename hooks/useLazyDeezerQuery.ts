import { useMutation } from 'react-query'

import { fetchDeezerApi } from '@/helpers/fetchDeezerApi'

export function useLazyDeezerQuery<LazyQueryData>(
  onSuccess: (data: LazyQueryData) => void
) {
  return useMutation(
    (apiPath: string) => {
      return fetchDeezerApi<LazyQueryData>(apiPath)
    },
    {
      onSuccess(data) {
        onSuccess(data)
      },
    }
  )
}
