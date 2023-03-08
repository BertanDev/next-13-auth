import styled from 'styled-components'

export const LoginSessionContainer = styled('main')`
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`

export const LoginSessionContent = styled('form')`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`

export const LogoContainer = styled('div')`
  margin-bottom: 4.5rem;
  font-size: 3.125rem;
  font-family: Exo2Bold;
  line-height: 0.2;

  p {
    color: ${(props) => props.theme.colors.yellow_100};

    span {
      color: ${(props) => props.theme.colors.orange_500};
    }
  }

  & > p:last-child {
    padding-left: 2rem;
  }
`

export const InputContainer = styled('div')`
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
`

export const AuxiliaryLogin = styled('div')`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-top: 1rem;
  margin-bottom: 2.5rem;
`

export const CheckBoxContainer = styled('div')`
  display: flex;
  gap: 0.4rem;

  input {
    display: none;
  }

  input + label:before {
    content: '';
    width: 18px;
    height: 18px;
    border-radius: 4px;
    background-color: ${(props) => props.theme.colors.blue_800};
    display: inline-block;
    vertical-align: middle;
    margin-right: 0.4rem;
  }

  input:checked + label:before {
    background-color: ${(props) => props.theme.colors.blue_800};
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' width='16px' height='16px'%3E%3Cpath d='M 19.28125 5.28125 L 9 15.5625 L 4.71875 11.28125 L 3.28125 12.71875 L 8.28125 17.71875 L 9 18.40625 L 9.71875 17.71875 L 20.71875 6.71875 Z' fill='%23FFFFFF'/%3E%3C/svg%3E");
    border: none;
    background-position: center;
  }

  label {
    font-size: 0.85rem;
    color: ${(props) => props.theme.colors.green_700};
    font-family: MuseoModernoRegular;
    font-weight: bold;
  }
`

export const ForgotPasswordButton = styled('button')`
  cursor: pointer;
  border: 0;
  padding: 0;
  background: none;
  font-size: 0.85rem;
  color: ${(props) => props.theme.colors.green_700};
  font-family: MuseoModernoRegular;
  font-weight: bold;
`

export const CreateNewAccount = styled('button')`
  cursor: pointer;
  margin-top: 1rem;
  border: 0;
  background: none;
  font-size: 0.9rem;
  font-weight: bold;
  font-family: MuseoModernoRegular;
  color: ${(props) => props.theme.colors.blue_700};
`
