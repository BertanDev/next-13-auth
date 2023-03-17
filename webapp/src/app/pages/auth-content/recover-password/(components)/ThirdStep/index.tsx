import appServerApi from '@/api/axios/appServerApi'
import { AuthButton } from '@/components/AuthButton'
import { AuthInput } from '@/components/AuthInput'
import { useRouter } from 'next/navigation'
import { LockKey } from 'phosphor-react'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ActionsSession,
  TextError,
  TextPage,
  ThirdStepContainer,
  ThirdStepContent,
} from './styles'

interface ThirdStepProps {
  prossStep: Dispatch<SetStateAction<number>>
  currentUserEmail: string
}

export function ThirdStep({ prossStep, currentUserEmail }: ThirdStepProps) {
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userNewPasswordConfirm, setUserNewPasswordConfirm] = useState('')

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  function verifyErrors() {
    if (userNewPassword.length < 8 || userNewPassword.length > 30) {
      return 'Your password must be between 8 and 30 characters long'
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if (!passwordRegex.test(userNewPassword)) {
      return 'Your password must contain a number, a lowercase and uppercase letter, and a special character'
    }

    if (!(userNewPassword === userNewPasswordConfirm)) {
      return 'Your two passwords must be the same'
    }
  }

  async function handleRevocerPassword(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    setLoading(true)
    if (verifyErrors()) {
      setLoading(false)
      return
    }

    await appServerApi
      .post('/content-auth/recover-password-new', {
        newUserPassword: userNewPassword,
        userEmail: currentUserEmail,
      })
      .then((response) => {
        toast.success('Password reset')
        setLoading(false)
        router.push('/auth-content/login-session')
      })
      .catch((response) => {
        toast.error('Error resetting password')
        setLoading(false)
        router.push('/auth-content/login-session')
      })
  }

  return (
    <ThirdStepContainer>
      <ThirdStepContent>
        <TextPage>Set your new password</TextPage>

        <ActionsSession onSubmit={handleRevocerPassword}>
          <AuthInput
            InputIcon={LockKey}
            onChange={(e) => setUserNewPassword(e.target.value)}
            value={userNewPassword}
            placeholder="New password"
            type="input"
            isPasswordInput
          />
          <AuthInput
            InputIcon={LockKey}
            onChange={(e) => setUserNewPasswordConfirm(e.target.value)}
            value={userNewPasswordConfirm}
            placeholder="Confirm new password"
            type="input"
            isPasswordInput
          />
          <TextError>{verifyErrors()}</TextError>
          <AuthButton isLoading={loading}>
            {loading ? 'Loading...' : 'SUBMIT'}
          </AuthButton>
        </ActionsSession>
      </ThirdStepContent>
    </ThirdStepContainer>
  )
}
