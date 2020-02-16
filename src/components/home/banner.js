import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Icon } from 'antd'
import { isMobileOnly, isMobile } from 'react-device-detect'
import isEmail from 'validator/lib/isEmail'
import { Formik, Field } from 'formik'

import { theme } from 'consts'
import { mutation } from 'utils'
import { SEND_EMAIL } from 'queries'
import { GetStarted, Logos, TrialInfo, StroveButton } from 'components'

import {
  StyledModal,
  StyledCellHeader,
  StyledSectionWrapper,
  StyledIcon,
  StyledHeadingSection,
  StyledH1,
  ButtonsWrapper,
  StyledProductDescription,
  StyledInfo,
  StyledForm,
  EmailFormWrapper,
  Illustration,
  SectionDivider,
  IconContainer,
  StyledH3,
  SectionWrapper,
  SmallSectionWrapper,
  StyledCell,
  StyledH2,
  StyledGrid,
  StyledHeaderText,
  StyledFeatureDescription,
  StyledSmallText,
  StyledTechnologyDescriptionWrapper,
  StyledSectionIcon,
  DemoImage,
} from './styled'

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const defaultTechnologyDescription =
  'Strove.io represents each environment as a Docker container built from a shared image. This lets you code in seconds, on any computer and forget that `it works on my machine` issue ever existed.'

const Banner = () => {
  const [isModalVisible, setModalVisible] = useState(false)
  const dispatch = useDispatch()
  const closeModal = () => setModalVisible(false)
  const [emailSent, setEmailSent] = useState(false)
  const [technologyDescription, setTechnologyDescription] = useState(
    defaultTechnologyDescription
  )
  const handleHoverIn = logo => setTechnologyDescription(logo)

  return (
    <>
      <StyledSectionWrapper
        padding={isMobileOnly ? '20px' : '50px'}
        isMobileOnly={isMobileOnly}
      >
        <StyledHeadingSection type={isMobileOnly ? 'bottom' : 'right'}>
          <StyledH1>Cloud alternative for software development</StyledH1>
          <StyledProductDescription>
            Manage team. Write, run and share code, all in one place
          </StyledProductDescription>
          <ButtonsWrapper mobile={isMobileOnly}>
            <StroveButton
              height="56px"
              width="100%"
              fontSize="1.3rem"
              fontWeight="bold"
              isPrimary
              text="Get started"
              letterSpacing="0.8px"
              onClick={() => setModalVisible(true)}
            />
            <TrialInfo>
              <li>Free demo</li>
              <li>No credit card needed</li>
              <li>No setup</li>
            </TrialInfo>
            <StyledInfo>Or, if you're a corporate user:</StyledInfo>
            <Formik
              initialValues={{
                email: '',
              }}
              validate={validate}
              onSubmit={values => {
                dispatch(
                  mutation({
                    name: 'sendEmail',
                    context: null,
                    mutation: SEND_EMAIL,
                    variables: { email: values.email, isDemo: true },
                    onSuccess: () => setEmailSent(true),
                  })
                )
              }}
            >
              {({ errors, values }) => (
                <StyledForm>
                  <EmailFormWrapper
                    disabled={errors.email || !values.email}
                    isMobile={isMobileOnly}
                  >
                    <Field
                      type="email"
                      name="email"
                      placeholder="Your Email"
                    ></Field>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="#9CA2B4"
                        strokeWidth="2"
                      >
                        <path d="M2 4h20v16H2z"></path>
                        <path d="M2 7.9l9.9 3.899 9.899-3.9"></path>
                      </g>
                    </svg>
                    <StroveButton
                      type="submit"
                      layout="form"
                      text="Request demo"
                      disabled={errors.email || !values.email}
                    />
                  </EmailFormWrapper>
                  {emailSent && (
                    <StyledInfo>Thank you, we'll get in touch soon!</StyledInfo>
                  )}
                </StyledForm>
              )}
            </Formik>
          </ButtonsWrapper>
        </StyledHeadingSection>
        {!isMobileOnly && (
          <Illustration
            src={require('assets/illustration.png')}
            alt="illustration"
            width="50%"
            height="50%"
          />
        )}
      </StyledSectionWrapper>
      <StyledSectionWrapper
        isSecondary
        background={theme.colors.c2}
        padding={`20px ${isMobile ? '20px' : '25%'}`}
        isMobileOnly={isMobileOnly}
      >
        <SectionDivider flexDirection="column">
          <IconContainer>
            <StyledSectionIcon type="laptop" />
          </IconContainer>
          <StyledH3 color={theme.colors.c3}>
            Toolkit for modern software organizations
          </StyledH3>
          <StyledProductDescription color={theme.colors.c26}>
            Whether you’re creating a banking app, an e-commerce store, or a
            crowdfunding platform, Strove will allow you to deliver your
            features more efficiently and with less effort
          </StyledProductDescription>
        </SectionDivider>
      </StyledSectionWrapper>
      <StyledSectionWrapper
        isSecondary
        padding="20px"
        background="white"
        isMobileOnly={isMobileOnly}
      >
        <SectionDivider isMobile={isMobile}>
          <SectionWrapper isMobile={isMobile} padding="20px 10px">
            <SmallSectionWrapper isMobile={isMobile}>
              <StyledCell>
                <StyledCellHeader>
                  <StyledH2 color={theme.colors.c3}>Save time</StyledH2>
                </StyledCellHeader>
                <StyledProductDescription>
                  Save hours to days per developer by running code in seconds
                  from anywhere
                </StyledProductDescription>
              </StyledCell>
            </SmallSectionWrapper>
          </SectionWrapper>
          <SectionWrapper padding="20px 10px">
            <DemoImage
              shadowOpacity="0.3"
              src={require('assets/editor.png')}
              alt="editor image"
            />
          </SectionWrapper>
        </SectionDivider>
      </StyledSectionWrapper>
      <StyledSectionWrapper
        isSecondary
        padding="50px 20px 50px"
        background={theme.colors.c27}
        isMobileOnly={isMobileOnly}
      >
        <SectionDivider isMobile={isMobile}>
          <SectionWrapper isMobile={isMobile} padding="20px 10px">
            <SectionWrapper isMobile={isMobile}>
              <DemoImage
                shadowOpacity="0.1"
                src={require('assets/teams.png')}
                alt="teams image"
              />
            </SectionWrapper>
          </SectionWrapper>
          <SectionWrapper>
            <SmallSectionWrapper padding="20px 10px">
              <StyledCell>
                <StyledCellHeader>
                  <StyledH2 color={theme.colors.c3}>
                    More effective collaboration
                  </StyledH2>
                </StyledCellHeader>
                <StyledProductDescription>
                  Spend more time on what matters by reducing managing
                  permissions or sharing environment to a single click
                </StyledProductDescription>
              </StyledCell>
            </SmallSectionWrapper>
          </SectionWrapper>
        </SectionDivider>
      </StyledSectionWrapper>
      <StyledSectionWrapper
        isSecondary
        padding="0 20px 20px"
        background={theme.colors.c27}
        isMobileOnly={isMobileOnly}
      >
        <StyledGrid>
          <StyledCell>
            <StyledCellHeader>
              <IconContainer>
                <Icon type="clock-circle" style={{ color: theme.colors.c1 }} />
              </IconContainer>
              <StyledHeaderText>Give focus a chance</StyledHeaderText>
            </StyledCellHeader>
            <StyledFeatureDescription>
              A lot of time and work is needed to make code work on local
              machines. Choosing cloud environment lets team do their actual job
              from the get go.
            </StyledFeatureDescription>
          </StyledCell>
          <StyledCell>
            <StyledCellHeader>
              <IconContainer>
                <Icon type="bug" style={{ color: theme.colors.c1 }} />
              </IconContainer>
              <StyledHeaderText>Debug less</StyledHeaderText>
            </StyledCellHeader>
            <StyledFeatureDescription>
              Say goodbye to 'It works on my machine' issue. The code will work
              the same for all team members, no matter the machine or operating
              system.
            </StyledFeatureDescription>
          </StyledCell>
          <StyledCell>
            <StyledCellHeader>
              <IconContainer>
                <Icon type="cloud-sync" style={{ color: theme.colors.c1 }} />
              </IconContainer>
              <StyledHeaderText>Development, organized</StyledHeaderText>
            </StyledCellHeader>
            <StyledFeatureDescription>
              Unlike in the past, sharing the environment with anyone in the
              team can be done with a single click.
            </StyledFeatureDescription>
          </StyledCell>
        </StyledGrid>
      </StyledSectionWrapper>
      <StyledSectionWrapper
        isSecondary
        padding="50px 20px 0"
        isMobileOnly={isMobileOnly}
      >
        <SectionWrapper>
          <StyledSmallText isUpperCase>What is strove?</StyledSmallText>
          <StyledH3 color={theme.colors.c2}>
            Strove brings ready in seconds, pre-configured cloud servers to
            write, run, build and manage software remotely
          </StyledH3>
        </SectionWrapper>
      </StyledSectionWrapper>
      <StyledSectionWrapper
        isSecondary
        padding="20px 0"
        isMobileOnly={isMobileOnly}
      >
        <SectionWrapper isSecondary>
          <Logos handleHoverIn={handleHoverIn} />
          <StyledTechnologyDescriptionWrapper isMobile={isMobileOnly}>
            <StyledSmallText>{technologyDescription}</StyledSmallText>
          </StyledTechnologyDescriptionWrapper>
        </SectionWrapper>
      </StyledSectionWrapper>
      <StyledModal
        isOpen={isModalVisible}
        onRequestClose={closeModal}
        ariaHideApp={false}
        isMobile={isMobileOnly}
      >
        {!isMobile && (
          <StyledIcon type="close" onClick={() => setModalVisible(false)} />
        )}
        <GetStarted closeModal={closeModal} />
      </StyledModal>
    </>
  )
}
export default Banner
