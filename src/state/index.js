import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'
import storage from 'redux-persist/lib/storage'

import api from './api'
import incomingProject from './incomingProject'

const persistConfig = {
  key: 'api',
  storage,
  stateReconciler: autoMergeLevel2,
}

const incomingProjectConfig = {
  key: 'incomingProject',
  storage,
  stateReconciler: autoMergeLevel2,
}

export const selectors = {
  api: api.selectors,
  incomingProject: incomingProject.selectors,
}
export const actions = {
  api: api.actions,
  incomingProject: incomingProject.actions,
}

export const C = {
  api: api.C,
  incomingProject: incomingProject.C,
}

const appReducer = combineReducers({
  api: persistReducer(persistConfig, api.reducer),
  incomingProject: incomingProject.reducer,
})

export default persistReducer(configgggg, (state, action) => {
  if (action.type === api.C.LOGOUT) {
    state = undefined
  }

  return appReducer(state, action)
})
