import React, { memo } from 'react'
import styled from 'styled-components/macro'
import { useSelector } from 'react-redux'

import { selectors } from 'state'

const StyledIframe = styled.iframe`
  display: block;
  background: ${({ theme }) => theme.colors.c3};
  border: none;
  min-height: calc(100vh - 20px);
  width: 100vw;
  margin: 0;
  opacity: ${({ loaderVisible }) => (loaderVisible ? 0 : 1)};
`

const Editor = ({ machineName, port, onLoad, isEmbed, loaderVisible }) => {
  const token = useSelector(selectors.getToken)
  const randomId = Math.random()
    .toString(36)
    .substring(7)

  return (
    <StyledIframe
      isEmbed={isEmbed}
      loaderVisible={loaderVisible}
      onLoad={onLoad}
      src={`${process.env.REACT_APP_STROVE_URL}vm/${machineName}/${port}/?r=${randomId}&folder=/home/strove/project&token=Bearer ${token}`}
    />
  )
}

export default memo(Editor)
