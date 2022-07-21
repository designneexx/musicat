import { useLocalStorage } from 'usehooks-ts'

export function useGlobalToken() {
  return useLocalStorage<string | null>('userToken', null)
}
