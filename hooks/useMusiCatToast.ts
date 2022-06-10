import debounce from 'lodash/fp/debounce'
import React from 'react'
import { toast } from 'react-toastify'

export function useMusiCatToast() {
  const debounceFn = React.useCallback(
    debounce(500, (fn: () => void) => fn()),
    []
  )

  function toastError(message: string) {
    debounceFn(() => toast.error(message))
  }

  return {
    toastError,
  }
}
