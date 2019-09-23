import React, { memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { Formik } from 'formik'
import { isMobile } from 'react-device-detect'

import AddProjectProvider from './addProjectProvider'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.4;
  }
`

const ButtonFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.9;
  }
`

const AddProjectWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 5px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  margin-bottom: 0;
  height: auto;
  width: auto;
  min-width: 50vw;
  max-width: 100vw;
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: ${props => (props.mobile ? '100%' : '20%')};
  min-width: 70px;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 0.5s ease-out;
  opacity: 0.9;

  :focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.4;
  }

  ${props =>
    !props.disabled &&
    css`
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
        box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
        transform: translateY(-1px);
      }
    `}
`

const Title = styled.h3`
  font-size: ${props => (props.mobile ? '1rem' : '1.4rem')};
  color: #0072ce;
  margin: 0.3vh 0.3vh 0.3vh 0;
  text-align: center;
`

const GithubLinkInput = styled.input`
  width: 80%;
  border-width: 1px;
  border-style: solid;
  color: #0072ce;
  border-radius: 5px;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-align: center;
  font-size: 1rem;
  padding: 0.5vh 0;

  :focus {
    outline: none;
  }
`

const GithubLinkForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 2vh 0 0;
`

const StyledErrors = styled.span`
  color: red;
`

const GetStarted = ({ addProject }) => {
  const validate = values => {
    let errors = {}

    if (!values.repoLink || (values.repoLink && !values.repoLink)) {
      return
    } else if (
      !/.*(github|gitlab|bitbucket).(com|org)\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+/i.test(
        values.repoLink
      )
    ) {
      errors.repoLink = 'Invalid repository link'
    }

    if (!values.repoLink.trim()) {
      errors.repoLink = 'No link provided'
      return errors
    }

    return errors
  }

  return (
    <AddProjectWrapper mobile={isMobile}>
      <Title mobile={isMobile}>
        Add project from Github, Gitlab or Bitbucket
      </Title>
      <Formik
        onSubmit={(values, actions) => {
          values.repoLink.trim() &&
            addProject(values.repoLink.trim().replace(/.git$/, ''))
          actions.setSubmitting(false)
        }}
        validate={validate}
        render={props => (
          <GithubLinkForm onSubmit={props.handleSubmit}>
            <GithubLinkInput
              type="text"
              onChange={props.handleChange}
              onBlur={props.handleBlur}
              value={props.values.repoLink}
              name="repoLink"
              placeholder={
                isMobile
                  ? 'Paste repo link here'
                  : 'https://github.com/evil-corp/worldDomination'
              }
            />
            <StyledErrors>{props.errors.repoLink}</StyledErrors>
            <Button
              disabled={!props.values.repoLink || props.errors.repoLink}
              primary
              mobile={isMobile}
              type="submit"
            >
              Add project
            </Button>
          </GithubLinkForm>
        )}
      />
    </AddProjectWrapper>
  )
}

export default memo(() => (
  <AddProjectProvider>
    {({ addProject }) => <GetStarted addProject={addProject} />}
  </AddProjectProvider>
))
