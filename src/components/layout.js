import React, { useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import { Location } from '@reach/router'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import getOr from 'lodash/fp/getOr'

import ApolloClient from 'apollo-boost'
import { mutation } from 'utils'
import Header from './header'
import './layout.css'
import { ADD_GITHUB_PROJECT, GET_REPO_INFO } from '../queries'

const client = new ApolloClient({
  uri: 'https://api.github.com/graphql',
})

const getUserName = state => getOr(undefined, ['api', 'user', 'data', 'name'])

const getUserPhoto = getOr(undefined, ['api', 'user', 'data', 'photoUrl'])

const getUserSiliskyToken = getOr(undefined, [
  'api',
  'user',
  'data',
  'siliskyToken',
])

const getUserGithubToken = getOr(undefined, [
  'api',
  'user',
  'data',
  'githubToken',
])

const getUserData = createSelector(
  [getUserName, getUserPhoto, getUserGithubToken, getUserSiliskyToken],
  (username, userphoto, githubToken, siliskyToken) => ({
    username,
    userphoto,
    githubToken,
    siliskyToken,
  })
)

const LayoutComponent = ({ children, location }) => {
  const dispatch = useDispatch()
  const user = useSelector(getUserData)

  useEffect(() => {
    const machineId = `5d0ba955d0027b3e519b4c39`
    const githubLink =
      location.hash.match(/#(.*)/) && location.hash.match(/#(.*)/)[1]

    if (githubLink) {
      const addProject = async () => {
        const query = GET_REPO_INFO
        const context = {
          headers: {
            Authorization: `Bearer ${user.githubToken}`,
            'User-Agent': 'node',
          },
        }
        const repoUrlParts = githubLink.split('/')
        const owner = repoUrlParts[3]
        const name = repoUrlParts[4]
        const variables = { owner, name }
        try {
          const { data } = await client.query({
            query,
            context,
            variables,
            fetchPolicy: 'no-cache',
          })

          const {
            description,
            name /* add language and color in future */,
          } = data.repository

          dispatch(
            mutation({
              name: 'addProject',
              storeKey: 'projects',
              variables: { githubLink, machineId, name, description },
              mutation: ADD_GITHUB_PROJECT,
              context: {
                headers: {
                  Authorization: `Bearer ${user.siliskyToken}`,
                  'User-Agent': 'node',
                },
              },
            })
          )
        } catch (e) {
          console.log('fetch error: ', e)
        }
      }
      addProject()
    }
  }, [])

  return (
    <StaticQuery
      query={graphql`
        query SiteTitleQuery {
          site {
            siteMetadata {
              title
            }
          }
        }
      `}
      render={data => (
        <>
          <Header siteTitle={data.site.siteMetadata.title} />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              alignItems: 'center',
              textAlign: 'center',
              margin: `0 auto`,
              maxWidth: '100vw',
              paddingTop: 0,
            }}
          >
            <main>{children}</main>
          </div>
        </>
      )}
    />
  )
}

const Layout = ({ children }) => (
  <Location>
    {({ location }) => (
      <LayoutComponent location={location} children={children} />
    )}
  </Location>
)

export default Layout
