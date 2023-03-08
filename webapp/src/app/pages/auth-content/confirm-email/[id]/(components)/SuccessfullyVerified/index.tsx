'use client'
import { useRouter } from 'next/navigation'
import { ButtonToLogin, Container, Message } from './styles'

export function SuccessfullyVerified() {
  const router = useRouter()

  function handleRedirectToLogin() {
    router.push('auth-content/login-session')
  }

  return (
    <Container>
      <Message>
        {
          "Your email has been successfully validated. You're all set to explore our platform!"
        }
      </Message>
      <ButtonToLogin onClick={handleRedirectToLogin}>
        {"Let's login"}
      </ButtonToLogin>
    </Container>
  )
}
