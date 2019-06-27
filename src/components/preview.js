import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'

import { projectSelectors, selectors } from 'state'
import SEO from 'components/seo'

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
`

const getUserToken = selectors.getData('user', {}, 'siliskyToken')

const getSelectedProject = projectSelectors.getProjectData

const Preview = () => {
  const token = useSelector(getUserToken)
  const project = useSelector(getSelectedProject)
  const id = project.machineId
  const port = project.previewPort

  return (
    <>
      <SEO title="Preview" />
      <StyledIframe
        src={`https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/preview?token=${token}&id=${id}&port=${port}`}
      />
    </>
  )
}

export default Preview
