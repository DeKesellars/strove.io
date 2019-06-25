import React, { useEffect } from 'react'
import { Link } from 'gatsby'

import Layout from './layout'
import SEO from './seo'
import styled, { keyframes } from 'styled-components'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { createSelector } from 'reselect'
import { query } from 'utils'
import { GET_PROJECTS } from 'queries'

import { selectors } from 'state'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`
const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3vh;
  margin: 5vh;
  animation: ${FadeIn} 1s ease-out;
`
const Tile = styled.div`
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
  margin: 15px;
  height: 25vh;
  width: 50vw;

  @media (max-width: 1366px) {
    width: 80vw;
    height: auto;
  }
`
const Button = styled(Link)`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 1vh;
  border-color: #0072ce;
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;

  &:hover {
    transform: scale(1.1);
  }
`
const ProjectTitle = styled.h1`
  font-size: 3vh;
  color: #0072ce;
  margin: 0.3vh 0.3vh 0.3vh 0;
`
const Text = styled.p`
  color: #0072ce;
  font-size: 1.7vh;
  margin-left: 2%;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`
const ButtonText = styled(Text)`
  color: #ffffff;
  font-size: 2.2vh;
  margin: 0;
  text-decoration: none;
`
const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`
const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
const RightSection = styled(FlexWrapper)`
  width: 20%;
  height: 100%;
  flex-direction: column;
  justify-content: flex-start;
  padding: 0.5%;
`
const InfoWrapper = styled(FlexWrapper)`
  width: 80%;
  align-items: flex-start;
`
const TextWrapper = styled(FlexWrapper)`
  flex-direction: row;
  margin-top: 0.3vh;
  margin-bottom: 0.3vh;
  width: 90%;
  height: auto;
  justify-content: flex-start;
`

const getProjects = createSelector(
  [selectors.getUserProjects],
  projects => projects
)

const getUserToken = selectors.getData('user', null, 'siliskyToken')

const getToken = createSelector(
  [getUserToken],
  token => token
)

// const getId = createSelector(
//   [getMachineId],
//   machineId => machineId
// )

// const getProjects = createSelector(
//   [selectors.getMyProjects],
//   myProjects => myProjects
// )

const getUserData = createSelector(
  [selectors.getUser],
  user => user
)

const Dashboard = props => {
  const dispatch = useDispatch()
  const user = useSelector(getUserData)

  const projects = useSelector(getProjects)

  const handleClick = workspace => {
    console.log(
      workspace.id,
      workspace.name,
      workspace.machineId,
      workspace.editorPort
    )
  }

  useEffect(() => {
    dispatch(
      query({
        name: 'myProjects',
        dataSelector: data => data.myProjects.edges,
        query: GET_PROJECTS,
        context: {
          headers: {
            Authorization: `Bearer ${user.siliskyToken}`,
            'User-Agent': 'node',
          },
        },
      })
    )
  }, [])

  return (
    <Layout>
      <SEO title="Dashboard" />
      <TilesWrapper>
        {projects.map(workspace => (
          <Tile key={workspace.id}>
            <VerticalDivider>
              <InfoWrapper>
                <ProjectTitle>{workspace.name}</ProjectTitle>
                <TextWrapper>
                  <Icon
                    type="calendar"
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text>{workspace.createdAt}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Icon
                    type="edit"
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text>{workspace.description}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Icon
                    type="branches"
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text> {workspace.branch}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Icon
                    type="code"
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text>{workspace.language}</Text>
                </TextWrapper>
                <TextWrapper>
                  <Icon
                    type={workspace.isPrivate ? 'lock' : 'unlock'}
                    style={{
                      fontSize: '1.7vh',
                      color: `#0072ce`,
                    }}
                  />
                  <Text>{workspace.isPrivate ? 'Private' : 'Public'}</Text>
                </TextWrapper>
              </InfoWrapper>
              <RightSection>
                <Button
                  to="/app/editor/"
                  state={{
                    machineId: workspace.machineId,
                    editorPort: workspace.editorPort,
                  }}
                  primary
                  onClick={() => handleClick(workspace)}
                >
                  <ButtonText>Start</ButtonText>
                </Button>
              </RightSection>
            </VerticalDivider>
          </Tile>
        ))}
      </TilesWrapper>
    </Layout>
  )
}

export default Dashboard
