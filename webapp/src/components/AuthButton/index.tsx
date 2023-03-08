import { ReactNode } from 'react'
import { Button, ButtonText } from './styles'

interface AuthButtonProps {
  children: ReactNode
  type?: 'button' | 'submit' | 'reset'
  isLoading?: boolean
}

export function AuthButton({ children, type, isLoading }: AuthButtonProps) {
  return (
    <Button type={type} disabled={isLoading}>
      <ButtonText>{children}</ButtonText>
    </Button>
  )
}
