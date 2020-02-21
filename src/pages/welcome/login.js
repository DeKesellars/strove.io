import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { isMobile } from 'react-device-detect'

import { ExternalLink, FullScreenWrapper, MenuWrapper } from 'components'
import { selectors } from 'state'
import { getWindowSearchParams } from 'utils'
import { loginOptions } from 'consts'
import { actions } from 'state'

import {
  LoginText,
  InvitationTitle,
  LoginWrapper,
  InvitationDetails,
  Illustration,
  WelcomeWrapper,
  SectionWrapper,
} from './styled'

const Login = () => {
  const searchParams = getWindowSearchParams()
  const token = useSelector(selectors.getToken)
  const dispatch = useDispatch()

  //   const teamName = searchParams.get('teamName')
  //   const teamId = searchParams.get('teamId')
  //   const invitedEmail = searchParams.get('invitedEmail')
  //   const fromEmail = searchParams.get('fromEmail')

  if (token) {
    return <Redirect to="/app/dashboard" />
  }

  return (
    <FullScreenWrapper>
      <WelcomeWrapper>
        <SectionWrapper>
          <InvitationTitle>First, login with Gitub or Gitlab</InvitationTitle>
          <InvitationDetails>
            Just a quick login before you say goodbye to long environment setups
            for good.
          </InvitationDetails>
          <LoginWrapper>
            {loginOptions.map(loginOption => (
              <ExternalLink
                key={loginOption.label}
                primary
                href={`${loginOption.href}`}
                onClick={() => {}}
              >
                {loginOption.icon}
                <LoginText invert>Login with {loginOption.label}</LoginText>
              </ExternalLink>
            ))}
          </LoginWrapper>
        </SectionWrapper>
        {!isMobile && (
          <Illustration
            src={require('assets/illustration.png')}
            alt="illustration"
          />
        )}
      </WelcomeWrapper>
    </FullScreenWrapper>
  )
}

export default memo(Login)
