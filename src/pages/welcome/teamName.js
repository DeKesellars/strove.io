import React, { memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Formik } from 'formik'

import { StroveButton } from 'components'
import { selectors } from 'state'
import { RENAME_ORGANIZATION } from 'queries'
import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, FormField, StyledForm, SkipForNow, TextToLeft } from './styled'

const validate = values => {
  const regex = new RegExp(/^[a-zA-Z0-9_]+$/)
  let errors = {}

  if (!values.team?.profile_name) {
    errors.team = 'Name is empty'
  }

  if (!regex.test(values.team?.profile_name)) {
    errors.team = 'Name should only contain letters and numbers'
  }

  if (
    values.team?.profile_name &&
    values.team?.profile_name?.length < 4
  ) {
    errors.team = 'Name is too short'
  }

  return errors
}

const TeamName = ({ history }) => {
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()
  return (
    <OnboardingContainer>
      <>
        <Title>What's the name of your company or team?</Title>
        <Formik
          initialValues={{
            name: '',
          }}
          validate={validate}
          onSubmit={values => {
            dispatch(
              mutation({
                name: 'renameOrganization',
                mutation: RENAME_ORGANIZATION,
                variables: {
                  newName: values.team?.profile_name,
                  teamId: myOrganizations[0]?.id,
                },
              })
            )
          }}
        >
          {({ errors, values }) => (
            <>
              <StyledForm>
                <FormField
                  type="text"
                  name="team[profile_name]"
                  placeholder="Your company or team name"
                ></FormField>
                <StroveButton
                  margin="20px 0 10px"
                  isPrimary
                  text="Next"
                  isGetStarted
                  disabled={
                    errors?.team || !values.team?.profile_name
                  }
                  navigateTo="/pricing"
                />
                {errors?.team && (
                  <TextToLeft>{errors?.team}</TextToLeft>
                )}
              </StyledForm>
              <SkipForNow onClick={() => history.push('/pricing')}>
                Skip for now
              </SkipForNow>
            </>
          )}
        </Formik>
      </>
    </OnboardingContainer>
  )
}

export default memo(TeamName)
