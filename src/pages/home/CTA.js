import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { StroveButton } from 'components'
import { StyledH1 } from './styled'

const StyledCTAWrapper = styled.div`
  width: 100vw;
  display: flex;
  justify-content: center;
  align-self: center;
  margin-top: 20px;
  background: ${({ theme }) => theme.colors.c2};
`

const StyledButtonWrapper = styled.div`
  width: 100%;
  max-width: 520px;
  padding: 20px;
  margin: 100px 0;
`

const CTA = () => (
  <StyledCTAWrapper>
    <StyledButtonWrapper>
      <StyledH1>Choose a better way to get your ideas out there</StyledH1>
      <StroveButton
        isGetStarted
        isPrimary
        margin="20px 0"
        text="Get started"
        fontWeight="bold"
      />
    </StyledButtonWrapper>
  </StyledCTAWrapper>
)

export default memo(CTA)
