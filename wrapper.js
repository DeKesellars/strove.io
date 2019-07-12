import React, { useState, useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch, useSelector } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { GITHUB_LOGIN, GITLAB_LOGIN } from 'queries'
import { mutation, window } from 'utils'
import { createProject } from 'utils'
import { selectors } from 'state'
import Modal from 'react-modal'
import styled, { keyframes } from 'styled-components'

import client from './client'
import rootReducer from './src/state'

const persistConfig = {
  key: 'root',
  storage,
  stateReconciler: hardSet,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const createStore = reduxCreateStore(
  persistedReducer,
  composeWithDevTools(applyMiddleware(thunk))
)

const persistor = persistStore(createStore)

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }

`

const StyledModal = styled(Modal)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #ffffff;
  border-radius: 10px;
  border-color: #0072ce;
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  height: auto;
  width: 30vw;
  top: 42.5vh;
  left: 35vw;
  position: fixed;
  animation: ${FullFadeIn} 0.2s ease-out;

  :focus {
    outline: 0;
  }
`

const LoginProvider = ({ children }) => {
  const dispatch = useDispatch()

  useEffect(() => {
    let code =
      window &&
      window.location &&
      window.location.href.match(/code=(.*)(?=&state)/g)

    code && (code = code.toString().split('=')[1])

    let state =
      window && window.location && window.location.href.match(/state=(.*)/g)

    state && (state = state.toString().split('=')[1])

    if (code && !localStorage.getItem('token')) {
      switch (state) {
        case 'github':
          dispatch(
            mutation({
              mutation: GITHUB_LOGIN,
              variables: { code },
              storeKey: 'user',
              name: 'githubAuth',
              onSuccess: ({ siliskyToken }) =>
                localStorage.setItem('token', siliskyToken),
            })
          )
          break
        case 'gitlab':
          dispatch(
            mutation({
              mutation: GITLAB_LOGIN,
              variables: { code },
              storeKey: 'user',
              name: 'gitlabAuth',
              onSuccess: ({ siliskyToken }) =>
                localStorage.setItem('token', siliskyToken),
            })
          )
          break
        case 'bitbucket':
          break
        default:
          break
      }
    }
  }, [])

  return children
}

const GitCloneProvider = ({ children }) => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false)
  const dispatch = useDispatch()
  const user = useSelector(selectors.getUser)

  useEffect(() => {
    const repoLink =
      window &&
      window.location &&
      window.location.href.match(/#(.*)/) &&
      window.location.href.match(/#(.*)/)[1]

    if (repoLink && !user) {
      setLoginModalOpen(true)
    } else if (repoLink && user) {
      createProject({ repoLink, dispatch, user })
    }
  }, [user, isLoginModalOpen])

  return (
    <>
      {children}
      <StyledModal
        isOpen={isLoginModalOpen}
        onRequestClose={() => setLoginModalOpen(false)}
        contentLabel="Login first"
        ariaHideApp={false}
      >
        Login with github
      </StyledModal>
    </>
  )
}

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Provider store={createStore}>
      <PersistGate loading={null} persistor={persistor}>
        <LoginProvider>
          <GitCloneProvider>{element}</GitCloneProvider>
        </LoginProvider>
      </PersistGate>
    </Provider>
  </ApolloProvider>
)
