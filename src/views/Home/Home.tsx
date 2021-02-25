import React, { useCallback, useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';
import Page from '../../components/Page';
import PageHeader from '../../components/PageHeader';
import Spacer from '../../components/Spacer';
import HomeCard from './components/HomeCard';
import { OverviewData } from './types';
import useBasisCash from '../../hooks/useBasisCash';
import config from '../../config';
import cyberchip from '../../assets/img/cyberchip.png';
import WelcometoYSD from '../../assets/img/WelcometoYSD.png';
import line from '../../assets/img/line.png';

const Home: React.FC = () => {
  const basisCash = useBasisCash();

  const [{ cash, bond, share }, setStats] = useState<OverviewData>({});
  const fetchStats = useCallback(async () => {
    const [cash, bond, share] = await Promise.all([
      basisCash.getCashStatFromUniswap(),
      basisCash.getBondStat(),
      basisCash.getShareStat(),
    ]);
    if (Date.now() < config.bondLaunchesAt.getTime()) {
      bond.priceInBUSD = '-';
    }
    setStats({ cash, bond, share });
  }, [basisCash, setStats]);

  useEffect(() => {
    if (basisCash) {
      fetchStats().catch((err) => console.error(err.stack));
    }
  }, [basisCash, fetchStats]);

  const cashAddr = useMemo(() => basisCash?.YSD.address, [basisCash]);
  const shareAddr = useMemo(() => basisCash?.YSS.address, [basisCash]);
  const bondAddr = useMemo(() => basisCash?.YSB.address, [basisCash]);

  return (
    <Page>
      <PageHeader
        icon={cyberchip}
        titleLeft={WelcometoYSD}
        titleRight={line}
        subtitle="Buy, sell, and provide liquidity for Yield Stable Dollar and Yield Stable Shares on Unisave"
        title="Welcome to Stable Dollar!"
      />
      <Spacer size="md" />
      <CardWrapper>
        <HomeCard
          title="YSD"
          symbol="YSD"
          color="rgba(72, 225, 159, 0.5)"
          supplyLabel="Circulating Supply"
          address={cashAddr}
          stat={cash}
        />
        <Spacer size="lg" />
        <HomeCard
          title="YSS"
          symbol="YSS"
          color="rgba(72, 225, 159, 0.5)"
          address={shareAddr}
          stat={share}
        />
        <Spacer size="lg" />
        <HomeCard
          title="YSB"
          symbol="YSB"
          color="rgba(72, 225, 159, 0.5)"
          address={bondAddr}
          stat={bond}
        />
      </CardWrapper>
    </Page>
  );
};

const CardWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;

  @media (max-width: 768px) {
    width: 100%;
    flex-flow: column nowrap;
    align-items: center;
  }
`;

export default Home;
