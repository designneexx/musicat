import { useMutation } from 'react-query'

import { deezerClient } from '@/utils/common/deezerClient'

export function useLazyDeezerQuery<LazyQueryData>(
  onSuccess: (data: LazyQueryData) => void
) {
  return useMutation(
    (apiPath: string) => {
      return deezerClient.get<LazyQueryData>(apiPath)
    },
    {
      onSuccess(data) {
        onSuccess(data.data)
      },
    }
  )
}
