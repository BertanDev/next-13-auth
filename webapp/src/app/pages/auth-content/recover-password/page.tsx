'use client'
import { useState } from 'react'
import { FirstStep } from './(components)/FirstStep'
import { SecondStep } from './(components)/SecondStep'
import { ThirdStep } from './(components)/ThirdStep'
export default function RecoverPassword() {
  const [stepRecoverPassword, setStepRecoverPassword] = useState(1)
  const [currentEmail, setCurrentEmail] = useState('')

  return (
    <>
      {stepRecoverPassword === 1 && (
        <FirstStep
          prossStep={setStepRecoverPassword}
          setEmail={setCurrentEmail}
        />
      )}

      {stepRecoverPassword === 2 && (
        <SecondStep
          prossStep={setStepRecoverPassword}
          currentUserEmail={currentEmail}
          alterCurrentUserEmail={setCurrentEmail}
        />
      )}

      {stepRecoverPassword === 3 && (
        <ThirdStep
          prossStep={setStepRecoverPassword}
          currentUserEmail={currentEmail}
        />
      )}
    </>
  )
}
