'use client'
import { AuthInput } from '@/components/AuthInput'
import { FormEvent, useState } from 'react'
import { Envelope, LockKey } from 'phosphor-react'
import {
  AuxiliaryLogin,
  CheckBoxContainer,
  CreateNewAccount,
  ForgotPasswordButton,
  InputContainer,
  LoginSessionContainer,
  LoginSessionContent,
  LogoContainer,
} from './styles'
import { AuthButton } from '@/components/AuthButton'
import { useRouter } from 'next/navigation'
import Cookies from 'js-cookie'
import appServerApi from '@/api/axios/appServerApi'
import { toast } from 'react-toastify'

export default function LoginSession() {
  const [userEmail, setUserEmail] = useState('')
  const [userPassword, setUserPassword] = useState('')
  const [isRemember, setIsRemember] = useState(false)

  const router = useRouter()

  async function handleLoginSession(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    await appServerApi
      .post('/content-auth/login-session', {
        email: userEmail,
        password: userPassword,
        rememberMe: isRemember,
      })
      .then((response) => {
        if (isRemember) {
          Cookies.set('authTokenRemember', response.data.auth_user_token)
        }

        appServerApi.defaults.headers.common.Authorization = `Bearer ${response.data.auth_user_token}`

        router.push('/user-content/dashboard')
      })
      .catch((response) => toast.warning('Email or password invalid'))
  }

  return (
    <LoginSessionContainer>
      <LoginSessionContent onSubmit={handleLoginSession}>
        <LogoContainer>
          <p>
            to <span>task</span>
          </p>
          <p>
            do <span>list</span>
          </p>
        </LogoContainer>

        <InputContainer>
          <AuthInput
            placeholder="Email ID"
            onChange={(e) => setUserEmail(e.target.value)}
            value={userEmail}
            InputIcon={Envelope}
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
        </InputContainer>

        <AuxiliaryLogin>
          <CheckBoxContainer>
            <input
              id="checkbox-remember"
              type="checkbox"
              checked={isRemember}
              onChange={() => setIsRemember(!isRemember)}
            />
            <label htmlFor="checkbox-remember">remember me</label>
          </CheckBoxContainer>

          <ForgotPasswordButton>Forgot password?</ForgotPasswordButton>
        </AuxiliaryLogin>

        <AuthButton type="submit">LOGIN</AuthButton>

        <CreateNewAccount
          onClick={() => router.push('/auth-content/create-account')}
        >
          create a new account
        </CreateNewAccount>
      </LoginSessionContent>
    </LoginSessionContainer>
  )
}
