import ApolloClient from 'apollo-boost'

import { mutation, getRepoProvider } from 'utils'
import { C } from 'state'
import { ADD_PROJECT, GET_REPO_INFO, GET_BITBUCKET_TOKEN } from 'queries'
import stroveClient from '../../client'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
})

/* Todo: This is called two times on certain ocassions, fix */
const createProject = async ({
  repoLink,
  dispatch,
  user,
  setModalContent,
  name,
}) => {
  let repoData = null
  const customName = name
  try {
    if (repoLink) {
      const query = GET_REPO_INFO
      const repoProvider = getRepoProvider(repoLink)
      const repoUrlParts = repoLink.split('/')
      const owner = repoUrlParts[3]
      const name = repoUrlParts[4]
      const variables = { owner, name }
      switch (repoProvider) {
        case 'github':
          if (user.githubToken) {
            const context = {
              headers: {
                Authorization: `Bearer ${user.githubToken}`,
                'User-Agent': 'node',
              },
            }
            try {
              const { data } = await client.query({
                query,
                context,
                variables,
                fetchPolicy: 'no-cache',
              })
              repoData = data.repository
            } catch (error) {
              console.log('error', error)
              dispatch({
                type: C.incomingProject.CATCH_INCOMING_ERROR,
                payload: { error },
              })
              setModalContent('UnableToClone')
            }
          }
          break
        case 'gitlab':
          if (user.gitlabToken) {
            try {
              const res = await fetch(
                `https://gitlab.com/api/v4/projects/${owner}%2F${name}`,
                {
                  headers: {
                    Authorization: `Bearer ${user.gitlabToken}`,
                  },
                }
              )
              repoData = await res.json()
            } catch (error) {
              dispatch({
                type: C.incomingProject.CATCH_INCOMING_ERROR,
                payload: { error },
              })
              setModalContent('TryAgainLaterButGitlabIsToBlame')
            }
          }
          break
        case 'bitbucket':
          const access_token = await stroveClient.query({
            query: GET_BITBUCKET_TOKEN,
            context: {
              headers: {
                Authorization: `Bearer ${user.siliskyToken}`,
                'User-Agent': 'node',
              },
            },
            fetchPolicy: 'no-cache',
          })

          const token = access_token?.data?.getbitBucketToken

          /* Todo: This endpoint seems to work inconsistently - some repos are not returned. Investigate. */
          if (token) {
            const { values } = await fetch(
              `https://api.bitbucket.org/2.0/users/${user.bitbucketName}/repositories`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Content-Type': 'application/x-www-form-urlencoded',
                },
                method: 'GET',
              }
            ).then(res => res.json())

            repoData = values.find(
              repo => repo.name.toLowerCase() === name.toLowerCase()
            )

            if (!repoData) setModalContent('UnableToClone')
          }
          break
        default:
          break
      }
    }

    if (repoLink && !repoData && !customName) {
      setModalContent('UnableToClone')
      return null
    }

    if (!repoData && !repoLink) {
      repoData = { name: customName, description: '' }
    }

    const { description, name /* add language and color */ } = repoData

    dispatch(
      mutation({
        name: 'addProject',
        storeKey: 'myProjects',
        variables: { repoLink, name, description },
        mutation: ADD_PROJECT,
        onSuccessDispatch: null,
        onError: () => setModalContent('TryAgainLater'),
        onErrorDispatch: [
          error =>
            dispatch({
              type: C.incomingProject.CATCH_INCOMING_ERROR,
              payload: { error },
            }),
          () =>
            dispatch({
              type: C.api.FETCH_ERROR,
              payload: { storeKey: 'myProjects' },
            }),
        ],
      })
    )
  } catch (error) {
    console.log('fetch error: ', error)
    dispatch({
      type: C.incomingProject.CATCH_INCOMING_ERROR,
      payload: { error },
    })
    setModalContent('TryAgainLater')
  }
}
export default createProject
