import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import TokenSymbol from '../../../components/TokenSymbol';
import CardContent from '../../../components/CardContent';
import Label from '../../../components/Label';
import Value from '../../../components/Value';
import CardIcon from '../../../components/CardIcon';
import useHarvestFromBoardroom from '../../../hooks/useHarvestFromBoardroom';
import useEarningsOnBoardroom from '../../../hooks/useEarningsOnBoardroom';
import { getDisplayBalance } from '../../../utils/formatBalance';
import buttonB from '../../../assets/img/buttonB.png';
import pad from '../../../assets/img/pad.png';

const Harvest: React.FC = () => {
  const { onReward } = useHarvestFromBoardroom();
  const earnings = useEarningsOnBoardroom();

  return (
    <CardContent>
      <StyledCardContentInner>
        <StyledCardHeader>
          <CardIcon>
            <TokenSymbol symbol="YSD"/>
          </CardIcon>
          <Value value={getDisplayBalance(earnings, 18, 4)}/>
          <Label variant='normal' text="Yield Stable Dollar Earned"/>
        </StyledCardHeader>
        <StyledCardActions>
          <Button onClick={onReward} text="Claim Reward" disabled={earnings.eq(0)}/>
        </StyledCardActions>
      </StyledCardContentInner>
    </CardContent>
  );
};

const StyledCardHeader = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
`;
const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[6]}px;
  width: 100%;
  background-image: url(${buttonB});
  background-repeat : no-repeat;
  background-size: 100% 100%;
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing[4]}px;
  background-image: url(${pad});
  background-repeat : no-repeat;
  background-size: 100% 100%;
`;

export default Harvest;
