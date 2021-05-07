import React, { useEffect } from 'react';
import styled from 'styled-components';

import { useParams } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import Config from "../../config";

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
import BetaWarning from '../../components/BetaWarning';

const Bank: React.FC = () => {
  useEffect(() => window.scrollTo(0, 0));

  const { bankId } = useParams<{ bankId: string }>();
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
  let swapPrefix = 'https://www.heshiswap.com/#'
  let uniswapUrl: string;
  const { Cash, Share } = Config.deployments;
  if (bank.depositTokenName.includes('YSD')) {
      pairName = 'YSD-BUSD pair';
      uniswapUrl = `${swapPrefix}/add/${Cash.address}/${Config.externalTokens.USDT[0]}`;
    } else {
      pairName = 'YSS-BUSD pair';
      uniswapUrl = `${swapPrefix}/add/${Share.address}/${Config.externalTokens.USDT[0]}`;
  }
  return (
    <StyledLink href={uniswapUrl} target="_blank">
      {`🐷  Provide liquidity to ${pairName} on HeshiSwap 🐷`}
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
    <>
    <BetaWarning />
    <Center>
      <StyledBtn>
        <Button variant={'tertiary'} onClick={() => connect('injected')} text="Unlock Wallet"/>
      </StyledBtn>
      </Center>
    </>
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
