import React from 'react';
import styled from 'styled-components';

interface StatProps {
  icon: string;
  title: string;
  description: string;
}

const Stat: React.FC<StatProps> = ({ icon, title, description }) => {
  return (
    <StyledCardContentInner>
       <StyledDesc>{description}</StyledDesc>
       <StyledCardTitle>{title}</StyledCardTitle>
    </StyledCardContentInner>
  );
};

const StyledCardTitle = styled.div`
  color: ${(props) => props.theme.color.grey[100]};
  font-size: 25px;
  font-weight: bold;
  margin: 0,
`;

const StyledDesc = styled.span`
  font-size: 17px;
  color: ${(props) => props.theme.color.grey[400]};
`;


const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing[2]}px 0;
  border-bottom: 2px solid ${(props) => props.theme.color.teal[200]};
`;

export default Stat;
