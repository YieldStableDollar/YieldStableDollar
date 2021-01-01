import React from 'react';
import styled from 'styled-components';
import Card from '../../../components/Card';

interface ExchangeStatProps {
  tokenName: string;
  description: string;
  price: string;
}

const ExchangeStat: React.FC<ExchangeStatProps> = ({ tokenName, description, price }) => {
  return (
    <StyledCardContentInner>
      <StyledDesc>{description}</StyledDesc>
      <StyledCardTitle>
        <p style={{margin: 0, color: '#B2B2B2', fontSize: '17px', fontWeight: 500}}>{`${tokenName} :`}</p>
        <p style={{margin: 0,fontSize: '25px', fontWeight: 'bold'}}>{`$${price}`}</p>
      </StyledCardTitle>
    </StyledCardContentInner>
  );
};

const StyledCardTitle = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: ${(props) => props.theme.color.grey[200]};
  margin-bottom: ${(props) => props.theme.spacing[1]}px;
`;

const StyledDesc = styled.span`
  width: 100%;
  font-size: 14px;
  padding-bottom: ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.teal[100]};
`;

const StyledCardContentInner = styled.div`
  margin: ${(props) => props.theme.spacing[6]}px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  border-bottom: 2px solid ${(props) => props.theme.color.teal[200]};
  padding-bottom: ${(props) => props.theme.spacing[3]}px;
`;

export default ExchangeStat;
