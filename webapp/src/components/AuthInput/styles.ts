import styled from 'styled-components'

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  position: relative;
`

export const Input = styled('input')`
  width: 100%;
  background: transparent;
  border: 0;
  outline: 0;
  font-size: 1.25rem;
  font-family: MuseoModernoRegular;
  padding-left: 40px;
  padding-right: 40px;
  padding-bottom: 4px;
  border-bottom: 2px solid;
  border-bottom-color: ${(props) => props.theme.colors.blue_800};

  ::placeholder {
    color: ${(props) => props.theme.colors.blue_800};
  }
`

export const InputIconFix = styled('div')`
  position: absolute;
  padding-bottom: 4px;
`

export const InputEyeFix = styled('button')`
  border: 0;
  outline: 0;
  background: none;
  cursor: pointer;
  position: absolute;
  padding-bottom: 4px;
  align-self: flex-end;
  right: 0;
`
