import React, { useState, memo } from 'react'
import QueueAnim from 'rc-queue-anim'
import Logos from 'components/logos.js'
import styled, { css } from 'styled-components'
import { useDispatch } from 'react-redux'
import { isMobileOnly } from 'react-device-detect'
import isEmail from 'validator/lib/isEmail'
import { Formik, Form, Field } from 'formik'

import { mutation } from 'utils'
import { SEND_EMAIL } from 'queries'

const StyledTitle = styled.h2`
  font-weight: 600;
`

const StyledH6 = styled.h6`
  margin: 50px 20px 0;
`

const EmailFormWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  min-width: 400px;
  flex-wrap: wrap;
  margin: 20px 0 5px;
  position: relative;
  box-shadow: 0 2px 4px 0 rgba(174, 174, 186, 0.24),
    0 8px 24px 0 rgba(174, 174, 186, 0.16);
  background: #fff;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  border-radius: 5px;
  transition: all 0.2s ease;
  opacity: 0.9;
  align-items: center;

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
    color: #333e63;
    outline: 0;
    background: #fff;
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
      stroke: #0072ce;
    }
  }

  button {
    width: 156px;
    height: 56px;
    color: #fff;
    background: #0072ce;
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

const StyledFormWrapper = styled.div`
  max-width: 480px;
  align-self: center;
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

const Technologies = () => {
  const [selectedLogo, setSelectedLogo] = useState()
  const handleHoverIn = logo => setSelectedLogo(logo)
  const handleHoverOut = () => setSelectedLogo('')
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()

  return (
    <div className="home-page page2">
      <div className="home-page-wrapper">
        <div className="title-line-wrapper page2-line">
          <div className="title-line" />
        </div>
        <StyledTitle>On the shoulders of giants</StyledTitle>
        <QueueAnim
          key="queue"
          type="bottom"
          leaveReverse
          className="page2-content"
        >
          <p key="p" className="page-content">
            {!selectedLogo
              ? `Powered by technologies from the biggest players`
              : selectedLogo}
          </p>
          <Logos
            handleHoverIn={handleHoverIn}
            handleHoverOut={handleHoverOut}
          />
        </QueueAnim>
      </div>
      <StyledFormWrapper>
        <StyledH6>Be up to date with our new deals and features!</StyledH6>
        <Formik
          initialValues={{
            email: '',
          }}
          validate={validate}
          onSubmit={values => {
            console.log(values)
            dispatch(
              mutation({
                name: 'sendEmail',
                context: null,
                mutation: SEND_EMAIL,
                variables: { email: values.email, isNewsletter: true },
                onSuccess: () => setEmailSent(true),
              })
            )
          }}
        >
          {({ errors, touched, values }) => (
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
                  className="Form-fieldGroupIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                >
                  <g
                    fill="none"
                    fill-rule="evenodd"
                    stroke="#9CA2B4"
                    stroke-width="2"
                  >
                    <path d="M2 4h20v16H2z"></path>
                    <path d="M2 7.9l9.9 3.899 9.899-3.9"></path>
                  </g>
                </svg>
                <button
                  type="submit"
                  isDisabled={values.email && errors.email && touched.email}
                >
                  Subscribe to newsletter
                </button>
              </EmailFormWrapper>
              {emailSent && <StyledH6>Thank you!</StyledH6>}
            </Form>
          )}
        </Formik>
      </StyledFormWrapper>
    </div>
  )
}

export default memo(Technologies)
