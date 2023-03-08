import styled from 'styled-components'

export const Container = styled('div')`
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

export const ButtonToLogin = styled('button')`
  cursor: pointer;
  background-color: #012e40;
  color: #fff;
  border: none;
  padding: 10px 20px;
  font-size: 16px;
  font-weight: bold;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    background-color: ${(props) => props.theme.colors.red_700};
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #2d6a4f, 0 2px 5px rgba(0, 0, 0, 0.2);
  }

  &:active {
    background-color: #03738c;
  }
`
