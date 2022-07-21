import axios from 'axios'
import { useMutation } from 'react-query'

import { useGlobalToken } from '@/hooks/api/useGlobalToken'
import { useAppDispatch } from '@/store'
import { setProfile } from '@/store/actions/user'

export function useAuth() {
  const [, setToken] = useGlobalToken()

  return useMutation(
    (code: string) => {
      return axios.post(
        `${process.env.API_HOST}/auth/login/vk`,
        { code },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
    },
    {
      onSuccess(user: any) {
        console.log(user)
        setToken(user.token)
      },
    }
  )
}
