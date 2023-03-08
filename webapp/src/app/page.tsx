'use client'
import appServerApi from '@/api/axios/appServerApi'
import GlobalStyle from '@/styles/globalStyles'
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function Home() {
  const AuthTokenRemember = Cookies.get('authTokenRemember')

  const router = useRouter()

  useEffect(() => {
    async function verifyAuthTokenRemember() {
      await appServerApi
        .get('/content-auth/user-verify-auth-token', {
          headers: {
            Authorization: `Bearer ${AuthTokenRemember}`,
          },
        })
        .then((response) => {
          appServerApi.defaults.headers.common.Authorization = `Bearer ${response.data.auth_user_token}`
          router.push('/user-content/dashboard')
        })
        .catch(() => {
          Cookies.remove('authTokenRemember')
          router.push('/auth-content/login-session')
        })
    }

    if (AuthTokenRemember) {
      verifyAuthTokenRemember()
    }
  }, [])

  return (
    <>
      <GlobalStyle />
      <div></div>
    </>
  )
}
