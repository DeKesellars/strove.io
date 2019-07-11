import React, { useState, useEffect } from 'react'
import { Formik } from 'formik'
import Modal from 'react-modal'

import Layout from './layout'
import SEO from './seo'
import styled, { keyframes, css } from 'styled-components'
import { Icon } from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import { query, mutation } from 'utils'
import { GET_PROJECTS, DELETE_PROJECT, CONTINUE_PROJECT } from 'queries'
import * as C from 'state/currentProject/constants'
import * as ApiC from 'state/api/constants'
import { selectors } from 'state'
import { createProject } from 'utils'
import Templates from '../components/templates.js'
import Loader from './fullScreenLoader'

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.4;
  }

`

const FullFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }

`

const ButtonFadeIn = keyframes`
0% {
  opacity: 0;
}
100% {
  opacity: 0.9;
}

`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

const PageWrapper = styled(Wrapper)`
  width: 100vw;
`

const TilesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 2vh;
  margin: 2vh;
  animation: ${FullFadeIn} 1s ease-out;
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

const AddProjectWrapper = styled(Tile)`
  width: 50vw;
  margin-top: 5vh;
  height: auto;
  margin-bottom: 0;
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 100%;
  min-width: 70px;
  max-width: 150px;
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
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-decoration: none;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  opacity: 0.9;

  :focus {
    outline: 0;
  }

  &:disabled {
    opacity: 0.4;
  }

  ${props =>
    !props.disabled &&
    css`
      animation: ${ButtonFadeIn} 1s ease-out;
      cursor: pointer;
      &:hover {
        opacity: 1;
        box-shadow: 0 1.2vh 1.2vh -1.3vh #0072ce;
        transform: translateY(-1px);
      }
    `}
`

const ModalButton = styled(Button)`
  animation: ${FullFadeIn} 0.2s ease-out;
`

const GithubLinkInput = styled.input`
  width: 80%;
  border-width: 1px;
  border-style: solid;
  color: #0072ce;
  border-radius: 1vh;
  border-color: #0072ce;
  box-shadow: 0 1vh 1vh -1.5vh #0072ce;
  text-align: center;
  font-size: 1rem;
  padding: 0.5vh 0;
`

const GithubLinkForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  margin: 2vh 0 0;
`

const ProjectTitle = styled.h3`
  font-size: 1.4rem;
  color: #0072ce;
  margin: 0.3vh 0.3vh 0.3vh 0;
`

const Text = styled.p`
  color: #0072ce;
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

const ErrorMessage = styled.p`
  color: red;
  font-size: 0.9rem;
  margin: 0;
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

const StyledIcon = styled(Icon)`
  font-size: 1.7vh;
  color: #0072ce;
`

const StyledModal = styled(Modal)`
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
  height: auto;
  width: 30vw;
  top: 42.5vh;
  left: 35vw;
  position: fixed;
  animation: ${FullFadeIn} 0.2s ease-out;

  :focus {
    outline: 0;
  }
`

const SectionDivider = styled(FlexWrapper)`
  width: 100%;
  flex-direction: row;
`

const SectionDividerLine = styled.div`
  width: 25%;
  border-top: 1px solid #0072ce;
`

const SectionDividerText = styled(ProjectTitle)`
  width: 50%;
  margin: 0.5vh;
`

const validate = values => {
  let errors = {}

  if (!values.repoLink || (values.repoLink && !values.repoLink.trim())) {
    return
  } else if (
    !/.*(github|gitlab|bitbucket).com\/[A-Za-z0-9._%+-]+\/[A-Za-z0-9._%+-]+/i.test(
      values.repoLink.trim()
    )
  ) {
    errors.repoLink = 'Invalid repository link'
  }

  return errors
}

const Dashboard = () => {
  const dispatch = useDispatch()
  const projects = useSelector(selectors.getUserProjects)
  const user = useSelector(selectors.getUser)
  const [isModalVisible, setModalVisible] = useState(false)
  const [projectToDelete, setProjectToDelete] = useState()
  const repoError = useSelector(selectors.getError('myProjects'))
  const isDeleting = useSelector(selectors.getLoading('deleteProject'))

  const handleStartClick = ({ id, editorPort, previewPort, machineId }) => {
    if (!editorPort) {
      dispatch(
        mutation({
          name: 'continueProject',
          mutation: CONTINUE_PROJECT,
          variables: { projectId: id },
          onSuccessDispatch: [
            ({ id, editorPort, previewPort, machineId }) => ({
              type: C.SELECT_CURRENT_PROJECT,
              payload: { id, editorPort, previewPort, machineId },
            }),
          ],
        })
      )
    } else {
      dispatch({
        type: C.SELECT_CURRENT_PROJECT,
        payload: { id, editorPort, previewPort, machineId },
      })
    }
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
            type: ApiC.REMOVE_ITEM,
            payload: { storeKey: 'myProjects', id },
          }),
          () => ({
            type: ApiC.FETCH_SUCCESS,
            payload: { storeKey: 'deleteProject', data: true },
          }),
        ],
      })
    )
  }

  const closeModal = () => {
    setProjectToDelete(null)
    setModalVisible(false)
  }

  useEffect(() => {
    dispatch(
      query({
        name: 'myProjects',
        dataSelector: data => data.myProjects.edges,
        query: GET_PROJECTS,
      })
    )
  }, [])

  return (
    <Layout>
      <SEO title="Dashboard" />
      <PageWrapper>
        <AddProjectWrapper>
          <ProjectTitle>Add project from github repository</ProjectTitle>
          <Formik
            onSubmit={(values, actions) => {
              createProject({
                repoLink: values.repoLink.replace(/.git$/, ''),
                dispatch,
                user,
              })
              actions.setSubmitting(false)
            }}
            validate={validate}
            render={props => (
              <GithubLinkForm onSubmit={props.handleSubmit}>
                <GithubLinkInput
                  type="text"
                  onChange={props.handleChange}
                  onBlur={props.handleBlur}
                  value={props.values.repoLink}
                  name="repoLink"
                  placeholder={'Paste repository link here'}
                />
                {props.errors.repoLink && (
                  <ErrorMessage>{props.errors.repoLink}</ErrorMessage>
                )}
                {repoError &&
                  repoError.message &&
                  repoError.message.includes(
                    'Could not resolve to a Repository'
                  ) && (
                    <ErrorMessage>
                      Provided link leads to a private repository
                    </ErrorMessage>
                  )}
                <Button
                  disabled={!props.values.repoLink || props.errors.repoLink}
                  primary
                  type="submit"
                  style={{ width: '20%' }}
                >
                  Add project
                </Button>
              </GithubLinkForm>
            )}
          />
          <SectionDivider>
            <SectionDividerLine />
            <SectionDividerText>
              Or try out one of the templates
            </SectionDividerText>
            <SectionDividerLine />
          </SectionDivider>
          <Templates user={user} />
        </AddProjectWrapper>
        <TilesWrapper>
          {projects.map(project => (
            <Tile key={project.id}>
              <VerticalDivider>
                <InfoWrapper>
                  <ProjectTitle>{project.name}</ProjectTitle>
                  <TextWrapper>
                    <StyledIcon type="calendar" />
                    <Text>{project.createdAt}</Text>
                  </TextWrapper>
                  <TextWrapper>
                    <StyledIcon type="edit" />
                    <Text>
                      {project.description
                        ? project.description
                        : 'This is the project description.. Tribute'}
                    </Text>
                  </TextWrapper>
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
                  <Button
                    to="/app/editor/"
                    primary
                    onClick={() => handleStartClick(project)}
                  >
                    Start
                  </Button>
                  {isDeleting ? (
                    <Button disabled={isDeleting}>
                      <Loader
                        isFullScreen={false}
                        color={'#0072ce'}
                        height={'1.2rem'}
                      />
                    </Button>
                  ) : (
                    <Button
                      onClick={() => {
                        setModalVisible(true)
                        setProjectToDelete(project)
                      }}
                    >
                      Delete
                    </Button>
                  )}
                </RightSection>
              </VerticalDivider>
            </Tile>
          ))}
        </TilesWrapper>
      </PageWrapper>
      <StyledModal
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
          primary
          onClick={() => {
            handleDeleteClick(projectToDelete.id)
            setModalVisible(false)
          }}
        >
          Confirm
        </ModalButton>
        <ModalButton onClick={closeModal}>Close</ModalButton>
      </StyledModal>
    </Layout>
  )
}

export default Dashboard
