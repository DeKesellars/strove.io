import React, { useEffect } from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider, useDispatch } from 'react-redux'
import { createStore as reduxCreateStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'
import thunk from 'redux-thunk'
import { persistStore, persistReducer } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import storage from 'redux-persist/lib/storage'
import hardSet from 'redux-persist/lib/stateReconciler/hardSet'
import { createSelector } from 'reselect'
import { selectors } from 'state'
import { GITHUB_LOGIN } from 'queries'
import { mutation, window } from 'utils'

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
  composeWithDevTools(
    applyMiddleware(thunk)
    // other store enhancers if any
  )
)

const persistor = persistStore(createStore)

export const wrapRootElement = ({ element }) => (
  <ApolloProvider client={client}>
    <Provider store={createStore}>
      <PersistGate loading={null} persistor={persistor}>
        <ElementWithGitClone>{element}</ElementWithGitClone>
      </PersistGate>
    </Provider>
  </ApolloProvider>
)

const ElementWithGitClone = ({ children }) => {
  const dispatch = useDispatch()

  console.log('window', window)
  useEffect(() => {
    const code =
      window &&
      window.location &&
      window.location.match(/code=(.*)/) &&
      window.location.match(/code=(.*)/)[1]
    if (code) {
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
    }
  }, [])

  return children
}
