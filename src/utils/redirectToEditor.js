import { actions } from 'state'

import { getWindowPathName, getWindowSearchParams } from './windowUtils'

/* NO_GATSBY_TODO Pass history */
export default (dispatch, history) => {
  dispatch(actions.incomingProject.removeIncomingProject())
  const path = getWindowPathName()
  if (document.visibilityState === 'visible') {
    if (path.includes('embed') && document.visibilityState === 'visible') {
      const searchParams = getWindowSearchParams()
      const repoUrl = searchParams.get('repoUrl')
      history.push(`/embed/editor/?repoUrl=${repoUrl}`)
    } else {
      history.push('/app/editor/')
    }
  }
}
