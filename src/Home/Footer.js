import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

const FooterWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 16vh;
  background-color: #0072ce;
  @media (max-width: 767px) {
    height: auto;
    padding: 10px 0 10px 0;
  }
`

const ColumnWrapper = styled(FooterWrapper)`
  justify-content: space-around;
  width: 80%;
  height: auto;
  align-items: flex-start;
  @media (max-width: 767px) {
    flex-direction: column;
  }
`

const Column = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`

const ColumnTitle = styled.h3`
  font-size: 1.3rem;
  font-weight: 200;
  color: white;
  margin: 5px 0 5px 0;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  color: white;
`

const LinkText = styled.h3`
  font-size: 0.9rem;
  font-weight: 200;
  margin: 0 0 6px 0;
`

const StyledAnchor = styled.a`
  text-decoration: none;
  color: white;
`

const Footer = () => {
  return (
    <FooterWrapper>
      <ColumnWrapper>
        <Column>
          <ColumnTitle>Social</ColumnTitle>
          {/* <StyledLink to="/blog">
            <LinkText>Blog</LinkText>
          </StyledLink>
          <StyledLink to="/cookies">
            <LinkText>Github</LinkText>
          </StyledLink>
          <StyledLink to="/cookies">
            <LinkText>Twitter</LinkText>
          </StyledLink> */}
          <StyledAnchor href="mailto:contact@codengo.page?subject=Strove demo&body=We'd love to get to know how we can help!%0D%0A%0D%0AWhen is it a good time to schedule a call?">
            <LinkText>Contact us</LinkText>
          </StyledAnchor>
        </Column>
        <Column>
          <ColumnTitle>About</ColumnTitle>
          {/* <StyledLink to="/documentation">
            <LinkText>Documentation</LinkText>
          </StyledLink> */}
          <StyledLink to="/pricing">
            <LinkText>Pricing</LinkText>
          </StyledLink>
          {/* <StyledLink to="/faq">
            <LinkText>FAQ</LinkText>
          </StyledLink> */}
        </Column>
        <Column>
          <ColumnTitle>Terms of use</ColumnTitle>
          <StyledLink to="/cookies">
            <LinkText>Cookies</LinkText>
          </StyledLink>
          <StyledLink to="/privacyPolicy">
            <LinkText>Privacy Policy</LinkText>
          </StyledLink>
          <StyledLink to="/termsAndConditions">
            <LinkText>Terms and conditions</LinkText>
          </StyledLink>
        </Column>
      </ColumnWrapper>
    </FooterWrapper>
  )
}

export default Footer
