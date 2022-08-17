import { darken } from 'polished'
import { Button as RebassButton } from 'rebass/styled-components'
import styled from 'styled-components/macro'

export const BaseButton = styled(RebassButton)`
  padding: ${({ padding }) => padding ?? '16px'};
  width: ${({ width }) => width ?? '100%'};
  font-weight: 500;
  text-align: center;
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '20px'};
  outline: none;
  border: 1px solid transparent;
  color:"#FFFFFF";
  text-decoration: none;
  display: flex;
  justify-content: center;
  flex-wrap: nowrap;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 1;
  &:disabled {
    opacity: 50%;
    cursor: auto;
    pointer-events: none;
  }

  will-change: transform;
  transition: transform 450ms ease;
  transform: perspective(1px) translateZ(0);

  > * {
    user-select: none;
  }

  > a {
    text-decoration: none;
  }
`

export const ButtonPrimary = styled(BaseButton)`
  background-color: #2172E5;
  color: white;
  &:focus {
    box-shadow: 0 0 0 1pt ${darken(0.05, "#2172E5")};
    background-color: ${darken(0.05, "#2172E5")};
  }
  &:hover {
    background-color: ${darken(0.05, "#2172E5")};
  }
  &:active {
    box-shadow: 0 0 0 1pt ${darken(0.1, "#2172E5")};
    background-color:${darken(0.1, "#2172E5")};
  }
  &:disabled {
    background-color: ${({ altDisabledStyle, disabled }) =>
      altDisabledStyle ? (disabled ? "#2172E5" : "#2C2F36") : "#212429"};
    color: ${({ altDisabledStyle, disabled }) =>
      altDisabledStyle ? (disabled ? "#ffffff": "#C3C5CB") : "#C3C5CB"};
    cursor: auto;
    box-shadow: none;
    border: 1px solid transparent;
    outline: none;
  }
`


export const ButtonSecondary = styled(BaseButton)`
  border: 1px solid #376bad70;
  color: '#2172E5';
  background-color: transparent;
  font-size: 16px;
  border-radius: 12px;
  padding: ${({ padding }) => (padding ? padding : '10px')};

  &:focus {
    box-shadow: 0 0 0 1pt #376bad70;
    border: 1px solid #4D8FEA;
  }
  &:hover {
    border: 1px solid #4D8FEA;
  }
  &:active {
    box-shadow: 0 0 0 1pt #376bad70;
    border: 1px solid #4D8FEA;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
  a:hover {
    text-decoration: none;
  }
`

export const ButtonEmpty = styled(BaseButton)`
  background-color: transparent;
  color:"#2172E5";
  display: flex;
  justify-content: center;
  align-items: center;

  &:focus {
    text-decoration: underline;
  }
  &:hover {
    text-decoration: none;
  }
  &:active {
    text-decoration: none;
  }
  &:disabled {
    opacity: 50%;
    cursor: auto;
  }
`