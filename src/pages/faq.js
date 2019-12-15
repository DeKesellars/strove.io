import React, { memo } from 'react'
import styled from 'styled-components'
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion'
import { isMobile } from 'react-device-detect'

import { SEO, Header } from 'components'

const StyledAccordion = styled(Accordion)`
  .accordion__item + .accordion__item {
    border-top: 1px solid rgba(0, 0, 0, 0.1);
  }

  .accordion__button {
    position: relative;
    cursor: pointer;
    padding: 18px;
    width: 100%;
    text-align: left;
    border: none;
    outline: none;
  }

  .accordion__button:hover {
    background-color: ${({ theme }) => theme.colors.c4};
  }

  .accordion__panel {
    padding: 0 20px 30px;
    animation: fadein 0.35s ease-in;
  }

  @keyframes fadein {
    0% {
      opacity: 0;
    }

    100% {
      opacity: 1;
    }
  }
`

const TextWell = styled.div`
  color: ${({ theme }) => theme.colors.c3};
  height: auto;
  width: ${isMobile ? '100vw' : '60vw'};
  margin: 0vw 7.5vw 0 7.5vw;
  padding: 3vh;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  text-align: left;
  text-justify: inter-word;
  background-color: ${({ theme }) => theme.colors.c2};
`
const Paragraph = styled.p`
  text-indent: 30px;
  font-size: 20px;
  display: inline-block;
  padding-top: 0;
`

const QuestionHeader = styled.h3`
  font-size: 22;
  display: inline-block;
`

const topics = [
  {
    header: 'Why should I use Strove.io?',
    paragraph: `Strove.io solves 3 problems programmers face:
      1. Programmers waste a lot of time on setting up the environment - this problem is very troublesome for many teams and has been our initial inspiration to start working on this project.
      Strove.io can cut the time to set a programming environment to seconds.
      2. It is hard to use different computers when working on a project and code breaks across different devices and operating systems.
      In Strove.io the code lives in a cloud. This makes it possible to resume working on a project from any computer with internet access.
      3. 'It works on my machine' problem.
      Strove.io lets programmers use their favorite devices without sacrificing productivity. All team members access instances of the same programming environment, no matter if they use Macbook or an old PC.
    `,
  },
  {
    header: 'Is Strove.io secure?',
    paragraph: `We wrote Strove.io with security in mind. We store code in state of the art cloud provider - Google Cloud and all the connections to the it are encrypted using SSL to prevent third parties from hijacking any kind of information.
      Projects in Strove.io are run within Docker containers and because of that files used within a project are not accessible to unauthorized users.
      Many tech-forward companies are trying to store as much code in the cloud as possible as it\x27s easier to steal it from physical devices. Security advantage over using traditional way of coding is one of the reasons we started working on Strove.io.`,
  },
  {
    header: 'Why do i need to log in with Github/Gitlab/Bitbucket?',
    paragraph:
      'Aforementioned providers only allow apps to clone if the user is logged in.',
  },
  {
    header: 'How to manage env variables?',
    paragraph: `To add environment variables create a file that will store them such as .env.development.
      Environment variables will be stored inside your project alone and they will not be shared, as long as files they live in are ignored by git.
      This prevents users from accidentally sharing them even if you share your project using a link such as https://strove.io/#https://github.com/stroveio/2048-clone.`,
  },
  {
    header: 'Is Strove free?',
    paragraph:
      'It is for open-source and public projects. Each user gets at least 5 GB of RAM and 4 public projects in the free plan.',
  },
  {
    header:
      'I am not able to preview my application from within the IDE even though server is running! What should I do?',
    paragraph:
      'This is most likely due to your app not running on host 0.0.0.0. Some frameworks and servers choose a different port and you can almost always specify that you want host 0.0.0.0 instead.',
  },
  {
    header: 'Can I have more than 4 repositories?',
    paragraph: `Yes, we have a pro plan prepared for very active developers working on multiple projects. Pro plan has a limit of 12 repositories.`,
  },
  {
    header: 'Why does project load several seconds?',
    paragraph: `Giving users access to programming environment requires virtual machine access. Here is an overview of what happens when you start a new project:
1. We check if user has permissions to clone the repository.
2. A new Docker container is started on one of virtual machines.
3. Strove provides read and write access to the project folder.
4. Your repository is cloned from a chosen git provider.
5. Init script from strove.json is run if it's present.`,
  },
  {
    header: 'Can I work on mobile apps or Windows/MacOS apps?',
    paragraph: `Yes and no. Here is an overview:
Strove runs code on Linux-based virtual machines and nearly anything that works on Linux Ubuntu works on Strove as well.
Mobile development using solutions such as React Native and Expo or native desktop development using solutions such as Electorn is possible.
You won't be able to use Strove if you rely on Windows or MacOS environments. This includes working on iPhone apps using XCode.
    `,
  },
  {
    header:
      'I want a particular language version that\x27s not yet supported. What should I do to make it work?',
    paragraph:
      'Right now they only way is to contact us on contact@strove.io. We will add it as soon as possible. We plan to add servers tailored for company needs with predefined language versions in the future.',
  },
  {
    header: 'Can I use Docker inside my project?',
    paragraph:
      'Strove.io is built with Docker and we value this technology greatly. Supporting it requires some additional work on our side but it\x27s one of the most important features on our roadmap.',
  },
  {
    header: 'Where should I report a bug or request a feature?',
    paragraph: (
      <span>
        The best place is our github repository -{' '}
        <a
          href="https://github.com/stroveio/strove.io-client/issues"
          target="_blank"
          rel="noopener noreferrer"
        >
          link here
        </a>
      </span>
    ),
  },
  {
    header: 'Why is the company not called Strove but Codengo',
    paragraph: (
      <span>
        We made a company before we had a good idea for a name. We are currently
        procrastinating on updading our company name to Strove.
      </span>
    ),
  },
  {
    header: 'Why am I only limited to 4 ports by default?',
    paragraph: (
      <span>
        We run multiple projects on one machine using Docker and two users could
        use the same ports if we did not implement the limit. Docker requires
        specifying which ports should the user take so to support any number of
        ports, we would have to let the first user take all the ports. If this
        number proves too small for you please, do let us know at{' '}
        <a href="mailto:contact@strove.io">contact@strove.io</a>.
      </span>
    ),
  },
  {
    header: 'I didn\x27t find an answer I was looking for.',
    paragraph: (
      <span>
        No worries, contact us at{' '}
        <a href="mailto:contact@strove.io">contact@strove.io</a>.
      </span>
    ),
  },
]

const FAQ = () => (
  <>
    <SEO title="FAQ" />
    <Header />
    <TextWell>
      <StyledAccordion
        allowZeroExpanded
        allowMultipleExpanded
        preExpanded={[...Array(topics.length).keys()]}
      >
        {topics.map((topic, index) => (
          <AccordionItem key={topic.header} uuid={index}>
            <AccordionItemHeading>
              <AccordionItemButton>
                <QuestionHeader>{`${index + 1}. ${
                  topic.header
                }`}</QuestionHeader>
              </AccordionItemButton>
            </AccordionItemHeading>

            {typeof topic.paragraph === 'string' ? (
              topic.paragraph.split('\n').map((item, i) => (
                <AccordionItemPanel>
                  <Paragraph key={i}>{item}</Paragraph>
                </AccordionItemPanel>
              ))
            ) : (
              <AccordionItemPanel>
                <Paragraph>{topic.paragraph}</Paragraph>
              </AccordionItemPanel>
            )}
          </AccordionItem>
        ))}
      </StyledAccordion>
    </TextWell>
  </>
)

export default memo(FAQ)
