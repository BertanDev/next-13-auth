import styled from 'styled-components'

export const ThirdStepContainer = styled('main')`
  width: 100vw;
  height: 100vh;
  align-items: center;
  justify-content: center;
`

export const ThirdStepContent = styled('div')`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  height: 100%;
`

export const TextPage = styled('p')`
  font-family: MuseoModernoRegular;
  font-size: 1.5rem;
`

export const ActionsSession = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`

export const TextError = styled('p')`
  color: ${(props) => props.theme.colors.red_700};
  font-size: 0.8rem;
  font-family: Exo2Bold;
  width: 400px;
  height: 1rem;
  margin: -1rem 0;
`
