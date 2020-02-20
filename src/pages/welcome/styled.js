import styled from 'styled-components/macro'
import { isMobile } from 'react-device-detect'

export const LoginText = styled.span`
  font-weight: 500;
  font-size: 20px;
`

export const InvitationTitle = styled.div`
  color: ${({ theme }) => theme.colors.c1};
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 20px;
`

export const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const InvitationDetails = styled.div`
  color: ${({ theme }) => theme.colors.c11};
  font-size: 18px;
  margin: 10px;
`

export const Illustration = styled.img`
  margin: 0 10px;
  max-width: 520px;
`

export const WelcomeWrapper = styled.div`
  padding: 20px;
  max-width: 1400px;
  background-color: ${({ theme }) => theme.colors.c2};
  z-index: 3;
  position: relative;
  display: flex;
  flex-direction: ${isMobile ? 'column' : 'row'};
`
