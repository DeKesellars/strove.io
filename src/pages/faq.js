import React, { useEffect } from 'react'
import styled from 'styled-components'

import SEO from 'components/seo'
import Layout from 'components/layout'
import { useScroll } from '../hooks'

const TextWell = styled.div`
  color: black;
  height: auto;
  width: 60vw;
  margin: 0vw 7.5vw 0 7.5vw;
  padding: 3vh;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: left;
  text-justify: inter-word;
  background-color: white;
`
const Paragraph = styled.p`
  text-indent: 50px;
  font-size: 20px;
  display: inline-block;
`

const Button = styled.div`
  font-size: 22;
  display: inline-block;
`

const Header = styled.h3`
  font-size: 22;
  display: inline-block;
`

const TopicWrapper = styled.div``

const topics = [
  {
    header: 'Can I work on mobile apps or Windows/MacOS apps?',
    paragraph: `Yes and no. Here is an overview:
Silisky runs code on Linux-based virtual machines and nearly anything that works on Linux Ubuntu works on Silisky as well.
Mobile development using solutions such as React Native and Expo or native desktop development using solutions such as Electorn is possible.
You won't be able to use Silisky if you rely on Windows or MacOS environments. This includes working on iPhone apps using XCode.
    `,
  },
  {
    header: 'Is Silisky free?',
    paragraph:
      'Yes, each user gets up to 2 GB of RAM and 4 public projects in the free plan. Universities',
  },
  {
    header: 'Can I have more than 4 repositories?',
    paragraph: `Yes, we have a pro plan prepared to very active developers working on multiple projects.`,
  },
  {
    header: 'Why does project load several seconds',
    paragraph: `Giving users access to programming environment requires virtual machine access. Here is an overview of what happens when you start a new project:
1. A new Docker container is started on one of virtual machines.
2. Silisky provides read and write access to the project folder.
3. Silisky clones your repository from a chosen git provider.
4. Init script from silisky.json is run if it's present.`,
  },
  {
    header: 'Why do i need to log in with Github/Gitlab',
    paragraph: 'Yes',
  },
  {
    header: 'How to manage env variables?',
    paragraph: 'Hello',
  },
  {
    header: 'Why is my project loading?',
    paragraph: 'I do not know ask Adam',
  },

  {
    header: 'I want seelsd?????? language version what to do',
    paragraph: ' Hello, how are you?',
  },
  {
    header: 'HOST 0.0.0.0',
    paragraph: 'Yyyyyyyyyyyy',
  },
]

const FAQ = () => {
  const [executeScroll, scrollHtmlAttributes] = useScroll()
  const topicId =
    window?.location?.href?.match(/#(.*)/) &&
    window.location.href.match(/#(.*)/)[1]

  const reloadPageWithHash = index => {
    window.location.replace('http://localhost:8000/faq#' + index)
  }

  useEffect(() => {
    topicId && executeScroll()
  }, [topicId])

  return (
    <Layout>
      <SEO title="FAQ" />
      <TextWell>
        <h1 style={{ alignSelf: 'center' }}>FAQ</h1>
        {topics.map((topic, index) => (
          <TopicWrapper key={topic.header}>
            <Button onClick={() => reloadPageWithHash(index + 1)}>#</Button>
            {index + 1 === +topicId ? (
              <Header {...scrollHtmlAttributes}>{`${index + 1}. ${
                topic.header
              }`}</Header>
            ) : (
              <Header>{`${index + 1}. ${topic.header}`}</Header>
            )}
            {typeof topic.paragraph === 'string' ? (
              topic.paragraph
                .split('\n')
                .map((item, i) => <Paragraph key={i}>{item}</Paragraph>)
            ) : (
              <Paragraph>{topic.paragraph}</Paragraph>
            )}
          </TopicWrapper>
        ))}
      </TextWell>
    </Layout>
  )
}

export default FAQ
