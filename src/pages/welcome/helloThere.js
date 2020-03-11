/* eslint-disable */
import React, { memo, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { SET_ONBOARDED } from 'queries'
import { StroveButton } from 'components'
import { selectors } from 'state'
import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, SkipForNow, Details } from './styled'

const HelloThere = ({ history }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('onboarded')
  }, [])

  return (
    <OnboardingContainer>
      <>
        <div>
          <Title>Hello there!</Title>
          <Details>
            Now you're ready to use Strove - a cloud alternative to local
            software development.
          </Details>
          <Details>
            We will redirect you to your Dashboard. It brings together people
            and projects so your team can move forward and get things done.
          </Details>
        </div>
        <SkipForNow onClick={() => history.push('/app/dashboard')}>
          Go to my Dashboard
        </SkipForNow>
      </>
    </OnboardingContainer>
  )
}

export default memo(HelloThere)
