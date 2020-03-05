import React, { memo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled, { keyframes } from 'styled-components/macro'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { Formik, Field, FieldArray } from 'formik'
import Select from 'react-select'
import isEmail from 'validator/lib/isEmail'

import { StroveButton } from 'components'
import { selectors } from 'state'
import { ADD_MEMBER } from 'queries'
import { mutation } from 'utils'

import OnboardingContainer from './onboardingContainer'
import { Title, FormField, StyledForm, SkipForNow, TextToLeft } from './styled'

const validate = values => {
  const errors = values.emails.map(value => {
    if (!isEmail(value.value)) {
      return 'Invalid email'
    }
    return null
  })

  return { emails: errors }
}

const EmailsWrapper = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 5px 0;
  padding: 5px;
`

const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

const EnvButtonsWrapper = styled(ColumnWrapper)`
  justify-content: flex-start;
  align-items: center;
`

const TableWrapper = styled(ColumnWrapper)`
  justify-content: flex-start;
  align-items: flex-start;
  width: 100%;
`

const SettingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 2vh 0 0;
`

const Table = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
`

const TableRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 0 0 10px;
`

const AddButton = styled.button`
  height: 30px;
  text-align: center;
  align-self: flex-end;
  cursor: pointer;
  font-size: 13px;
  font-weight: bold;
  text-decoration: none;
  background: none;
  border: none;
`

const OrganizationName = ({ history }) => {
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)
  const dispatch = useDispatch()

  const handleSubmit = emails => {
    console.log(emails)
  }

  return (
    <OnboardingContainer>
      <>
        <Title>Who else is working on your team?</Title>
        <SettingWrapper>
          <Formik
            initialValues={{ emails: ['', '', ''] }}
            validate={validate}
            render={({ values, errors }) => (
              <StyledForm>
                <EmailsWrapper>
                  {console.log('errors', errors)}
                  <FieldArray
                    name="emails"
                    validateOnChange
                    render={arrayHelpers => (
                      <>
                        <TableWrapper>
                          <Table>
                            {values.emails.map((env, index) => (
                              <TableRow key={index}>
                                <FormField
                                  type="email"
                                  placeholder="name@example.com"
                                  name={`emails.${index}.value`}
                                  noValidate
                                />
                              </TableRow>
                            ))}
                          </Table>
                          <AddButton
                            type="button"
                            onClick={() => {
                              arrayHelpers.push('')
                            }}
                          >
                            + Add another
                          </AddButton>
                        </TableWrapper>
                      </>
                    )}
                  />
                </EmailsWrapper>
                <EnvButtonsWrapper>
                  <StroveButton
                    margin="20px 0 10px"
                    isPrimary
                    text="Add Teammates"
                    isGetStarted
                    disabled={
                      errors?.emails || !values.organization?.profile_name
                    }
                    navigateTo="/welcome/teamName"
                  />
                </EnvButtonsWrapper>
              </StyledForm>
            )}
          />
          <SkipForNow onClick={() => history.push('/welcome/teamName')}>
            Skip for now
          </SkipForNow>
        </SettingWrapper>
      </>
    </OnboardingContainer>
  )
}

export default memo(OrganizationName)
