import appServerApi from '@/api/axios/appServerApi'
import { AuthButton } from '@/components/AuthButton'
import { AuthInput } from '@/components/AuthInput'
import { Envelope } from 'phosphor-react'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ActionsSession,
  RecoverPasswordContainer,
  RecoverPasswordContent,
  TextPage,
} from './styles'

interface FirstStepProps {
  prossStep: Dispatch<SetStateAction<number>>
  setEmail: Dispatch<SetStateAction<string>>
}

export function FirstStep({ prossStep, setEmail }: FirstStepProps) {
  const [userEmail, setUserEmail] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmitEmail(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(userEmail)) {
      toast.warning('Invalid Email')
      setLoading(false)
      return
    }

    await appServerApi
      .post('/content-auth/recover-password-email', {
        email: userEmail,
      })
      .then((response) => {
        setEmail(userEmail)
        prossStep(2)
        setLoading(false)
      })
      .catch((response) => {
        toast.error(response.response.data.error)
        setLoading(false)
      })
  }

  return (
    <RecoverPasswordContainer>
      <RecoverPasswordContent>
        <TextPage>
          Enter the email address associated with your account and click
          &quot;Submit&quot;. Then check your inbox - we&apos;ll send you an
          email with instructions on how to reset your password. Be sure to
          check your spam or junk folder if you don&apos;t see the email in your
          inbox.
        </TextPage>

        <ActionsSession onSubmit={handleSubmitEmail}>
          <AuthInput
            onChange={(e) => setUserEmail(e.target.value)}
            InputIcon={Envelope}
            placeholder="Your Email"
            value={userEmail}
            type="input"
          />
          <AuthButton isLoading={loading}>
            {loading ? 'Loading...' : 'SUBMIT'}
          </AuthButton>
        </ActionsSession>
      </RecoverPasswordContent>
    </RecoverPasswordContainer>
  )
}
