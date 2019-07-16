import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'gatsby'
import styled, { keyframes } from 'styled-components'
import { Location } from '@reach/router'
import { isMobile } from 'react-device-detect'

import Login from './login'
import { Icon } from 'antd'
import { selectors } from 'state'
import { Silisky } from '../images/logos'

const FadeIn = keyframes`
  0% {
    opacity: 0
  }
  100% {
    opacity: 1
  }
`

const LinkWrapper = styled.h3`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 2.5vh;
  margin: 0 3vw 0 0;
  font-weight: 200;
  animation: ${FadeIn} 0.3s ease-out;
  @media (max-width: 767px) {
    height: 4vh;
  }
`

const ZeldaWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 2.5vh;
  margin: 0;
  font-weight: 200;
  animation: ${FadeIn} 0.3s ease-out;
  @media (max-width: 767px) {
    height: 4vh;
  }
`

const IconWrapper = styled(LinkWrapper)`
  color: #fff;
  animation: ${FadeIn} 0.3s ease-out;
  transition: color 0.3s;

  :hover {
    color: black;
  }
`

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0;
`

const LinkText = styled.span`
  font-size: 1.2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  transition: color 0.3s;
  font-weight: 200;
  @media (max-width: 767px) {
    height: 5vh;
    font-size: 1.8rem;
  }

  :hover {
    color: black;
  }
`

const HeaderSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100vw;
  padding-left: 1.5vw;
  padding-right: 1.5vw;
  height: 3vh;
  background: #0072ce;
  min-height: 1.3rem;
  @media (max-width: 767px) {
    height: 5vh;
  }
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  display: flex;
  align-items: center;
`

const PreviewLink = styled.a`
  color: '#fff';
  text-decoration: 'none';
`

const HeaderComponent = ({ siteTitle, location }) => {
  const user = useSelector(selectors.getUser)
  return (
    <HeaderSection>
      <HeaderWrapper>
        <LinkWrapper>
          <StyledLink to="/">
            {isMobile ? (
              <Silisky style={{ height: '100%' }} fill="#ffffff" />
            ) : (
              <LinkText>{siteTitle}</LinkText>
            )}
          </StyledLink>
        </LinkWrapper>
        {user && (
          <LinkWrapper>
            <StyledLink to="/app/dashboard">
              {isMobile ? (
                <Icon type="appstore" style={{ fontSize: '1.1rem' }} />
              ) : (
                <LinkText>Dashboard</LinkText>
              )}
            </StyledLink>
          </LinkWrapper>
        )}
        {location.pathname === '/app/editor/' && (
          <PreviewLink
            style={{ color: '#fff', textDecoration: 'none' }}
            href={
              process.env.NODE_ENV === 'production'
                ? 'silisky.com/app/preview/'
                : 'localhost:8000/app/preview/'
            }
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconWrapper>
              <Icon type="desktop" style={{ fontSize: '3vh' }}></Icon>
            </IconWrapper>
          </PreviewLink>
        )}
      </HeaderWrapper>
      <ZeldaWrapper>
        <Login />
      </ZeldaWrapper>
    </HeaderSection>
  )
}

const Header = props => (
  <Location>
    {({ location }) => <HeaderComponent {...props} location={location} />}
  </Location>
)

export default Header
