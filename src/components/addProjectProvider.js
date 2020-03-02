import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components/macro'
import { withRouter } from 'react-router-dom'

import {
  createProject,
  getRepoProvider,
  changeRepoLinkFromSshToHttps,
  mutation,
  redirectToEditor,
} from 'utils'
import { CONTINUE_PROJECT } from 'queries'
import { actions, selectors } from 'state'
import Modal from './modal'
import FullScreenLoader from './fullScreenLoader'
import AddProjectModals from './addProjectModals'

const StyledModal = styled(Modal)`
  background: none;
  border: none;
  box-shadow: none;
`

const AddProjectProvider = ({ children, history, teamId, organization }) => {
  const dispatch = useDispatch()
  const [modalContent, setModalContent] = useState()
  const isLoading = useSelector(selectors.api.getLoading('myProjects'))
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))
  const user = useSelector(selectors.api.getUser)
  const projects = useSelector(selectors.api.getUserProjects)
  const githubToken = user?.githubToken
  const gitlabToken = user?.gitlabToken
  const bitbucketRefreshToken = user?.bitbucketRefreshToken
  const isAdding = useSelector(selectors.incomingProject.isProjectBeingAdded)
  const incomingProjectRepoUrl = useSelector(
    selectors.incomingProject.getRepoLink
  )
  const addProjectError = useSelector(selectors.incomingProject.getError)
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const currentProjectId = currentProject?.id
  const queuePosition = useSelector(selectors.api.getQueuePosition)
  const projectsLimit = 20
  const timeExceeded = user?.timeSpent >= 72000000
  const myOrganizations = useSelector(selectors.api.getMyOrganizations)

  /* TODO: Find a reasonable way to approach this */
  const organizationWithProject = organization || myOrganizations?.[0]
  const teamWithProject = teamId || myOrganizations?.[0]?.teams?.[0]

  const addProject = async ({
    link,
    name,
    teamId = teamWithProject,
    forkedFromId,
  }) => {
    let repoLink
    let repoProvider

    let repoFromGithub
    let repoFromGitlab
    let repoFromBitbucket

    if (link) {
      repoLink = link.trim().toLowerCase()

      repoLink = changeRepoLinkFromSshToHttps(repoLink)

      repoProvider = getRepoProvider(repoLink)

      repoFromGithub = repoProvider === 'github'
      repoFromGitlab = repoProvider === 'gitlab'
      repoFromBitbucket = repoProvider === 'bitbucket'
    } else {
      repoLink = ''
    }

    const existingProject = projects.find(
      project => project.repoLink === `${repoLink}.git`
    )

    const theSameIncomingProject = repoLink === incomingProjectRepoUrl

    if (existingProject && !currentProject) {
      if (existingProject.machineId) {
        return redirectToEditor(dispatch, history)
      } else {
        return dispatch(
          mutation({
            name: 'continueProject',
            mutation: CONTINUE_PROJECT,
            variables: {
              projectId: existingProject?.id,
              teamId: existingProject?.teamId,
            },
            onSuccessDispatch: null,
          })
        )
      }
    }

    dispatch(
      actions.incomingProject.addIncomingProject({
        repoLink,
        repoProvider,
        name,
        teamId,
        forkedFromId,
      })
    )

    if (!user && repoFromGithub) {
      setModalContent('LoginWithGithub')
    } else if (!user && repoFromGitlab) {
      setModalContent('LoginWithGitlab')
    } else if (!user && repoFromBitbucket) {
      setModalContent('LoginWithBitbucket')
    } else if (user && repoFromGithub && !githubToken) {
      setModalContent('AddGithubToLogin')
    } else if (
      user &&
      timeExceeded &&
      !incomingProjectRepoUrl &&
      !(
        organizationWithProject.subscriptionStatus === 'active' ||
        organizationWithProject.subscriptionStatus === 'canceled'
      )
    ) {
      setModalContent('TimeExceeded')
      dispatch(actions.incomingProject.removeIncomingProject())
    } else if (user && repoFromGitlab && !gitlabToken) {
      setModalContent('AddGitlabToLogin')
    } else if (user && repoFromBitbucket && !bitbucketRefreshToken) {
      setModalContent('AddBitbucketToLogin')
      // ToDo: Handle gitlab and bitbucket unresolved repo errors
    } else if (
      addProjectError &&
      addProjectError.message &&
      addProjectError.message.includes('Could not resolve to a Repository')
    ) {
      setModalContent('AddEmptyProject')
    } else if (addProjectError) {
      setModalContent('SomethingWentWrong')
    } else if (projects && projects.length >= projectsLimit) {
      setModalContent('ProjectsLimitExceeded')
      dispatch(actions.incomingProject.removeIncomingProject())
    } else if (
      currentProjectId &&
      currentProject?.machineId !== existingProject?.machineId
    ) {
      setModalContent('AnotherActiveProject')
      dispatch(actions.incomingProject.setProjectIsBeingStarted())
    } else if (!theSameIncomingProject) {
      createProject({
        repoLink,
        dispatch,
        user,
        setModalContent,
        name,
        teamId,
        forkedFromId,
      })
    }
  }

  return (
    <>
      {children({ addProject, teamId })}
      <AddProjectModals
        projectsLimit={projectsLimit}
        modalContent={modalContent}
        setModalContent={setModalContent}
        addProject={addProject}
        currentProjectId={currentProjectId}
      />
      <StyledModal
        isOpen={
          ((isLoading && !isAdding) || isDeleting || isStopping) &&
          !window.location.href.includes('editor')
        }
        contentLabel="Loading"
        ariaHideApp={false}
      >
        <FullScreenLoader isFullScreen={false} color="#0072ce" height="15vh" />
      </StyledModal>
      {isContinuing && (
        <FullScreenLoader
          type="continueProject"
          isFullScreen
          color="#0072ce"
          queuePosition={queuePosition}
        />
      )}
      {isAdding && (
        <FullScreenLoader
          type="addProject"
          isFullScreen
          color="#0072ce"
          queuePosition={queuePosition}
        />
      )}
    </>
  )
}

export default memo(withRouter(AddProjectProvider))
