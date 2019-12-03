import { query, mutation } from 'utils'
import { STOP_PROJECT, MY_PROJECTS } from 'queries'
import { actions } from 'state'

const handleStopProject = ({ id, dispatch }) => {
  dispatch(
    mutation({
      name: 'stopProject',
      mutation: STOP_PROJECT,
      dataSelector: data => data,
      variables: { projectId: id },
      onSuccessDispatch: [
        () =>
          actions.api.fetchSuccess({
            data: { currentProjectId: null },
            storeKey: 'user',
          }),
        () => actions.api.fetchSuccess({ storeKey: 'stopProject' }),
      ],
    })
  )
  dispatch(
    query({
      name: 'myProjects',
      dataSelector: data => data.myProjects.edges,
      query: MY_PROJECTS,
    })
  )
}

export default handleStopProject
