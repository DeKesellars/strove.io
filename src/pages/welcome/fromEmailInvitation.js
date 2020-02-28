import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ExternalLink } from 'components'
import { selectors } from 'state'
import { getWindowSearchParams } from 'utils'
import { loginOptions } from 'consts'
import { actions } from 'state'

import OnboardingContainer from './onboardingContainer'
import {
  LoginText,
  InvitationTitle,
  LoginWrapper,
  InvitationDetails,
} from './styled'

const FromEmailInvitation = () => {
  const searchParams = getWindowSearchParams()
  const token = useSelector(selectors.getToken)
  const dispatch = useDispatch()

  const teamName = searchParams.get('teamName')
  const teamId = searchParams.get('teamId')
  const invitedEmail = searchParams.get('invitedEmail')
  const fromEmail = searchParams.get('fromEmail')

  if (token) {
    dispatch(actions.invitations.addInvitation({ teamId, teamName }))
    return <Redirect to="/app/dashboard" />
  }

  return (
    <OnboardingContainer>
      <>
        <InvitationTitle>
          You're invited to <b>{teamName}</b>
        </InvitationTitle>
        <InvitationDetails>
          {fromEmail} has invited you to join the Strove team <b>{teamName}</b>.
          Login to start collaborating!
        </InvitationDetails>
        <LoginWrapper>
          {loginOptions.map(loginOption => (
            <ExternalLink
              key={loginOption.label}
              primary
              href={`${loginOption.href}`}
              onClick={() =>
                dispatch(
                  actions.invitations.addInvitation({ teamId, teamName })
                )
              }
            >
              {loginOption.icon}
              <LoginText invert>Login with {loginOption.label}</LoginText>
            </ExternalLink>
          ))}
        </LoginWrapper>
        <InvitationDetails>
          Your sign email is <b>{invitedEmail}</b>
        </InvitationDetails>
      </>
    </OnboardingContainer>
  )
}

export default memo(FromEmailInvitation)
