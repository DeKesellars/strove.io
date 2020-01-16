import React, { useState, memo } from 'react'
import styled, { keyframes, css } from 'styled-components/macro'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { isMobileOnly, isMobile } from 'react-device-detect'
import dayjs from 'dayjs'
import isEmail from 'validator/lib/isEmail'
import { Formik, Form, Field } from 'formik'
import { withRouter } from 'react-router-dom'
import ReactModal from 'react-modal'

import { mutation, handleStopProject, query } from 'utils'
import {
  DELETE_PROJECT,
  CONTINUE_PROJECT,
  ADD_MEMBER,
  CREATE_TEAM,
  RENAME_TEAM,
  REMOVE_MEMBER,
  MY_TEAMS,
  DELETE_TEAM,
} from 'queries'
import { selectors, actions, C } from 'state'
import Modal from './modal'
import { GetStarted } from 'components'
import SEO from './seo'
import StroveButton from 'components/stroveButton.js'
import Header from './header/header'
import Footer from './footer'

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const validateTeamName = values => {
  let errors = {}

  if (values.projectName && !values.projectName.trim()) {
    errors.projectName = 'Add name'
    return errors
  } else if (values.projectName.length > 100) {
    errors.projectName = 'Name too long'
    return errors
  }

  return errors
}

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const EmailFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 400px;
  flex-wrap: wrap;
  margin: 20px 0 5px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
  background: ${({ theme }) => theme.colors.c2};
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border-radius: 5px;
  transition: all 0.2s ease;
  opacity: 0.9;
  align-items: center;
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      box-shadow: none;
      min-width: 100px;
      border-radius: 5px;
    `}
  &:hover {
    opacity: 1;
    box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
      0 9px 26px 0 rgba(174, 174, 186, 0.16);
    ${({ isMobile }) =>
      isMobile &&
      css`
        box-shadow: none;
      `}
  }
  input {
    box-shadow: none;
    color: ${({ theme }) => theme.colors.c12};
    outline: 0;
    background: ${({ theme }) => theme.colors.c2};
    width: calc(100% - 156px);
    height: 56px;
    padding: 0;
    padding-left: 64px;
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 36px;
    font-size: 17px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    border: 0;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    ${({ isMobile }) =>
      isMobile &&
      css`
        flex-direction: column;
        box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
          0 8px 24px 0 rgba(174, 174, 186, 0.16);
        border-radius: 5px;
        width: 100%;
      `}
  }
  svg {
    position: absolute;
    top: 18px;
    left: 20px;
    height: 24px;
    width: 24px;
    g {
      stroke: ${({ theme }) => theme.colors.c1};
    }
  }
`

const StyledForm = styled(Form)`
  width: 100%;
`

const StyledInfo = styled.span`
  margin: 20px;
  color: ${({ theme }) => theme.colors.c13};
  font-size: 13px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const PageWrapper = styled(Wrapper)`
  width: 100%;
  padding-top: 5vh;
  min-height: calc(100vh - 64px);
  justify-content: space-between;
`

const TeamTileWrapper = styled(Wrapper)`
  margin: 20px 0px;
  transition: all 0.2s;
  width: 70%;
  height: ${({ expanded }) => (expanded ? 'auto' : '2.5rem')};
`

const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 2vh;
  margin: 2vh;
  animation: ${FullFadeIn} 0.5s ease-out;
`

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.c1};
  margin: 0.3vh 0.3vh 0.3vh 0;
`

const SectionTitle = styled(ProjectTitle)`
  font-size: 1.2rem;
  font-weight: 400;
`

const Tile = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.c2};
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-style: solid;
  padding: 20px;
  box-shadow: ${({ expanded, theme }) =>
    expanded ? '0' : ` 0 1.5vh 1.5vh -1.5vh ${theme.colors.c1}`};
  margin: 15px;
  width: 50%;
  transition: all 0.2s;

  /* @media (max-width: 1365px) {
    width: 80vw;
    height: auto;
  } */
`

const TeamTile = styled(Tile)`
  width: 100%;
  padding: 0px;
  margin: 0px;
  border-top-left-radius: 0px;
  border-top-right-radius: 0px;
`

const TeamTileSection = styled(Tile)`
  align-items: flex-start;
  margin: 0px;
  padding: 5px;
  border-radius: ${({ isLast }) => (isLast ? '0px 0px 5px 5px' : '0px')};
  border-width: 1px 0px 0px 0px;
  border-color: ${({ theme }) => theme.colors.c16};
  width: 100%;
  box-shadow: none;
`

const ModalButton = styled(StroveButton)`
  animation: ${FullFadeIn} 0.2s ease-out;
  max-width: 150px;
  padding: 0.5vh;
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.c1};
  font-size: 1rem;
  margin-left: 2%;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ModalText = styled(Text)`
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
`

const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
`

const TeamHeaderDivider = styled(VerticalDivider)`
  flex-direction: row;
  justify-content: space-between;
`

const RowWrapper = styled(VerticalDivider)`
  border-width: 0px 0px 1px 0px;
  border-color: ${({ theme }) => theme.colors.c17};
  border-style: solid;
  padding: 3px;
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

const DeleteButton = styled.button`
width: 15%;
	box-shadow:inset 0px 1px 0px 0px #cf866c;
	background:linear-gradient(to bottom, #d0451b 5%, #bc3315 100%);
	background-color:#d0451b;
	border-radius:3px;
	border:1px solid #942911;
	display:inline-block;
	cursor:pointer;
	color:#ffffff;
	font-family: 'Futura','Helvetica Neue For Number',-apple-system, BlinkMacSystemFont,'Segoe UI',Roboto,'PingFang SC','Hiragino Sans GB', 'Microsoft YaHei','Helvetica Neue',Helvetica,Arial,sans-serif;
	font-size:0.6rem;
  font-weight: 500;
	padding:3px 12px;
	text-decoration:none;
	text-shadow:0px 1px 0px #854629;
}
:hover {
	background:linear-gradient(to bottom, #bc3315 5%, #d0451b 100%);
	background-color:#bc3315;
}
`

const InviteStatus = styled.span`
  color: ${({ theme }) => theme.colors.c16};
  margin-left: 24px;
`

const CircleIcon = styled.div`
  height: 1.5vh;
  width: 1.5vh;
  border-radius: 50%;
  background: ${({ theme, active }) =>
    active ? theme.colors.c8 : theme.colors.c9};
`

const StyledIcon = styled(Icon)`
  font-size: 1.7vh;
  color: ${({ theme }) => theme.colors.c1};
`

const IconWrapper = styled(Wrapper)`
  width: 8%;
  height: 100%;
  justify-content: center;
  align-items: center;
  border-width: 0px 0px 0px 1px;
  border-color: ${({ theme }) => theme.colors.c16};
  border-style: solid;
`

const ExpandIcon = styled(StyledIcon)`
  font-size: 1rem;
  transform: ${({ expanded }) =>
    expanded ? ' rotate(180deg)' : 'rotate(0deg)'};
  color: ${({ theme, expanded, section }) =>
    section ? theme.colors.c1 : expanded ? theme.colors.c2 : theme.colors.c1};
  transition: all 0.2s;
  :focus {
    outline: none;
  }
`

const StyledCloseIcon = styled(Icon)`
  position: absolute;
  top: 15px;
  right: 15px;
  font-size: 1.7vh;
  color: ${({ theme }) => theme.colors.c1};
  cursor: pointer;
  :focus {
    outline: none;
  }
`

const StyledReactModal = styled(ReactModal)`
  display: flex;
  height: auto;
  width: auto;
  position: fixed;
  animation: ${FullFadeIn} 0.2s ease-out;
  :focus {
    outline: 0;
  }
`

const TeamTileHeader = styled(Tile)`
  width: 100%;
  height: 2.5rem;
  margin: 0;
  padding: 0px 0px 0px 10px;
  transition: all 0.2s;
  border-bottom-left-radius: ${({ expanded }) => (expanded ? '0px' : '5px')};
  border-bottom-right-radius: ${({ expanded }) => (expanded ? '0px' : '5px')};
  background-color: ${({ theme, expanded }) =>
    expanded ? theme.colors.c1 : theme.colors.c2};

  ${ProjectTitle} {
    color: ${({ theme, expanded }) =>
      expanded ? theme.colors.c2 : theme.colors.c1};
    transition: all 0.2s;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.c1};
    cursor: pointer;
    ${ProjectTitle} {
      color: ${({ theme }) => theme.colors.c2};
    }
    ${ExpandIcon} {
      color: ${({ theme }) => theme.colors.c2};
    }
  }
`

const TileSectionHeader = styled(TeamTileHeader)`
  flex-direction: row;
  justify-content: flex-start;
  border-width: 1px 0px 0px 0px;
  border-color: ${({ theme }) => theme.colors.c16};
  border-radius: ${({ isLast }) => (isLast ? '0px 0px 5px 5px' : '0px')};
  box-shadow: none;

  background-color: ${({ theme, expanded }) =>
    expanded ? theme.colors.c1 : theme.colors.c2};

  ${ProjectTitle} {
    color: ${({ theme, expanded }) =>
      expanded ? theme.colors.c2 : theme.colors.c1};
    transition: all 0.2s;
  }

  :hover {
    background-color: ${({ theme }) => theme.colors.c2};
    cursor: pointer;
    ${ProjectTitle} {
      color: ${({ theme }) => theme.colors.c1};
    }
    ${ExpandIcon} {
      color: ${({ theme }) => theme.colors.c1};
    }
  }
`

const Dashboard = ({ history }) => {
  const dispatch = useDispatch()
  const projects = useSelector(selectors.api.getUserProjects)
  console.log('TCL: Dashboard -> projects', projects)
  const myTeams = useSelector(selectors.api.getMyTeams)
  console.log('TCL: Dashboard -> myTeams', myTeams)
  const [emailSent, setEmailSent] = useState(false)
  const [isModalVisible, setModalVisible] = useState(false)
  const [stopModal, setStopModal] = useState(false)
  const [addMemberModal, setAddMemberModal] = useState(false)
  const [renameTeamModal, setRenameTeamModal] = useState(false)
  const [addProjectModal, setAddProjectModal] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()
  const [expandedTiles, setExpandedTiles] = useState({})
  const [teamId, setTeamId] = useState('Blob')
  const [editTeamId, setEditTeamId] = useState()
  const [editMode, setEditMode] = useState('')
  const isDeleting = useSelector(selectors.api.getLoading('deleteProject'))
  const isStopping = useSelector(selectors.api.getLoading('stopProject'))
  const isContinuing = useSelector(selectors.api.getLoading('continueProject'))
  const currentProject = projects.find(item => item.machineId)
  const currentProjectId = currentProject?.id
  const projectsLimit = 20
  const isAdmin = true

  const tabs = [
    {
      name: 'Teams',
      content: (
        <TilesWrapper>
          <ProjectTitle>Admin console</ProjectTitle>
          <StroveButton
            isPrimary
            padding="0.5vh"
            width="20%"
            onClick={() => handleCreateTeamClick()}
            text="Create team"
          />
          {myTeams.map(team => {
            const isExpanded = expandedTiles[team.id]
            return (
              <TeamTileWrapper key={team.id} expanded={isExpanded}>
                <TeamTileHeader isAdmin={isAdmin} expanded={isExpanded}>
                  <TeamHeaderDivider>
                    <ProjectTitle>{team.name}</ProjectTitle>
                    <IconWrapper onClick={() => handleExpandTile(team.id)}>
                      <ExpandIcon type="down" expanded={isExpanded} />
                    </IconWrapper>
                  </TeamHeaderDivider>
                </TeamTileHeader>
                {isExpanded && (
                  <TeamTile>
                    <TeamHeaderDivider>
                      <StroveButton
                        isPrimary
                        padding="0.5vh"
                        width="20%"
                        onClick={() => handleRenameTeamClick(team.id)}
                        text="Rename team"
                      />
                      <StroveButton
                        isPrimary
                        padding="0.5vh"
                        width="20%"
                        onClick={() => handleTransferOwnershipClick(team.id)}
                        text="Transfer ownership"
                      />
                      {/* Deleting team is still WIP */}
                      <DeleteButton
                        onClick={() => deleteTeam({ teamId: team.id })}
                      >
                        Delete team
                      </DeleteButton>
                    </TeamHeaderDivider>
                    <TileSectionHeader>
                      <TeamHeaderDivider>
                        <SectionTitle>Members</SectionTitle>
                        <IconWrapper
                          onClick={() =>
                            handleExpandSection({
                              teamId: team.id,
                              type: 'Members',
                            })
                          }
                        >
                          <ExpandIcon
                            type="down"
                            expanded={
                              isExpanded &&
                              expandedTiles[team.id].isMembersActive
                            }
                            section
                          />
                        </IconWrapper>
                      </TeamHeaderDivider>
                    </TileSectionHeader>
                    {isExpanded && expandedTiles[team.id].isMembersActive && (
                      <TeamTileSection>
                        {team?.users?.map(
                          member =>
                            member.name && (
                              <RowWrapper key={member.name}>
                                <TeamHeaderDivider>
                                  <Text>{member.name}</Text>
                                  <DeleteButton
                                    onClick={() =>
                                      deleteMember({
                                        memberId: member.id,
                                        teamId: team.id,
                                      })
                                    }
                                  >
                                    Remove
                                  </DeleteButton>
                                </TeamHeaderDivider>
                              </RowWrapper>
                            )
                        )}
                        {team?.invited?.map(member => (
                          <RowWrapper key={member.name}>
                            <TeamHeaderDivider>
                              <Text>
                                {member.name ? member.name : member.email}{' '}
                                <InviteStatus>Invite pending</InviteStatus>
                              </Text>
                              <DeleteButton
                                onClick={() =>
                                  deleteMember({
                                    memberId: member.id,
                                    teamId: team.id,
                                  })
                                }
                              >
                                Cancel
                              </DeleteButton>
                            </TeamHeaderDivider>
                          </RowWrapper>
                        ))}
                        <StroveButton
                          isPrimary
                          padding="0.5vh"
                          width="20%"
                          onClick={() => handleAddMemberClick(team.id)}
                          text="Add member"
                        />
                      </TeamTileSection>
                    )}
                    <TileSectionHeader isLast>
                      <TeamHeaderDivider>
                        <SectionTitle>Projects</SectionTitle>
                        <IconWrapper
                          onClick={() =>
                            handleExpandSection({
                              teamId: team.id,
                              type: 'Projects',
                            })
                          }
                        >
                          <ExpandIcon
                            type="down"
                            expanded={
                              isExpanded &&
                              expandedTiles[team.id].isProjectsActive
                            }
                            section
                          />
                        </IconWrapper>
                      </TeamHeaderDivider>
                    </TileSectionHeader>
                    {isExpanded && expandedTiles[team.id].isProjectsActive && (
                      <TeamTileSection isLast>
                        <StroveButton
                          isPrimary
                          padding="0.5vh"
                          width="20%"
                          text="Add Project"
                          onClick={() => {
                            setTeamId(team.id)
                            setAddProjectModal(true)
                          }}
                        />
                        {team?.projects?.map(project => (
                          <Text>{project.name}</Text>
                        ))}
                      </TeamTileSection>
                    )}
                  </TeamTile>
                )}
              </TeamTileWrapper>
            )
          })}
        </TilesWrapper>
      ),
    },
    {
      name: 'Projects',
      content: (
        <TilesWrapper>
          <ProjectTitle>
            Projects count: {projects.length}/{projectsLimit}
          </ProjectTitle>
          {projects.map(project => (
            <Tile key={project.id}>
              <VerticalDivider>
                <InfoWrapper>
                  <ProjectTitle>{project.name}</ProjectTitle>

                  {currentProjectId && project.id === currentProjectId ? (
                    <TextWrapper>
                      <CircleIcon active />
                      <Text>Active</Text>
                    </TextWrapper>
                  ) : (
                    <TextWrapper>
                      <CircleIcon />
                      <Text>Inactive</Text>
                    </TextWrapper>
                  )}
                  <TextWrapper>
                    <StyledIcon type="calendar" />
                    <Text>
                      {dayjs(+project.createdAt).format('DD/MM/YYYY')}
                    </Text>
                  </TextWrapper>
                  {project.description && (
                    <TextWrapper>
                      <StyledIcon type="edit" />
                      <Text>
                        {project.description
                          ? project.description
                          : 'This is the project description.. Tribute'}
                      </Text>
                    </TextWrapper>
                  )}
                  {/* <TextWrapper>
        <StyledIcon
          type="branches"
        />
        <Text> {project.branch}</Text>
      </TextWrapper>
      <TextWrapper>
        <StyledIcon
          type="code"
        />
        <Text>{project.language}</Text>
      </TextWrapper> */}
                  <TextWrapper>
                    <StyledIcon type={project.isPrivate ? 'lock' : 'unlock'} />
                    <Text>{project.isPrivate ? 'Private' : 'Public'}</Text>
                  </TextWrapper>
                </InfoWrapper>
                <RightSection>
                  <StroveButton
                    to="/app/editor/"
                    isDisabled={isDeleting || isContinuing || isStopping}
                    isPrimary
                    padding="0.5vh"
                    onClick={() => handleStartClick(project)}
                    text={
                      currentProjectId && project.id === currentProjectId
                        ? 'Continue'
                        : 'Start'
                    }
                  />
                  {currentProjectId && currentProjectId === project.id ? (
                    <StroveButton
                      isDisabled={isDeleting || isContinuing || isStopping}
                      padding="0.5vh"
                      onClick={() => {
                        handleStopClick(project.id)
                      }}
                      text="Stop"
                    />
                  ) : null}
                  <StroveButton
                    isDisabled={isDeleting || isContinuing || isStopping}
                    padding="0.5vh"
                    onClick={() => {
                      setModalVisible(true)
                      setProjectToDelete(project)
                    }}
                    text="Delete"
                  />
                </RightSection>
              </VerticalDivider>
            </Tile>
          ))}
        </TilesWrapper>
      ),
    },
  ]

  const handleStartClick = ({ id, editorPort }) => {
    if (!currentProjectId || currentProjectId === id) {
      if (!editorPort) {
        dispatch(
          mutation({
            name: 'continueProject',
            mutation: CONTINUE_PROJECT,
            variables: { projectId: id },
            onSuccessDispatch: null,
          })
        )
      } else {
        dispatch(
          actions.api.fetchSuccess({
            data: { currentProjectId: id },
            storeKey: 'user',
          })
        )
        history.push('/app/editor/')
      }
    } else {
      setStopModal(true)
    }
  }

  const createTeam = ({ name }) => {
    dispatch(
      mutation({
        name: 'createTeam',
        mutation: CREATE_TEAM,
        variables: { name },
        dataSelector: data => data,
        onSuccess: () => {
          updateTeams()
          setRenameTeamModal(false)
        },
      })
    )
  }

  // Deleting projects is still WIP
  const deleteTeam = teamId => {
    dispatch(
      mutation({
        name: 'deleteTeam',
        mutation: DELETE_TEAM,
        variables: { teamId },
      })
    )
  }

  const updateTeams = () => {
    dispatch(
      query({
        name: 'myTeams',
        storeKey: 'myTeams',
        query: MY_TEAMS,
      })
    )
  }

  const deleteMember = ({ teamId, memberId }) =>
    dispatch(
      mutation({
        name: 'removeMember',
        mutation: REMOVE_MEMBER,
        variables: { teamId, memberId },
      })
    )

  const renameTeam = ({ newName, teamId }) =>
    dispatch(
      mutation({
        name: 'renameTeam',
        mutation: RENAME_TEAM,
        variables: {
          newName,
          teamId,
        },
        onSuccess: () => {
          updateTeams()
          setRenameTeamModal(false)
        },
      })
    )

  const addMember = ({ memberEmail, teamId }) => {
    dispatch(
      mutation({
        name: 'addMember',
        mutation: ADD_MEMBER,
        variables: { memberEmail, teamId },
        onSuccess: () => {
          updateTeams()
          setAddMemberModal(false)
        },
      })
    )
  }

  const handleAddMemberClick = id => {
    setEditTeamId(id)
    setAddMemberModal(true)
  }

  const handleRenameTeamClick = id => {
    setEditTeamId(id)
    setEditMode('Rename team')
    setRenameTeamModal(true)
  }

  const handleCreateTeamClick = () => {
    setEditMode('Create team')
    setRenameTeamModal(true)
  }

  const handleTransferOwnershipClick = teamId => {
    console.log('Yeet', teamId)
  }

  const handleDeleteClick = id => {
    dispatch(
      mutation({
        name: 'deleteProject',
        mutation: DELETE_PROJECT,
        variables: { projectId: id },
        dataSelector: data => data,
        onSuccess: () => setProjectToDelete(null),
        onSuccessDispatch: [
          () => ({
            type: C.api.REMOVE_ITEM,
            payload: { storeKey: 'myProjects', id },
          }),
          () => actions.api.fetchSuccess({ storeKey: 'deleteProject' }),
        ],
      })
    )
  }

  const handleStopClick = id => {
    handleStopProject({ id, dispatch })
  }

  const closeModal = () => {
    setProjectToDelete(null)
    setModalVisible(false)
  }

  const closeAddProjectModal = () => setAddProjectModal(false)

  const handleExpandTile = teamId => {
    if (expandedTiles[teamId]) {
      const tiles = { ...expandedTiles }
      delete tiles[teamId]

      return setExpandedTiles(tiles)
    }

    setExpandedTiles({
      ...expandedTiles,
      [teamId]: { isMembersActive: false, isProjectsActive: false },
    })
  }

  const handleExpandSection = ({ teamId, type }) => {
    if (type === 'Members') {
      const isMembersActive = expandedTiles[teamId].isMembersActive
      return setExpandedTiles({
        ...expandedTiles,
        [teamId]: {
          ...expandedTiles[teamId],
          isMembersActive: !isMembersActive,
        },
      })
    }
    const isProjectsActive = expandedTiles[teamId].isProjectsActive
    return setExpandedTiles({
      ...expandedTiles,
      [teamId]: {
        ...expandedTiles[teamId],
        isProjectsActive: !isProjectsActive,
      },
    })
  }

  return (
    <>
      <SEO title="Dashboard" />
      <Header />
      <PageWrapper isAdmin={isAdmin}>
        {isAdmin ? (
          <>{tabs[tabs.findIndex(tab => tab.name === 'Teams')].content}</>
        ) : (
          <>
            {/* <TrialInfoWrapper>
            Your workspace is currently on the free version of Strove.{' '}
            <StyledLink to="/pricing">See upgrade options</StyledLink>
          </TrialInfoWrapper> */}
            <GetStarted />
            {tabs[tabs.findIndex(tab => tab.name === 'Projects')].content}
          </>
        )}
        <Footer />
      </PageWrapper>
      <Modal
        width={isMobileOnly ? '80vw' : '40vw'}
        height={isMobileOnly ? '30vh' : '20vh'}
        isOpen={isModalVisible}
        onRequestClose={() => setModalVisible(false)}
        contentLabel="Delete project?"
        ariaHideApp={false}
      >
        <ModalText>
          Are you sure you want to delete this project? This operation cannot be
          undone.
        </ModalText>
        <ModalButton
          isDelete={true}
          onClick={() => {
            handleDeleteClick(projectToDelete.id)
            setModalVisible(false)
          }}
          padding="0.5vh"
          text="Confirm"
          maxWidth="150px"
        />
        <ModalButton
          onClick={closeModal}
          text="Close"
          padding="0.5vh"
          maxWidth="150px"
        />
      </Modal>
      <Modal
        width={isMobileOnly ? '80vw' : '40vw'}
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={stopModal}
        onRequestClose={() => setStopModal(false)}
        contentLabel="Stop project?"
        ariaHideApp={false}
      >
        <ModalText>
          Before starting new project you have to stop your currently running
          project. That means you may lose all unsaved progress. Are you sure
          you want to stop your active project?
        </ModalText>
        <ModalButton
          isPrimary
          onClick={() => {
            handleStopClick(currentProjectId)
            setStopModal(false)
          }}
          text="Confirm"
          padding="0.5vh"
          maxWidth="150px"
        />
        <ModalButton
          onClick={() => setStopModal(false)}
          text="Close"
          padding="0.5vh"
          maxWidth="150px"
        />
      </Modal>
      <Modal
        width={isMobileOnly ? '80vw' : '40vw'}
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={addMemberModal}
        onRequestClose={() => setAddMemberModal(false)}
        contentLabel="Stop project?"
        ariaHideApp={false}
      >
        <Formik
          initialValues={{
            email: '',
          }}
          validate={validate}
          onSubmit={values =>
            addMember({ memberEmail: values.email, teamId: editTeamId })
          }
        >
          {({ errors, touched, values }) => (
            <StyledForm>
              <EmailFormWrapper
                disabled={errors.email || !values.email}
                isMobile={isMobileOnly}
              >
                <Field
                  type="email"
                  name="email"
                  placeholder="Your Email"
                ></Field>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="#9CA2B4"
                    strokeWidth="2"
                  >
                    <path d="M2 4h20v16H2z"></path>
                    <path d="M2 7.9l9.9 3.899 9.899-3.9"></path>
                  </g>
                </svg>
                <StroveButton
                  isPrimary
                  type="submit"
                  layout="form"
                  text="Invite"
                  disabled={errors.email || !values.email}
                />
              </EmailFormWrapper>
              {/* {emailSent && (
                <StyledInfo>Your team invitation has been sent</StyledInfo>
              )} */}
            </StyledForm>
          )}
        </Formik>
        <ModalButton
          onClick={() => setAddMemberModal(false)}
          text="Close"
          padding="0.5vh"
          maxWidth="150px"
        />
      </Modal>
      <Modal
        width={isMobileOnly ? '80vw' : '40vw'}
        height={isMobileOnly ? '40vh' : '20vh'}
        isOpen={renameTeamModal}
        onRequestClose={() => setRenameTeamModal(false)}
        contentLabel="Stop project?"
        ariaHideApp={false}
      >
        <Formik
          initialValues={{
            name: '',
          }}
          validate={validateTeamName}
          onSubmit={values => {
            if (editMode === 'Rename team')
              renameTeam({ newName: values.name, teamId: editTeamId })
            else createTeam({ name: values.name })
          }}
        >
          {({ errors, touched, values }) => (
            <StyledForm>
              <EmailFormWrapper
                disabled={errors.name || !values.name}
                isMobile={isMobileOnly}
              >
                <Field
                  type="name"
                  name="name"
                  placeholder={
                    editMode === 'New team name' ? 'Rename' : 'Team name'
                  }
                ></Field>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    fillRule="evenodd"
                    stroke="#9CA2B4"
                    strokeWidth="2"
                  >
                    <path d="M2 4h20v16H2z"></path>
                    <path d="M2 7.9l9.9 3.899 9.899-3.9"></path>
                  </g>
                </svg>
                <StroveButton
                  isPrimary
                  type="submit"
                  layout="form"
                  text={editMode === 'Rename team' ? 'Rename' : 'Create'}
                  disabled={errors.name || !values.name}
                />
              </EmailFormWrapper>
              {/* {emailSent && (
                <StyledInfo>Your team invitation has been sent</StyledInfo>
              )} */}
            </StyledForm>
          )}
        </Formik>
        <ModalButton
          onClick={() => setRenameTeamModal(false)}
          text="Close"
          padding="0.5vh"
          maxWidth="150px"
        />
      </Modal>
      <StyledReactModal
        isOpen={addProjectModal}
        onRequestClose={closeAddProjectModal}
        ariaHideApp={false}
        isMobile={isMobileOnly}
      >
        {!isMobile && (
          <StyledCloseIcon
            type="close"
            onClick={() => setAddProjectModal(false)}
          />
        )}
        <GetStarted closeModal={closeAddProjectModal} teamId={teamId} />
      </StyledReactModal>
    </>
  )
}

export default memo(withRouter(Dashboard))
