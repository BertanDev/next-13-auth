import styled from 'styled-components'

export const AuthRegisterContainer = styled('main')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
`

export const AuthRegisterForm = styled('form')`
  width: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 5rem;
  min-height: 600px;
`

export const TextError = styled('p')`
  color: ${(props) => props.theme.colors.red_700};
  font-size: 0.8rem;
  font-family: Exo2Bold;
  margin-top: -4rem;
  margin-bottom: -3rem;
  width: 100%;
  height: 0.2rem;
`
