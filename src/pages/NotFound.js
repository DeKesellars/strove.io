/* eslint-disable react/jsx-no-comment-textnodes */
import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Link } from 'react-router-dom'

import { SEO, Header } from 'components'

const CodeArea = styled.div`
  position: absolute;
  max-width: 640px;
  min-width: 320px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: left;

  > span {
    display: block;
  }

  @media screen and (max-width: 320px) {
    .code-area {
      font-size: 5vw;
      min-width: auto;
      width: 95%;
      margin: auto;
      padding: 5px;
      padding-left: 10px;
      line-height: 6.5vw;
    }
  }
`

const ErrorMessage = styled.span`
  color: #777;
  font-style: italic;
`

const ErrorBody = styled.div`
  background-color: #081421;
  width: 100vw;
  height: 97vh;
  color: #d3d7de;
  font-family: 'Courier new';
  font-size: 18px;
  line-height: 1.5em;
  cursor: default;
  a {
    color: ${({ theme }) => theme.colors.c2};
  }
`

const StyledIf = styled.div`
  > :first-child {
    color: #d65562;
  }

  > :nth-child(2) {
    color: #bdbdbd;
  }

  > :nth-child(3) {
    color: #4ca8ef;
  }

  > :nth-child(4) {
    color: #bdbdbd;
    margin-right: 10px;
  }

  > :nth-child(5) {
    color: #a6a61f;
  }
`

const StyledThrow = styled.div`
  > :first-child {
    padding-left: 30px;
    color: #d65562;
  }

  > :nth-child(2) {
    color: #2796ec;
  }

  > :nth-child(3) {
    color: #a6a61f;
  }

  > :nth-child(4) {
    color: #2796ec;
  }

  > :nth-child(5) {
    display: block;
    color: #a6a61f;
  }
`

const StyledClosingTag = styled.span`
  color: #a6a61f;
`

const StyledLink = styled(Link)`
  text-decoration: none;
  margin-top: 20px;
  display: block;

  > :first-child {
    color: #777;
    font-style: italic;
  }
`

const NotFound = () => (
  <ErrorBody>
    <CodeArea>
      <ErrorMessage>/* Page not found */</ErrorMessage>
      <StyledIf>
        <span>if</span>
        <span> (</span>
        <span>!found</span>
        <span>)</span>
        <span>{'{'}</span>
      </StyledIf>
      <StyledThrow>
        <span>throw</span>
        <span>(</span>
        <span>"(╯°□°)╯︵ ┻━┻"</span>
        <span>)</span>
      </StyledThrow>
      <StyledClosingTag>{'}'}</StyledClosingTag>

      <StyledLink to="/">
        <span>// --> Click to go back to main page!</span>
      </StyledLink>
    </CodeArea>
  </ErrorBody>
)

const NotFoundPage = () => (
  <>
    <SEO title="404: Not found" />
    <Header />
    <NotFound />
  </>
)

export default memo(NotFoundPage)
