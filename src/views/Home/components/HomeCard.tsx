import React, { useContext } from 'react';
import styled, { ThemeContext } from 'styled-components';
import Label from '../../../components/Label';
import { TokenStat } from '../../../basis-cash/types';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import TokenSymbol from '../../../components/TokenSymbol';
import { commify } from 'ethers/lib/utils';
import config from '../../../config';
import pad from '../../../assets/img/pad.png';

interface HomeCardProps {
  title: string;
  symbol: string;
  color: string;
  supplyLabel?: string;
  address: string;
  stat?: TokenStat;
}

const HomeCard: React.FC<HomeCardProps> = ({
  title,
  symbol,
  color,
  address,
  supplyLabel = 'Total Supply',
  stat,
}) => {
  const tokenUrl = `${config.etherscanUrl}/address/${address}`;
  const buyTokenUrl = `https://app.unisave.exchange/#/swap?inputCurrency=${config.externalTokens.DAI[0]}&outputCurrency=${address}`
  return (
    <Wrapper>
      <StyledCards>
        <TokenSymbol symbol={symbol} />
        <CardHeader>{title}</CardHeader>
        <CardSection>
          {stat ? (
            <StyledValue style={{padding: '0 22px', backgroundColor: '#000000'}}>{(stat.priceInDAI !== '-' ? '$' : '') + stat.priceInDAI}</StyledValue>
          ) : (
            <ValueSkeleton />
          )}
          <Label text="Current Price" color={color} />
        </CardSection>

        <CardSection>
          {stat ? <StyledValue>{commify(stat.totalSupply)}</StyledValue> : <ValueSkeleton />}
          <StyledSupplyLabel href={tokenUrl} target="_blank" color={color}>
            {supplyLabel}
          </StyledSupplyLabel>
          { symbol !== 'YSB' && 
            <StyledBuyLabel href={buyTokenUrl} target="_blank" color="#efd40d">
            BUY {symbol} on Unisave
          </StyledBuyLabel>}
        </CardSection>
      </StyledCards>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  @media (max-width: 768px) {
    margin-top: ${(props) => props.theme.spacing[4]}px;
  }
`;

const CardHeader = styled.h2`
  color: #B2B2B2;
  text-align: center;
  margin-top: 5px;
`;

const StyledCards = styled.div`
  min-width: 200px;
  padding: ${(props) => props.theme.spacing[5]}px ${(props) => props.theme.spacing[3]}px;
  color: ${(props) => props.theme.color.white};
  background-image: url(${pad});
  background-repeat : no-repeat;
  background-size: 100% 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const StyledValue = styled.span`
  display: inline-block;
  font-size: 34px;
  color: #48E19F;
`;

const CardSection = styled.div`
  margin-bottom: ${(props) => props.theme.spacing[4]}px;
  align-items: center;
  display: flex;
  flex-direction: column;
  &:last-child {
    margin-bottom: 0;
  }
`;

const ValueSkeletonPadding = styled.div`
  padding-top: ${(props) => props.theme.spacing[3]}px;
  padding-bottom: ${(props) => props.theme.spacing[2]}px;
`;

const StyledSupplyLabel = styled.a`
  display: block;
  color: ${(props) => props.color};
`;

const StyledBuyLabel = styled.a`
  display: block;
  color: ${(props) => props.color};
`;

const ValueSkeleton = () => {
  const theme = useContext(ThemeContext);
  return (
    <SkeletonTheme color={theme.color.grey[700]} highlightColor={theme.color.grey[600]}>
      <ValueSkeletonPadding>
        <Skeleton height={10} />
      </ValueSkeletonPadding>
    </SkeletonTheme>
  );
};

export default HomeCard;
