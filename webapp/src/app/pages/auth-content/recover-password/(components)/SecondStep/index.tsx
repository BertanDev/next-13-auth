import appServerApi from '@/api/axios/appServerApi'
import { AuthButton } from '@/components/AuthButton'
import React, {
  useState,
  useRef,
  FormEvent,
  Dispatch,
  SetStateAction,
} from 'react'
import { toast } from 'react-toastify'
import {
  ActionsSession,
  SecondStepContainer,
  SecondStepContent,
  SecondStepInput,
  TextPage,
} from './styles'

interface SecondStepProps {
  prossStep: Dispatch<SetStateAction<number>>
  alterCurrentUserEmail: Dispatch<SetStateAction<string>>
  currentUserEmail: string
}

export function SecondStep({
  prossStep,
  currentUserEmail,
  alterCurrentUserEmail,
}: SecondStepProps) {
  const [inputValues, setInputValues] = useState(['', '', '', '', '', ''])
  const inputRefs = useRef<Array<HTMLInputElement | null>>([])

  const [loading, setLoading] = useState(false)

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    e.target.value = e.target.value.toUpperCase()

    const newInputValues = [...inputValues]
    newInputValues[index] = e.target.value
    setInputValues(newInputValues)

    // Move para o próximo input
    if (e.target.value && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1]?.focus()
    }
  }

  async function handleVerifyCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)
    const codeValue = inputValues.join('')

    if (codeValue.length !== 6) {
      toast.error('Invalid code')
      setLoading(false)
      return
    }

    await appServerApi
      .post('/content-auth/recover-password-code', {
        code: codeValue,
        email: currentUserEmail,
      })
      .then((response) => {
        alterCurrentUserEmail(currentUserEmail)
        prossStep(3)
        setLoading(false)
      })
      .catch((response) => {
        toast.error(response.response.data.error)
        setLoading(false)
      })
  }

  return (
    <SecondStepContainer>
      <SecondStepContent>
        <TextPage>
          Enter the recovery code that was sent to your email to reset your
          password
        </TextPage>

        <ActionsSession onSubmit={handleVerifyCode}>
          <div>
            {inputValues.map((value, index) => (
              <SecondStepInput
                key={index}
                type="text"
                maxLength={1}
                value={value}
                onChange={(e) => handleInputChange(e, index)}
                ref={(el) => (inputRefs.current[index] = el)}
              />
            ))}
          </div>

          <AuthButton isLoading={loading}>
            {loading ? 'Loading...' : 'VERIFY'}
          </AuthButton>
        </ActionsSession>
      </SecondStepContent>
    </SecondStepContainer>
  )
}
