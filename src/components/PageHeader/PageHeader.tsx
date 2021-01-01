import React from 'react'
import styled from 'styled-components'

interface PageHeaderProps {
  icon: string,
  subtitle?: string,
  title?: string,
  titleLeft?: string,
  titleRight?: string,
}

const PageHeader: React.FC<PageHeaderProps> = ({ icon, subtitle, title,titleLeft,titleRight }) => {
  return (
    <StyledPageHeader>
      <StyledIcon src={icon}/>
      <StyledTitle>
        <img src={titleLeft} style={{height: '25px'}}/>
        <img src={titleRight} style={{height: '25px'}}/>
      </StyledTitle>
      <StyledSubtitle>{subtitle}</StyledSubtitle>
    </StyledPageHeader>
  )
}

const StyledPageHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  padding-bottom: ${props => props.theme.spacing[6]}px;
  padding-top: ${props => props.theme.spacing[6]}px;
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
`

const StyledIcon = styled.img`
  height: 149px;
  margin-bottom: 59px;
`

const StyledTitle = styled.div`
  width: 900px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 15px;
`

const StyledSubtitle = styled.h3`
  width: 900px;
  color: ${props => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: left;
`

export default PageHeader