import React, { memo } from 'react'
import styled from 'styled-components/macro'

import { useAnalytics } from 'hooks'
import { devFeatures } from 'consts'

import Banner from './banner'
import Features from './features'
import Technologies from './CTA'
import ForDevelopers from './forDevelopers'
import Footer from '../footer'

const StyledWrapper = styled.div`
  width: 100vw;
  color: ${({ theme }) => theme.colors.c13};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const Home = () => {
  const ref = useAnalytics()

  return (
    <StyledWrapper ref={ref}>
      <Banner />
      <ForDevelopers />
      <Features features={devFeatures} />
      <Technologies />
      <Footer />
    </StyledWrapper>
  )
}

export default memo(Home)
