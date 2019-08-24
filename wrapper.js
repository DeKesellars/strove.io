import React, { useEffect, useState } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import { useSelector } from 'react-redux'
import moment from 'moment'
import { useSubscription } from '@apollo/react-hooks'

import {
  GITHUB_LOGIN,
  GITLAB_LOGIN,
  BITBUCKET_LOGIN,
  MY_PROJECTS,
  ACTIVE_PROJECT,
} from 'queries'
import { mutation, query } from 'utils'
import { window } from 'utils'
import { selectors } from 'state'
import AddProjectProvider from 'components/addProjectProvider'
import client from './client'
import rootReducer from './src/state'
import { C } from 'state'

const createStore = reduxCreateStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

export const persistor = persistStore(createStore)

const LoginProvider = ({ children, addProject }) => {
  const dispatch = useDispatch()
  const user = useSelector(selectors.api.getUser)
  const projects = useSelector(selectors.api.getUserProjects)
  const incomingProjectLink = useSelector(selectors.incomingProject.getRepoLink)
  const githubToken = useSelector(selectors.api.getToken('githubToken'))
  const gitlabToken = useSelector(selectors.api.getToken('gitlabToken'))
  const bitbucketRefreshToken = useSelector(
    selectors.api.getToken('bitbucketRefreshToken')
  )
  const [projectToStop, setProjectToStop] = useState(null)

  const activeProject = useSubscription(ACTIVE_PROJECT, {
    client,
    fetchPolicy: 'no-cache',
    context: {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        'User-Agent': 'node',
      },
    },
  })

  const syncActiveProject = () => {
    const activeProjectData =
      activeProject?.data && activeProject.data.activeProject
    const machineId = activeProjectData ? activeProjectData.machineId : null
    const editorPort = activeProjectData ? activeProjectData.editorPort : null
    const id = activeProjectData ? activeProjectData.id : projectToStop

    dispatch({
      type: C.api.UPDATE_ITEM,
      payload: {
        storeKey: 'myProjects',
        id,
        data: { editorPort, machineId },
      },
    })

    machineId ? setProjectToStop(id) : setProjectToStop(null)
  }

  const currentProjectSet = result => {
    const currentProject = result.find(item => item.machineId)
    const currentProjectID = currentProject ? currentProject.id : null
    dispatch({
      type: C.api.UPDATE_ITEM,
      payload: {
        storeKey: 'user',
        data: { currentProjectId: currentProjectID },
      },
    })
  }

  const checkAwake = () => {
    let then = moment().format('X')
    setInterval(() => {
      let now = moment().format('X')
      if (now - then > 300) {
        user &&
          dispatch(
            query({
              name: 'myProjects',
              dataSelector: data => data.myProjects.edges,
              query: MY_PROJECTS,
              onSuccess: currentProjectSet,
            })
          )
      }
      then = now
    }, 2000)
  }

  useEffect(() => {
    user && syncActiveProject()
  }, [activeProject.data])

  useEffect(() => {
    const code = window?.location?.href
      .match(/code=([a-z0-9A-Z]+)/g)
      ?.toString()
      .split('=')[1]

    const state = window?.location?.href
      ?.match(/state=([a-z]+)/g)
      ?.toString()
      .split('=')[1]

    // Regular login
    if (code && !localStorage.getItem('token')) {
      switch (state) {
        case 'github':
          !githubToken &&
            dispatch(
              mutation({
                mutation: GITHUB_LOGIN,
                variables: { code },
                storeKey: 'user',
                name: 'githubAuth',
                context: null,
                onSuccess: ({ siliskyToken }) => {
                  localStorage.setItem('token', siliskyToken)
                },
                onSuccessDispatch: [
                  user => ({
                    type: C.api.FETCH_SUCCESS,
                    payload: {
                      storeKey: 'user',
                      data: user,
                    },
                  }),
                  ({ subscription }) => ({
                    type: C.api.FETCH_SUCCESS,
                    payload: {
                      storeKey: 'subscription',
                      data: subscription,
                    },
                  }),
                ],
              })
            )
          break
        case 'gitlab':
          !gitlabToken &&
            dispatch(
              mutation({
                mutation: GITLAB_LOGIN,
                variables: { code },
                storeKey: 'user',
                name: 'gitlabAuth',
                context: null,
                onSuccess: ({ siliskyToken }) =>
                  localStorage.setItem('token', siliskyToken),
                onSuccessDispatch: [
                  user => ({
                    type: C.api.FETCH_SUCCESS,
                    payload: {
                      storeKey: 'user',
                      data: user,
                    },
                  }),
                  ({ subscription }) => ({
                    type: C.api.FETCH_SUCCESS,
                    payload: {
                      storeKey: 'subscription',
                      data: subscription,
                    },
                  }),
                ],
              })
            )
          break
        case 'bitbucket':
          !bitbucketRefreshToken &&
            dispatch(
              mutation({
                mutation: BITBUCKET_LOGIN,
                variables: { code },
                storeKey: 'user',
                name: 'bitbucketAuth',
                context: null,
                onSuccess: ({ siliskyToken }) =>
                  localStorage.setItem('token', siliskyToken),
                onSuccessDispatch: [
                  user => ({
                    type: C.api.FETCH_SUCCESS,
                    payload: {
                      storeKey: 'user',
                      data: user,
                    },
                  }),
                  ({ subscription }) => ({
                    type: C.api.FETCH_SUCCESS,
                    payload: {
                      storeKey: 'subscription',
                      data: subscription,
                    },
                  }),
                ],
              })
            )
          break
        default:
          break
      }
    }
    checkAwake()
  }, [])

  useEffect(() => {
    user &&
      dispatch(
        query({
          name: 'myProjects',
          dataSelector: data => data.myProjects.edges,
          query: MY_PROJECTS,
        })
      )
  }, [user])

  useEffect(() => {
    if (user && incomingProjectLink) {
      addProject(incomingProjectLink)
    }
  }, [projects.length])

  return children
}

const WithAddProject = ({ children, addProject }) => {
  useEffect(() => {
    let repoLink =
      window?.location?.href?.match(/#(.*)/) &&
      window.location.href.match(/#(.*)/)[1]

    repoLink &&
      /.*(github|gitlab|bitbucket).com/i.test(repoLink) &&
      addProject(repoLink)
  }, [])

  return children
}

export const wrapRootElement = ({ element }) => (
  <>
    <ApolloProvider client={client}>
      <Provider store={createStore}>
        <PersistGate loading={null} persistor={persistor}>
          <AddProjectProvider>
            {({ addProject }) => (
              <LoginProvider addProject={addProject}>
                <WithAddProject addProject={addProject}>
                  {element}
                </WithAddProject>
              </LoginProvider>
            )}
          </AddProjectProvider>
        </PersistGate>
      </Provider>
    </ApolloProvider>
  </>
)
