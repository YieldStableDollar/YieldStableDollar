import React from 'react';
import styled from 'styled-components';
import Countdown, { CountdownRenderProps } from 'react-countdown';

interface ProgressCountdownProps {
  base: Date;
  deadline: Date;
  description: string;
}

const ProgressCountdown: React.FC<ProgressCountdownProps> = ({
  deadline,
  description,
}) => {
  const countdownRenderer = (countdownProps: CountdownRenderProps) => {
    const { days, hours, minutes, seconds } = countdownProps;
    const h = String(days * 24 + hours);
    const m = String(minutes);
    const s = String(seconds);
    return (
      <StyledCountdown>
        {h.padStart(2, '0')}:{m.padStart(2, '0')}:{s.padStart(2, '0')}
      </StyledCountdown>
    );
  };
  return (
    <StyledCardContentInner>
      <StyledDesc>{description}</StyledDesc>
      <Countdown date={deadline} renderer={countdownRenderer}/>
    </StyledCardContentInner>
  );
};

const StyledCountdown = styled.p`
  font-size: 20px;
  font-weight: 700;
  color: ${(props) => props.theme.color.grey[100]};
  margin: 0 0 6px 0;
`;

const StyledDesc = styled.span`
  color: ${(props) => props.theme.color.grey[500]};
  font-size: 17px;
`;

const StyledCardContentInner = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  padding: ${(props) => props.theme.spacing[2]}px 0;
  border-bottom: 2px solid ${(props) => props.theme.color.teal[200]};
`;

export default ProgressCountdown;
