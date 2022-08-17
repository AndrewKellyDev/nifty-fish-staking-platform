import useCopyClipboard from 'hooks/useCopyClipboard'
import React, { useCallback } from 'react'
import { CheckCircle, Copy } from 'react-feather'
import styled from 'styled-components/macro'

const CopyIcon = styled.a`
  color: ${({ color }) => color || "#8F96AC"};
  flex-shrink: 0;
  display: flex;
  text-decoration: none;
  :hover,
  :active,
  :focus {
    text-decoration: none;
    color: ${({ color }) => color || "#C3C5CB"};
  }
`
const StyledText = styled.span`
  margin-left: 0.25rem;
  display: flex;
      flex-flow: row nowrap;
  align-items: center;
`

const Copied = ({ iconSize }) => (
  <StyledText>
    <CheckCircle size={iconSize ?? '16'} />
    <StyledText>
      <div>Copied</div>
    </StyledText>
  </StyledText>
)

const Icon = ({ iconSize }) => (
  <StyledText>
    <Copy size={iconSize ?? '16'} />
  </StyledText>
)

export default function CopyHelper({ color, toCopy, children, iconSize, iconPosition }) {
  const [isCopied, setCopied] = useCopyClipboard()
  const copy = useCallback(() => {
    setCopied(toCopy)
  }, [toCopy, setCopied])

  return (
    <CopyIcon onClick={copy} color={color}>
      {iconPosition === 'left' ? isCopied ? <Copied iconSize={iconSize} /> : <Icon iconSize={iconSize} /> : null}
      {iconPosition === 'left' && <>&nbsp;</>}
      {isCopied ? '' : children}
      {iconPosition === 'right' && <>&nbsp;</>}
      {iconPosition === 'right' ? isCopied ? <Copied iconSize={iconSize} /> : <Icon iconSize={iconSize} /> : null}
    </CopyIcon>
  )
}
