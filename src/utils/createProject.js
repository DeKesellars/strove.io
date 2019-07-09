import ApolloClient from 'apollo-boost'
import { navigate } from 'gatsby'

import { mutation } from 'utils'
import * as ApiC from 'state/api/constants'
import { ADD_PROJECT, GET_REPO_INFO } from 'queries'
import * as C from 'state/currentProject/constants'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
})

const createProject = async ({ repoLink, dispatch, user }) => {
  const query = GET_REPO_INFO

  const setCurrentProject = ({ editorPort, previewPort, machineId }) => {
    dispatch({
      type: C.SELECT_CURRENT_PROJECT,
      payload: { editorPort, previewPort, machineId },
    })
  }

  const startProject = project => {
    setCurrentProject({
      editorPort: project.editorPort,
      previewPort: project.previewPort,
      machineId: project.machineId,
    })
    navigate('/app/editor/', {
      state: {
        machineId: project.machineId,
        editorPort: project.editorPort,
      },
    })
  }

  const context = {
    headers: {
      Authorization: `Bearer ${user.githubToken}`,
      'User-Agent': 'node',
    },
  }
  const repoUrlParts = repoLink.split('/')
  const owner = repoUrlParts[3]
  const name = repoUrlParts[4]
  const variables = { owner, name }
  try {
    const { data } = await client.query({
      query,
      context,
      variables,
      fetchPolicy: 'no-cache',
    })

    const {
      description,
      name /* add language and color in future */,
    } = data.repository

    dispatch(
      mutation({
        name: 'addProject',
        storeKey: 'myProjects',
        /* ToDo: Support Gitlab and Bitbucket as well */
        variables: { repoLink, name, description },
        mutation: ADD_PROJECT,
        onSuccess: startProject,
      })
    )
  } catch (e) {
    console.log('fetch error: ', e)
    dispatch({
      type: ApiC.FETCH_ERROR,
      payload: { storeKey: 'myProjects', error: e },
    })
  }
}

export default createProject
