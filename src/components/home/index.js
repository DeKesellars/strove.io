import React, { memo } from 'react'
import styled from 'styled-components'

import Banner from './banner'
import Features from './features'
import Technologies from './technologies'
import Footer from './footer'
import Enterprise from './enterprise'

const StyledWrapper = styled.div`
  width: 100vw;
  color: ${({ theme }) => theme.colors.c13};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Home = () => (
  <StyledWrapper>
    <Banner />
    <Features />
    <Technologies />
    <Enterprise />
    <Footer />
  </StyledWrapper>
)

export default memo(Home)
