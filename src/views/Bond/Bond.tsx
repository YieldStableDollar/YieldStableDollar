import React, { useCallback, useMemo } from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
import { useWallet } from 'use-wallet';
import bank from '../../assets/img/bank.png';
import BuyRedeemBonds from '../../assets/img/Buy&RedeemBonds.png'
import line from '../../assets/img/line.png';
import Button from '../../components/Button';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import ExchangeCard from './components/ExchangeCard';
import styled from 'styled-components';
import Spacer from '../../components/Spacer';
import useBondStats from '../../hooks/useBondStats';
import useBasisCash from '../../hooks/useBasisCash';
import useBondOraclePriceInLastTWAP from '../../hooks/useBondOraclePriceInLastTWAP';
import { useTransactionAdder } from '../../state/transactions/hooks';
import config from '../../config';
import LaunchCountdown from '../../components/LaunchCountdown';
import ExchangeStat from './components/ExchangeStat';
import useTokenBalance from '../../hooks/useTokenBalance';
import { getDisplayBalance } from '../../utils/formatBalance';
import buttonA from '../../assets/img/buttonA.png';
import { utils } from 'ethers';


const Bond: React.FC = () => {
  const { path } = useRouteMatch();
  const { account, connect } = useWallet();
  const basisCash = useBasisCash();
  const addTransaction = useTransactionAdder();
  const bondStat = useBondStats();
  const cashPrice = useBondOraclePriceInLastTWAP();

  const bondBalance = useTokenBalance(basisCash?.YSB);

  const handleBuyBonds = useCallback(
    async (amount: string) => {
      try {
        const tx = await basisCash.buyBonds(amount, cashPrice);
        const bondAmount = Number(amount) / Number(getDisplayBalance(cashPrice));
        addTransaction(tx, {
          summary: `Buy ${bondAmount.toFixed(2)} YSB with ${amount} YSD`,
        });
      } catch (error) {
        alert("Error happened when buyBonds, reason: " + error.reason)
      }
    },
    [basisCash, addTransaction, cashPrice],
  );

  const handleRedeemBonds = useCallback(
    async (amount: string) => {
      try {
        const tx = await basisCash.redeemBonds(amount, cashPrice);
        addTransaction(tx, { summary: `Redeem ${amount} YSB` });
      } catch (error) {
        alert("Error happened when buyBonds, reason: " + error.reason)
      }
    },
    [basisCash, addTransaction, cashPrice],
  );
  const cashIsOverpriced = useMemo(() => cashPrice.gt(utils.parseUnits("1", 6)), [cashPrice]);
  const cashIsUnderPriced = useMemo(() => Number(bondStat?.priceInBUSD) < 1.0, [bondStat]);

  const isLaunched = Date.now() >= config.bondLaunchesAt.getTime();
  if (!isLaunched) {
    return (
      <Switch>
        <Page>
          <PageHeader
            icon={bank}
            title=''
            titleLeft={BuyRedeemBonds}
            titleRight={line}
            subtitle="Earn premiums upon redemption"
          />
          <LaunchCountdown
            deadline={config.bondLaunchesAt}
            description="How does Yield Stable bond work?"
            descriptionLink="https://docs.basis.cash/mechanisms/stabilization-mechanism"
          />
        </Page>
      </Switch>
    );
  }
  return (
    <Switch>
      <Page>
        {!!account ? (
          <>
            <Route exact path={path}>
              <PageHeader
                icon={bank}
                title=''
                titleLeft={BuyRedeemBonds}
                titleRight={line}
                subtitle="Earn premiums upon redemption"
              />
            </Route>
            <StyledBond>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Purchase"
                  fromToken={basisCash.YSD}
                  fromTokenName="Yield Stable Dollar"
                  toToken={basisCash.YSB}
                  toTokenName="Yield Stable Bond"
                  priceDesc={
                    cashIsOverpriced
                      ? 'YSD is over $1'
                      : cashIsUnderPriced
                      ? `${Math.floor(
                          100 / Number(bondStat.priceInBUSD) - 100,
                        )}% return when YSD > $1`
                      : '-'
                  }
                  onExchange={handleBuyBonds}
                  disabled={!bondStat || cashIsOverpriced}
                />
              </StyledCardWrapper>
              <StyledStatsWrapper>
                <ExchangeStat
                  tokenName="YSC"
                  description="Base Price (Last-Day TWAP)"
                  price={getDisplayBalance(cashPrice, 6, 2)}
                />
                <Spacer size="md" />
                <ExchangeStat
                  tokenName="YSB"
                  description="Current Price: (YSD)^2"
                  price={bondStat?.priceInBUSD || '-'}
                />
              </StyledStatsWrapper>
              <StyledCardWrapper>
                <ExchangeCard
                  action="Redeem"
                  fromToken={basisCash.YSB}
                  fromTokenName="Yield Stable Bond"
                  toToken={basisCash.YSD}
                  toTokenName="Yield Stable Dollar"
                  priceDesc={`${getDisplayBalance(bondBalance)} YSB Available`}
                  onExchange={handleRedeemBonds}
                  disabled={!bondStat || bondBalance.eq(0) || cashIsUnderPriced}
                />
              </StyledCardWrapper>
            </StyledBond>
          </>
        ) : (
          <div
            style={{
              alignItems: 'center',
              display: 'flex',
              flex: 1,
              justifyContent: 'center',
            }}
          >
            <StyledBtn>
              <Button variant={'tertiary'} onClick={() => connect('injected')} text="Unlock Wallet" />
            </StyledBtn>
          </div>
        )}
      </Page>
    </Switch>
  );
};

const StyledBond = styled.div`
  display: flex;
  width: 900px;
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

const StyledStatsWrapper = styled.div`
  display: flex;
  flex: 0.8;
  margin: 0 20px;
  flex-direction: column;

  @media (max-width: 768px) {
    width: 80%;
    margin: 16px 0;
  }
`;
const StyledBtn = styled.div`
  background-image: url(${buttonA});
  background-repeat : no-repeat;
  background-size: 100% 100%;
  padding: 0 30px;
`;
export default Bond;
