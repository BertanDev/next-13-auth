import styled from 'styled-components'

export const VerifyYourEmailContainer = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
`

export const Message = styled('p')`
  color: ${(props) => props.theme.colors.blue_800};
  font-size: 2rem;
  font-family: Exo2Bold;
  padding: 1rem;
`
