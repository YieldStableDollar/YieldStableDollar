import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';

import Button from '../../components/Button';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import Harvest from './components/Harvest';
import Stake from './components/Stake';
import useBank from '../../hooks/useBank';
import useRedeem from '../../hooks/useRedeem';
import { Bank as BankEntity } from '../../basis-cash';
import bankimg from '../../assets/img/bank.png';
import PickaBank from '../../assets/img/PickaBank.png';
import line from '../../assets/img/line.png';
import buttonA from '../../assets/img/buttonA.png';

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { bankId } = useParams();
  const bank = useBank(bankId);

  const { account } = useWallet();
  const { onRedeem } = useRedeem(bank);

  return account && bank ? (
    <>
      <PageHeader
        icon={bankimg}
        titleLeft={PickaBank}
        titleRight={line}
        subtitle={`Deposit ${bank?.depositTokenName} and earn ${bank?.earnTokenName}`}
        title={bank?.name}
      />
      <StyledBank>
        <StyledCardsWrapper>
          <StyledCardWrapper>
            <Harvest bank={bank} />
          </StyledCardWrapper>
          <Spacer />
          <StyledCardWrapper>
            <Stake bank={bank} />
          </StyledCardWrapper>
        </StyledCardsWrapper>
        <Spacer size="lg" />
        {bank.depositTokenName.includes('LP') && <LPTokenHelpText bank={bank} />}
        <Spacer size="lg" />
        <div>
          <StyledBtn>
            <Button variant={'tertiary'} onClick={onRedeem} text="Settle & Withdraw" />
          </StyledBtn>
        </div>
        <Spacer size="lg" />
      </StyledBank>
    </>
  ) : !bank ? (
    <BankNotFound />
  ) : (
    <UnlockWallet />
  );
};

const LPTokenHelpText: React.FC<{ bank: BankEntity }> = ({ bank }) => {
  let pairName: string;
  let uniswapUrl: string;
  if (bank.depositTokenName.includes('BAC')) {
    pairName = 'BAC-DAI pair';
    uniswapUrl = 'https://app.unisave.exchange/#/add/0x72b5b52ab3a78b86c7ad32960cb0fc253af4a154/0xde76ccae3413c7af312251e99803b1433d3187f4';
  } else {
    pairName = 'BAS-DAI pair';
    uniswapUrl = 'https://app.unisave.exchange/#/add/0x01b0ef17faf5dc7d54a9ec76032c26bb13586728/0xde76ccae3413c7af312251e99803b1433d3187f4';
  }
  return (
    <StyledLink href={uniswapUrl} target="_blank">
      {`🐷  Provide liquidity to ${pairName} on Unisave 🐷`}
    </StyledLink>
  );
};

const BankNotFound = () => {
  return (
    <Center>
      <PageHeader
        icon={bankimg}
        titleLeft={PickaBank}
        titleRight={line}
        title="Not Found"
        subtitle="You've hit a bank just robbed by unicorns."
      />
    </Center>
  );
};

const UnlockWallet = () => {
  const { connect } = useWallet();
  return (
    <Center>
      <StyledBtn>
        <Button variant={'tertiary'} onClick={() => connect('injected')} text="Unlock Wallet"/>
      </StyledBtn>
    </Center>
  );
};

const StyledBank = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledUniswapLPGuide = styled.div`
  margin: -24px auto 48px;
`;

const StyledLink = styled.a`
  font-weight: 700;
  text-decoration: none;
  color: ${(props) => props.theme.color.primary.main};
`;

const StyledCardsWrapper = styled.div`
  display: flex;
  width: 600px;
  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

const StyledCardWrapper = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 80%;
  }
`;

const Center = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
`;

const StyledBtn = styled.div`
  background-image: url(${buttonA});
  background-repeat : no-repeat;
  background-size: 100% 100%;
  padding: 0 30px;
`;

export default Bank;
