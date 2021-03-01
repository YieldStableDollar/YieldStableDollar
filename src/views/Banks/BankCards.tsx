import React from 'react';
import styled from 'styled-components';

import { Bank } from '../../basis-cash';
import Button from '../../components/Button';
import CardIcon from '../../components/CardIcon';
import useBanks from '../../hooks/useBanks';
import TokenSymbol from '../../components/TokenSymbol';
import Notice from '../../components/Notice';
import buttonB from '../../assets/img/buttonB.png';
import pad from '../../assets/img/pad.png';

const BankCards: React.FC = () => {
  const [banks] = useBanks();

  const activeBanks = banks.filter((bank) => !bank.finished);
  const inactiveBanks = banks.filter((bank) => bank.finished);

  let finishedFirstRow = false;
  const inactiveRows = inactiveBanks.reduce<Bank[][]>(
    (bankRows, bank) => {
      const newBankRows = [...bankRows];
      if (newBankRows[newBankRows.length - 1].length === (finishedFirstRow ? 2 : 3)) {
        newBankRows.push([bank]);
        finishedFirstRow = true;
      } else {
        newBankRows[newBankRows.length - 1].push(bank);
      }
      return newBankRows;
    },
    [[]],
  );

  return (
    <StyledCards>
      {inactiveRows[0].length > 0 && (
        <StyledInactiveNoticeContainer>
          <Notice color="grey">
            <b>You have banks where the mining has finished.</b>
            <br />
            Please withdraw and settle your stakes.
          </Notice>
        </StyledInactiveNoticeContainer>
      )}
      <StyledRow>
        {activeBanks.map((bank) => (
          <React.Fragment key={bank.name}>
            <BankCard bank={bank} />
          </React.Fragment>
        ))}
      </StyledRow>
      {inactiveRows[0].length > 0 && (
        <>
          <StyledInactiveBankTitle>Inactive Banks</StyledInactiveBankTitle>
          {inactiveRows.map((bankRow, i) => (
            <StyledRow key={i}>
              {bankRow.map((bank, j) => (
                <React.Fragment key={j}>
                  <BankCard bank={bank} />
                </React.Fragment>
              ))}
            </StyledRow>
          ))}
        </>
      )}
    </StyledCards>
  );
};

interface BankCardProps {
  bank: Bank;
}

const BankCard: React.FC<BankCardProps> = ({ bank }) => {
  return (
    <StyledCardWrapper>
      {bank.depositTokenName.includes('LP') &&
        (bank.depositTokenName.includes('YSS_DAI') ? (
          <StyledCardSuperAccent />
        ) : (
          <StyledCardAccent />
        ))}
      <StyledContent>
        <CardIcon>
          <TokenSymbol symbol={bank.depositTokenName} size={54}/>
        </CardIcon>
        <StyledTitle>{bank.name}</StyledTitle>
        <StyledDetails>
          <StyledDetail>Deposit {bank.depositTokenName.toUpperCase()}</StyledDetail>
          <StyledDetail>Earn {`${bank.earnTokenName}`}</StyledDetail>
        </StyledDetails>
        <Stylebtndiv>
          <Button size="sm" variant="default" text="Select" to={`/bank/${bank.bankDefinitionName}`}/>
        </Stylebtndiv>
      </StyledContent>
    </StyledCardWrapper>
  );
};

const StyledCardAccent = styled.div`
  filter: blur(4px);
  position: absolute;
  top: -2px;
  right: -2px;
  bottom: -2px;
  left: -2px;
  z-index: -1;
`;

const StyledCardSuperAccent = styled.div`
  filter: blur(8px);
  position: absolute;
  top: -4px;
  right: -4px;
  bottom: -4px;
  left: -4px;
  z-index: -1;
`;

const StyledCards = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 900px;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledRow = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
    flex-flow: column nowrap;
    align-items: center;
    margin-bottom: ${(props) => props.theme.spacing[4]}px;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  width: calc((900px - ${(props) => props.theme.spacing[4]}px * 2) / 3);
  min-height: 400px;
  position: relative;
`;

const StyledTitle = styled.h4`
  color: ${(props) => props.theme.color.grey[200]};
  font-size: 24px;
  font-weight: 700;
  text-align: center;
  margin: ${(props) => props.theme.spacing[2]}px 0 0;
  padding: 0;
`;

const StyledContent = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: ${(props) => props.theme.spacing[4]}px;
  background-image: url(${pad});
  background-repeat : no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
  @media (max-width: 768px) {
    min-height: 400px;
  }
`;

// const StyledSpacer = styled.div`
//   height: ${(props) => props.theme.spacing[4]}px;
//   width: ${(props) => props.theme.spacing[4]}px;
// `;

const StyledDetails = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
  margin-top: ${(props) => props.theme.spacing[2]}px;
  text-align: center;
`;

const Stylebtndiv = styled.div`
  width: 177px;
  background-image: url(${buttonB});
  background-repeat : no-repeat;
  background-size: 100% 100%;
  align-self: center;
  position: absolute;
  bottom: 60px;
`;

const StyledDetail = styled.div`
  color: ${(props) => props.theme.color.teal[100]};
`;

const StyledInactiveNoticeContainer = styled.div`
  width: 598px;
  margin-bottom: ${(props) => props.theme.spacing[6]}px;
`;

const StyledInactiveBankTitle = styled.p`
  font-size: 24px;
  font-weight: 600;
  color: ${(props) => props.theme.color.grey[400]};
  margin-top: ${(props) => props.theme.spacing[5]}px;
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
`;

export default BankCards;
