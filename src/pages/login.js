import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ExternalLink, FullScreenWrapper, MenuWrapper } from 'components'
import { selectors } from 'state'
import { getWindowSearchParams } from 'utils'
import { loginOptions } from 'consts'
import { actions } from 'state'

const LoginText = styled.span`
  font-weight: 500;
  font-size: 20px;
`

const InvitationTitle = styled.div`
  color: ${({ theme }) => theme.colors.c1};
  font-size: 21px;
  font-weight: 500;
  margin-bottom: 20px;
`

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const InvitationDetails = styled.div`
  color: ${({ theme }) => theme.colors.c11};
  font-size: 18px;
  margin: 10px;
`

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
      <MenuWrapper>
        <InvitationTitle>
          Login or signup with one of the supported source control providers
        </InvitationTitle>
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
      </MenuWrapper>
    </FullScreenWrapper>
  )
}

export default memo(Login)
