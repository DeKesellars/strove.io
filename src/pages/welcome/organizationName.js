import React, { memo, useState } from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { ExternalLink } from 'components'
import { selectors } from 'state'
import { loginOptions } from 'consts'
import { actions } from 'state'
import { RENAME_ORGANIZATION } from 'queries'
import { Formik } from 'formik'
import isEmail from 'validator/lib/isEmail'

import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import {
  LoginText,
  InvitationTitle,
  LoginWrapper,
  InvitationDetails,
  FormWrapper,
  FormField,
  StyledForm,
} from './styled'

const OrganizationName = () => {
  const dispatch = useDispatch()
  return (
    <OnboardingContainer>
      <>
        <InvitationTitle>
          What's the name of your company or team?
        </InvitationTitle>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={values => {
            dispatch(
              mutation({
                name: 'sendEmail',
                context: null,
                mutation: RENAME_ORGANIZATION,
                variables: { newName: values.name },
              })
            )
          }}
        >
          {({ errors, values }) => (
            <StyledForm>
              <FormField
                type="name"
                name="name"
                placeholder="Microsoft Corp"
              ></FormField>
            </StyledForm>
          )}
        </Formik>
      </>
    </OnboardingContainer>
  )
}

export default memo(OrganizationName)
