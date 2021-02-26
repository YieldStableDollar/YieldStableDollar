import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import CardContent from '../../../components/CardContent';
import CardIcon from '../../../components/CardIcon';
import { AddIcon, RemoveIcon } from '../../../components/icons';
import IconButton from '../../../components/IconButton';
import Label from '../../../components/Label';
import Value from '../../../components/Value';

import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useModal from '../../../hooks/useModal';
import useTokenBalance from '../../../hooks/useTokenBalance';

import { getDisplayBalance } from '../../../utils/formatBalance';

import DepositModal from './DepositModal';
import WithdrawModal from './WithdrawModal';
import useBasisCash from '../../../hooks/useBasisCash';
import useStakedBalanceOnBoardroom from '../../../hooks/useStakedBalanceOnBoardroom';
import TokenSymbol from '../../../components/TokenSymbol';
import useStakeToBoardroom from '../../../hooks/useStakeToBoardroom';
import useWithdrawFromBoardroom from '../../../hooks/useWithdrawFromBoardroom';
import useBoardroomVersion from '../../../hooks/useBoardroomVersion';
import useRedeemOnBoardroom from '../../../hooks/useRedeemOnBoardroom';
import buttonB from '../../../assets/img/buttonB.png';
import pad from '../../../assets/img/pad.png';

const Stake: React.FC = () => {
  const basisCash = useBasisCash();
  const boardroomVersion = useBoardroomVersion();
  const [approveStatus, approve] = useApprove(
    basisCash.YSS,
    basisCash.boardroomByVersion(boardroomVersion).address,
  );

  const tokenBalance = useTokenBalance(basisCash.YSS);
  const stakedBalance = useStakedBalanceOnBoardroom();
  const isOldBoardroomMember = boardroomVersion !== 'latest';

  const { onStake } = useStakeToBoardroom();
  const { onWithdraw } = useWithdrawFromBoardroom();
  const { onRedeem } = useRedeemOnBoardroom('Redeem YSS for Boardroom Migration');

  const [onPresentDeposit, onDismissDeposit] = useModal(
    <DepositModal
      max={tokenBalance}
      onConfirm={(value) => {
        onStake(value);
        onDismissDeposit();
      }}
      tokenName={'YSD Share'}
    />,
  );

  const [onPresentWithdraw, onDismissWithdraw] = useModal(
    <WithdrawModal
      max={stakedBalance}
      onConfirm={(value) => {
        onWithdraw(value);
        onDismissWithdraw();
      }}
      tokenName={'YSD Share'}
    />,
  );

  return (
    <CardContent>
      <StyledCardContentInner>
        <StyledCardHeader>
          <CardIcon>
            <TokenSymbol symbol="YSS"/>
          </CardIcon>
          <Value value={getDisplayBalance(stakedBalance)}/>
          <Label text="YSD Share Staked"/>
        </StyledCardHeader>
        <StyledCardActions>
          {!isOldBoardroomMember && approveStatus !== ApprovalState.APPROVED ? (
            <Button
              disabled={approveStatus !== ApprovalState.NOT_APPROVED}
              onClick={approve}
              text="Approve YSD Share"
            />
          ) : isOldBoardroomMember ? (
            <>
              <Button
                onClick={onRedeem}
                variant="secondary"
                text="Settle & Withdraw"
              />
            </>
          ) : (
            <>
              <IconButton onClick={onPresentWithdraw}>
                <RemoveIcon/>
              </IconButton>
              <StyledActionSpacer/>
              <IconButton onClick={onPresentDeposit}>
                <AddIcon/>
              </IconButton>
            </>
          )}
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

const StyledActionSpacer = styled.div`
  height: ${(props) => props.theme.spacing[4]}px;
  width: ${(props) => props.theme.spacing[4]}px;
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

export default Stake;
