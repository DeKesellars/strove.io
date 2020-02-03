import React, { useState, memo } from 'react'
import styled, { keyframes } from 'styled-components/macro'
import { Icon } from 'antd'
import { isMobileOnly, isMobile } from 'react-device-detect'

import { withRouter } from 'react-router-dom'
import ReactModal from 'react-modal'
import { Modal, StroveButton, GetStarted } from 'components'

import Projects from './projects'

import {
  Wrapper,
  ExpandIcon,
  TeamTileWrapper,
  Tile,
  Title,
  SectionTitle,
  TeamTileHeader,
  TileSectionHeader,
  TeamTile,
  TeamTileSection
} from './styled'

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
    `
const IconWrapper = styled(Wrapper)`
  min-width: 50px;
  height: 100%;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  margin-left: auto;
  margin-right: 5px;

  i {
    line-height: 0;
  }
`

const VerticalDivider = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 100%;
  flex-direction: ${({ columnOnMobile }) =>
    columnOnMobile && isMobileOnly ? 'column' : 'row'};
`

const Divider = styled(VerticalDivider)`
  justify-content: space-between;
  flex-direction: ${({ columnOnMobile }) =>
    columnOnMobile && isMobileOnly ? 'column' : 'row'};
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.c3};
  font-size: 1rem;
  margin-left: 10px;
  margin-bottom: 0;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const ModalText = styled(Text)`
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
  word-break: break-word;
`

const ModalButton = styled(StroveButton)`
  animation: ${FullFadeIn} 0.2s ease-out;
  border-radius: 2px;
  max-width: 150px;
  padding: 5px;
`

const WarningText = styled(ModalText)`
  color: ${({ theme }) => theme.colors.c5};
  margin-bottom: 5px;
  word-break: break-word;
`

const RowWrapper = styled(VerticalDivider)`
  border-width: 0px 0px 1px 0px;
  border-color: ${({ theme }) => theme.colors.c19};
  border-style: solid;
  min-height: 60px;

  :last-of-type {
    border: none;
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

const emptyWarningModalContent = {
  visible: false,
  content: null,
  onSubmit: null,
  buttonLabel: '',
}

const PersonalTeam = ({ history, teams, updateTeams }) => {
  const [isExpanded, setIsExpanded] = useState(true)
  const [addProjectModal, setAddProjectModal] = useState(false)
  const [warningModal, setWarningModal] = useState(emptyWarningModalContent)
  const [editTeam, setEditTeam] = useState()
  const [settingsModal, setSettingsModal] = useState()
  const [teamId, setTeamId] = useState()

  const closeAddProjectModal = () => setAddProjectModal(false)

  // add pricing button
  const handleAddMemberClick = () => {
    setWarningModal({
      visible: true,
      content: (
        <TeamTileWrapper>
          <ModalText>
            Adding team members is not available in free plan. Please visit our
            pricing page for more information
          </ModalText>
          <StroveButton
            isDashboard
            isLink
            padding="5px"
            minWidth="150px"
            maxWidth="150px"
            borderRadius="2px"
            margin="0 0 0 10px"
            to="/pricing"
            text="Pricing"
          />
        </TeamTileWrapper>
      ),
    })
  }

  const handleSettingsClick = team => {
    setEditTeam(team)
    setSettingsModal(true)
  }

  const closeWarningModal = () => {
    setWarningModal(emptyWarningModalContent)
  }

  const shouldTabsBeCollapsable = Object.keys(teams).length > 1

  return (
    <>
      {teams.map(team => {
        const teamProjects = team.projects
        return (
          <TeamTileWrapper expanded={isExpanded}>
            <TeamTileHeader expanded={isExpanded} shouldTabsBeCollapsable>
              <Divider>
                <VerticalDivider columnOnMobile>
                  <Title>{team.name}</Title>
                  {isExpanded && (
                    <StroveButton
                      isPrimary
                      padding="5px"
                      minWidth="150px"
                      maxWidth="150px"
                      margin="10px"
                      borderRadius="2px"
                      onClick={handleAddMemberClick}
                      text="Add member"
                    />
                  )}
                  {isExpanded && (
                    <StroveButton
                      isDashboard
                      padding="5px"
                      minWidth="150px"
                      maxWidth="150px"
                      borderRadius="2px"
                      margin="10px"
                      text="Settings"
                      onClick={() => {
                        handleSettingsClick(team)
                      }}
                    />
                  )}
                </VerticalDivider>
                {shouldTabsBeCollapsable && (
                  <IconWrapper onClick={() => setIsExpanded(!isExpanded)}>
                    <ExpandIcon type="down" expanded={isExpanded} />
                  </IconWrapper>
                )}
              </Divider>
            </TeamTileHeader>
            {isExpanded && (
              <TeamTile>
                <TileSectionHeader isLast>
                  <Divider>
                    <SectionTitle>Projects</SectionTitle>
                  </Divider>
                </TileSectionHeader>
                {isExpanded && (
                  <TeamTileSection isLast>
                    <Projects
                      projects={teamProjects}
                      history={history}
                      updateTeams={updateTeams}
                    />
                    <StroveButton
                      isPrimary
                      padding="5px"
                      minWidth="150px"
                      maxWidth="150px"
                      margin="10px"
                      borderRadius="2px"
                      text="Add Project"
                      onClick={() => {
                        setTeamId(team.id)
                        setAddProjectModal(true)
                      }}
                    />
                  </TeamTileSection>
                )}
              </TeamTile>
            )}
          </TeamTileWrapper>
        )
      })}
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
      <Modal
        width={isMobileOnly && '80vw'}
        mindWidth="40vw"
        height={isMobileOnly ? '30vh' : '20vh'}
        isOpen={warningModal.visible}
        onRequestClose={() => setWarningModal(emptyWarningModalContent)}
        contentLabel="Warning"
        ariaHideApp={false}
      >
        {warningModal.content}
        {warningModal.buttonLabel && (
          <ModalButton
            isPrimary
            onClick={warningModal.onSubmit}
            text={warningModal.buttonLabel}
            padding="5px"
            maxWidth="150px"
          />
        )}
        <ModalButton
          onClick={closeWarningModal}
          text="Close"
          padding="5px"
          maxWidth="150px"
        />
      </Modal>
    </>
  )
}

export default memo(withRouter(PersonalTeam))
