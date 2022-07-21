import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'

import { useAuth } from '@/hooks/api/useAuth'

const host = process.env.HOST_LOCAL

const SigninPage: NextPage = () => {
  const pageUrl = `${host}/signin`
  const router = useRouter()
  const auth = useAuth()
  const authError = auth.isError
  const code = router.query.code as string

  function handleRedirect() {
    window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.CLIENT_ID}&display=popup&redirect_uri=${pageUrl}&scope=email&response_type=code`
  }

  function handleLogin(code: string) {
    auth.mutate(code)
  }

  React.useEffect(() => {
    code && handleLogin(code)
  }, [code])

  React.useEffect(() => {
    authError && router.replace(pageUrl)
  }, [authError])

  return (
    <div>
      <button onClick={handleRedirect}>Войти через Вконтакте</button>
      {authError && <p style={{ color: 'red' }}>Ошибка входа через ВК</p>}
    </div>
  )
}

export default SigninPage
