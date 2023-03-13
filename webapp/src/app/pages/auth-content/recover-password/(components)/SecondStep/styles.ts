import styled from 'styled-components'

export const SecondStepContainer = styled('main')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const SecondStepInput = styled('input')`
  border: none;
  border-bottom: 2px solid ${(props) => props.theme.colors.green_700};
  font-size: 24px;
  margin: 0 10px;
  text-align: center;
  width: 40px;
  background: transparent;

  &:focus {
    outline: none;
    border-bottom: 2px solid ${(props) => props.theme.colors.orange_500};
  }
`

export const SecondStepContent = styled('div')`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  gap: 2rem;
`

export const ActionsSession = styled('form')`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`

export const TextPage = styled('p')`
  width: 30%;
  font-family: MuseoModernoRegular;
  font-size: 1.5rem;
`
