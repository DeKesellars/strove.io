import {
  createActions,
  handleActions,
  handleAction,
  combineActions,
} from "redux-actions"

const defaultState = { user: null }

const createFetchActionsAndReducers = storeName => {
  const {
    fetch: {
      user: { data, loading, error },
    },
  } = createActions({
    FETCH: {
      USER: {
        DATA: data => data,
        LOADING: (isLoading = false) => isLoading,
        ERROR: error => error,
      },
    },
  })

  createFetchReducers({ storeName, defaultState, data, loading, error })
}

const createFetchReducers = ({
  storeName,
  defaultState,
  data,
  loading,
  error,
}) =>
  handleActions(
    {
      [data]: (state, { payload }) => ({
        ...state,
        storeName: {
          loading: false,
          error: null,
          data: { ...state.storeName.data, ...payload },
        },
      }),
      [error]: (state, { payload }) => ({
        ...state,
        storeName: { loading: false, data: null, error: payload },
      }),
      [loading]: (state, { payload }) => ({
        ...state,
        storeName: { ...storeName.user, loadin: payload },
      }),
    },
    defaultState
  )

const {
  fetch: {
    user: { data, loading, error },
  },
} = createActions({
  FETCH: {
    USER: {
      DATA: data => data,
      LOADING: (isLoading = false) => isLoading,
      ERROR: error => error,
    },
  },
})

const reducer = handleActions(
  {
    [data]: (state, { payload }) => ({
      ...state,
      user: {
        loading: false,
        error: null,
        data: { ...state.user.data, ...payload },
      },
    }),
    [error]: (state, { payload }) => ({
      ...state,
      user: { loading: false, data: null, error: payload },
    }),
    [loading]: (state, { payload }) => ({
      ...state,
      user: { ...state.user, loadin: payload },
    }),
  },
  defaultState
)

export default reducer
