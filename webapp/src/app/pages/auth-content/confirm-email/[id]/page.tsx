import appServerApi from '@/api/axios/appServerApi'
import { CheckedUnsuccessfully } from './(components)/CheckedUnsuccessfully'
import { SuccessfullyVerified } from './(components)/SuccessfullyVerified'

interface ConfirmEmailProps {
  params: {
    id: string
  }
}

export default async function ConfirmEmail({ params }: ConfirmEmailProps) {
  let isEmailHasVerifyed

  try {
    await appServerApi.get(`/content-auth/confirm-email/${params.id}`)

    isEmailHasVerifyed = true
  } catch {
    isEmailHasVerifyed = false
  }

  return (
    <>
      {isEmailHasVerifyed && <SuccessfullyVerified />}{' '}
      {!isEmailHasVerifyed && <CheckedUnsuccessfully />}
    </>
  )
}
