'use client'
import { APP_ROUTES } from '@/constants/app-routes'
import { checkUserAuthenticated } from '@/utils/check-user-authenticated'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

interface PrivateRouteProps {
  children: ReactNode
}

const PrivateRoute = ({ children }: PrivateRouteProps) => {
  const { push } = useRouter()

  const isUserAuthenticated = checkUserAuthenticated()

  useEffect(() => {
    if (!isUserAuthenticated) {
      push(APP_ROUTES.public.login)
    }
  }, [isUserAuthenticated, push])

  console.log('----->.>>>>', isUserAuthenticated, children)

  return (
    <>
      {!isUserAuthenticated && null}
      {isUserAuthenticated && children}
    </>
  )
}

export default PrivateRoute
