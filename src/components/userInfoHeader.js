import React, { useState } from 'react'
import styled from 'styled-components'
import onClickOutside from 'react-onclickoutside'
import { useDispatch, useSelector } from 'react-redux'
import ContentLoader from 'react-content-loader'

import { selectors } from 'state'

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 10vw;
  box-shadow: 0 1.2vh 1.2vh -1.5vh #0072ce;
  border-radius: 10px;
  border-width: 1px;
  border-color: #0072ce;
  border-style: solid;
  background-color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
  align-self: flex-end;
  z-index: 3;
`

const LoaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  width: 10vw;
  align-items: flex-end;
  z-index: 3;
  height: 100%;
  overflow: visible;
`

const Text = styled.span`
  font-size: 3vh;
  color: white;
  transition: color 0.3s;

  :hover {
    color: black;
  }

  @media (max-width: 1366px) {
    font-size: 2.5vh;
  }
`

const Inline = styled.div`
  display: inline-block;
  width: 4vh;
  height: auto;
  margin-left: 4px;
`

const UserPhoto = styled.img`
  width: 4vh;
  height: auto;
  margin-left: 4px;
  border-radius: 5px;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  height: 4vh;
  margin: 0;
`

const StyledDropdown = styled.div`
  color: white;
  text-decoration: none;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`

const InfoWrapper = styled(Wrapper)`
  flex-direction: column;
  overflow: visible;
`

const Option = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  padding: 3px;
  margin: ${props => (props.isLast ? `0` : `0 0 0.2vh`)};
  width: 100%;
  height: auto;
  font-size: 2vh;
  color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
  border-bottom-left-radius: ${props => props.isLast && '8px'};
  border-bottom-right-radius: ${props => props.isLast && '8px'};
  :hover {
    background-color: ${props => (!props.invert ? '#ffffff' : '#0072ce')};
    color: ${props => (props.invert ? '#ffffff' : '#0072ce')};
  }
`

const Loader = () => (
  <LoaderWrapper>
    <ContentLoader
      height={50}
      width={80}
      speed={2}
      primaryColor="#eafff8"
      secondaryColor="#1417d8"
      style={{ width: '8vh', height: '5vh' }}
    >
      <circle cx="66" cy="17" r="13" />
      <rect x="6" y="6" rx="0" ry="0" width="36" height="6" />
      <rect x="5" y="19" rx="0" ry="0" width="36" height="6" />
    </ContentLoader>
  </LoaderWrapper>
)

const UserInfoHeader = props => {
  const [options] = useState(props.options)
  const dispatch = useDispatch()
  const isLoading = useSelector(selectors.getLoading('user'))

  UserInfoHeader.handleClickOutside = () => props.handleDropdown()

  return (
    <InfoWrapper>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Wrapper onClick={props.handleDropdownClick}>
            <StyledDropdown>
              <Text>{props.user.username}</Text>
              <Inline>
                <UserPhoto src={props.user.userphoto} style={{ margin: `0` }} />
              </Inline>
            </StyledDropdown>
          </Wrapper>
          {props.showDropdown && (
            <MenuWrapper invert>
              {options.map(option =>
                option.option !== 'Logout' ? (
                  <Option invert>{option.option}</Option>
                ) : (
                  <Option
                    isLast
                    invert
                    onClick={() => option.onClick(dispatch)}
                  >
                    {option.option}
                  </Option>
                )
              )}
            </MenuWrapper>
          )}
        </>
      )}
    </InfoWrapper>
  )
}

const clickOutsideConfig = {
  handleClickOutside: () => UserInfoHeader.handleClickOutside,
}

export default onClickOutside(UserInfoHeader, clickOutsideConfig)
