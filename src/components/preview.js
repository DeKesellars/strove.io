import React, { useState } from 'react'
import styled from 'styled-components'
import { useSelector } from 'react-redux'
import getOr from 'lodash/fp/getOr'

import { selectors } from 'state'
import SEO from 'components/seo'
import Loader from 'components/fullScreenLoader.js'

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 100vh;
  width: 100vw;
  margin: 0;
`

const getMachineId = getOr(undefined, ['currentProject', 'machineId'])
const getPreviewPort = getOr(undefined, ['currentProject', 'previewPort'])
const getUserToken = selectors.getApiData('user', {}, 'siliskyToken')

const Preview = () => {
  const token = useSelector(getUserToken)
  const id = useSelector(getMachineId)
  const port = useSelector(getPreviewPort)
  const [loaderVisible, setLoaderVisible] = useState(true)

  return (
    <>
      <SEO title="Preview" />
      {loaderVisible && (
        <Loader
          isFullScreen={true}
          color={'#0072ce'}
          style={{
            opacity: loaderVisible ? 1 : 0,
            transition: 'opacity 0.5s',
          }}
        />
      )}
      <StyledIframe
        onLoad={() => setLoaderVisible(false)}
        src={`${process.env.SILISKY_ENDPOINT}/preview?token=${token}&id=${id}&port=${port}`}
        style={{ opacity: loaderVisible ? 0 : 1, transition: 'opacity 0.5s' }}
      />
    </>
  )
}

export default Preview
