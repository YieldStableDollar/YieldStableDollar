import React from 'react'
import styled from 'styled-components'

import Container from '../Container'
import Logo from '../Logo'

import AccountButton from './components/AccountButton'
import Nav from './components/Nav'
import TxButton from './components/TxButton'

const TopBar: React.FC = () => {
  return (
    <StyledTopBar>
      <Container size="lg">
        <StyledTopBarInner>
          <StyledLogoWrapper>
            <Logo />
          </StyledLogoWrapper>
          <Nav />
          <StyledAccountWrapper>
            <TxButton />
            <AccountButton />
          </StyledAccountWrapper>
        </StyledTopBarInner>
      </Container>
    </StyledTopBar>
  )
}

const StyledTopBar = styled.div``

const StyledTopBarInner = styled.div`
  align-items: center;
  display: flex;
  height: ${props => props.theme.topBarSize}px;
  justify-content: space-between;
  max-width: ${props => props.theme.siteWidth}px;
  width: 100%;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    height: auto;
  }
`

const StyledLogoWrapper = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    margin-top: 16px;
  }
`

const StyledAccountWrapper = styled.div`
  display: flex;
  flex: 1;
  justify-content: flex-end;
  @media (max-width: 768px) {
    justify-content: center;
  }
`

export default TopBar