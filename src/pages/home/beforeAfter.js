import React, { memo } from 'react'
import { isMobileOnly, isMobile } from 'react-device-detect'
import { Icon } from 'antd'

import { theme } from 'consts'

import {
  BeforeItem,
  StyledSectionWrapper,
  SectionDivider,
  IconContainer,
  SectionWrapper,
  SmallSectionWrapper,
  StyledCell,
  StyledH2,
  StyledBeforeText,
  BeforeContainer,
  BeforeAfterSection,
} from './styled'

const BeforeAfter = () => (
  <StyledSectionWrapper
    isSecondary
    padding="20px"
    background="white"
    isMobileOnly={isMobileOnly}
  >
    <SectionDivider isMobile={isMobile}>
      <SectionWrapper isMobile={isMobile} padding="20px 10px">
        <BeforeAfterSection isMobile={isMobile}>
          <StyledCell>
            <BeforeItem>
              <StyledH2 color={theme.colors.c3}>Before</StyledH2>
            </BeforeItem>
            {/* <StyledBeforeText>
              Common <b>it works on my machine</b> and <b>work from home</b>{' '}
              problems are a lot of work
            </StyledBeforeText> */}
            <BeforeContainer>
              <BeforeItem>
                <StyledBeforeText>Virtual machines</StyledBeforeText>
                <IconContainer>
                  <img
                    decoding="async"
                    alt="docker"
                    src={require('assets/vm.png')}
                    style={{
                      color: theme.colors.c1,
                    }}
                  />
                </IconContainer>
              </BeforeItem>
              <BeforeItem>
                <StyledBeforeText>Docker containers</StyledBeforeText>
                <IconContainer>
                  <img
                    decoding="async"
                    alt="docker"
                    src={require('assets/docker.png')}
                    style={{
                      color: theme.colors.c1,
                    }}
                  />
                </IconContainer>
              </BeforeItem>
              <BeforeItem>
                <StyledBeforeText>Devops teams</StyledBeforeText>
                <IconContainer>
                  <img
                    decoding="async"
                    alt="docker"
                    src={require('assets/people.png')}
                    style={{
                      color: theme.colors.c1,
                    }}
                  />
                </IconContainer>
              </BeforeItem>
              <BeforeItem>
                <StyledBeforeText>Leasing computers</StyledBeforeText>
                <IconContainer>
                  <Icon
                    type="laptop"
                    style={{ color: theme.colors.c3, fontSize: 40 }}
                  />
                </IconContainer>
              </BeforeItem>
            </BeforeContainer>
          </StyledCell>
        </BeforeAfterSection>
      </SectionWrapper>
      <SectionWrapper isMobile={isMobile} padding="20px 10px">
        <BeforeAfterSection isMobile={isMobile}>
          <StyledCell>
            <BeforeItem>
              <StyledH2 color={theme.colors.c3}>After</StyledH2>
            </BeforeItem>
          </StyledCell>
        </BeforeAfterSection>
      </SectionWrapper>
    </SectionDivider>
  </StyledSectionWrapper>
)

export default memo(BeforeAfter)
