import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { isMobileOnly } from 'react-device-detect'
import { useSelector } from 'react-redux'

import { selectors } from 'state'

const UserPhoto = styled.img`
  width: 15px;
  height: 15px;
  border-radius: 1px;
  margin: 0;
`

const UserPhotoContainer = styled.div`
  height: 100%;
  width: auto;
  margin-left: 2px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 300px;
  height: 15px;
  justify-content: flex-start;
  align-items: center;
`

const ActiveUsers = () => {
  const currentProject = useSelector(selectors.api.getCurrentProject)
  const currentTeam = useSelector(selectors.api.getCurrentTeam)
  const projects = useSelector(selectors.api.getProjects)
  const originalProject = projects.find(
    project => project?.id === currentProject?.startedCollaborationFromId
  )
  console.log('TCL: ActiveUsers -> originalProject', originalProject)
  const activeUsers = originalProject?.workingUsers
  console.log('TCL: ActiveUsers -> activeUsers', activeUsers)
  console.log('TCL: ActiveUsers -> projects', projects)
  console.log('TCL: ActiveUsers -> currentTeam', currentTeam)
  console.log('TCL: ActiveUsers -> currentProject', currentProject)
  //   const originalProject = currentTeam.projects.find(
  //     project => project.id === currentProject.id
  //   )
  //   console.log('TCL: ActiveUsers -> originalProject', originalProject)
  return (
    <Wrapper>
      {activeUsers?.map(user => (
        <UserPhotoContainer key={user.name}>
          <UserPhoto src={user.photoUrl} />
        </UserPhotoContainer>
      ))}
    </Wrapper>
  )
}

export default memo(ActiveUsers)
