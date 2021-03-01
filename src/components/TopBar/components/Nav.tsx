import React from 'react'
import styled from 'styled-components'
import { NavLink } from 'react-router-dom'

const Nav: React.FC = () => {
  return (
    <StyledNav>
      <StyledLink exact activeClassName="active" to="/">Home</StyledLink>
      <StyledLink exact activeClassName="active" to="/bank">Bank</StyledLink>
      <StyledLink exact activeClassName="active" to="/bonds">Bonds</StyledLink>
      <StyledLink exact activeClassName="active" to="/boardroom">Boardroom</StyledLink>
    </StyledNav>
  )
}

const StyledNav = styled.nav`
  align-items: center;
  display: flex;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 10px;
    margin-bottom: 10px;
    justify-content: space-around;
  }
`

const StyledLink = styled(NavLink)`
  color: ${props => props.theme.color.grey[400]};
  font-weight: 700;
  padding-left: ${props => props.theme.spacing[3]}px;
  padding-right: ${props => props.theme.spacing[3]}px;
  text-decoration: none;
  &:hover {
    color: ${props => props.theme.color.grey[500]};
  }
  &.active {
    color: ${props => props.theme.color.primary.main};
  }
  @media (max-width: 768px) {
    padding-left: 0;
    padding-right: 0;
  }
`

export default Nav