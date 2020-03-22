import React, { memo } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { Link } from 'react-router-dom'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectors } from 'state'
import strove from 'images/stroveReversed.png'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const StyledImage = styled.img`
  height: ${props => (props.isEditor ? '16px' : '25px')};
  width: ${props => (props.isEditor ? '16px' : '25px')};
  margin: 0 5px;
`

const LinkWrapper = styled.div`
  font-weight: ${props => (props.isEditor ? '300' : '600')};
  animation: ${FadeIn} 0.3s ease-out;
`

const StyledStandardLink = styled(Link)`
  color: ${({ theme }) => theme.colors.c2};
  text-decoration: none;
  display: flex;
  font-weight: 600;
`

const StyledEditorLink = styled(StyledStandardLink)`
  font-weight: 300;
`

// https://stackoverflow.com/questions/49834251/how-to-extend-styled-component-without-passing-props-to-underlying-dom-element
const StyledLink = ({ theme, isEditor, isEmbed, isMobileOnly, ...props }) => {
  if (isEditor) {
    return <StyledEditorLink {...props} />
  }

  return <StyledStandardLink {...props} />
}

const LinkText = styled.div`
  color: ${({ theme }) => theme.colors.c2};
  font-size: 16px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: ${props => (props.isEditor ? '300' : '600')};
  margin: 0;
  cursor: pointer;

  :hover {
    color: ${({ theme }) => theme.colors.c3};
    svg {
      fill: ${({ theme }) => theme.colors.c3};
    }
  }
`

const HomeLink = props => {
  const token = useSelector(selectors.getToken)

  return (
    !props.isEmbed &&
    !token && (
      <LinkWrapper {...props}>
        <StyledLink to="/" {...props}>
          {isMobileOnly ? (
            <StyledImage src={strove} {...props} />
          ) : (
            <LinkText {...props}>Strove</LinkText>
          )}
        </StyledLink>
      </LinkWrapper>
    )
  )
}

export default memo(HomeLink)
