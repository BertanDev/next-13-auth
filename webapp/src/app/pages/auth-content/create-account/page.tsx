'use client'
import { AuthInput } from '@/components/AuthInput'
import { FormEvent, useState } from 'react'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { AuthRegisterContainer, AuthRegisterForm, TextError } from './styles'

import { UserCircle, Envelope, LockKey } from 'phosphor-react'
import { AuthButton } from '@/components/AuthButton'
import appServerApi from '@/api/axios/appServerApi'
import { useRouter } from 'next/navigation'

export default function CreateAccount() {
  const [username, setUsername] = useState('')
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [userConfirmPassword, setUserConfirmPassword] = useState('')

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  function clearInputs() {
    setUsername('')
    setUserEmail('')
    setUserPassword('')
    setUserConfirmPassword('')
  }

  async function handleSubmitCreateAccount(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setLoading(true)

    if (verifyErrors()) {
      setLoading(false)
      return
    }

    await appServerApi
      .post('/content-auth/register-new-account', {
        name: username,
        email: userEmail,
        password: userPassword,
      })
      .then(async () => {
        router.push('/auth-content/create-account/verify-your-email')
        setLoading(false)
        clearInputs()
      })
      .catch((response) => {
        if (response.response.status === 409) {
          toast.warning(response.response.data.error)
          setLoading(false)
          return
        }
        toast.error('Internal error, please try again later')

        clearInputs()
        setLoading(false)
      })
  }

  function verifyErrors() {
    if (username.length < 3 || username.length > 20) {
      return 'Your username must be between 3 and 20 characters long'
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    if (!emailRegex.test(userEmail)) {
      return 'Invalid email'
    }

    if (userPassword.length < 8 || userPassword.length > 30) {
      return 'Your password must be between 8 and 30 characters long'
    }

    const passwordRegex =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

    if (!passwordRegex.test(userPassword)) {
      return 'Your password must contain a number, a lowercase and uppercase letter, and a special character'
    }

    if (!(userPassword === userConfirmPassword)) {
      return 'Your two passwords must be the same'
    }
  }

  return (
    <AuthRegisterContainer>
      <AuthRegisterForm onSubmit={handleSubmitCreateAccount}>
        <AuthInput
          InputIcon={UserCircle}
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          placeholder="Your Name"
          type="text"
        />

        <AuthInput
          InputIcon={Envelope}
          onChange={(e) => setUserEmail(e.target.value)}
          value={userEmail}
          placeholder="Email ID"
          type="text"
        />

        <AuthInput
          InputIcon={LockKey}
          onChange={(e) => setUserPassword(e.target.value)}
          value={userPassword}
          placeholder="Password"
          type="password"
          isPasswordInput={true}
        />

        <AuthInput
          InputIcon={LockKey}
          onChange={(e) => setUserConfirmPassword(e.target.value)}
          value={userConfirmPassword}
          placeholder="Confirm Password"
          type="password"
          isPasswordInput={true}
        />

        <TextError>{verifyErrors()}</TextError>

        <AuthButton type="submit" isLoading={loading}>
          {loading ? 'Loading...' : 'REGISTER'}
        </AuthButton>
      </AuthRegisterForm>
    </AuthRegisterContainer>
  )
}
