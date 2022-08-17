import React from 'react'
import { ArrowLeft, X } from 'react-feather'
import styled, { keyframes } from 'styled-components/macro'

export const ButtonText = styled.button`
  outline: none;
  border: none;
  font-size: inherit;
  padding: 0;
  margin: 0;
  background: none;
  cursor: pointer;

  :hover {
    opacity: 0.7;
  }

  :focus {
    text-decoration: underline;
  }
`

export const CloseIcon = styled(X)`
  cursor: pointer;
`


const StyledLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: ${({ theme }) => theme.primary1};
  font-weight: 500;

  :hover {
    text-decoration: underline;
  }

  :focus {
    outline: none;
    text-decoration: underline;
  }

  :active {
    text-decoration: none;
  }
`
function handleClickExternalLink(event) {
    const { target, href } = event.currentTarget
  
    // don't prevent default, don't redirect if it's a new tab
    if (target === '_blank' || event.ctrlKey || event.metaKey) {
   
    } else {
      event.preventDefault()
      // send a ReactGA event and then trigger a location change
    }
  }

export function ExternalLink({
  target = '_blank',
  href,
  rel = 'noopener noreferrer',
  ...rest
}) {
  return <StyledLink target={target} rel={rel} href={href} onClick={handleClickExternalLink} {...rest} />
}


const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

const Spinner = styled.img`
  animation: 2s ${rotate} linear infinite;
  width: 16px;
  height: 16px;
`


export const CustomLightSpinner = styled(Spinner)`
  height: ${({ size }) => size};
  width: ${({ size }) => size};
`