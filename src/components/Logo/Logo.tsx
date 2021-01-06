import React from 'react';
import styled from 'styled-components';

import farmer from '../../assets/img/cbc_logo.png';

const Logo: React.FC = () => {
  return (
    <StyledLogo>
      <StyledLink href="/">
        <img alt="logo" src={farmer} style={{width: '226px', height: '25px',  marginTop: -4 }} />
      </StyledLink>
    </StyledLogo>
  );
};

const StyledLogo = styled.div`
  align-items: center;
  display: flex;
`;

const StyledLink = styled.a`
  color: ${(props) => props.theme.color.grey[100]};
  text-decoration: none;
  font-size: 18px;
  font-weight: 700;
  margin-left: ${(props) => props.theme.spacing[2]}px;
`;

export default Logo;
