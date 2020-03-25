import * as C from './consts'

export const addIncomingProject = ({ repoLink, repoProvider, name }) => ({
  type: C.ADD_INCOMING_PROJECT,
  payload: {
    repoLink,
    repoProvider,
    name,
  },
})

export const setProjectIsBeingAdded = ({ isLiveshare = false } = {}) => ({
  type: C.SET_PROJECT_IS_BEING_ADDED,
  isLiveshare,
})

export const setProjectIsBeingStarted = () => ({
  type: C.SET_PROJECT_IS_BEING_STARTED,
})
export const catchIncomingError = ({ error }) => ({
  type: C.CATCH_INCOMING_ERROR,
  payload: { error },
})

export const removeIncomingProject = () => ({ type: C.REMOVE_INCOMING_PROJECT })
