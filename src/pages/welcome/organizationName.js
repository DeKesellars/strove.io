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
  let errors = {}

  if (!values.name) {
    errors.name = 'Name cannot be empty'
  }

  const regex = new RegExp(/^[a-zA-Z0-9_]+$/)

  if (!regex.test(values.name)) {
    errors.name = 'Name should only contain letters and numbers'
  }

  return errors
}

const OrganizationName = ({ history }) => {
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
                  newName: values.name,
                  organizationId: myOrganizations[0]?.id,
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
                  name="name"
                  placeholder="Your company or team name"
                ></FormField>
                <StroveButton
                  margin="20px 0 10px"
                  isPrimary
                  text="Next"
                  isGetStarted
                  disabled={errors.name || !values.name}
                  navigateTo="/pricing"
                />
                {errors.name && <TextToLeft>{errors.name}</TextToLeft>}
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

export default memo(OrganizationName)
