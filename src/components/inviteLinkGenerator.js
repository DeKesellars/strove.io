import React, { memo, useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled, { keyframes } from 'styled-components/macro'
import PaymentIcon from 'react-payment-icons'
import { isMobileOnly } from 'react-device-detect'

import { selectors } from 'state'
import { StroveButton, SEO, Header, Modal } from 'components'
import { mutation, query, updateOrganizations } from 'utils'

export const FadeInAnimation = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const SectionWrapper = styled(Wrapper)`
  width: 100%;
  align-items: flex-start;
  animation: ${FadeInAnimation} 0.2s ease-out;
  margin-bottom: 30px;
`

const LinkGeneratorWrapper = styled(Wrapper)`
  width: 100%;
  padding: 20px;
  height: auto;
  justify-content: center;
  align-items: center;
`

const StyledInput = styled.input`
  width: 60%;
`

const Text = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin: 0px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  display: flex;
  align-items: center;
  font-weight: 400;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
`

const InviteLinkGenerator = () => {
  const editedTeam = useSelector(selectors.editedOrganization.getEditedTeam)
  const isImmortalGodKing = true

  const handleClick = () => {
    console.log('The team', editedTeam)
  }

  return (
    <>
      {isImmortalGodKing && (
        <SectionWrapper>
          <LinkGeneratorWrapper>
            <Text>I am the destiny</Text>
            <StyledInput
              value={editedTeam ? `${editedTeam.name}` : 'Generate invite link'}
              readOnly
            ></StyledInput>
            <StroveButton
              isPrimary
              onClick={handleClick}
              text="Generate link"
            ></StroveButton>
          </LinkGeneratorWrapper>
        </SectionWrapper>
      )}
    </>
  )
}

export default memo(InviteLinkGenerator)
