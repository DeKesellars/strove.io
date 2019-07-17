import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import thunk from 'redux-thunk'
import { GITHUB_LOGIN, GITLAB_LOGIN } from 'queries'
import { mutation } from 'utils'
import { createProject } from 'utils'
import { selectors } from 'state'
import addProjectModals from 'components/addProjectModals'
import Modal from 'components/modal'

const getProjectError = selectors.getError('projects')

export default ({ children }) => {
  const [modalContent, setModalContent] = useState()

  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)
  const githubToken = user && user.githubToken
  const gitlabToken = user && user.gitlabToken
  const addProjectError = useSelector(getProjectError)
  console.log('addProjectError', addProjectError)

  const addProject = repoLink => {
    const repoUrlParts = repoLink.split('/')
    const repoProvider = repoUrlParts[2].split('.')[0]

    const repoFromGithub = repoProvider === 'github'
    const repoFromGitlab = repoProvider === 'gitlab'

    /* ToDo: Handle private github repos */
    if (!user && repoFromGithub) {
      setModalContent('LoginWithGithub')
    } else if (!user && repoFromGitlab) {
      setModalContent('LoginWithGitlab')
    } else if (user && repoFromGithub && !githubToken) {
      setModalContent('AddGithubToLogin')
    } else if (user && repoFromGitlab && !gitlabToken) {
      setModalContent('AddGitlabToLogin')
    } else if (addProjectError) {
      setModalContent('AddGithubPrivatePermissions')
    } else {
      createProject({ repoLink, dispatch, user })
    }
  }

  return (
    <>
      {children({ addProject })}
      <Modal
        isOpen={!!modalContent}
        onRequestClose={setModalContent}
        contentLabel={modalContent}
        ariaHideApp={false}
        width="40vw"
        height="35vh"
      >
        {addProjectModals(modalContent)}
      </Modal>
    </>
  )
}

// Gitclone cases
// const AddProjectMessages = {
//   'githubClone/noUser': <LoginWithGithub />,
//   'gitlabClone/noUser': <LoginWithGitlab />,
//   'githubClone/noGithubToken': <AddGithubToLogin />,
//   'gitlabClone/noGitlabToken': <AddGitlabToLogin />,
//   'githubClone/privateRepo': <AddGithubPrivatePermissions />
// }
