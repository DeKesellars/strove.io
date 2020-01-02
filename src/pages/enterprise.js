import React, { useState, memo } from 'react'
import styled, { keyframes, css } from 'styled-components'
import { isMobileOnly, isTablet } from 'react-device-detect'
import { useDispatch } from 'react-redux'
import { Formik, Form, Field } from 'formik'
import isEmail from 'validator/lib/isEmail'

import { SEND_EMAIL } from 'queries'
import { mutation } from 'utils'
import { SEO, Modal, Header } from 'components'

const ButtonFadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const StyledTrialInfo = styled.ul`
  font-size: 13px;
  padding: 0;
  margin: 0;
  color: ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
  li {
    display: inline-block;
    margin-right: 8px;
    list-style: none;
    &:before {
      margin-right: 0.3em;
      content: '✔';
      color: ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
    }
  }
`

const CardsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 20px;
  animation: ${ButtonFadeIn} 0.3s ease-out;
  @media (max-width: 1366px) {
    flex-direction: column;
  }
`

const StyledH6 = styled.h6`
  margin: 20px;
  color: ${({ theme }) => theme.colors.c1};
`

const EmailFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 400px;
  flex-wrap: wrap;
  margin: 10px 0 5px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border-radius: 5px;
  transition: all 0.2s ease;
  opacity: 0.9;
  align-items: center;
  background: ${({ theme }) => theme.colors.c1};
  ${({ isMobile }) =>
    isMobile &&
    css`
      flex-direction: column;
      box-shadow: none;
      min-width: 100px;
      border-radius: 5px;
    `}
  &:hover {
    opacity: 1;
    box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
      0 9px 26px 0 rgba(174, 174, 186, 0.16);
    ${({ isMobile }) =>
      isMobile &&
      css`
        box-shadow: none;
      `}
  }
  input {
    box-shadow: none;
    color: ${({ theme }) => theme.colors.c12};
    outline: 0;
    background: ${({ theme }) => theme.colors.c2};
    width: calc(100% - 156px);
    height: 56px;
    padding: 0;
    padding-left: 64px;
    padding-top: 10px;
    padding-bottom: 10px;
    line-height: 36px;
    font-size: 17px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    letter-spacing: 0.2px;
    border: 0;
    border-radius: 5px;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
    ${({ isMobile }) =>
      isMobile &&
      css`
        flex-direction: column;
        box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
          0 8px 24px 0 rgba(174, 174, 186, 0.16);
        border-radius: 5px;
        width: 100%;
      `}
  }
  svg {
    position: absolute;
    top: 18px;
    left: 20px;
    height: 24px;
    width: 24px;
    g {
      stroke: ${({ theme }) => theme.colors.c1};
    }
  }
  button {
    width: 156px;
    height: 56px;
    color: ${({ theme }) => theme.colors.c2};
    background: ${({ theme }) => theme.colors.c1};
    text-transform: uppercase;
    display: block;
    text-align: center;
    padding: 0;
    border: 0;
    font-size: 14px;
    font-weight: bold;
    line-height: normal;
    letter-spacing: 0.8px;
    transition: opacity 0.2s;
    border-radius: 5px;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
    outline: none;
    ${({ isMobile }) =>
      isMobile &&
      css`
        box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
          0 8px 24px 0 rgba(174, 174, 186, 0.16);
        border-radius: 5px;
        width: 100%;
        margin-top: 10px;
      `}
    ${props =>
      !props.disabled
        ? css`
            cursor: pointer;
            &:hover {
              opacity: 1;
              box-shadow: 0 3px 5px 0 rgba(174, 174, 186, 0.24),
                0 9px 26px 0 rgba(174, 174, 186, 0.16);
            }
          `
        : css`
            cursor: not-allowed;
          `}
  }
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 75%;
  margin: 15px 0 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
  border-width: 1px;
  border-style: solid;
  color: ${({ team, theme }) => (team ? theme.colors.c1 : theme.colors.c2)};
  border-radius: 4px;
  border-color: ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
  box-shadow: 0 1.1vh 1.1vh -1.5vh ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
  transition: all 0.2s ease;
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
        box-shadow: 0 1.3vh 1.3vh -1.3vh ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
        transform: translateY(-3px);
      }
    `}
  @media (max-width: 1366px) {
    box-shadow: 0 1.2vh 1.2vh -1.5vh ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
  }
`

const Card = styled.div`
  background-color: ${({ team, enterprise, theme }) => (enterprise ? theme.colors.c3 : team ? theme.colors.c1 : theme.colors.c2)};
  z-index: auto;
  border-radius: 5px;
  border-color: ${({ theme }) => theme.colors.c1};
  border-width: 1px;
  border-style: solid;
  padding: 50px 20px;
  box-shadow: 0 1.5vh 1.5vh -1.5vh ${({ theme }) => theme.colors.c1};
  width: ${({ enterprise }) => enterprise ? '38vw' : '30vw'};
  height: auto;
  @media (max-width: 1366px) {
    width: 80vw;
    margin: 10px 0;
  }
`

const PricingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  @media (max-width: 1366px) {
    width: 90%;
  }
`

const ModalWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
`

const Text = styled.p`
  color: ${({ theme }) => theme.colors.c1};
  font-size: 15px;
  margin-bottom: 12px;
  white-space: normal;
  text-overflow: wrap;
  overflow: visible;
`
const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: ${props =>
    props.mobile === 'mobile'
      ? '85%'
      : props.mobile === 'tablet'
      ? '60%'
      : '45%'};
`

const PricingSection = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  height: 100%;
  @media (max-width: 1366px) {
    flex-direction: column;
  }
  span {
    width: 75%;
  }
`

const Feature = styled.p`
  color: ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
  font-size: 15px;
  margin-top: 0.7vh;
  margin-bottom: 0.7vh;

  &:before {
    margin-right: 0.3em;
    content: '✔';
    color: ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
  }
`
const ImportantPricingInfo = styled.span`
  margin: 10px 0;
  font-size: 26px;
  color: ${({ team, theme }) => (team ? theme.colors.c2 : theme.colors.c1)};
  font-weight: 500;
`
const Price = styled(ImportantPricingInfo)`
  margin: 0;
`

const PricingDetails = styled(ImportantPricingInfo)`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.c15};
`

const ButtonText = styled(ImportantPricingInfo)`
  font-size: 16px;
  cursor: pointer;
`

const PlanDesc = styled(Feature)`
  font-size: 15px;

  &:before {
    content: none;
  }
`

const CardTitle = styled(ImportantPricingInfo)`
  font-size: 36px;
`

const PricingHeader = styled(CardTitle)`
  margin-top: 40px;
`

const validate = values => {
  let errors = {}

  if (!values.email) {
    errors.email = 'Required'
  } else if (!isEmail(values.email)) {
    errors.email = 'Invalid email address'
  }

  return errors
}

const PricingPage = () => {
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const [modalVisible, setModalVisible] = useState(false)

  const device = isMobileOnly ? 'mobile' : isTablet ? 'tablet' : 'computer'

  return (
    <>
      <Modal
        isOpen={!!modalVisible}
        onRequestClose={() => setModalVisible(false)}
        contentLabel="Activate Pro plan"
        ariaHideApp={false}
        width={isMobileOnly ? '70vw' : isTablet ? '50vw' : '30vw'}
        height={isMobileOnly ? '40vh' : '25vh'}
        zIndex={99}
      >
        <ModalWrapper>
          <CardTitle>Congratulations!</CardTitle>
          <Text>Your purchase has been successfully completed.</Text>
          <ButtonsWrapper mobile={device}>
            <Button onClick={() => setModalVisible(false)}>Close</Button>
          </ButtonsWrapper>
        </ModalWrapper>
      </Modal>
      <>
        <SEO title="Pricing" />
        <Header />
        <PricingHeader>Choose the plan that’s right for your team</PricingHeader>
        <PlanDesc>Pay by month or the year, and cancel at any time.</PlanDesc>
        <CardsWrapper>
          <Card>
            <PricingSection>
              <PricingWrapper>
                <CardTitle>Individuals</CardTitle>
                <ImportantPricingInfo>Free</ImportantPricingInfo>
                <PlanDesc>The basic plan for individual developers</PlanDesc>
                <Feature>Public repositories</Feature>
                <Feature>5 GB of RAM</Feature>
                <Feature>35 hours/month</Feature>
                <Feature>No commercial use</Feature>
                <Button disabled>
                  <ButtonText team>Already subscribed</ButtonText>
                </Button>
                <StyledTrialInfo>
                  <li>Free for non-commercial use</li>
                </StyledTrialInfo>
              </PricingWrapper>
            </PricingSection>
          </Card>
          <Card team>
            <PricingSection>
              <PricingWrapper>
                <CardTitle team>Team</CardTitle>
                <PlanDesc team>
                  For small and medium sized teams and businesses
                </PlanDesc>
                <Price team>40$</Price>
                <PricingDetails>per person, per month, when billed yearly<br />$50 USD/person, per month, when billed monthly</PricingDetails>
                <ImportantPricingInfo team>Top features:</ImportantPricingInfo>
                <Feature team>Unlimited coding time</Feature>
                <Feature team>Team management</Feature>
                <Feature team>Private repositories</Feature>
                <Feature team>Access restriction</Feature>
                <Feature team>Priority support</Feature>
                <Button team>
                  <ButtonText>Get started</ButtonText>
                </Button>
                <StyledTrialInfo team>
                  <li>Free 14-day Demo</li>
                  <li>No credit card needed</li>
                  <li>No setup</li>
                </StyledTrialInfo>
              </PricingWrapper>
            </PricingSection>
          </Card>
          <Card enterprise team>
            <PricingSection>
              <PricingWrapper>
                <CardTitle team>Enterprise</CardTitle>
                <PlanDesc team>
                  For larger enterprises or those with custom requirements
                </PlanDesc>
                <PricingDetails>To get a price estimate for Enterprise plan, please contact our Sales team</PricingDetails>
                <ImportantPricingInfo team>Top features:</ImportantPricingInfo>
                <Feature team>Private cloud</Feature>
                <Feature team>Private repositories</Feature>
                <Feature team>
                  RAM, hard drive and speed adjusted to team's needs
                </Feature>
                <Feature team>
                  Active directory - highest code security and control
                </Feature>
                <Feature team>
                  Extensive docker support - multiple containers, custom images
                </Feature>
                <Feature team>Access restriction</Feature>
                <Feature team>Priority support</Feature>
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
                    <Form>
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
                        <button
                          type="submit"
                          disabled={errors.email || !values.email}
                        >
                          Request demo
                        </button>
                      </EmailFormWrapper>
                      {emailSent && (
                        <StyledH6>Thank you, we'll get in touch soon!</StyledH6>
                      )}
                    </Form>
                  )}
                </Formik>
              </PricingWrapper>
            </PricingSection>
          </Card>
        </CardsWrapper>
      </>
    </>
  )
}

export default memo(PricingPage)
