'use client'
import appServerApi from '@/api/axios/appServerApi'
import GlobalStyle from '@/styles/globalStyles'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    const authTokenRemember = Cookies.get('authTokenRemember')
    async function verifyAuthTokenRemember(authTokenRemember: string) {
      await appServerApi
        .post('/content-auth/user-verify-auth-token', {
          authTokenRemember,
        })

        .then((response) => {
          appServerApi.defaults.headers.common.Authorization = `Bearer ${response.data.auth_user_token}`
          Cookies.set('authTokenSession', response.data.auth_user_token, {
            path: '/',
          })
          router.push('/user-content/dashboard')
        })
        .catch((error) => {
          console.log('deu errado', error)
          Cookies.remove('authTokenRemember')
          Cookies.remove('authTokenSession')
          router.push('/auth-content/login-session')
        })
    }

    if (authTokenRemember) {
      verifyAuthTokenRemember(authTokenRemember)
    } else {
      Cookies.remove('authTokenSession')
      router.push('/auth-content/login-session')
    }
  }, [router])

  return (
    <>
      <GlobalStyle />
    </>
  )
}
