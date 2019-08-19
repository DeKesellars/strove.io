import React, { memo, useState, useEffect } from 'react'
import { StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import DetectBrowser, { isMobileOnly, isTablet } from 'react-detect-browser'

import Modal from 'components/modal'

import Header from './header'
import './layout.css'

const MainContent = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  text-align: center;
  margin: 0 auto;
  max-width: 100vw;
  padding-top: 0;
`

const Layout = ({ children, browser }) => {
  const [modalVisible, setModalVisible] = useState(false)

  useEffect(() => {
    if (
      browser &&
      browser.name !== 'chrome' &&
      browser.name !== 'firefox' &&
      browser.name !== 'opera' &&
      browser.name !== 'safari'
    ) {
      setModalVisible(true)
    }
  }, [browser])

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
          <Modal
            isOpen={modalVisible}
            onRequestClose={() => setModalVisible(false)}
            contentLabel={'Browser not supported'}
            ariaHideApp={false}
            width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
            height={isMobileOnly ? '40vh' : '25vh'}
            zIndex={99}
          >
            Your browser might not provide the best Strove.io user experience.
            We recommend using Google Chrome, Mozilla Firefox, Safari or Opera
          </Modal>
          <Header siteTitle={data.site.siteMetadata.title} />
          <MainContent>{children}</MainContent>
        </>
      )}
    />
  )
}

export default memo(children => (
  <DetectBrowser>
    {({ browser }) => <Layout browser={browser}>{children}</Layout>}
  </DetectBrowser>
))
