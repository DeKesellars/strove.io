import React, { useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Cog } from 'images/svg'
import { Silisky } from 'images/logos'

const SpinToWin = keyframes`
  0% {
    transform: rotate(0deg)
  }
  100% {
    transform: rotate(360deg)
  }
`

const AntiSpinToWin = keyframes`
  0% {
    transform: rotate(360deg)
  }
  100% {
    transform: rotate(0deg)
  }
`

const LoaderWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: ${props => (props.isFullScreen ? '93vh' : props.height)};
  width: ${props => (props.isFullScreen ? '100vw' : props.height)};
`

const LoaderContainer = styled(LoaderWrapper)`
  width: ${props => (props.isFullScreen ? '25vw' : '100%')};
  top: ${props => props.isFullScreen && '3vh'};
  height: auto;
  animation: ${SpinToWin} 3s linear infinite;
`

const LogoContainer = styled.div`
  width: ${props => (props.isFullScreen ? '20vw' : '4vh')};
  position: absolute;
  animation: ${AntiSpinToWin} 3s linear infinite;
`

const Text = styled.p`
  color: #0072ce;
  font-size: 1rem;
  margin-left: 2%;
  margin-bottom: 0;
  margin-top: 15px;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`

const allMessages = {
  isAddProject: [
    'Accessing repository',
    'Reserving resources',
    'Cloning repository',
    'Starting virtual machine',
    'Launching editor',
  ],
  isContinueProject: [],
  isUseTemplate: [],
}

const Loader = props => {
  const [messagesArray, setMessagesArray] = useState([])
  const [message, setMessage] = useState('')

  if (props.isAddProject) {
    messagesArray = allMessages.isAddProject
  }

  if (props.isContinueProject) {
    messagesArray = allMessages.isContinueProject
  }

  if (props.isUseTemplate) {
    messagesArray = allMessages.isUseTemplate
  }

  return (
    <LoaderWrapper {...props}>
      <LoaderContainer {...props}>
        <Cog fill={props.color} />
        {props.isFullScreen && (
          <LogoContainer {...props}>
            <Silisky style={{ width: '100%', height: 'auto' }} fill="#0072ce" />
          </LogoContainer>
        )}
        {console.log(props)}
      </LoaderContainer>
      {(props.isAddProject ||
        props.isContinueProject ||
        props.isUseTemplate) && <Text>messages</Text>}
    </LoaderWrapper>
  )
}

export default Loader
