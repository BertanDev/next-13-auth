import { AuthButton } from '@/components/AuthButton'
import { AuthInput } from '@/components/AuthInput'
import { LockKey } from 'phosphor-react'
import { Dispatch, FormEvent, SetStateAction, useState } from 'react'
import {
  ActionsSession,
  TextError,
  TextPage,
  ThirdStepContainer,
  ThirdStepContent,
} from './styles'

interface ThirdStepProps {
  prossStep: Dispatch<SetStateAction<number>>
}

export function ThirdStep({ prossStep }: ThirdStepProps) {
  const [userNewPassword, setUserNewPassword] = useState('')
  const [userNewPasswordConfirm, setUserNewPasswordConfirm] = useState('')

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

    if (verifyErrors()) {
      return
    }

    console.log('foi')
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
          <AuthButton>SUBMIT</AuthButton>
        </ActionsSession>
      </ThirdStepContent>
    </ThirdStepContainer>
  )
}
