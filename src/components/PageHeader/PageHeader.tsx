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
      {
        !titleLeft || !titleRight ? 
          <>
            <RealStyledTitle>{title}</RealStyledTitle>
            <RealStyledSubtitle>{subtitle}</RealStyledSubtitle>
          </>
          : <>
              <StyledTitle>
                <StyledTitleImage src={titleLeft} alt={title} />
                <StyledTitleImage src={titleRight} alt={subtitle} />
              </StyledTitle>
            <StyledSubtitle>{subtitle}</StyledSubtitle>
          </>
      }
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
  @media (max-width: 768px) {
    padding-bottom: ${props => props.theme.spacing[5]}px;
    padding-top: ${props => props.theme.spacing[5]}px;
  }
`

const StyledIcon = styled.img`
  height: 149px;
  margin-bottom: 59px;
  @media (max-width: 768px) {
    height: 100px;
    margin-bottom: 32px;
  }
`

const StyledTitle = styled.div`
  width: 900px;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding-bottom: 15px;
  @media (max-width: 768px) {
    width: 100%;
    overflow: hidden;
  }
`

const StyledTitleImage = styled.img`
  height: 25px;
  @media (max-width: 768px) {
    height: 16px;
  }
`

const RealStyledTitle = styled.h1`
  color: ${props => props.theme.color.grey[100]};
  font-size: 36px;
  font-weight: 700;
  margin: 0;
  padding: 0;
`

const RealStyledSubtitle = styled.h3`
  color: ${props => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: center;
`

const StyledSubtitle = styled.h3`
  width: 900px;
  color: ${props => props.theme.color.grey[400]};
  font-size: 18px;
  font-weight: 400;
  margin: 0;
  padding: 0;
  text-align: left;
  @media (max-width: 768px) {
    width: 100%;
  }
`

export default PageHeader