import styled from 'styled-components'

export const Button = styled('button')`
  cursor: pointer;
  width: 100%;
  height: 70px;
  background-color: ${(props) => props.theme.colors.blue_500};
  border: 0;

  -webkit-box-shadow: -14px 11px 11px -3px rgba(0, 0, 0, 0.35);
  -moz-box-shadow: -14px 11px 11px -3px rgba(0, 0, 0, 0.35);
  box-shadow: -14px 11px 11px -3px rgba(0, 0, 0, 0.35);

  transition: opacity 0.5s ease;
  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    cursor: progress;
    opacity: 0.3;
  }
`

export const ButtonText = styled('span')`
  font-size: 1.25rem;
  font-family: Exo2Bold;
  color: #fff;
`
