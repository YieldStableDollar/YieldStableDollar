import React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import useBasisCash from '../../../hooks/useBasisCash';
import Label from '../../../components/Label';
import TokenSymbol from '../../../components/TokenSymbol';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import useModal from '../../../hooks/useModal';
import ExchangeModal from './ExchangeModal';
import ERC20 from '../../../basis-cash/ERC20';
import useTokenBalance from '../../../hooks/useTokenBalance';
import useApprove, { ApprovalState } from '../../../hooks/useApprove';
import useCatchError from '../../../hooks/useCatchError';
import buttonB from '../../../assets/img/buttonB.png';
import pad from '../../../assets/img/pad.png';

interface ExchangeCardProps {
  action: string;
  fromToken: ERC20;
  fromTokenName: string;
  toToken: ERC20;
  toTokenName: string;
  priceDesc: string;
  onExchange: (amount: string) => void;
  disabled?: boolean;
}

const ExchangeCard: React.FC<ExchangeCardProps> = ({
  action,
  fromToken,
  fromTokenName,
  toToken,
  toTokenName,
  priceDesc,
  onExchange,
  disabled = false,
}) => {
  const catchError = useCatchError();
  const { contracts: { Treasury } } = useBasisCash();
  const [approveStatus, approve] = useApprove(fromToken, Treasury.address);

  const balance = useTokenBalance(fromToken);
  const [onPresent, onDismiss] = useModal(
    <ExchangeModal
      title={action}
      description={priceDesc}
      max={balance}
      onConfirm={(value) => {
        onExchange(value);
        onDismiss();
      }}
      action={action}
      tokenName={fromTokenName}
    />,
  );
  return (
    <StyledCardContentInner>
      <StyledCardTitle>{`${action} ${toTokenName}`}</StyledCardTitle>
      <StyledExchanger>
        <StyledToken>
          <StyledCardIcon>
            <TokenSymbol symbol={fromToken.symbol} size={54}/>
          </StyledCardIcon>
          <Label text={fromTokenName} variant="normal" center />
        </StyledToken>
        <StyledExchangeArrow>
          <FontAwesomeIcon icon={faArrowRight}/>
        </StyledExchangeArrow>
        <StyledToken>
          <StyledCardIcon>
            <TokenSymbol symbol={toToken.symbol} size={54}/>
          </StyledCardIcon>
          <Label text={toTokenName} variant="normal" center />
        </StyledToken>
      </StyledExchanger>
      <StyledDesc>{priceDesc}</StyledDesc>
      <StyledCardActions>
        {approveStatus !== ApprovalState.APPROVED && !disabled ? (
          <Button
            disabled={
              approveStatus === ApprovalState.PENDING ||
              approveStatus === ApprovalState.UNKNOWN
            }
            size="sm"
            onClick={() => catchError(approve(), `Unable to approve ${fromTokenName}`)}
            text={`Approve ${fromTokenName}`}
          />
        ) : (
          <Button text={action} size="sm" onClick={onPresent} disabled={disabled}/>
        )}
      </StyledCardActions>
    </StyledCardContentInner>
  );
};

const StyledCardTitle = styled.div`
  align-items: center;
  color: ${(props) => props.theme.color.grey[300]};
  display: flex;
  font-size: 20px;
  font-weight: 700;
  height: 64px;
  justify-content: center;
  margin-top: ${(props) => -props.theme.spacing[3]}px;
`;

const StyledCardIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledExchanger = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: ${(props) => props.theme.spacing[5]}px;
`;

const StyledExchangeArrow = styled.div`
  font-size: 20px;
  color: ${(props) => props.theme.color.grey[300]};
  padding-left: ${(props) => props.theme.spacing[3]}px;
  padding-right: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[4]}px;
`;

const StyledToken = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  font-weight: 600;
`;

const StyledCardActions = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${(props) => props.theme.spacing[3]}px;
  width: 80%;
  background-image: url(${buttonB});
  background-repeat : no-repeat;
  background-size: 100% 100%;
`;

const StyledDesc = styled.span`
  color: ${(props) => props.theme.color.teal[100]};
`;

const StyledCardContentInner = styled.div`
  align-items: center;
  display: flex;
  flex: 1;
  flex-direction: column;
  justify-content: space-between;
  padding: ${(props) => props.theme.spacing[7]}px ${(props) => props.theme.spacing[4]}px ${(props) => props.theme.spacing[6]}px;
  background-image: url(${pad});
  background-repeat : no-repeat;
  background-size: 100% 100%;
`;

export default ExchangeCard;
