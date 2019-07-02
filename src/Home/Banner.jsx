import React from 'react'
import QueueAnim from 'rc-queue-anim'
import TweenOne from 'rc-tween-one'
import BannerSVGAnim from './component/BannerSVGAnim'
import styled, { keyframes } from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import { createSelector } from 'reselect'
import { selectors } from '../state'
import Loader from '../components/fullScreenLoader'

const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID
const REDIRECT_URI = process.env.GITHUB_REDIRECT_URI

const FadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`

const Button = styled.button`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 45%;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 1vh;
  border-color: #0072ce;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const LoginButton = styled.a`
  display: flex;
  flex-direction: row;
  height: auto;
  width: 45%;
  margin: 5px;
  padding: 0.5vh;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: ${props => (props.primary ? '#0072ce' : '#ffffff')};
  border-width: 1px;
  border-style: solid;
  color: ${props => (props.primary ? '#ffffff' : '#0072ce')};
  border-radius: 1vh;
  border-color: #0072ce;
  box-shadow: 0 1.5vh 1.5vh -1.5vh #0072ce;
  transition: all 0.2s ease;
  animation: ${FadeIn} 1s ease-out;
  text-decoration: none;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`

const ButtonsWrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: auto;
  align-items: center;
  justify-content: space-around;
`

const getUserName = selectors.getData('user', null, 'name')

const getUserPhoto = selectors.getData('user', null, 'photoUrl')

const getUserData = createSelector(
  [getUserName, getUserPhoto],
  (username, userphoto) => ({ username, userphoto })
)

const Banner = props => {
  const isLoading = useSelector(selectors.getLoading('user'))
  const user = useSelector(getUserData)

  const handleClick = () =>
    user.username
      ? console.log('User is logged in')
      : console.log('User is not logged in')

  return (
    <div className="banner-wrapper">
      {props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <div className="home-banner-image">
            <img
              alt="banner"
              src="https://gw.alipayobjects.com/zos/rmsportal/rqKQOpnMxeJKngVvulsF.svg"
              width="100%"
            />
          </div>
        </TweenOne>
      )}
      <QueueAnim
        className="banner-title-wrapper"
        type={props.isMobile ? 'bottom' : 'right'}
      >
        <div key="line" className="title-line-wrapper">
          <div
            className="title-line"
            style={{ transform: 'translateX(-64px)' }}
          />
        </div>
        <h1 key="h1">SiliSky</h1>
        <p key="content">Code in clouds. One evironment for everyone.</p>
        <ButtonsWrapper>
          {isLoading ? (
            <Button primary>
              <Loader isFullScreen={false} color={'#ffffff'} height={'2.5vh'} />
            </Button>
          ) : user.username ? (
            <Button primary onClick={handleClick}>
              <p style={{ margin: 0 }}>Get started</p>
            </Button>
          ) : (
            <LoginButton
              href={`https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&scope=user,user:email,public_repo&redirect_uri=${REDIRECT_URI}`}
              primary
            >
              <p style={{ margin: 0 }}>Get started</p>
            </LoginButton>
          )}
          <Button>
            <p style={{ margin: 0 }}>Request demo</p>
          </Button>
        </ButtonsWrapper>
      </QueueAnim>
      {!props.isMobile && (
        <TweenOne animation={{ opacity: 1 }} className="banner-image-wrapper">
          <BannerSVGAnim />
        </TweenOne>
      )}
    </div>
  )
}

export default Banner
