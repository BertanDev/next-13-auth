import { IconProps, Eye, EyeClosed } from 'phosphor-react'
import React, { ChangeEvent, useState } from 'react'
import { Input, InputEyeFix, InputIconFix, InputWrapper } from './styles'

interface AuthInputProps {
  value: string
  placeholder: string
  type: string
  InputIcon: React.ForwardRefExoticComponent<
    IconProps & React.RefAttributes<SVGSVGElement>
  >
  isPasswordInput?: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}

export function AuthInput({
  onChange,
  placeholder,
  value,
  type,
  InputIcon,
  isPasswordInput = false,
}: AuthInputProps) {
  const [passwordVisible, setPasswordVisible] = useState(false)

  return (
    <>
      <InputWrapper>
        <InputIconFix>
          <InputIcon size={28} weight="bold" />
        </InputIconFix>
        <Input
          value={value}
          type={
            isPasswordInput ? (passwordVisible ? 'text' : 'password') : type
          }
          onChange={onChange}
          placeholder={placeholder}
        />
        <InputEyeFix
          onClick={() => setPasswordVisible(!passwordVisible)}
          type="button"
        >
          {isPasswordInput ? (
            passwordVisible ? (
              <EyeClosed size={24} fill="bold" />
            ) : (
              ''
            )
          ) : (
            ''
          )}
          {isPasswordInput ? (
            !passwordVisible ? (
              <Eye size={24} fill="bold" />
            ) : (
              ''
            )
          ) : (
            ''
          )}
        </InputEyeFix>
      </InputWrapper>
    </>
  )
}
