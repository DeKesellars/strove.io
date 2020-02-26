import { MY_ORGANIZATIONS } from 'queries'

import { query } from './graphql'

export default (dispatch, { onSuccess = () => null }) =>
  localStorage.getItem('token')
    ? dispatch(
        query({
          name: 'myOrganizations',
          storeKey: 'myOrganizations',
          query: MY_ORGANIZATIONS,
          fetchPolicy: 'network-only',
          onSuccess: data => onSuccess(data),
        })
      )
    : undefined
