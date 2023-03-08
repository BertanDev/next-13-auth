'use client'

import { useRouter } from 'next/navigation'
import { ButtonToLogin, Container, Message } from './styles'

export function CheckedUnsuccessfully() {
  const router = useRouter()

  function handleRedirectToLogin() {
    router.push('auth-content/login-session')
  }

  return (
    <Container>
      <Message>
        {
          "We're sorry, but there was an error while validating your email address"
        }
      </Message>
      <ButtonToLogin onClick={handleRedirectToLogin}>
        {"Let's login"}
      </ButtonToLogin>
    </Container>
  )
}
