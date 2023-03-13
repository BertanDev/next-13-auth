import Cookies from 'js-cookie'

export const checkUserAuthenticated = () => {
  const userToken = Cookies.get('authTokenSession')

  return !!userToken
}
