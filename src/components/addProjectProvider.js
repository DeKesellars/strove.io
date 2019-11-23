import React, { useState, memo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'

import { createProject, getRepoProvider } from 'utils'
import { actions, selectors } from 'state'
import Modal from './modal'
import FullScreenLoader from './fullScreenLoader'
import AddProjectModals from './addProjectModals'

const StyledModal = styled(Modal)`
  background: none;
  border: none;
  box-shadow: none;
`

const AddProjectProvider = ({ children }) => {
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
  const isAdding = useSelector(selectors.incomingProject.isIncoming)
  const addProjectError = useSelector(selectors.incomingProject.getError)
  const currentProject = projects.find(item => item.machineId)
  const currentProjectId = currentProject && currentProject.id
  const subscription = useSelector(
    selectors.api.getApiData({ fields: 'subscription' })
  )
  const subscriptionStatus = subscription.status
  const projectsLimit =
    (subscriptionStatus === 'active' && subscription.projects_limit) || 4

  const addProject = async ({ link, name }) => {
    let repoLink
    let repoProvider

    let repoFromGithub
    let repoFromGitlab
    let repoFromBitbucket

    if (link) {
      repoLink = link.trim().toLowerCase()

      // git@github.com:stroveio/strove.io.git
      // https://github.com/stroveio/strove.io.git
      if (repoLink.includes('git@github')) {
        const sshLinkParts = repoLink.split(':')
        repoLink = `https://github.com/${sshLinkParts[1]}`
      }

      // git@gitlab.com:stroveio/strove.io.git
      // https://gitlab.com/stroveio/strove.io.git
      if (repoLink.includes('git@gitlab')) {
        const sshLinkParts = repoLink.split(':')
        repoLink = `https://gitlab.com/${sshLinkParts[1]}`
      }

      // git@bitbucket.org:stroveio/strove.io.git
      // https://stroveio@bitbucket.org/stroveio/stroveio.io.git
      if (repoLink.includes('git@bitbucket')) {
        const sshLinkParts = repoLink.split(':')
        const repoDetails = sshLinkParts[1].split('/')
        // console.log('repoDetails', repoDetails)
        const accountName = repoDetails[0]
        const repoName = repoDetails[1]
        repoLink = `https://gitlab.com/${sshLinkParts[1]}`
        repoLink = `https://${accountName}@bitbucket.org/${accountName}/${repoName}`
      }

      repoLink = repoLink.replace('.git', '')

      repoProvider = getRepoProvider(repoLink)

      repoFromGithub = repoProvider === 'github'
      repoFromGitlab = repoProvider === 'gitlab'
      repoFromBitbucket = repoProvider === 'bitbucket'
    } else {
      repoLink = ''
    }

    dispatch(
      actions.incomingProject.addIncomingProject({
        repoLink,
        repoProvider,
        name,
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
    } else if (currentProjectId) {
      setModalContent('AnotherActiveProject')
    } else {
      createProject({ repoLink, dispatch, user, setModalContent, name })
    }
  }

  return (
    <>
      {children({ addProject })}
      <AddProjectModals
        projectsLimit={projectsLimit}
        modalContent={modalContent}
        setModalContent={setModalContent}
        addProject={addProject}
      />
      <StyledModal
        isOpen={(isLoading && !isAdding) || isDeleting || isStopping}
        contentLabel="Loading"
        ariaHideApp={false}
      >
        <FullScreenLoader
          isFullScreen={false}
          color="#0072ce"
          height={'15vh'}
        />
      </StyledModal>
      {isContinuing && (
        <FullScreenLoader type="continueProject" isFullScreen color="#0072ce" />
      )}
      {isAdding && isLoading && (
        <FullScreenLoader type="addProject" isFullScreen color="#0072ce" />
      )}
    </>
  )
}

export default memo(AddProjectProvider)
