import React from "react"
import { Link } from "gatsby"
import styled from 'styled-components'

import Layout from "../components/layout"
import SEO from "../components/seo"

const StyledIframe = styled.iframe`
  display: block;
  background: #000;
  border: none;
  min-height: 93vh;
  width: 100vw;
  margin: 0;
`

const Editor = () => (
  <Layout>
    <SEO title="Page two" />
    <StyledIframe src="https://dmb9kya1j9.execute-api.eu-central-1.amazonaws.com/development/editor" />
  </Layout>
)

export default Editor
