import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { Formik } from 'formik'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import Modal from './modal'
import StroveButton from 'components/stroveButton.js'
import { selectors } from 'state'
import FullScreenLoader from 'components/fullScreenLoader'

const Title = styled.h3`
  font-size: ${props => (props.mobile ? '1rem' : '1.4rem')};
  color: ${({ theme }) => theme.colors.c1};
  margin: 3px 3px 3px 0;
  text-align: center;
`

const GithubLinkInput = styled.input`
  width: 80%;
  border-width: 1px;
  border-style: solid;
  color: ${({ theme }) => theme.colors.c1};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  box-shadow: 0 10px 10px -15px ${({ theme }) => theme.colors.c1};
  text-align: center;
  font-size: 1rem;
  padding: 5px 0;

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
  margin: 20px 0 0;
`

const StyledErrors = styled.span`
  color: ${({ theme }) => theme.colors.c5};
`

const validateProjectName = values => {
  let errors = {}

  if (values.projectName && !values.projectName.trim()) {
    errors.projectName = 'Add name'
    return errors
  } else if (values.projectName.length > 100) {
    errors.projectName = 'Name too long'
    return errors
  }

  return errors
}

const AddEmptyProjectModal = ({ handleClose, isOpen, addProject, teamId }) => {
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))
  const isAdding = useSelector(selectors.incomingProject.isProjectBeingAdded)
  const queuePosition = useSelector(selectors.api.getQueuePosition)

  return (
    <>
      <Modal
        width={isMobileOnly ? '60vw' : '30vw'}
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={isOpen}
        onRequestClose={() => handleClose(false)}
        contentLabel="Name project"
        ariaHideApp={false}
      >
        <Title mobile={isMobileOnly}>Add project's name</Title>
        <Formik
          onSubmit={(values, actions) => {
            addProject({ name: values.projectName.trim(), teamId })
            actions.setSubmitting(false)
          }}
          validate={validateProjectName}
          render={props => (
            <GithubLinkForm onSubmit={props.handleSubmit}>
              <GithubLinkInput
                autoComplete="off"
                type="text"
                onChange={props.handleChange}
                onBlur={props.handleBlur}
                value={props.values.projectName}
                name="projectName"
                placeholder="Name"
              />
              <StroveButton
                isDisabled={
                  !props.values.projectName || props.errors.projectName
                }
                isPrimary
                text="Create project"
                width="auto"
              ></StroveButton>
              <StroveButton
                text="Cancel"
                width="auto"
                onClick={() => handleClose(false)}
              ></StroveButton>
              <StyledErrors>{props.errors.projectName}</StyledErrors>
            </GithubLinkForm>
          )}
        />
        {isContinuing && (
          <FullScreenLoader
            type="continueProject"
            isFullScreen
            color="#0072ce"
            queuePosition={queuePosition}
            type="continueProject"
          />
        )}
        {isAdding && (
          <FullScreenLoader
            type="addProject"
            isFullScreen
            color="#0072ce"
            queuePosition={queuePosition}
            type="emptyProject"
          />
        )}
      </Modal>
    </>
  )
}

export default memo(AddEmptyProjectModal)
